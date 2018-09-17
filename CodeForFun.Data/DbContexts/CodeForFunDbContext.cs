using CodeForFun.Data.Extensions;
using Microsoft.EntityFrameworkCore;

namespace CodeForFun.Data.DbContexts
{
    public class CodeForFunDbContext : DbContext
    {
        public CodeForFunDbContext(DbContextOptions<CodeForFunDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.AddEntityConfigurationsFromAssembly();
        }
    }
}
