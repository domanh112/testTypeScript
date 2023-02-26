using Microsoft.EntityFrameworkCore;
using testTypeScript.Models.Entities;

namespace testTypeScript.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<M_CAR> M_CAR { get; set; }
        public DbSet<M_CAR_CATEGORY> M_CAR_CATEGORY { get; set; }
        public DbSet<M_SERVICE_ORDER> M_SERVICE_ORDER { get; set; }
        public DbSet<M_STATUS> M_STATUS { get; set; }
        public DbSet<M_TIME_CATEGORY> M_TIME_CATEGORY { get; set; }
    }
}
