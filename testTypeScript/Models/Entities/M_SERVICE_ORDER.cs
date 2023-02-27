using System;
using System.ComponentModel.DataAnnotations;

namespace testTypeScript.Models.Entities
{
    public class M_SERVICE_ORDER
    {
        [Key]
        public int ORDER_ID { get; set; }
        [Required]
        public int CAR_ID { get; set; }
        [Required]
        public int TIME_CATEGORY { get; set; }
        [Required]
        public int ORDER_DURATION { get; set; }
        [Required]
        public DateTime PLAN_START_DTG { get; set; }
        [Required]
        public DateTime PLAN_END_DTG { get; set; }
        public DateTime ACTUAL_START_DTG { get; set; }
        public DateTime ACTUAL_END_DTG { get; set; }
        [Required]
        [MaxLength(128)]
        public string CUSTOMER_NAME { get; set; }
        [MaxLength(256)]
        public string DESCRIPTION { get; set; }
        [Required]
        public int STATUS { get; set; }
        [Required]
        public int DELETED { get; set; }
        [Required]
        public int VERSION { get; set; }
        public string CREATED_BY { get; set; }
        public DateTime CREATED_DTG { get; set; }
        public string UPDATED_BY { get; set; }
        public DateTime UPDATED_DTG { get; set; }

        //extend

        public string URL { get; set; }
        public string PLATE_NUMBER { get; set; }
        public int PRICE { get; set; }
    }
}
