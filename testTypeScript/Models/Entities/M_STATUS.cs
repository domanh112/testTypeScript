using System;
using System.ComponentModel.DataAnnotations;

namespace testTypeScript.Models.Entities
{
    public class M_STATUS
    {
        [Key]
        public int STATUS_CODE { get; set; }
        [Required]
        [MaxLength(50)]
        public string STATUS_NAME { get; set; }
        [MaxLength(256)]
        public string DESCRIPTION { get; set; }
        [Required]
        public int DELETED { get; set; }
        [Required]
        public int VERSION { get; set; }
        public string CREATED_BY { get; set; }
        public DateTime CREATED_DTG { get; set; }
        public string UPDATED_BY { get; set; }
        public DateTime UPDATED_DTG { get; set; }
    }
}
