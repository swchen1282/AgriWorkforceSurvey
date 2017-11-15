namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("FarmerLandArea")]
    public partial class FarmerLandArea
    {
        public int id { get; set; }

        public int? baseFarmerId { get; set; }

        public int? farmerLandTypeId { get; set; }

        public int? farmerProductionTypeId { get; set; }

        public int? value { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }

        public virtual FarmerLandType FarmerLandType { get; set; }

        public virtual FarmerProductionType FarmerProductionType { get; set; }
    }
}
