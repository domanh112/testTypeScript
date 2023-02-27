using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace testTypeScript.Models.Entities
{
    public class M_CAR
    {
        [Key]
        public int CAR_ID { get; set; }
        [Required]
        public int CATEGORY_ID { get; set; }
        [AllowNull]
        public string COLOR { get; set; }
        [AllowNull]
        [MaxLength(256)]
        public string DESCRIPTION { get; set; }
        [AllowNull]
        public string URL { get; set; }
        [Required]
        [MaxLength(10)]
        public string PLATE_NUMBER { get; set; }
        [Required]
        public int PRICE { get; set; }
        [Required]
        public int DELETED { get; set; }
        [Required]
        public int VERSION { get; set; }
        [AllowNull]
        public string CREATED_BY { get; set; }
        [AllowNull]
        public DateTime CREATED_DTG { get; set; }
        [AllowNull]
        public string UPDATED_BY { get; set; }
        [AllowNull]
        public DateTime UPDATED_DTG { get; set; }

        //Extend
        [AllowNull]
        public string CATEGORY_NAME { get; set; }


    }
}
