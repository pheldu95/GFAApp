using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.FishCaught;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

//all these controllers do is receive requests and respond to them
//using Mediatr to go an get the data from the db
namespace API.Controllers
{
    
    public class FishCaughtController : BaseController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Fish>>> List()
        {
            //Mediator is coming from our BaseController class
            return await Mediator.Send(new List.Query());
        }

        //method for a get request that calls our details handler
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<FishDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            //the id will get passed across via mediatr
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }
    }
}