using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
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