using IdentityServer.Entities.Identity;
using IdentityServer.SeedData.Contracts;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace IdentityServer.SeedData
{
    public class AspNetIdentityDbInitializer : IAspNetIdentityDbInitializer
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public AspNetIdentityDbInitializer(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public void Initialize()
        {
            if (!_roleManager.Roles.Any(x => x.Name == "Admin" || x.Name == "User"))
            {
                _roleManager.CreateAsync(new Role { Name = "Admin" }).Wait();
                _roleManager.CreateAsync(new Role { Name = "User" }).Wait();
            }

            var defaultAdminAccount = _userManager.FindByEmailAsync("admin@owlcosmetic.com").Result;
            if (defaultAdminAccount == null)
            {
                var user = new User { UserName = "admin", Email = "admin@owlcosmetic.com" };
                _userManager.CreateAsync(user, "!Abc123").Wait();
                _userManager.AddToRoleAsync(user, "Admin").Wait();
            }
        }
    }
}
