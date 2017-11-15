namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NoSalaryForHire")]
    public partial class NoSalaryForHire
    {
        public int id { get; set; }

        public int? baseFarmerId { get; set; }

        public int? month { get; set; }

        public int? numberOfPeople { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }
    }
}
