using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using testTypeScript.Models.Entities;
using testTypeScript.Service;
using testTypeScript.ShareComponent;
using testTypeScript.ShareComponent.Filter;

namespace testTypeScript.Controllers
{

    [Route("api/webs/M_CAR")]
    public class M_CARController  : ControllerBase
    {
        IM_Car_Service _CarService;
        IM_Car_Category_Service _Car_Category_Service;
        ResponseModel model = new ResponseModel();

        public M_CARController(IM_Car_Service service)
        {
            _CarService = service;
        }
        M_CARDTO dtoResponse = new M_CARDTO();

        [HttpPost]
        [Route("SetupViewForm")]
        public M_CARDTO SetupViewForm([FromBody] M_CARDTO dtoRequest)
        {
            var result = _CarService.SetupViewForm();
            dtoResponse.lstM_CAR = result.car;
            dtoResponse.lstM_CAR_CATEGORY = result.carcat;
            return dtoResponse;
        }

        [HttpPost]
        [Route("SearchData")]
        public M_CARDTO SearchData([FromBody] M_CARDTO dtoRequest)
        {
            var result = _CarService.Search_Data(dtoRequest?.Filter);

            dtoResponse.m_CARs = result;

            return dtoResponse;
        }

        [HttpPost]
        [Route("SetupAddNew")]
        public M_CARDTO SetupAddNew([FromBody] M_CARDTO dtoRequest)
        {
            var result = _CarService.SetupViewForm();
            dtoResponse.lstM_CAR_CATEGORY = result.carcat;
            return dtoResponse;
        }

        [HttpPost]
        [Route("Insert")]
        public M_CARDTO Insert([FromBody] M_CARDTO dtoRequest)
        {
            var item = dtoRequest.M_CAR;
            _CarService.AddNew(item);
            dtoResponse.caR_ID = item.CAR_ID;

            return dtoResponse;
        }

        [HttpPost]
        [Route("SetupEditForm")]
        public M_CARDTO SetupEditForm([FromBody] M_CARDTO dtoRequest)
        {

            var result = _CarService.GetCARDetailsById(dtoRequest.caR_ID.Value);
            dtoResponse.M_CAR = result;

            var result2 = _CarService.SetupViewForm();
            dtoResponse.lstM_CAR = result2.car;
            dtoResponse.lstM_CAR_CATEGORY = result2.carcat;
            return dtoResponse;
        }

        [HttpPost]
        [Route("Update")]
        public M_CARDTO Update([FromBody] M_CARDTO dtoRequest)
        {
            var item = dtoRequest.M_CAR;
            _CarService.Update(item);

            return dtoResponse;
        }

        [HttpPost]
        [Route("Delete")]
        public M_CARDTO Delete([FromBody] M_CARDTO dtoRequest)
        {
            _CarService.DeleteCAR(dtoRequest.M_CAR);
            return dtoResponse;
        }

        [HttpPost]
        [Route("Detail")]
        public M_CARDTO Detail([FromBody] M_CARDTO dtoRequest)
        {
            var result = _CarService.GetCARDetailsById(dtoRequest.caR_ID.Value);

            dtoResponse.M_CAR = result;
            return dtoResponse;
        }


        public class M_CARDTO
        {
            public int? caR_ID { get; set; }
            public int? CAR_CAT_ID { get; set; }
            public M_CAR M_CAR { get; set; }
            public List<M_CAR> lstM_CAR { get; set; }
            public List<M_CAR> m_CARs { get; set; }
            public List<M_CAR_CATEGORY> lstM_CAR_CATEGORY { get; set; }
            public M_CarFilter? Filter { get; set; }

        }

        public class ApiActionCode
        {
            // More Action here
        }
    }

}
