namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BaseFarmer")]
    public partial class BaseFarmer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public BaseFarmer()
        {
            AllMarketing = new HashSet<AllMarketing>();
            AnimalMarketing = new HashSet<AnimalMarketing>();
            Business = new HashSet<Business>();
            CropSituation = new HashSet<CropSituation>();
            FarmerLandArea = new HashSet<FarmerLandArea>();
            Log = new HashSet<Log>();
            LongTermForHire = new HashSet<LongTermForHire>();
            LongTermForLack = new HashSet<LongTermForLack>();
            NoSalaryForHire = new HashSet<NoSalaryForHire>();
            Population = new HashSet<Population>();
            PopulationNumber = new HashSet<PopulationNumber>();
            ShortTermForHire = new HashSet<ShortTermForHire>();
            ShortTermForLack = new HashSet<ShortTermForLack>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(12)]
        public string farmerId { get; set; }

        public int? totalpage { get; set; }

        public int page { get; set; }

        [StringLength(10)]
        public string phone { get; set; }

        [StringLength(1)]
        public string addressMatchList { get; set; }

        public int? experienceYearsId { get; set; }

        [StringLength(1)]
        public string isHire { get; set; }

        [StringLength(8)]
        public string investigatorCode { get; set; }

        [Column(TypeName = "date")]
        public DateTime? date { get; set; }

        public int? duringTime { get; set; }

        public int? distanceKM { get; set; }

        public int? lackId { get; set; }

        public string note { get; set; }

        public DateTime? createTime { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AllMarketing> AllMarketing { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AnimalMarketing> AnimalMarketing { get; set; }

        public virtual ExperienceYears ExperienceYears { get; set; }

        public virtual Lack Lack { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Business> Business { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CropSituation> CropSituation { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FarmerLandArea> FarmerLandArea { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Log> Log { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LongTermForHire> LongTermForHire { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LongTermForLack> LongTermForLack { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NoSalaryForHire> NoSalaryForHire { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Population> Population { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PopulationNumber> PopulationNumber { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ShortTermForHire> ShortTermForHire { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ShortTermForLack> ShortTermForLack { get; set; }
    }
}
