using CodeForFun.Data.DbContexts;
using CodeForFun.Data.Repositories;
using CodeForFun.Data.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CodeForFun.Data.Extensions
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddDataModule(this IServiceCollection services, IConfiguration configuration)
        {
            // Configure DbContext
            services.AddDbContext<CodeForFunDbContext>(options =>
            {
                options.UseSqlServer(GetConnectionString());
            });

            // Repository
            services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
            services.AddScoped(typeof(IRepository<,>), typeof(BaseRepository<,,>));

            return services;

            string GetConnectionString() => configuration.GetConnectionString("DefaultConnection");
        }
    }
}
