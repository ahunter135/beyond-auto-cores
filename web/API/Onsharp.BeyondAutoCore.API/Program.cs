using Amazon.S3;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Onsharp.BeyondAutoCore.API.Middlewares;
using Onsharp.BeyondAutoCore.Infrastructure;


var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

builder.Services.AddDbContext<BacDBContext>(options => options.UseSqlServer(configuration.GetConnectionString("WebApiDatabase")));
builder.Services.AddHangfire(x => x.UseSqlServerStorage(configuration.GetConnectionString("WebApiDatabase")));
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<BacDBContext>()
    .AddDefaultTokenProviders();

builder.Services.AddRepository(configuration);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

string sentrySettingDsn = configuration["SentrySettings:Dsn"];
bool sentrySettingDebug = false;
double sentrySettingTraceSampleRate = 1.0;

if (!string.IsNullOrWhiteSpace(configuration["SentrySettings:Debug"]))
    bool.TryParse(configuration["SentrySettings:Debug"], out sentrySettingDebug);

if (!string.IsNullOrWhiteSpace(configuration["SentrySettings:TracesSampleRate"]))
    double.TryParse(configuration["SentrySettings:TracesSampleRate"], out sentrySettingTraceSampleRate);

builder.WebHost.UseSentry(o =>
{
    o.Dsn = sentrySettingDsn;
    // When configuring for the first time, to see what the SDK is doing:
    o.Debug = sentrySettingDebug;
    // Set TracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    o.TracesSampleRate = sentrySettingTraceSampleRate;
});

//var allowedOrigins = configuration["CORSOrigins"].Split(",");
builder.Services.AddCors(options =>
{
    // this defines a CORS policy called "default"
    options.AddPolicy("default", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithExposedHeaders("*");
            //.SetPreflightMaxAge(TimeSpan.FromMinutes(24));
    });

});

builder.Services.AddHangfireServer();
builder.Services.AddControllers();
builder.Services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));

builder.Services.Configure<AWSSettingDto>(builder.Configuration.GetSection("AwsCreds"));
var awsSettings = builder.Configuration.GetSection("AwsCreds").Get<AWSSettingDto>();

builder.Services.AddSingleton<IAmazonS3>(new AmazonS3Client(awsSettings.AccessKey, awsSettings.SecretKey, Amazon.RegionEndpoint.USEast2));

#region Jwt 

double AccessExpireMin = 0;
double.TryParse(configuration["JwtSettings:AccessTokenExpirationMinutes"], out AccessExpireMin);

double RefreshExpireMin = 0;
double.TryParse(configuration["JwtSettings:RefreshTokenExpirationMinutes"], out RefreshExpireMin);

var jwtSettings = new JwtSettingModel()
{
    AccessTokenSecret = configuration["JwtSettings:AccessTokenSecret"],
    AccessTokenExpirationMinutes = AccessExpireMin,
    Audience = configuration["JwtSettings:Audience"],
    Issuer = configuration["JwtSettings:Issuer"],
    RefreshTokenExpirationMinutes = RefreshExpireMin,
    RefreshTokenSecret = configuration["JwtSettings:RefreshTokenSecret"]
};

builder.Configuration.Bind(nameof(JwtSettingModel), jwtSettings);
builder.Services.AddSingleton(jwtSettings);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(x =>
    {
        x.SaveToken = true;
        x.RequireHttpsMetadata = false;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.AccessTokenSecret)),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = jwtSettings.Issuer,
            ValidAudience = jwtSettings.Audience,
            ClockSkew = TimeSpan.Zero
        };
    }
);

#endregion Jwt 

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Beyond Auto Core Api",
        Version = "v1"
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please insert JWT with Bearer into field",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
   {
     new OpenApiSecurityScheme
     {
       Reference = new OpenApiReference
       {
         Type = ReferenceType.SecurityScheme,
         Id = "Bearer"
       }
      },
      new string[] { }
    }
  });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

var dashboardOptions = new DashboardOptions
{
    IgnoreAntiforgeryToken = true,
    Authorization = new[] { new DashboardNoAuthorizationFilter() }
};

app.UseHangfireDashboard("/hangfire", dashboardOptions);

app.UseCors("default");
app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.MapControllers();


app.Run();


