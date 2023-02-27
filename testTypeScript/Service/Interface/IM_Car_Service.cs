using System.Collections.Generic;
using testTypeScript.Models.Entities;
using testTypeScript.ShareComponent;
using testTypeScript.ShareComponent.Filter;

namespace testTypeScript.Service.Interface
{
    public interface IM_Car_Service
    {
        /// <summary>
        /// get list of all CAR
        /// </summary>
        /// <returns></returns>
        (List<M_CAR> car, List<M_CAR_CATEGORY> carcat) SetupViewForm();

        /// <summary>
        /// get list of all CAR where
        /// </summary>
        /// <returns></returns>
        List<M_CAR> Search_Data(M_CarFilter Filter);

        /// <summary>
        /// get CAR details by CAR id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        M_CAR GetCARDetailsById(int? id);

        /// <summary>
        /// edit CAR
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        void AddNew(M_CAR item);

        /// <summary>
        /// add CAR
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        void Update(M_CAR item);


        /// <summary>
        /// delete CAR
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        void DeleteCAR(M_CAR item);
    }
}
