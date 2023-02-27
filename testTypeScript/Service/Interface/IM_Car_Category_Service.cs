using System.Collections.Generic;
using testTypeScript.Models.Entities;
using testTypeScript.ShareComponent;

namespace testTypeScript.Service.Interface
{
    public interface IM_Car_Category_Service
    {
        /// <summary>
        /// get list of all CAR
        /// </summary>
        /// <returns></returns>
        List<M_CAR_CATEGORY> GetCAR_CATEGORYList();

    }
}
