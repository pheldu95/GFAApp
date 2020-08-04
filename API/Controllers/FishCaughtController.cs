using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.FishCaught;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

//all these controllers do is receive requests and respond to them
//using Mediatr to go an get the data from the db
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[APIController] is a binding, saying that this is an API controller
    //gets requests from the handler
    //similar to the server files in javascript 
    public class FishCaughtController : ControllerBase
    {
        private readonly IMediator _mediator;
        //make Mediatr available in our API controller
        public FishCaughtController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Fish>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        //method for a get request that calls our details handler
        [HttpGet("{id}")]
        public async Task<ActionResult<Fish>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            //the id will get passed across via mediatr
            command.Id = id;
            return await _mediator.Send(command);
        }
    }
}