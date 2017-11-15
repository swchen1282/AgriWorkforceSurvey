namespace COAWebService.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("FarmRelatedBusiness")]
    public partial class FarmRelatedBusiness
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public FarmRelatedBusiness()
        {
            Business = new HashSet<Business>();
        }

        public int id { get; set; }

        [StringLength(30)]
        public string name { get; set; }

        [StringLength(1)]
        public string hasBusiness { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Business> Business { get; set; }
    }
}
