using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //[AllowAnonymous] lets users access the user controller without authorization
    //or else they wouldnt be able to log in or anything
    //allowanonymous overrides the:                 
    //var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    //in the startup.cs class
    [AllowAnonymous]
    public class UserController: BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            //the query parameter will contain our username and password
            return await Mediator.Send(query);
        }
    }
}