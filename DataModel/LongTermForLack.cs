namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LongTermForLack")]
    public partial class LongTermForLack
    {
        public int id { get; set; }

        public int? baseFarmerId { get; set; }

        public int? workerTypeCodeId { get; set; }

        public int? numberOfPeople { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }

        public virtual WorkerTypeCode WorkerTypeCode { get; set; }
    }
}
