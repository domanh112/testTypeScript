

using System;
using System.Collections.Generic;
using System.Linq;
using testTypeScript.Models;
using testTypeScript.Models.Entities;
using testTypeScript.ShareComponent;

namespace testTypeScript.Service
{
    public class M_Car_Category_Service : IM_Car_Category_Service
    {
        private DataContext _context;
        public M_Car_Category_Service(DataContext context)
        {
            _context = context;
        }

        public List<M_CAR_CATEGORY> GetCAR_CATEGORYList()
        {
            List<M_CAR_CATEGORY> M_CAR_CATEGORYs;
            try
            {
                M_CAR_CATEGORYs = _context.Set<M_CAR_CATEGORY>().ToList();
                M_CAR_CATEGORYs.Where(x => x.DELETED == SMX.Is_Not_Deleted);
                return M_CAR_CATEGORYs;
            }
            catch (Exception)
            {
                throw;
            }
            //throw new NotImplementedException();
        }
    }
}
