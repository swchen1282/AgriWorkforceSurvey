namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("AnimalMarketing")]
    public partial class AnimalMarketing
    {
        public int id { get; set; }

        public int? baseFarmerId { get; set; }

        public int? productCodeId { get; set; }

        public int? marketingRatio { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }

        public virtual ProductCode ProductCode { get; set; }
    }
}
