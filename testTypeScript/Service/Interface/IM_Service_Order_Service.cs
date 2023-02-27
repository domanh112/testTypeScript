using System.Collections.Generic;
using testTypeScript.Models.Entities;
using testTypeScript.ShareComponent;

namespace testTypeScript.Service.Interface
{
    public interface IM_Service_Order_Service
    {
        /// <summary>
        /// get list of all Service_Order
        /// </summary>
        /// <returns></returns>
        List<M_SERVICE_ORDER> GetService_OrderList();

        /// <summary>
        /// get Service_Order details by Service_Order id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        M_SERVICE_ORDER GetService_OrderDetailsById(int? id);

        /// <summary>
        ///  add edit Service_Order
        /// </summary>
        /// <param name="Service_OrderModel"></param>
        /// <returns></returns>
        ResponseModel SaveService_Order(M_SERVICE_ORDER Service_OrderModel);


        /// <summary>
        /// delete Service_Order
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ResponseModel DeleteService_Order(int id);
    }
}
