using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.FishCaught
{
    //this will be for getting a single FishCaught
    public class Details
    {
        public class Query : IRequest<Fish>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Fish>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Fish> Handle(Query request, CancellationToken cancellationToken)
            {
                var fish = await _context.FishCaught.FindAsync(request.Id);
                //if we don't have a fish with specific id, then we throw exception
                if (fish == null)
                    //here is where we use our error handling that we made, RestException
                    throw new RestException(HttpStatusCode.NotFound, new { fish = "Not found" });

                return fish;
            }
        }
    }
}