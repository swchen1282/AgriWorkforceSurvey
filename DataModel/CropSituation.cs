namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CropSituation")]
    public partial class CropSituation
    {
        public int id { get; set; }

        public int? baseFarmerId { get; set; }

        public int? productCodeId { get; set; }

        public int? salesRatio { get; set; }

        public int? facilityCodeId { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }

        public virtual ProductCode ProductCode { get; set; }

        public virtual FacilityCode FacilityCode { get; set; }
    }
}
