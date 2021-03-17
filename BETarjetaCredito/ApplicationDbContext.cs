using BETarjetaCredito.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BETarjetaCredito
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<TarjetaCredito> TarjetasCredito { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {

        }
    }
}
