namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Business")]
    public partial class Business
    {
        public int id { get; set; }

        public int? baseFarmerId { get; set; }

        public int? farmRelatedBusinessId { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }

        public virtual FarmRelatedBusiness FarmRelatedBusiness { get; set; }
    }
}
