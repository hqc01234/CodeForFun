using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Entities.Identity
{
    /*
     * Authorization groups for your site. Includes the role Id and role name (like "Admin" or "Employee") 
     */
    public class Role : IdentityRole<int>
    {
    }
}
