using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.FishCaught
{
    public class List
    {
        public class Query : IRequest<List<Fish>> { }
        //our handler is going be extremely dumb
        //only recieves and sends http requests. knows nothing else
        //sends the requests to the controllers
        public class Handler : IRequestHandler<Query, List<Fish>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Fish>> Handle(Query request, CancellationToken cancellationToken)
            {
                //gets all our fish from the db and returns them
                var fishCaught = await _context.FishCaught.ToListAsync();
                return fishCaught;
            }
        }
    }
}