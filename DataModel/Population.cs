namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Population")]
    public partial class Population
    {
        public int id { get; set; }

        public int? baseFarmerId { get; set; }

        public int? relationshipCodeId { get; set; }

        [StringLength(50)]
        public string sex { get; set; }

        public int? birthYear { get; set; }

        public int? educationLevelCodeId { get; set; }

        public int? farmerWorkDayId { get; set; }

        public int? lifeStyleCodeId { get; set; }

        public int? otherFarmWorkCodeId { get; set; }

        public virtual BaseFarmer BaseFarmer { get; set; }

        public virtual EducationLevelCode EducationLevelCode { get; set; }

        public virtual FarmerWorkDay FarmerWorkDay { get; set; }

        public virtual LifeStyleCode LifeStyleCode { get; set; }

        public virtual OtherFarmWorkCode OtherFarmWorkCode { get; set; }

        public virtual RelationshipCode RelationshipCode { get; set; }
    }
}
