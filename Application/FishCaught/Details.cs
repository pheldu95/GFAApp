using System;
using System.Threading;
using System.Threading.Tasks;
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
                return fish;
            }
        }
    }
}