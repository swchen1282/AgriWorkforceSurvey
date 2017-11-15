using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using COAWebService.DataModel;
using System.Data.Entity;
using System.Linq;


namespace COAWebService.Builder
{
    public class FarmerBuilder
    {
        public int index { get; set; }
        public BaseFarmer BaseFarmer { get; set; }
        public string ConnectionString { get; set; }

        public void GetBaseFarmer()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                var include = databaseContext.BaseFarmer.Where(i => i.id == index).FirstOrDefault();

                BaseFarmer = include;                  

            }
        }
        public void GetBusiness()
        {

            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                var include = databaseContext.Business.Where(i => i.baseFarmerId == index).ToList();

                BaseFarmer.Business = include;

            }

        }
        public void GetFarmerLandArea() {

            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                var include = databaseContext.FarmerLandArea.Where(i => i.baseFarmerId == index).ToList();

                BaseFarmer.FarmerLandArea = include;

            }
        }
        public void GetCropSituation()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {


                var include = databaseContext.CropSituation.Where(i => i.baseFarmerId == index).ToList();

                BaseFarmer.CropSituation = include;

            }
        }
        public void GetAnimalMarketing()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                BaseFarmer.AnimalMarketing = databaseContext.AnimalMarketing.Where(a => a.baseFarmerId == index).ToList();

            }
        }
        public void GetAllMarketing()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                var include = databaseContext.AllMarketing.Where(i => i.baseFarmerId == index).ToList();

                BaseFarmer.AllMarketing = include;

            }
        }
        public void GetPopulationNumber()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                BaseFarmer.PopulationNumber = databaseContext.PopulationNumber.Where(p => p.baseFarmerId == index).ToList();

            }
        }
        public void GetPopulation()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                var include = databaseContext.Population.Where(i => i.baseFarmerId == index).ToList();

                BaseFarmer.Population = include;

            }
        }
        public void GetLongTermForHire()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                var include = databaseContext.LongTermForHire.Where(i => i.baseFarmerId == index).Include(i => i.NumberWorkers).ToList();

                BaseFarmer.LongTermForHire = include;

            }
        }
        public void GetShortTermForHire()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                var include = databaseContext.ShortTermForHire.Where(i => i.baseFarmerId == index).Include(i => i.WorkType).Include(i => i.NumberWorkers).ToList();

                var orderd_include = from i in include
                                      orderby i.month
                                      select i;

                BaseFarmer.ShortTermForHire = orderd_include.ToList();

            }
        }
        public void GetNoSalaryForHire()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                var include = databaseContext.NoSalaryForHire.Where(i => i.baseFarmerId == index).ToList();

                BaseFarmer.NoSalaryForHire = include;

            }
        }
        public void GetLongTermForLack()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                var include = databaseContext.LongTermForLack.Where(i => i.baseFarmerId == index).ToList();

                BaseFarmer.LongTermForLack = include;

            }
        }
        public void GetShortTermForLack()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                var include = databaseContext.ShortTermForLack.Where(i => i.baseFarmerId == index).Include(i => i.LackMonths).ToList();

                BaseFarmer.ShortTermForLack = include;

            }
        }

        public void UpdateBaseFarmer() {

            using (var databaseContext = new DatabaseContext(ConnectionString)) {

                var baseFarmer = databaseContext.BaseFarmer.Single(i => i.id == BaseFarmer.id);

                databaseContext.Entry(baseFarmer).CurrentValues.SetValues(BaseFarmer);

                databaseContext.SaveChanges();
            }
        }
        public void UpdateBusiness()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString)) {

                var baseFarmer = databaseContext.BaseFarmer
                    .Include(i => i.Business)
                    .Single(i => i.id == BaseFarmer.id);

                var existingBusiness = baseFarmer.Business;
                var updatedBusiness = BaseFarmer.Business;
                //2- Find newly added 
                var addedBusiness = updatedBusiness.Except(existingBusiness, e => e.id).ToList<Business>();
                //3- Find deleted 
                var deletedBusiness = existingBusiness.Except(updatedBusiness, e => e.id).ToList<Business>();
                //4- Find modified
                var modifiedBusiness = updatedBusiness.Except(addedBusiness, e => e.id ).ToList<Business>();
                //5- Mark all added entity state to Added
                foreach (Business business in addedBusiness) {
                    databaseContext.Entry(business).State = System.Data.Entity.EntityState.Added;
                }
                //6- Mark all deleted entity state to Deleted
                foreach (Business business in deletedBusiness)
                {
                    databaseContext.Entry(business).State = System.Data.Entity.EntityState.Deleted;
                }
                //7- Apply modified current property values to existing property values
                foreach (Business business in modifiedBusiness)
                {
                    //8- Find existing by id
                    var existing = databaseContext.Business.Find(business.id);
                    if (existing != null)
                    {
                        var Entry = databaseContext.Entry(existing);
                        Entry.CurrentValues.SetValues(business);
                    }
                }
                //9- Save all above changed entities to the database
                databaseContext.SaveChanges();
            }
        }
        public void UpdateFarmerLandArea()
        { 
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                var baseFarmer = databaseContext.BaseFarmer
                    .Include(i => i.FarmerLandArea)
                    .Single(i => i.id == BaseFarmer.id);

                var existingFarmerLandArea = baseFarmer.FarmerLandArea;
                var updatedFarmerLandArea = BaseFarmer.FarmerLandArea;
                //2- Find newly added 
                var addedFarmerLandArea = updatedFarmerLandArea.Except(existingFarmerLandArea, e => e.id ).ToList<FarmerLandArea>();
                //3- Find deleted 
                var deletedFarmerLandArea = existingFarmerLandArea.Except(updatedFarmerLandArea, e => e.id ).ToList<FarmerLandArea>();
                //4- Find modified
                var modifiedFarmerLandArea = updatedFarmerLandArea.Except(addedFarmerLandArea, e => e.id ).ToList<FarmerLandArea>();
                //5- Mark all added entity state to Added
                foreach (FarmerLandArea farmerLandArea in addedFarmerLandArea)
                {
                    databaseContext.Entry(farmerLandArea).State = System.Data.Entity.EntityState.Added;
                }
                //6- Mark all deleted entity state to Deleted
                foreach (FarmerLandArea farmerLandArea in deletedFarmerLandArea)
                {
                    databaseContext.Entry(farmerLandArea).State = System.Data.Entity.EntityState.Deleted;
                }
                //7- Apply modified current property values to existing property values
                foreach (FarmerLandArea farmerLandArea in modifiedFarmerLandArea)
                {
                    //8- Find existing by id
                    var existing = databaseContext.FarmerLandArea.Find(farmerLandArea.id);
                    if (existing != null)
                    {
                        var Entry = databaseContext.Entry(existing);
                        Entry.CurrentValues.SetValues(farmerLandArea);
                    }
                }
                databaseContext.SaveChanges();
            }            
        }
        public void UpdateCropSituation()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString)) {

                var baseFarmer = databaseContext.BaseFarmer
                    .Include(i => i.CropSituation)
                    .Single(i => i.id == BaseFarmer.id);

                var existingCropSituation = baseFarmer.CropSituation;
                var updatedCropSituation = BaseFarmer.CropSituation;
                //2- Find newly added 
                var addedCropSituation = updatedCropSituation.Except(existingCropSituation, e => e.id ).ToList<CropSituation>();
                //3- Find deleted 
                var deletedCropSituation = existingCropSituation.Except(updatedCropSituation, e => e.id ).ToList<CropSituation>();
                //4- Find modified
                var modifiedCropSituation = updatedCropSituation.Except(addedCropSituation, e => e.id ).ToList<CropSituation>();
                //5- Mark all added entity state to Added
                foreach (CropSituation cropSituation in addedCropSituation)
                {
                    databaseContext.Entry(cropSituation).State = System.Data.Entity.EntityState.Added;
                }
                //6- Mark all deleted entity state to Deleted
                foreach (CropSituation cropSituation in deletedCropSituation)
                {
                    databaseContext.Entry(cropSituation).State = System.Data.Entity.EntityState.Deleted;
                }
                //7- Apply modified current property values to existing property values
                foreach (CropSituation cropSituation in modifiedCropSituation)
                {
                    //8- Find existing by id
                    var existing = databaseContext.CropSituation.Find(cropSituation.id);
                    if (existing != null)
                    {
                        var Entry = databaseContext.Entry(existing);
                        Entry.CurrentValues.SetValues(cropSituation);
                    }
                }
                databaseContext.SaveChanges();
            }
        }
        public void UpdateAllMarketing()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                var baseFarmer = databaseContext.BaseFarmer
                    .Include(i => i.AllMarketing)
                    .Single(i => i.id == BaseFarmer.id);

                var existingAllMarketing = baseFarmer.AllMarketing;
                var updatedAllMarketing = BaseFarmer.AllMarketing;
                //2- Find newly added 
                var addedAllMarketing = updatedAllMarketing.Except(existingAllMarketing, e => e.id ).ToList<AllMarketing>();
                //3- Find deleted 
                var deletedAllMarketing = existingAllMarketing.Except(updatedAllMarketing, e => e.id ).ToList<AllMarketing>();
                //4- Find modified
                var modifiedAllMarketing = updatedAllMarketing.Except(addedAllMarketing, e => e.id ).ToList<AllMarketing>();
                //5- Mark all added entity state to Added
                foreach (AllMarketing AllMarketing in addedAllMarketing)
                {
                    databaseContext.Entry(AllMarketing).State = System.Data.Entity.EntityState.Added;
                }
                //6- Mark all deleted entity state to Deleted
                foreach (AllMarketing AllMarketing in deletedAllMarketing)
                {
                    databaseContext.Entry(AllMarketing).State = System.Data.Entity.EntityState.Deleted;
                }
                //7- Apply modified current property values to existing property values
                foreach (AllMarketing AllMarketing in modifiedAllMarketing)
                {
                    //8- Find existing by id
                    var existing = databaseContext.AllMarketing.Find(AllMarketing.id);
                    if (existing != null)
                    {
                        var Entry = databaseContext.Entry(existing);
                        Entry.CurrentValues.SetValues(AllMarketing);
                    }
                }
                //9- Save all above changed entities to the database
                databaseContext.SaveChanges();
            }
        }
        public void UpdateAnimalMarketing()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                var baseFarmer = databaseContext.BaseFarmer
                    .Include(i => i.AnimalMarketing)
                    .Single(i => i.id == BaseFarmer.id);

                var existingAnimalMarketing = baseFarmer.AnimalMarketing;
                var updatedAnimalMarketing = BaseFarmer.AnimalMarketing;
                //2- Find newly added 
                var addedAnimalMarketing = updatedAnimalMarketing.Except(existingAnimalMarketing, e => e.id ).ToList<AnimalMarketing>();
                //3- Find deleted 
                var deletedAnimalMarketing = existingAnimalMarketing.Except(updatedAnimalMarketing, e => e.id ).ToList<AnimalMarketing>();
                //4- Find modified
                var modifiedAnimalMarketing = updatedAnimalMarketing.Except(addedAnimalMarketing, e => e.id ).ToList<AnimalMarketing>();
                //5- Mark all added entity state to Added
                foreach (AnimalMarketing animalMarketing in addedAnimalMarketing)
                {
                    databaseContext.Entry(animalMarketing).State = System.Data.Entity.EntityState.Added;
                }
                //6- Mark all deleted entity state to Deleted
                foreach (AnimalMarketing animalMarketing in deletedAnimalMarketing)
                {
                    databaseContext.Entry(animalMarketing).State = System.Data.Entity.EntityState.Deleted;
                }
                //7- Apply modified current property values to existing property values
                foreach (AnimalMarketing animalMarketing in modifiedAnimalMarketing)
                {
                    //8- Find existing by id
                    var existing = databaseContext.AnimalMarketing.Find(animalMarketing.id);
                    if (existing != null)
                    {
                        var Entry = databaseContext.Entry(existing);
                        Entry.CurrentValues.SetValues(animalMarketing);
                    }
                }
                databaseContext.SaveChanges();
            }
        }
        public void UpdatePopulationNumber()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                var baseFarmer = databaseContext.BaseFarmer
                    .Include(i => i.PopulationNumber)
                    .Single(i => i.id == BaseFarmer.id);

                var existingPopulationNumber = baseFarmer.PopulationNumber;
                var updatedPopulationNumber = BaseFarmer.PopulationNumber;
                //2- Find newly added 
                var addedPopulationNumber = updatedPopulationNumber.Except(existingPopulationNumber, e => e.id ).ToList<PopulationNumber>();
                //3- Find deleted 
                var deletedPopulationNumber = existingPopulationNumber.Except(updatedPopulationNumber, e => e.id ).ToList<PopulationNumber>();
                //4- Find modified
                var modifiedPopulationNumber = updatedPopulationNumber.Except(addedPopulationNumber, e => e.id ).ToList<PopulationNumber>();
                //5- Mark all added entity state to Added
                foreach (PopulationNumber populationNumber in addedPopulationNumber)
                {
                    databaseContext.Entry(populationNumber).State = System.Data.Entity.EntityState.Added;
                }
                //6- Mark all deleted entity state to Deleted
                foreach (PopulationNumber populationNumber in deletedPopulationNumber)
                {
                    databaseContext.Entry(populationNumber).State = System.Data.Entity.EntityState.Deleted;
                }
                //7- Apply modified current property values to existing property values
                foreach (PopulationNumber populationNumber in modifiedPopulationNumber)
                {
                    //8- Find existing by id
                    var existing = databaseContext.PopulationNumber.Find(populationNumber.id);
                    if (existing != null)
                    {
                        var Entry = databaseContext.Entry(existing);
                        Entry.CurrentValues.SetValues(populationNumber);
                    }
                }
                databaseContext.SaveChanges();
            }
        }
        public void UpdatePopulation()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                var baseFarmer = databaseContext.BaseFarmer
                    .Include(i => i.Population)
                    .Single(i => i.id == BaseFarmer.id);

                var existingPopulation = baseFarmer.Population;
                var updatedPopulation = BaseFarmer.Population;
                //2- Find newly added 
                var addedPopulation = updatedPopulation.Except(existingPopulation, e => e.id ).ToList<Population>();
                //3- Find deleted 
                var deletedPopulation = existingPopulation.Except(updatedPopulation, e => e.id ).ToList<Population>();
                //4- Find modified
                var modifiedPopulation = updatedPopulation.Except(addedPopulation, e => e.id ).ToList<Population>();
                //5- Mark all added entity state to Added
                foreach (Population population in addedPopulation)
                {
                    databaseContext.Entry(population).State = System.Data.Entity.EntityState.Added;
                }
                //6- Mark all deleted entity state to Deleted
                foreach (Population population in deletedPopulation)
                {
                    databaseContext.Entry(population).State = System.Data.Entity.EntityState.Deleted;
                }
                //7- Apply modified current property values to existing property values
                foreach (Population population in modifiedPopulation)
                {
                    //8- Find existing by id
                    var existing = databaseContext.Population.Find(population.id);
                    if (existing != null)
                    {
                        var Entry = databaseContext.Entry(existing);
                        Entry.CurrentValues.SetValues(population);
                    }
                }
                databaseContext.SaveChanges();
            }
        }
        public void UpdateLongTermForHire()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                var baseFarmer = databaseContext.BaseFarmer
                    .Include(i => i.LongTermForHire)
                    .Single(i => i.id == BaseFarmer.id);

                var existingLongTermForHire = baseFarmer.LongTermForHire;
                var updatedLongTermForHire = BaseFarmer.LongTermForHire;
                //2- Find newly added 
                var addedLongTermForHire = updatedLongTermForHire.Except(existingLongTermForHire, e => e.id ).ToList<LongTermForHire>();
                //3- Find deleted 
                var deletedLongTermForHire = existingLongTermForHire.Except(updatedLongTermForHire, e => e.id ).ToList<LongTermForHire>();
                //4- Find modified
                var modifiedLongTermForHire = updatedLongTermForHire.Except(addedLongTermForHire, e => e.id ).ToList<LongTermForHire>();
                //5- Mark all added entity state to Added
                foreach (LongTermForHire longTermForHire in addedLongTermForHire)
                {
                    databaseContext.Entry(longTermForHire).State = System.Data.Entity.EntityState.Added;
                    foreach (NumberWorkers numberWorkers in longTermForHire.NumberWorkers)
                    {
                        databaseContext.Entry(numberWorkers).State = System.Data.Entity.EntityState.Added;
                    }
                }
                //6- Mark all deleted entity state to Deleted
                foreach (LongTermForHire longTermForHire in deletedLongTermForHire)
                {
                    databaseContext.Entry(longTermForHire).State = System.Data.Entity.EntityState.Deleted;

                    longTermForHire.NumberWorkers = databaseContext.NumberWorkers.Where(e => e.longTermForHireId == longTermForHire.id).ToList();

                    foreach (NumberWorkers numberWorkers in longTermForHire.NumberWorkers)
                    {
                        databaseContext.Entry(numberWorkers).State = System.Data.Entity.EntityState.Deleted;
                    }
                }
                //7- Apply modified current property values to existing property values
                foreach (LongTermForHire longTermForHire in modifiedLongTermForHire)
                {
                    //8- Find existing by id
                    var existing = databaseContext.LongTermForHire.Find(longTermForHire.id);
                    if (existing != null)
                    {
                        var Entry = databaseContext.Entry(existing);
                        Entry.CurrentValues.SetValues(longTermForHire);
                    }

                    foreach (NumberWorkers numberWorkers in longTermForHire.NumberWorkers)
                    {
                        var existing_numberWorkers = databaseContext.NumberWorkers.Find(numberWorkers.id);
                        if (existing_numberWorkers != null)
                        {
                            var Entry = databaseContext.Entry(existing_numberWorkers);
                            Entry.CurrentValues.SetValues(numberWorkers);
                        }
                    }
                }                
                databaseContext.SaveChanges();
            }
        }
        public void UpdateShortTermForHire()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                var baseFarmer = databaseContext.BaseFarmer
                    .Include(i => i.ShortTermForHire)
                    .Single(i => i.id == BaseFarmer.id);

                var existingShortTermForHire = baseFarmer.ShortTermForHire;
                var updatedShortTermForHire = BaseFarmer.ShortTermForHire;
                //2- Find newly added 
                var addedShortTermForHire = updatedShortTermForHire.Except(existingShortTermForHire, e => e.id ).ToList<ShortTermForHire>();
                //3- Find deleted 
                var deletedShortTermForHire = existingShortTermForHire.Except(updatedShortTermForHire, e => e.id ).ToList<ShortTermForHire>();
                //4- Find modified
                var modifiedShortTermForHire = updatedShortTermForHire.Except(addedShortTermForHire, e => e.id ).ToList<ShortTermForHire>();
                //5- Mark all added entity state to Added
                foreach (ShortTermForHire shortTermForHire in addedShortTermForHire)
                {
                    databaseContext.Entry(shortTermForHire).State = System.Data.Entity.EntityState.Added;
                    foreach (NumberWorkers numberWorkers in shortTermForHire.NumberWorkers)
                    {
                        databaseContext.Entry(numberWorkers).State = System.Data.Entity.EntityState.Added;
                    }
                    foreach (WorkType workType in shortTermForHire.WorkType) {
                        databaseContext.Entry(workType).State = System.Data.Entity.EntityState.Added;
                    }
                }
                //6- Mark all deleted entity state to Deleted
                foreach (ShortTermForHire shortTermForHire in deletedShortTermForHire)
                {
                    databaseContext.Entry(shortTermForHire).State = System.Data.Entity.EntityState.Deleted;
                    foreach (NumberWorkers numberWorkers in shortTermForHire.NumberWorkers)
                    {
                        databaseContext.Entry(numberWorkers).State = System.Data.Entity.EntityState.Deleted;
                    }
                    foreach (WorkType workType in shortTermForHire.WorkType)
                    {
                        databaseContext.Entry(workType).State = System.Data.Entity.EntityState.Deleted;
                    }
                }
                //7- Apply modified current property values to existing property values
                foreach (ShortTermForHire shortTermForHire in modifiedShortTermForHire)
                {
                    //8- Find existing by id
                    var existing = databaseContext.ShortTermForHire
                        .Include(e => e.WorkType)
                        .Single(e => e.id == shortTermForHire.id);

                    if (existing != null)
                    {
                        var Entry = databaseContext.Entry(existing);
                        Entry.CurrentValues.SetValues(shortTermForHire);
                    }
                    foreach (NumberWorkers numberWorkers in shortTermForHire.NumberWorkers)
                    {
                        var existing_numberWorkers = databaseContext.NumberWorkers.Find(numberWorkers.id);
                        if (existing_numberWorkers != null)
                        {
                            var Entry = databaseContext.Entry(existing_numberWorkers);
                            Entry.CurrentValues.SetValues(numberWorkers);
                        }
                    }

                    var existingWorkType = existing.WorkType;
                    var updatedWorkType = shortTermForHire.WorkType;
                    //2- Find newly added 
                    var addedWorkType = updatedWorkType.Except(existingWorkType, e => e.id).ToList<WorkType>();
                    //3- Find deleted 
                    var deletedWorkType = existingWorkType.Except(updatedWorkType, e => e.id).ToList<WorkType>();
                    //4- Find modified
                    var modifiedWorkType = updatedWorkType.Except(addedWorkType, e => e.id).ToList<WorkType>();
                    //5- Mark all added entity state to Added
                    foreach (WorkType WorkType in addedWorkType)
                    {
                        databaseContext.Entry(WorkType).State = System.Data.Entity.EntityState.Added;
                    }
                    //6- Mark all deleted entity state to Deleted
                    foreach (WorkType WorkType in deletedWorkType)
                    {
                        databaseContext.Entry(WorkType).State = System.Data.Entity.EntityState.Deleted;
                    }
                    //7- Apply modified current property values to existing property values
                    foreach (WorkType workType in modifiedWorkType)
                    {
                        var existing_workType = databaseContext.WorkType.Find(workType.id);
                        if (existing_workType != null)
                        {
                            var Entry = databaseContext.Entry(existing_workType);
                            Entry.CurrentValues.SetValues(workType);
                        }
                    }
                }
                databaseContext.SaveChanges();
            }
        }
        public void UpdateNoSalayForHire() {

            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                var baseFarmer = databaseContext.BaseFarmer
                    .Include(i => i.NoSalaryForHire)
                    .Single(i => i.id == BaseFarmer.id);

                var existingNoSalaryForHire = baseFarmer.NoSalaryForHire;
                var updatedNoSalaryForHire = BaseFarmer.NoSalaryForHire;
                //2- Find newly added 
                var addedNoSalaryForHire = updatedNoSalaryForHire.Except(existingNoSalaryForHire, e => e.id).ToList<NoSalaryForHire>();
                //3- Find deleted 
                var deletedNoSalaryForHire = existingNoSalaryForHire.Except(updatedNoSalaryForHire, e => e.id).ToList<NoSalaryForHire>();
                //4- Find modified
                var modifiedNoSalaryForHire = updatedNoSalaryForHire.Except(addedNoSalaryForHire, e => e.id).ToList<NoSalaryForHire>();
                //5- Mark all added entity state to Added
                foreach (NoSalaryForHire noSalaryForHire in addedNoSalaryForHire)
                {
                    databaseContext.Entry(noSalaryForHire).State = System.Data.Entity.EntityState.Added;
                }
                //6- Mark all deleted entity state to Deleted
                foreach (NoSalaryForHire noSalaryForHire in deletedNoSalaryForHire)
                {
                    databaseContext.Entry(noSalaryForHire).State = System.Data.Entity.EntityState.Deleted;
                }
                //7- Apply modified current property values to existing property values
                foreach (NoSalaryForHire noSalaryForHire in modifiedNoSalaryForHire)
                {
                    //8- Find existing by id
                    var existing = databaseContext.NoSalaryForHire.Find(noSalaryForHire.id);
                    if (existing != null)
                    {
                        var Entry = databaseContext.Entry(existing);
                        Entry.CurrentValues.SetValues(noSalaryForHire);
                    }
                }
                databaseContext.SaveChanges();
            }
        }
        public void UpdateLongTermForLack()
        {

            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                var baseFarmer = databaseContext.BaseFarmer
                    .Include(i => i.LongTermForLack)
                    .Single(i => i.id == BaseFarmer.id);

                var existingLongTermForLack = baseFarmer.LongTermForLack;
                var updatedLongTermForLack = BaseFarmer.LongTermForLack;
                //2- Find newly added 
                var addedLongTermForLack = updatedLongTermForLack.Except(existingLongTermForLack, e => e.id).ToList<LongTermForLack>();
                //3- Find deleted 
                var deletedLongTermForLack = existingLongTermForLack.Except(updatedLongTermForLack, e => e.id).ToList<LongTermForLack>();
                //4- Find modified
                var modifiedLongTermForLack = updatedLongTermForLack.Except(addedLongTermForLack, e => e.id).ToList<LongTermForLack>();
                //5- Mark all added entity state to Added
                foreach (LongTermForLack longTermForLack in addedLongTermForLack)
                {
                    databaseContext.Entry(longTermForLack).State = System.Data.Entity.EntityState.Added;
                }
                //6- Mark all deleted entity state to Deleted
                foreach (LongTermForLack longTermForLack in deletedLongTermForLack)
                {
                    databaseContext.Entry(longTermForLack).State = System.Data.Entity.EntityState.Deleted;
                }
                //7- Apply modified current property values to existing property values
                foreach (LongTermForLack longTermForLack in modifiedLongTermForLack)
                {
                    //8- Find existing by id
                    var existing = databaseContext.LongTermForLack.Find(longTermForLack.id);
                    if (existing != null)
                    {
                        var Entry = databaseContext.Entry(existing);
                        Entry.CurrentValues.SetValues(longTermForLack);
                    }
                }
                databaseContext.SaveChanges();
            }
        }
        public void UpdateShortTermForLack()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                var baseFarmer = databaseContext.BaseFarmer
                    .Include(i => i.ShortTermForLack)
                    .Single(i => i.id == BaseFarmer.id);

                var existingShortTermForLack = baseFarmer.ShortTermForLack;
                var updatedShortTermForLack = BaseFarmer.ShortTermForLack;
                //2- Find newly added 
                var addedShortTermForLack = updatedShortTermForLack.Except(existingShortTermForLack, e => e.id).ToList<ShortTermForLack>();
                //3- Find deleted 
                var deletedShortTermForLack = existingShortTermForLack.Except(updatedShortTermForLack, e => e.id).ToList<ShortTermForLack>();
                //4- Find modified
                var modifiedShortTermForLack = updatedShortTermForLack.Except(addedShortTermForLack, e => e.id).ToList<ShortTermForLack>();
                //5- Mark all added entity state to Added
                foreach (ShortTermForLack shortTermForLack in addedShortTermForLack)
                {
                    databaseContext.Entry(shortTermForLack).State = System.Data.Entity.EntityState.Added;
                    foreach (LackMonths lackMonths in shortTermForLack.LackMonths)
                    {
                        databaseContext.Entry(lackMonths).State = System.Data.Entity.EntityState.Added;
                    }
                }
                //6- Mark all deleted entity state to Deleted
                foreach (ShortTermForLack shortTermForLack in deletedShortTermForLack)
                {

                    databaseContext.Entry(shortTermForLack).State = System.Data.Entity.EntityState.Deleted;

                    shortTermForLack.LackMonths = databaseContext.LackMonths.Where(e => e.shortTermForLackId == shortTermForLack.id).ToList() ;

                    foreach (LackMonths l in shortTermForLack.LackMonths)
                    {
                        databaseContext.Entry(l).State = System.Data.Entity.EntityState.Deleted;
                    }

                }
                //7- Apply modified current property values to existing property values
                foreach (ShortTermForLack shortTermForLack in modifiedShortTermForLack)
                {
                    //8- Find existing by id
                    var existing = databaseContext.ShortTermForLack.Include(e => e.LackMonths).Single(e => e.id == shortTermForLack.id);
                    if (existing != null)
                    {
                        var Entry = databaseContext.Entry(existing);
                        Entry.CurrentValues.SetValues(shortTermForLack);
                    }

                    var existingLackMonths = existing.LackMonths;
                    var updatedLackMonths = shortTermForLack.LackMonths;
                    //2- Find newly added 
                    var addedLackMonths = updatedLackMonths.Except(existingLackMonths, e => e.id).ToList<LackMonths>();
                    //3- Find deleted 
                    var deletedLackMonths = existingLackMonths.Except(updatedLackMonths, e => e.id).ToList<LackMonths>();
                    //4- Find modified
                    var modifiedLackMonths = updatedLackMonths.Except(addedLackMonths, e => e.id).ToList<LackMonths>();
                    //5- Mark all added entity state to Added
                    foreach (LackMonths lackMonths in addedLackMonths)
                    {
                        databaseContext.Entry(lackMonths).State = System.Data.Entity.EntityState.Added;
                    }
                    //6- Mark all deleted entity state to Deleted
                    foreach (LackMonths lackMonths in deletedLackMonths)
                    {
                        databaseContext.Entry(lackMonths).State = System.Data.Entity.EntityState.Deleted;
                    }
                    //7- Apply modified current property values to existing property values
                    foreach (LackMonths lackMonths in modifiedLackMonths)
                    {
                        var existing_lackMonths = databaseContext.LackMonths.Find(lackMonths.id);
                        if (existing_lackMonths != null)
                        {
                            var Entry = databaseContext.Entry(existing_lackMonths);
                            Entry.CurrentValues.SetValues(lackMonths);
                        }
                    }
                }
                databaseContext.SaveChanges();
            }
        }
        public void UpdateLog(string User)
        {
            if (BaseFarmer.Log.Count > 0)
            {
                using (var databaseContext = new DatabaseContext(ConnectionString))
                {

                    foreach (Log log in BaseFarmer.Log)
                    {
                        log.userName = User;
                        log.updateTime = DateTime.Now;
                        databaseContext.Entry(log).State = System.Data.Entity.EntityState.Added;
                    }

                    databaseContext.SaveChanges();
                }
            }  
        }

        public void UpdateLogViewer(string User) {

            if (BaseFarmer.Log.Count > 0) {

                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings[ConnectionString].ToString()))
                {
                    using (SqlCommand comm = new SqlCommand())
                    {
                        comm.Connection = conn;
                        conn.Open();

                        comm.CommandText = @"
                            IF NOT EXISTS(
                                SELECT * FROM agri_workforce_survey_user..LogViewer WHERE userName = @userName AND baseFarmerId = @baseFarmerId
                            )
                            BEGIN
                                INSERT INTO agri_workforce_survey_user..LogViewer(userName, baseFarmerId)
                                VALUES(@userName, @baseFarmerId)
                            END

                            UPDATE agri_workforce_survey_user..LogViewer SET
                            fullName = (
	                            SELECT FullName FROM agri_workforce_survey_user..UserInfoes 
	                            WHERE Id = (SELECT UserInfo_Id FROM agri_workforce_survey_user..AspNetUsers WHERE UserName = LogViewer.userName)
                            ),
                            farmerId = (
	                            SELECT farmerId FROM agri_workforce_survey..BaseFarmer
	                            WHERE id = LogViewer.baseFarmerId
                            ),
                            writeError = (
	                            SELECT TOP 1 writeErrorLength FROM agri_workforce_survey..Log
	                            WHERE updateTime = (SELECT MAX(updateTime) FROM agri_workforce_survey..Log WHERE baseFarmerId = LogViewer.baseFarmerId AND userName = LogViewer.userName)
                            ),
                            readError = (
	                            SELECT TOP 1 readErrorLength FROM agri_workforce_survey..Log
	                            WHERE updateTime = (SELECT MIN(updateTime) FROM agri_workforce_survey..Log WHERE baseFarmerId = LogViewer.baseFarmerId AND userName = LogViewer.userName)
                            ),
                            updateTime = (
                                SELECT MAX(updateTime) FROM agri_workforce_survey..Log WHERE baseFarmerId = LogViewer.baseFarmerId AND userName = LogViewer.userName
                            ),
                            quantity = (
                                SELECT Quantity FROM agri_workforce_survey_user..UserInfoes 
                                WHERE Id = (SELECT UserInfo_Id FROM agri_workforce_survey_user..AspNetUsers WHERE UserName = LogViewer.userName)
                            )
                            WHERE userName = @userName AND baseFarmerId = @baseFarmerId

                            UPDATE agri_workforce_survey_user..LogViewer SET
                            correct = readError - writeError
                            WHERE userName = @userName AND baseFarmerId = @baseFarmerId
                        ";

                        comm.Parameters.AddWithValue("@userName", User);
                        comm.Parameters.AddWithValue("@baseFarmerId", BaseFarmer.id);
                        comm.ExecuteNonQuery();
                    }
                }
            }           
        }

        public bool ImportFarmer()
        {
            using (var databaseContext = new DatabaseContext(ConnectionString))
            {
                databaseContext.Database.CommandTimeout = 180;

                if (!databaseContext.BaseFarmer.Any(e => e.farmerId == BaseFarmer.farmerId && e.page == BaseFarmer.page))
                {
                    databaseContext.BaseFarmer.Add(BaseFarmer);

                    databaseContext.SaveChanges();

                    return true;
                }
                else
                    return false;
            }
        }
        public void DeleteFarmer()
        {
            if (string.IsNullOrEmpty(BaseFarmer.farmerId))
                return;
            using (var databaseContext = new DatabaseContext(ConnectionString)) {
                //delete order: level3 => level2 => level1
                databaseContext.Database.ExecuteSqlCommand(@"                      
                    DELETE FROM numberworkers WHERE longtermforhireid IN (SELECT id FROM longtermforhire WHERE basefarmerid = @basefarmerid)
                    DELETE FROM numberworkers WHERE shorttermforhireid IN (SELECT id FROM shorttermforhire WHERE basefarmerid = @basefarmerid)
                    DELETE FROM lackmonths WHERE shorttermforlackid IN (SELECT id FROM shorttermforlack WHERE basefarmerid = @basefarmerid)
                    DELETE FROM worktype WHERE shorttermforhireid IN (SELECT id FROM shorttermforhire WHERE basefarmerid = @basefarmerid)

                    DELETE FROM farmerlandarea WHERE basefarmerid = @basefarmerid
                    DELETE FROM cropsituation WHERE basefarmerid = @basefarmerid
                    DELETE FROM animalmarketing WHERE basefarmerid = @basefarmerid
                    DELETE FROM allmarketing WHERE basefarmerid = @basefarmerid
                    DELETE FROM populationnumber WHERE basefarmerid = @basefarmerid
                    DELETE FROM population WHERE basefarmerid = @basefarmerid
                    DELETE FROM business WHERE basefarmerid = @basefarmerid
                    DELETE FROM longtermforhire WHERE basefarmerid = @basefarmerid
                    DELETE FROM shorttermforhire WHERE basefarmerid = @basefarmerid
                    DELETE FROM nosalaryforhire WHERE basefarmerid = @basefarmerid
                    DELETE FROM shorttermforlack WHERE basefarmerid = @basefarmerid
                    DELETE FROM longtermforlack WHERE basefarmerid = @basefarmerid

                    DELETE FROM basefarmer WHERE farmerid = @farmerid AND page = @page
                ", 
                new SqlParameter("@basefarmerid", BaseFarmer.id),
                new SqlParameter("@farmerid", BaseFarmer.farmerId),
                new SqlParameter("@page", BaseFarmer.page));
            }
        }
    }
}