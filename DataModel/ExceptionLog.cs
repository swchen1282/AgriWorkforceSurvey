namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ExceptionLog")]
    public partial class ExceptionLog
    {
        public int id { get; set; }

        [Required]
        [StringLength(256)]
        public string userName { get; set; }

        public string name { get; set; }

        public string message { get; set; }

        public string selfDefine { get; set; }

        public string source { get; set; }

        public DateTime? createTime { get; set; }
    }
}
