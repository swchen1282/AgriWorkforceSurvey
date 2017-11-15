namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class LackMonths
    {
        public int id { get; set; }

        public int? shortTermForLackId { get; set; }

        public int? month { get; set; }

        public virtual ShortTermForLack ShortTermForLack { get; set; }
    }
}
