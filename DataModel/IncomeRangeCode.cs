namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IncomeRangeCode")]
    public partial class IncomeRangeCode
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public IncomeRangeCode()
        {
            AllMarketing = new HashSet<AllMarketing>();
        }

        public int id { get; set; }

        [StringLength(20)]
        public string name { get; set; }

        public int? min { get; set; }

        public int? max { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AllMarketing> AllMarketing { get; set; }
    }
}
