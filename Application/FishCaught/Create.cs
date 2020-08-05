using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.FishCaught
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public int FisherId { get; set; }
            public int GuideId { get; set; }
            public int OrganizationId { get; set; }
            public int FishTypeId { get; set; }
            public float Length { get; set; }
            public float Weight { get; set; }
            public bool ExceptionalCatch { get; set; }
            public bool UnusualCatch { get; set; }
            public float Latitude { get; set; }
            public float Longitude { get; set; }
            public int SkyTypeId { get; set; }
            public int WindTypeId { get; set; }
            public int WaterTypeId { get; set; }
            public string MoonPhase { get; set; }
            public int MoonIlluminationPercent { get; set; }
            public int AirTemperature { get; set; }
            public int WaterTemperature { get; set; }
            public DateTime CaughtDate { get; set; }
            public DateTime LastModifiedDate { get; set; }
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
                var fish = new Fish
                {
                    Id = request.Id,
                    FisherId = request.FisherId,
                    GuideId = request.GuideId,
                    OrganizationId = request.OrganizationId,
                    FishTypeId = request.FishTypeId,
                    ExceptionalCatch = request.ExceptionalCatch,
                    UnusualCatch = request.UnusualCatch,
                    Latitude = request.Latitude,
                    Longitude = request.Longitude,
                    SkyTypeId = request.SkyTypeId,
                    WindTypeId = request.WindTypeId,
                    WaterTypeId = request.WaterTypeId,
                    MoonPhase = request.MoonPhase,
                    MoonIlluminationPercent = request.MoonIlluminationPercent,
                    AirTemperature = request.AirTemperature,
                    WaterTemperature = request.WaterTemperature,
                    CaughtDate = request.CaughtDate,
                    LastModifiedDate = request.LastModifiedDate
                };

                _context.FishCaught.Add(fish);
                //if _context.SaveChangesAsync returns something greater than zero
                //that means the fish was succesfully added.
                var success = await _context.SaveChangesAsync() > 0;
                if(success) return Unit.Value;

                //if request is unsuccessfull, we will throw an exception
                throw new Exception("Problem saving changes");
            }
        }
    }
}