using System;
using System.ComponentModel.DataAnnotations;

namespace testTypeScript.Models.Entities
{
    public class M_TIME_CATEGORY
    {
        [Key]
        public int TIME_CATEGORY_ID { get; set; }
        [Required]
        public string NAME { get; set; }
        public string DESCRIPTION { get; set; }
        public int DELETED { get; set; }
        public int VERSION { get; set; }
        public string CREATED_BY { get; set; }
        public DateTime CREATED_DTG { get; set; }
        public string UPDATED_BY { get; set; }
        public DateTime UPDATED_DTG { get; set; }
    }
}
