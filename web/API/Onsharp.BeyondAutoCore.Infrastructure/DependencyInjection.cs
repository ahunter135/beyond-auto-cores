using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Onsharp.BeyondAutoCore.Application.JWT;
using Onsharp.BeyondAutoCore.Infrastructure.Repository;
using Onsharp.BeyondAutoCore.Infrastructure.Service;
using Onsharp.BeyondAutoCore.Infrastructure.Service.JWT;

namespace Onsharp.BeyondAutoCore.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddRepository(this IServiceCollection services, IConfiguration configuration)
        {

            #region service

            #region JWT
            services.AddTransient<ITokenHashService, TokenHashService>();
            services.AddTransient<IAuthenticateService, AuthenticateService>();
            services.AddTransient<IAccessTokenService, AccessTokenService>();
            services.AddTransient<IRefreshTokenService, RefreshTokenService>();
            services.AddTransient<IRefreshTokenValidator, RefreshTokenValidator>();
            services.AddTransient<ITokenGenerator, TokenGenerator>();
            #endregion JWT

            services.AddTransient<IAffiliateService, AffiliateService>();
            services.AddTransient<IAlertService, AlertService>();
            services.AddTransient<ICodeService, CodeService>();
            services.AddTransient<IDeviceService, DeviceService>();
            services.AddTransient<ICommissionService, CommissionService>();
            services.AddTransient<IGradeCreditService, GradeCreditService>();
            services.AddTransient<IHangfireJobService, HangfireJobService>();
            services.AddTransient<ILotItemFullnessService, LotItemFullnessService>();
            services.AddTransient<ILotItemService, LotItemService>();
            services.AddTransient<ILotService, LotService>();
            services.AddTransient<IMasterMarginService, MasterMarginService>();
            services.AddTransient<IMaterialOriginalPriceService, MaterialOriginalPriceService>();
            services.AddTransient<IMetalCustomPriceService, MetalCustomPriceService>();
            services.AddTransient<IMetalPriceHistoryService, MetalPriceHistoryService>();
            services.AddTransient<IMetalPriceService, MetalPriceService>();
            services.AddTransient<IMetalPriceSummaryService, MetalPriceSummaryService>();
            services.AddTransient<IPartnerService, PartnerService>();
            services.AddTransient<IPaymentService, PaymentService>();
            services.AddTransient<IPhotoGradeItemService, PhotoGradeItemService>();
            services.AddTransient<IPhotoGradeService, PhotoGradeService>();
            services.AddTransient<IPriceService, PriceService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IRegistrationService, RegistrationService>();
            services.AddTransient<ISubscriptionService, SubscriptionService>();
            services.AddTransient<ISupportService, SupportService>();

            #endregion service

            #region repository

            services.AddTransient<IRefreshTokensRepository, RefreshTokensRepository>();

            services.AddTransient<IAlertsRepository, AlertsRepository>();
            services.AddTransient<ICodesRepository, CodesRepository>();
            services.AddTransient<IDeviceRepository, DeviceRepository>();
            services.AddTransient<ICommissionsRepository, CommissionsRepository>();
            services.AddTransient<IGradeCreditsRepository, GradeCreditsRepository>();
            services.AddTransient<ILotItemFullnessRepository, LotItemFullnessRepository>();
            services.AddTransient<ILotItemsRepository, LotItemsRepository>();
            services.AddTransient<ILotItemPhotoGradeRepository, LotItemPhotoGradeRepository>();
            services.AddTransient<ILotsRepository, LotsRepository>();
            services.AddTransient<IMarginsRepository, MasterMarginsRepository>();
            services.AddTransient<IMaterialOriginalPricesRepository, MaterialOriginalPricesRepository>();
            services.AddTransient<IMetalCustomPricesRepository, MetalCustomPricesRepository>();
            services.AddTransient<IMetalPriceHistoriesRepository, MetalPriceHistoriesRepository>();
            services.AddTransient<IMetalPriceSummariesRepository, MetalPriceSummariesRepository>();
            services.AddTransient<IPartnersRepository, PartnersRepository>();
            services.AddTransient<IPaymentsRepository, PaymentsRepository>();
            services.AddTransient<IPhotoGradeItemsRepository, PhotoGradeItemsRepository>();
            services.AddTransient<IPhotoGradesRepository, PhotoGradesRepository>();
            services.AddTransient<IPricesRepository, PricesRepository>();

            services.AddTransient<IUsersRepository, UsersRepository>();
            services.AddTransient<IRegistrationsRepository, RegistrationsRepository>();
            services.AddTransient<ISubscriptionsRepository, SubscriptionsRepository>();
            

            #endregion repository

            services.AddDbContext<BacDBContext>(opt => opt
                .UseSqlServer(configuration.GetConnectionString("WebApiDatabase")));

            return services;
        }
    }
}
