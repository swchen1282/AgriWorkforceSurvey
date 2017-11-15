namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ShortTermForHire")]
    public partial class ShortTermForHire
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ShortTermForHire()
        {
            NumberWorkers = new HashSet<NumberWorkers>();
            WorkType = new HashSet<WorkType>();
        }

        public int id { get; set; }

        public int? baseFarmerId { get; set; }

        public int? month { get; set; }

        public int? avgSalaryForEveryday { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NumberWorkers> NumberWorkers { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WorkType> WorkType { get; set; }
    }
}
