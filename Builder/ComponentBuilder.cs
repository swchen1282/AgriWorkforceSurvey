using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using COAWebService.DataModel;

namespace COAWebService.Builder
{
    public class ComponentBuilder
    {
        public string ConnectionString { get; set; }

        public List<FarmerProductionType> FarmerProductionType { get; set; }
        public List<FarmerLandType> FarmerLandType { get; set; }
        public List<FacilityCode> FacilityCode { get; set; }
        public List<IncomeRangeCode> IncomeRangeCode { get; set; }
        public List<MarketType> MarketType { get; set; }
        public List<FarmerWorkDay> FarmerWorkDay { get; set; }
        public List<OtherFarmWorkCode> OtherFarmWorkCode { get; set; }
        public List<EducationLevelCode> EducationLevelCode { get; set; }
        public List<RelationshipCode> RelationshipCode { get; set; }
        public List<LifeStyleCode> LifeStyleCode { get; set; }
        public List<ExperienceYears> ExperienceYears { get; set; }
        public List<FarmRelatedBusiness> FarmRelatedBusiness { get; set; }
        public List<Lack> Lack { get; set; }
        public List<AgeScope> AgeScope { get; set; }
        public List<WorkerTypeCode> WorkerTypeCode { get; set; }
        public List<LackMonths> LackMonths { get; set; }
        public List<ProductCode> ProductCode { get; set; }
        public List<string> FarmerIdList { get; set; }
        public FarmerListBuilder EmptyFarmerListBuilder { get; set; }

        public void GetFarmerProductionType() {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                FarmerProductionType = databaseContext.FarmerProductionType.ToList();
            }
        }
        public void GetFarmerLandType()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                FarmerLandType = databaseContext.FarmerLandType.ToList();
            }
        }
        public void GetFacilityCode()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                FacilityCode = databaseContext.FacilityCode.ToList();
            }
        }
        public void GetIncomeRangeCode()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                IncomeRangeCode = databaseContext.IncomeRangeCode.ToList();
            }
        }
        public void GetMarketType()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                MarketType = databaseContext.MarketType.ToList();
            }
        }
        public void GetFarmerWorkDay()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                FarmerWorkDay = databaseContext.FarmerWorkDay.ToList();
            }
        }
        public void GetOtherFarmWorkCode()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                OtherFarmWorkCode = databaseContext.OtherFarmWorkCode.ToList();
            }
        }
        public void GetEducationLevelCode()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                EducationLevelCode = databaseContext.EducationLevelCode.ToList();
            }
        }
        public void GetRelationshipCode()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                RelationshipCode = databaseContext.RelationshipCode.ToList();
            }
        }
        public void GetLifeStyleCode()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                LifeStyleCode = databaseContext.LifeStyleCode.ToList();
            }
        }
        public void GetExperienceYears()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                ExperienceYears = databaseContext.ExperienceYears.ToList();
            }
        }
        public void GetFarmRelatedBusiness()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                FarmRelatedBusiness = databaseContext.FarmRelatedBusiness.ToList();
            }
        }
        public void GetLack()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                Lack = databaseContext.Lack.ToList();
            }
        }
        public void GetAgeScope()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                AgeScope = databaseContext.AgeScope.ToList();
            }
        }
        public void GetWorkerTypeCode()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                WorkerTypeCode = databaseContext.WorkerTypeCode.ToList();
            }
        }
        public void GetLackMonths()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                LackMonths = databaseContext.LackMonths.ToList();
            }
        }
        public void GetProductCode() {

            using (var databaseContext = new DatabaseContext(ConnectionString)) {

                ProductCode = databaseContext.ProductCode.ToList();

            }

        }
        public void GetFarmerIdList() {
            using (var databaseContext = new DatabaseContext(ConnectionString)) {
                FarmerIdList = databaseContext.BaseFarmer.Select(e => e.farmerId).Distinct().ToList();
            }
        }
        public void GetEmptyBaseFarmer() {

            EmptyFarmerListBuilder = new FarmerListBuilder();

            BaseFarmer baseFarmer = new BaseFarmer();

            baseFarmer.totalpage = 1;
            baseFarmer.page = 1;
            baseFarmer.createTime = DateTime.Now;

            //Init FarmerLandArea
            foreach (FarmerLandType farmerLandType in FarmerLandType) {

                foreach (FarmerProductionType farmerProdcutionType in FarmerProductionType) {

                    var farmerLandArea = new FarmerLandArea() {

                        farmerLandTypeId = farmerLandType.id,
                        farmerProductionTypeId = farmerProdcutionType.id,
                        value = 0

                    };

                    baseFarmer.FarmerLandArea.Add(farmerLandArea);

                }
            }

            //Init PopulationNumber

            var populationNumber = new PopulationNumber() {

                over15Men = 0,
                over15Women = 0,
                under15Men = 0,
                under15Women = 0

            };

            baseFarmer.PopulationNumber.Add(populationNumber);

            // NumberWorker Template

            var numberWorkersList = new List<NumberWorkers>();

            foreach (AgeScope ageScope in AgeScope)
            {

                numberWorkersList.Add(new NumberWorkers()
                {
                    ageScopeId = ageScope.id,
                    value = 0
                });

            }


            //Init LongTermForHire && LongTermForLack

            foreach (WorkerTypeCode workerTypeCode in WorkerTypeCode) {

                var longTermForLack = new LongTermForLack()
                {
                    workerTypeCodeId = workerTypeCode.id,
                    numberOfPeople = 0

                };

                baseFarmer.LongTermForLack.Add(longTermForLack);

            }

            //Init ShortTermForHire && NoSalaryForHire

            for (var month = 1; month <= 12; month++) {

                var shortTermForHire = new ShortTermForHire() {

                    month = month,
                    avgSalaryForEveryday = 0,
                    NumberWorkers = numberWorkersList

                };

                baseFarmer.ShortTermForHire.Add(shortTermForHire);

                var noSalaryForHire = new NoSalaryForHire()
                {
                    month = month,
                    numberOfPeople = 0
                };

                baseFarmer.NoSalaryForHire.Add(noSalaryForHire);

            }

            EmptyFarmerListBuilder.FarmerList = new List<FarmerBuilder>();

            EmptyFarmerListBuilder.FarmerList.Add(new FarmerBuilder()
            {
                BaseFarmer = baseFarmer,
                ConnectionString = ConnectionString
            });

            EmptyFarmerListBuilder.ConnectionString = ConnectionString;
        }
    }
}