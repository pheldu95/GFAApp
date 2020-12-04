using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.FishCaught
{
    public class List
    {
        public class Query : IRequest<List<FishDto>> { }
        //our handler is going be extremely dumb
        //only recieves and sends http requests. knows nothing else
        //sends the requests to the controllers
        public class Handler : IRequestHandler<Query, List<FishDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<FishDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                //gets all our fish from the db and returns them
                //we use .Include and .ThenInclude to also return the UserFIshCaught and APpUser
                var fishCaught = await _context.FishCaught.Include(x => x.UserFishCaught)
                .ThenInclude(x => x.AppUser).ToListAsync();
                return _mapper.Map<List<Fish>, List<FishDto>>(fishCaught);
            }
        }
    }
}