using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Entities.Identity
{
    /*
     * Registered users of your web site. The IdentityUser type may be extended or used as an example 
     * for your own custom type. You don't need to inherit from a particular type to implement your own 
     * custom identity storage solution.
     */
    public class User : IdentityUser<int>
    {
    }
}
