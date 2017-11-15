namespace COAWebService.DataModel
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext(string ConnectionString)
            : base(ConnectionString)
        {
            this.Configuration.AutoDetectChangesEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ValidateOnSaveEnabled = false;
        }

        public virtual DbSet<AgeScope> AgeScope { get; set; }
        public virtual DbSet<AllMarketing> AllMarketing { get; set; }
        public virtual DbSet<AnimalMarketing> AnimalMarketing { get; set; }
        public virtual DbSet<BaseFarmer> BaseFarmer { get; set; }
        public virtual DbSet<Business> Business { get; set; }
        public virtual DbSet<CropSituation> CropSituation { get; set; }
        public virtual DbSet<EducationLevelCode> EducationLevelCode { get; set; }
        public virtual DbSet<ExceptionLog> ExceptionLog { get; set; }
        public virtual DbSet<ExperienceYears> ExperienceYears { get; set; }
        public virtual DbSet<FacilityCode> FacilityCode { get; set; }
        public virtual DbSet<FarmerLandArea> FarmerLandArea { get; set; }
        public virtual DbSet<FarmerLandType> FarmerLandType { get; set; }
        public virtual DbSet<FarmerProductionType> FarmerProductionType { get; set; }
        public virtual DbSet<FarmerWorkDay> FarmerWorkDay { get; set; }
        public virtual DbSet<FarmRelatedBusiness> FarmRelatedBusiness { get; set; }
        public virtual DbSet<IncomeRangeCode> IncomeRangeCode { get; set; }
        public virtual DbSet<Lack> Lack { get; set; }
        public virtual DbSet<LackMonths> LackMonths { get; set; }
        public virtual DbSet<LifeStyleCode> LifeStyleCode { get; set; }
        public virtual DbSet<Log> Log { get; set; }
        public virtual DbSet<LongTermForHire> LongTermForHire { get; set; }
        public virtual DbSet<LongTermForLack> LongTermForLack { get; set; }
        public virtual DbSet<MarketType> MarketType { get; set; }
        public virtual DbSet<NoSalaryForHire> NoSalaryForHire { get; set; }
        public virtual DbSet<NumberWorkers> NumberWorkers { get; set; }
        public virtual DbSet<OtherFarmWorkCode> OtherFarmWorkCode { get; set; }
        public virtual DbSet<Population> Population { get; set; }
        public virtual DbSet<PopulationNumber> PopulationNumber { get; set; }
        public virtual DbSet<ProductCode> ProductCode { get; set; }
        public virtual DbSet<RelationshipCode> RelationshipCode { get; set; }
        public virtual DbSet<ShortTermForHire> ShortTermForHire { get; set; }
        public virtual DbSet<ShortTermForLack> ShortTermForLack { get; set; }
        public virtual DbSet<WorkerTypeCode> WorkerTypeCode { get; set; }
        public virtual DbSet<WorkType> WorkType { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BaseFarmer>()
                .Property(e => e.farmerId)
                .IsUnicode(false);

            modelBuilder.Entity<BaseFarmer>()
                .Property(e => e.phone)
                .IsUnicode(false);

            modelBuilder.Entity<BaseFarmer>()
                .Property(e => e.addressMatchList)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<BaseFarmer>()
                .Property(e => e.isHire)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<BaseFarmer>()
                .Property(e => e.investigatorCode)
                .IsUnicode(false);

            modelBuilder.Entity<FarmRelatedBusiness>()
                .Property(e => e.hasBusiness)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ProductCode>()
                .Property(e => e.code)
                .IsUnicode(false);

            modelBuilder.Entity<ProductCode>()
                .Property(e => e.type)
                .IsUnicode(false);
        }
    }
}
