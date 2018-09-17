using IdentityServer.Configurations;
using IdentityServer.SeedData.Contracts;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using System.Linq;

namespace IdentityServer.SeedData
{
    public class IdentityServerDbInitializer : IIdentityServerDbInitializer
    {
        private readonly ConfigurationDbContext _configDbContext;

        public IdentityServerDbInitializer(ConfigurationDbContext configDbContext)
        {
            _configDbContext = configDbContext;
        }

        public void Initialize()
        {
            if (!_configDbContext.Clients.Any())
            {
                foreach (var client in IdentityServerConfiguration.GetClients().ToList())
                {
                    _configDbContext.Clients.Add(client.ToEntity());
                }
                _configDbContext.SaveChanges();
            }


            if (!_configDbContext.IdentityResources.Any())
            {
                foreach (var resource in IdentityServerConfiguration.GetIdentityResources().ToList())
                {
                    _configDbContext.IdentityResources.Add(resource.ToEntity());
                }
                _configDbContext.SaveChanges();
            }

            if (!_configDbContext.ApiResources.Any())
            {
                foreach (var resource in IdentityServerConfiguration.GetApiResources().ToList())
                {
                    _configDbContext.ApiResources.Add(resource.ToEntity());
                }
                _configDbContext.SaveChanges();
            }
        }
    }
}
