using IdentityServer.SeedData;
using IdentityServer.SeedData.Contracts;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityServer.Extensions.ServiceCollections
{
    public static class AppDIRegister
    {
        public static IServiceCollection RegisterDI(this IServiceCollection services)
        {
            services.AddTransient<IAspNetIdentityDbInitializer, AspNetIdentityDbInitializer>();
            services.AddTransient<IIdentityServerDbInitializer, IdentityServerDbInitializer>();

            return services;
        }
    }
}
