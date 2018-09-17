using IdentityServer.Extensions.ServiceCollections;
using IdentityServer.SeedData.Contracts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityServer
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _environment;

        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddAspNetIdentity(_configuration);

            services.AddCustomIdentityServer(_configuration);

            services.AddHttpsRedirection(options => options.HttpsPort = 5003);

            services.RegisterDI();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
            IAspNetIdentityDbInitializer aspNetIdentityDbInitializer,
            IIdentityServerDbInitializer identityServerDbInitializer
        )
        {
            aspNetIdentityDbInitializer.Initialize();
            identityServerDbInitializer.Initialize();

            if (_environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseIdentityServer();
            app.UseMvcWithDefaultRoute();
        }
    }
}
