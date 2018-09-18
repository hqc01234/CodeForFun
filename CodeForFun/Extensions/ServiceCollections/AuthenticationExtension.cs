using CodeForFun.Configurations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace CodeForFun.Extensions.ServiceCollections
{
    public static class AuthenticationExtension
    {
        public static IServiceCollection AddAppAuthentication(this IServiceCollection services, AppSettings appSettings)
        {
            services.AddAuthentication(option =>
            {
                option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddIdentityServerAuthentication(options =>
            {
                options.Authority = appSettings.AuthorityIssuer;
                options.ApiName = appSettings.ApiName;
                options.RequireHttpsMetadata = true;
            });

            return services;
        }
    }
}
