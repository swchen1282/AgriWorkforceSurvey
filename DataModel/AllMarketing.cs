namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("AllMarketing")]
    public partial class AllMarketing
    {
        public int id { get; set; }

        public int? baseFarmerId { get; set; }

        public int? marketTypeId { get; set; }

        public int? incomeRangeCodeId { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }

        public virtual IncomeRangeCode IncomeRangeCode { get; set; }

        public virtual MarketType MarketType { get; set; }
    }
}
