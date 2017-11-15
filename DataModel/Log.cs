namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Log")]
    public partial class Log
    {
        public int id { get; set; }

        [StringLength(256)]
        public string userName { get; set; }

        public int? baseFarmerId { get; set; }

        public int? readErrorLength { get; set; }

        public int? writeErrorLength { get; set; }

        public DateTime? updateTime { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }
    }
}
