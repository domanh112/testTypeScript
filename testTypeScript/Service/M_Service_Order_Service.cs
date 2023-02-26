

using System;
using System.Collections.Generic;
using System.Linq;
using testTypeScript.Models;
using testTypeScript.Models.Entities;
using testTypeScript.ShareComponent;

namespace testTypeScript.Service
{
    public class M_Service_Order_Service : IM_Service_Order_Service
    {
        private DataContext _context;
        public M_Service_Order_Service(DataContext context)
        {
            _context = context;
        }

        public List<M_SERVICE_ORDER> GetService_OrderList()
        {
            List<M_SERVICE_ORDER> M_SERVICE_ORDERs;
            try
            {
                M_SERVICE_ORDERs = _context.Set<M_SERVICE_ORDER>().ToList();
                var result = M_SERVICE_ORDERs.Where(x => x.DELETED == SMX.Is_Not_Deleted);
                return result.ToList();
            }
            catch (Exception)
            {
                throw new NotImplementedException();
            }
            //
        }

        public M_SERVICE_ORDER GetService_OrderDetailsById(int? id)
        {
            M_SERVICE_ORDER CAR;
            try
            {
                CAR = _context.Find<M_SERVICE_ORDER>(id);
                if (CAR?.DELETED != SMX.Is_Deleted && id != 0)
                {
                    return CAR;
                }
            }
            catch (Exception)
            {
                throw new NotImplementedException();
            }
            return null;
        }

        public ResponseModel SaveService_Order(M_SERVICE_ORDER Service_OrderModel)
        {
            ResponseModel model = new ResponseModel();
            try
            {
                M_SERVICE_ORDER item = GetService_OrderDetailsById(Service_OrderModel.CAR_ID);
                if (item != null)
                {
                    item.CAR_ID = Service_OrderModel.CAR_ID;
                    item.PLATE_NUMBER = Service_OrderModel.PLATE_NUMBER;
                    item.CUSTOMER_NAME = Service_OrderModel.CUSTOMER_NAME;
                    item.ORDER_DURATION = Service_OrderModel.ORDER_DURATION;
                    item.TIME_CATEGORY = Service_OrderModel.TIME_CATEGORY;
                    item.PRICE = Service_OrderModel.PRICE;
                    item.DESCRIPTION = Service_OrderModel.DESCRIPTION;
                    item.PLAN_START_DTG = Service_OrderModel.PLAN_START_DTG;
                    item.PLAN_END_DTG = Service_OrderModel.PLAN_END_DTG;
                    item.URL = Service_OrderModel.URL;
                    item.STATUS = Service_OrderModel.STATUS;
                    item.UPDATED_BY = SMX.User;
                    item.UPDATED_DTG = DateTime.Now;

                    _context.Update<M_SERVICE_ORDER>(item);
                    model.Messsage = "M_SERVICE_ORDER Update Successfully";
                }
                else
                {
                    Service_OrderModel.DELETED = SMX.Is_Not_Deleted;
                    Service_OrderModel.VERSION = SMX.First_Version;
                    Service_OrderModel.CREATED_BY = SMX.User;
                    Service_OrderModel.CREATED_DTG = DateTime.Now;
                    _context.Add<M_SERVICE_ORDER>(Service_OrderModel);
                    model.Messsage = "M_SERVICE_ORDER Inserted Successfully";
                }
                _context.SaveChanges();
                model.IsSuccess = true;
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.Messsage = "Error : " + ex.Message;
                throw new NotImplementedException();
            }
            return model;

        }

        public ResponseModel DeleteService_Order(int id)
        {
            ResponseModel model = new ResponseModel();
            try
            {
                M_SERVICE_ORDER item = GetService_OrderDetailsById(id);
                if (item != null)
                {
                    //_context.Remove<CAR>(item);
                    item.DELETED = SMX.Is_Deleted;

                    _context.Update<M_SERVICE_ORDER>(item);
                    _context.SaveChanges();
                    model.IsSuccess = true;
                    model.Messsage = "M_SERVICE_ORDER Deleted Successfully";
                }
                else
                {
                    model.IsSuccess = false;
                    model.Messsage = "M_SERVICE_ORDER Not Found";
                }
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.Messsage = "Error : " + ex.Message;
                throw new NotImplementedException();
            }
            return model;

        }
    }
}
