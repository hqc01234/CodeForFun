using IdentityServer.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace IdentityServer.Extensions.ServiceCollections
{
    public static class IdentityServerExtension
    {
        public static IServiceCollection AddAppIdentityServer(this IServiceCollection services, IConfiguration configuration)
        {
            var migrationsAssembly = Assembly.GetExecutingAssembly().GetName().Name;
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;
            })
            .AddDeveloperSigningCredential()
            // This adds the config data from DB (clients, resources)
            .AddConfigurationStore(options =>
            {
                options.ConfigureDbContext = useSqlServer;
            })
            // This adds the operational data from DB (codes, tokens, consents)
            .AddOperationalStore(options =>
            {
                options.ConfigureDbContext = useSqlServer;

                // This enables automatic token cleanup. this is optional.
                options.EnableTokenCleanup = true;
                options.TokenCleanupInterval = 30;
            })
            .AddAspNetIdentity<User>();

            return services;

            void useSqlServer(DbContextOptionsBuilder builder)
            {
                builder.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(migrationsAssembly));
            }
        }
    }
}
