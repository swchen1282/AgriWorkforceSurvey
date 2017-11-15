namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("WorkType")]
    public partial class WorkType
    {
        public int id { get; set; }

        public int? shortTermForHireId { get; set; }

        public int? workerTypeCodeId { get; set; }

        public virtual ShortTermForHire ShortTermForHire { get; set; }

        public virtual WorkerTypeCode WorkerTypeCode { get; set; }
    }
}
