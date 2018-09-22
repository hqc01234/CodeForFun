using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServer.Configurations
{
    public class IdentityServerConfiguration
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email()
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("codeforfun", "CodeForFun API")
            };
        }

        // Clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            // Client credentials client
            return new List<Client>
            {
                new Client
                {
                    ClientId = "codeforfun_angular",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris = {
                        "https://localhost:5001/login-callback",
						"https://localhost:5001/silent-refresh.html"
					},
                    PostLogoutRedirectUris = { "https://localhost:5001" },
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        "codeforfun"
                    },
                    AllowedCorsOrigins = { "https://localhost:5001" },
                    RequireConsent = false
                }
            };
        }
    }
}
