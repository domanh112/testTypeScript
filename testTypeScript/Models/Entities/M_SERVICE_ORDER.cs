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
        public int ORDER_DURATION { get; set; }
        public DateTime PLAN_START_DTG { get; set; }
        public DateTime PLAN_END_DTG { get; set; }
        public DateTime ACTUAL_START_DTG { get; set; }
        public DateTime ACTUAL_END_DTG { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string DESCRIPTION { get; set; }
        public int STATUS { get; set; }
        public string URL { get; set; }
        public string PLATE_NUMBER { get; set; }
        public int PRICE { get; set; }
        public int DELETED { get; set; }
        public int VERSION { get; set; }
        public string CREATED_BY { get; set; }
        public DateTime CREATED_DTG { get; set; }
        public string UPDATED_BY { get; set; }
        public DateTime UPDATED_DTG { get; set; }
    }
}
