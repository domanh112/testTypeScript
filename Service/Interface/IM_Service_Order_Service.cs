using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    internal interface IM_Service_Order_Service
    {
        /// <summary>
        /// get list of all M_Service_Order
        /// </summary>
        /// <returns></returns>
        List<M_SERVICE_ORDER> GetM_Service_OrderList();

        /// <summary>
        /// get employee details by employee id
        /// </summary>
        /// <param name="empId"></param>
        /// <returns></returns>
        M_Service_Order GetEmployeeDetailsById(int empId);

        /// <summary>
        ///  add edit employee
        /// </summary>
        /// <param name="employeeModel"></param>
        /// <returns></returns>
        ResponseModel SaveEmployee(M_Service_Order employeeModel);


        /// <summary>
        /// delete M_Service_Order
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        ResponseModel DeleteEmployee(int employeeId);
    }
}
