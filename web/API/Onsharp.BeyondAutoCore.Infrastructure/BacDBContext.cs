using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;

namespace Onsharp.BeyondAutoCore.Infrastructure
{
    public class BacDBContext : DbContext, IDataProtectionKeyContext
    {
        public BacDBContext(DbContextOptions<BacDBContext> options) : base(options)
        {
        
        }


        public DbSet<LotItemPhotoGradeModel> LotItemPhotoGrades { get; set; }
        public DbSet<AffiliateSummaryModel> AffiliatesSummary { get; set; }
        public DbSet<AlertModel> Alerts { get; set; }
        public DbSet<CodeModel> Codes { get; set; }
        public DbSet<CommissionModel> Commissions { get; set; }
        public DbSet<DataProtectionKey> DataProtectionKeys { get; set; }
        public DbSet<GradeCreditModel> GradeCredits { get; set; }
        public DbSet<LotItemModel> LotItems { get; set; }
        public DbSet<LotItemFullnessModel> LotItemFullness { get; set; }
        public DbSet<LotModel> Lots { get; set; }
        public DbSet<MasterMarginModel> MasterMargins { get; set; }
        public DbSet<MaterialOriginalPriceModel> MaterialOriginalPrices { get; set; }
        public DbSet<MetalCustomPriceModel> MetalCustomPrices { get; set; }
        public DbSet<CountModel> Count {get; set; }
        public DbSet<SubscriptionStatusDto> SubscriptionStatusDto { get; set; }
        
        public DbSet<MetalPriceHistoryModel> MetalPriceHistories { get; set; }
        public DbSet<MetalPriceSummaryModel> MetalPriceSummaries { get; set; }
        public DbSet<PartnerModel> Partners { get; set; }
        public DbSet<PaymentModel> Payments { get; set; }
        public DbSet<PhotoGradeItemModel> PhotoGradeItems { get; set; }
        public DbSet<PhotoGradeModel> PhotoGrades { get; set; }
        public DbSet<RefreshTokenModel> RefreshTokens { get; set; }
        public DbSet<RegistrationModel> Registrations { get; set; }
        public DbSet<SubscriptionModel> Subscriptions { get; set; }
        public DbSet<PriceModel> Prices { get; set; }
        public DbSet<RoleModel> Roles { get; set; }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<DeviceModel> DeviceRegistration { get; set; }

        public override int SaveChanges()
        {
            return base.SaveChanges();
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
           
            var decimalProps = builder.Model
            .GetEntityTypes()
            .SelectMany(t => t.GetProperties())
            .Where(p => (System.Nullable.GetUnderlyingType(p.ClrType) ?? p.ClrType) == typeof(decimal));

            #region stored procedure model builder

            builder.Entity<CommissionDto>(m => { m.HasNoKey(); });
            builder.Entity<CodeListDto>(m => { m.HasNoKey(); });
            builder.Entity<InventoryDto>(m => { m.HasNoKey(); });
            builder.Entity<InventorySummaryDto>(m => { m.HasNoKey(); });
            builder.Entity<InvoiceDto>(m => { m.HasNoKey(); });
            builder.Entity<LotCodeItemDto>(m => { m.HasNoKey(); });

            builder.Entity<LotPhotoGradeDto>(m => { m.HasNoKey(); });
            builder.Entity<MetalPriceHistoryListDto>(m => { m.HasNoKey(); });
            builder.Entity<PhotoGradeListDto>(m => { m.HasNoKey(); });
            builder.Entity<UserListDto>(m => { m.HasNoKey(); });

            #endregion stored procedure model builder

            foreach (var property in decimalProps)
            {
                property.SetPrecision(18);
                property.SetScale(2);
            }

            base.OnModelCreating(builder);

        }
    }
}
