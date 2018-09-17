using CodeForFun.Configurations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CodeForFun.Extensions.ServiceCollections
{
    public static class AppOptionsExtension
    {
        public static IServiceCollection AddAppOptions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions();
            services.Configure<AppSettings>(configuration.GetSection("AppSettings"));

            return services;
        }
    }
}
