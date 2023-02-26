using System;

namespace testTypeScript.ShareComponent.Filter
{
    public class M_CarFilter
    {
        public int? CAR_ID { get; set; }
        public int? CAR_CATEGORY_ID { get; set; }
        public int? CATEGORY_ID { get; set; }
        public string NAME { get; set; }
        public string COLOR { get; set; }
        public string DESCRIPTION { get; set; }
        public string PLATE_NUMBER { get; set; }
        public int? PRICE { get; set; }
        public DateTime? PLAN_START_DTG { get; set; }
        public DateTime? PLAN_END_DTG { get; set; }
    }
}
