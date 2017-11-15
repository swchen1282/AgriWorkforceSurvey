namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class NumberWorkers
    {
        public int id { get; set; }

        public int? longTermForHireId { get; set; }

        public int? shortTermForHireId { get; set; }

        public int? ageScopeId { get; set; }

        public int? value { get; set; }

        public virtual AgeScope AgeScope { get; set; }

        public virtual LongTermForHire LongTermForHire { get; set; }

        public virtual ShortTermForHire ShortTermForHire { get; set; }
    }
}
