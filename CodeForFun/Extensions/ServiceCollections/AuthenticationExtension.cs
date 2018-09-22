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
			services.AddAuthentication(options =>
			{
				options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddIdentityServerAuthentication(options =>
			{
				options.Authority = appSettings.AuthorityIssuer;
				options.ApiName = appSettings.ApiName;
				options.RequireHttpsMetadata = true;
			});

			services.AddCors(options =>
			{
				options.AddPolicy(appSettings.CORSPolicyName, policy =>
				{
					policy.WithOrigins(appSettings.AuthorityIssuer)
						.AllowAnyHeader()
						.AllowAnyMethod();
				});
			});

			services.AddAuthorization(options =>
			{
				options.AddPolicy(appSettings.ApiPolicyName, policy =>
				{
					policy.RequireAuthenticatedUser();
					policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
				});
			});

			return services;
		}
	}
}
