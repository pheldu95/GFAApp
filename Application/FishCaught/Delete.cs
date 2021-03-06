using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.FishCaught
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var fish = await _context.FishCaught.FindAsync(request.Id);

                //if we don't have a fish with specific id, then we throw exception
                if(fish == null)
                    //here is where we use our error handling that we made, RestException
                    throw new RestException(HttpStatusCode.NotFound, new {fish="Not found"});
                
                //if we do have the fish, then we remove it from our context
                _context.Remove(fish);
                
                //if we do remove a fish, then a change will be saved and the number will be > 0
                var success = await _context.SaveChangesAsync() > 0;
                if(success) return Unit.Value;

                //if request is unsuccessfull, we will throw an exception
                throw new Exception("Problem saving changes");
            }
        }
    }
}