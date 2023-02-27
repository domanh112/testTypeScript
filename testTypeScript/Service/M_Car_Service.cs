using System;
using System.Collections.Generic;
using System.Linq;
using testTypeScript.Models;
using testTypeScript.Models.Entities;
using testTypeScript.Service.FluentValidation;
using testTypeScript.Service.Interface;
using testTypeScript.ShareComponent;
using testTypeScript.ShareComponent.Filter;

namespace testTypeScript.Service
{
    public class M_Car_Service : IM_Car_Service
    {
        private DataContext _context;
        public M_Car_Service(DataContext context)
        {
            _context = context;
        }
        public M_CAR GetCARDetailsById(int? id)
        {
            try
            {

                var CAR =
                        from car in _context.M_CAR
                        join carcat in _context.M_CAR_CATEGORY on car.CATEGORY_ID equals carcat.CAR_CATEGORY_ID
                        where car.CATEGORY_ID == carcat.CAR_CATEGORY_ID && car.DELETED == SMX.Is_Not_Deleted
                        where car.CAR_ID == id
                        select new M_CAR
                        {
                            CAR_ID = car.CAR_ID,
                            CATEGORY_NAME = carcat.NAME,
                            COLOR = car.COLOR,
                            CREATED_BY = car.CREATED_BY,
                            DESCRIPTION = car.DESCRIPTION,
                            PLATE_NUMBER = car.PLATE_NUMBER,
                            PRICE = car.PRICE,
                            URL = car.URL,
                            CREATED_DTG = car.CREATED_DTG,
                            CATEGORY_ID = car.CATEGORY_ID,
                            VERSION = car.VERSION,
                            DELETED = car.DELETED,
                            UPDATED_BY = car.UPDATED_BY,
                            UPDATED_DTG = car.UPDATED_DTG,
                        };
                M_CAR M_CAR = CAR.FirstOrDefault<M_CAR>();

                return M_CAR;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<M_CAR> Search_Data(M_CarFilter Filter)
        {
            try
            {
                var M_CARs =
                        from car in _context.M_CAR
                        join carcat in _context.M_CAR_CATEGORY on car.CATEGORY_ID equals carcat.CAR_CATEGORY_ID
                        where car.CATEGORY_ID == carcat.CAR_CATEGORY_ID && car.DELETED == SMX.Is_Not_Deleted
                        && (car.CAR_ID == ((Filter.CAR_ID == 0 || !Filter.CAR_ID.HasValue) ? car.CAR_ID : Filter.CAR_ID))
                        && (car.CATEGORY_ID == ((Filter.CAR_CATEGORY_ID == 0 || !Filter.CAR_CATEGORY_ID.HasValue) ? car.CATEGORY_ID : Filter.CAR_CATEGORY_ID))
                        select new M_CAR
                        {
                            CAR_ID = car.CAR_ID,
                            CATEGORY_NAME = carcat.NAME,
                            COLOR = car.COLOR,
                            CREATED_BY = car.CREATED_BY,
                            DESCRIPTION = car.DESCRIPTION,
                            PLATE_NUMBER = car.PLATE_NUMBER,
                            PRICE = car.PRICE,
                            URL = car.URL,
                            CREATED_DTG = car.CREATED_DTG,
                            CATEGORY_ID = car.CATEGORY_ID,

                        };
                return M_CARs.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public (List<M_CAR> car, List<M_CAR_CATEGORY> carcat) SetupViewForm()
        {

            try
            {
                var M_CARs = _context.Set<M_CAR>().ToList();
                M_CARs.Where(x => x.DELETED == SMX.Is_Not_Deleted);

                var M_CAR_CATEGORYs = _context.Set<M_CAR_CATEGORY>().ToList();
                M_CAR_CATEGORYs.Where(x => x.DELETED == SMX.Is_Not_Deleted);
                return (M_CARs, M_CAR_CATEGORYs);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ResponseModel SaveCAR(M_CAR CARModel)
        {
            ResponseModel model = new ResponseModel();
            try
            {
                M_CAR item = GetCARDetailsById(CARModel.CAR_ID);
                if (item != null)
                {
                    item.CATEGORY_ID = CARModel.CATEGORY_ID;
                    item.COLOR = CARModel.COLOR;
                    item.PLATE_NUMBER = CARModel.PLATE_NUMBER;
                    item.PRICE = CARModel.PRICE;
                    item.DESCRIPTION = CARModel.DESCRIPTION;
                    item.UPDATED_BY = SMX.User;
                    item.UPDATED_DTG = DateTime.Now;

                    _context.Update<M_CAR>(item);
                    model.Messsage = "CAR Update Successfully";
                }
                else
                {
                    CARModel.DELETED = SMX.Is_Not_Deleted;
                    CARModel.VERSION = SMX.First_Version;
                    CARModel.CREATED_BY = SMX.User;
                    CARModel.CREATED_DTG = DateTime.Now;
                    _context.Add<M_CAR>(CARModel);
                    model.Messsage = "CAR Inserted Successfully";
                }
                _context.SaveChanges();
                model.IsSuccess = true;
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.Messsage = "Error : " + ex.Message;
            }
            return model;
        }
        public void DeleteCAR(M_CAR item)
        {
            if (item != null)
            {
                item.DELETED = SMX.Is_Deleted;
                item.UPDATED_BY = SMX.User;
                item.UPDATED_DTG = DateTime.Now;
                _context.Update<M_CAR>(item);
                _context.SaveChanges();
            }
        }

        public void AddNew(M_CAR item)
        {
            M_CarValidator validations = new M_CarValidator();
            var result = validations.Validate(item);
            var errorMessages = result.Errors.Select(x => x.ErrorMessage).ToList();
            try
            {
                if (item != null)
                {
                    item.DELETED = SMX.Is_Not_Deleted;
                    item.VERSION = SMX.First_Version;
                    item.CREATED_BY = SMX.User;
                    item.CREATED_DTG = DateTime.Now;
                    _context.Add<M_CAR>(item);
                    _context.SaveChanges();
                }
            }
            catch
            {
                throw new SMXException(errorMessages);
            }
        }

        public void Update(M_CAR item)
        {
            M_CAR car = GetCARDetailsById(item.CAR_ID);
            if (item != null)
            {
                item.VERSION = car.VERSION + 1;
                item.UPDATED_BY = SMX.User;
                item.UPDATED_DTG = DateTime.Now;

                _context.Update<M_CAR>(item);
                _context.SaveChanges();
            }
            else
            {
                throw new NotImplementedException();
            }
        }
    }
}
