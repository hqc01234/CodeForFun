using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Entities.Identity
{
    /*
     * Information about the external authentication provider 
     * (like Facebook or a Microsoft account) to use when logging in a user  
     */
    public class UserLogin : IdentityUserLogin<int>
    {
    }
}
