using Microsoft.Data.SqlClient;
using System;
using System.ComponentModel.DataAnnotations;
using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace testTypeScript.Models.Entities
{
    public class M_CAR_CATEGORY 
    {

        [Key]
        public int CAR_CATEGORY_ID { get; set; }
        [Required]
        public string NAME { get; set; }
        [AllowNull]
        public string DESCRIPTION { get; set; }
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


    }
}
