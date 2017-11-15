using COAWebService.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace COAWebService.Builder
{
    public class FarmerListBuilder
    {
        public List<FarmerBuilder> FarmerList { get; set; }
        public List<int> Indexs { get; set; }
        public string FarmerId = string.Empty;
        public string ConnectionString = string.Empty;
        public void GetIndexs()
        {
            Indexs = new List<int>();            

            using (var databaseContext = new DatabaseContext(ConnectionString))
            {

                Indexs = databaseContext.BaseFarmer.Where(i => i.farmerId == FarmerId).Select(i => i.id).ToList();

            }
        }
        public void GetFarmerList() {

            FarmerList = new List<FarmerBuilder>();

            foreach (int index in Indexs) {

                FarmerBuilder builder = new FarmerBuilder();

                builder.ConnectionString = ConnectionString;               

                Director director = new Director();

                builder.index = index;

                director.BuildFarmer(builder);

                FarmerList.Add(builder);

            }      
        }
    }
}