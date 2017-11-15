namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PopulationNumber")]
    public partial class PopulationNumber
    {
        public int id { get; set; }

        public int? baseFarmerId { get; set; }

        public int? under15Men { get; set; }

        public int? under15Women { get; set; }

        public int? over15Men { get; set; }

        public int? over15Women { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }
    }
}
