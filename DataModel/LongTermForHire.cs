namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LongTermForHire")]
    public partial class LongTermForHire
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public LongTermForHire()
        {
            NumberWorkers = new HashSet<NumberWorkers>();
        }

        public int id { get; set; }

        public int? baseFarmerId { get; set; }

        public int? workerTypeCodeId { get; set; }

        public int? avgSalary { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }

        public virtual WorkerTypeCode WorkerTypeCode { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NumberWorkers> NumberWorkers { get; set; }
    }
}
