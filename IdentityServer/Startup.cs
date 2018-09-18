using IdentityServer.Configurations;
using IdentityServer.Extensions.ServiceCollections;
using IdentityServer.SeedData.Contracts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

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
            ServiceProvider serviceProvider = services.BuildServiceProvider();

            services.AddOptions();
            services.Configure<AppSettings>(_configuration.GetSection("AppSettings"));

            AppSettings appSettings = GetAppSettings();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddAspNetIdentity(_configuration);

            services.AddAppIdentityServer(_configuration);

            services.AddHttpsRedirection(options => options.HttpsPort = appSettings.HttpsPort);

            services.RegisterDI();

            AppSettings GetAppSettings() => serviceProvider.GetRequiredService<IOptions<AppSettings>>().Value;
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
            app.UseStaticFiles();
            app.UseIdentityServer();
            app.UseMvcWithDefaultRoute();
        }
    }
}
