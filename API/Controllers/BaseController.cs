using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    //this controller will have the attributes that all our other controllers will have
    //so other controllers can inherit them
    [Route("api/[controller]")]
    [ApiController]
    //[APIController] is a binding, saying that this is an API controller
    //gets requests from the handler
    //similar to the server files in javascript 
    public class BaseController: ControllerBase
    {
        private IMediator _mediator;
        //if _medator is null, then we will go and get an instance of it from our services
        protected IMediator Mediator => _mediator ?? (_mediator = HttpContext.RequestServices.GetService<IMediator>());
    }
}