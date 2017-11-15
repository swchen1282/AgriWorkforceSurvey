namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ShortTermForLack")]
    public partial class ShortTermForLack
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ShortTermForLack()
        {
            LackMonths = new HashSet<LackMonths>();
        }

        public int id { get; set; }

        public int? baseFarmerId { get; set; }

        public int? productCodeId { get; set; }

        public int? workerTypeCodeId { get; set; }

        public int? numberOfPeople { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LackMonths> LackMonths { get; set; }

        public virtual ProductCode ProductCode { get; set; }

        public virtual WorkerTypeCode WorkerTypeCode { get; set; }
    }
}
