using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class UserController: BaseController
    {
        //[AllowAnonymous] lets users access the user controller without authorization
        //or else they wouldnt be able to log in or anything
        //allowanonymous overrides the:                 
        //var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
        //in the startup.cs class
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            //the query parameter will contain our username and password
            return await Mediator.Send(query);
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        //the get request will return an ActionResult of User, called CurrentUser
        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}