using Microsoft.AspNetCore.Identity;
namespace Domain
{
    //derive from the IdentityUser class
    public class AppUser : IdentityUser
    {
        //this is the name that will display in our application
        public string DisplayName { get; set; }
    }
}