using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Entities.Identity
{
    /*
     * A set of statements (or Claims) about the user that represent the user's identity. 
     * Can enable greater expression of the user's identity than can be achieved through roles. 
     */
    public class UserClaim : IdentityUserClaim<int>
    {
    }
}
