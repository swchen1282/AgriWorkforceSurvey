namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ProductCode")]
    public partial class ProductCode
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ProductCode()
        {
            AnimalMarketing = new HashSet<AnimalMarketing>();
            CropSituation = new HashSet<CropSituation>();
            ShortTermForLack = new HashSet<ShortTermForLack>();
        }

        public int id { get; set; }

        [StringLength(3)]
        public string code { get; set; }

        [StringLength(50)]
        public string name { get; set; }

        [StringLength(20)]
        public string type { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AnimalMarketing> AnimalMarketing { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CropSituation> CropSituation { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ShortTermForLack> ShortTermForLack { get; set; }
    }
}
