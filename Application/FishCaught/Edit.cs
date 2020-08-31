using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.FishCaught
{
    public class Edit
    {
        //the question mark after some of the data types means that it's allowed to be null
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public int? FisherId { get; set; }
            public int? GuideId { get; set; }
            public int? OrganizationId { get; set; }
            public int? FishTypeId { get; set; }
            public float? Length { get; set; }
            public float? Weight { get; set; }
            public bool? ExceptionalCatch { get; set; }
            public bool? UnusualCatch { get; set; }
            public float? Latitude { get; set; }
            public float? Longitude { get; set; }
            public int? SkyTypeId { get; set; }
            public int? WindTypeId { get; set; }
            public int? WaterTypeId { get; set; }
            public string MoonPhase { get; set; }
            public int? MoonIlluminationPercent { get; set; }
            public int? AirTemperature { get; set; }
            public int? WaterTemperature { get; set; }
            public DateTime? CaughtDate { get; set; }
            public DateTime? LastModifiedDate { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                //check to make sure FishTypeId is not empty
                RuleFor(x => x.FishTypeId).NotEmpty();
                RuleFor(x => x.FisherId).NotEmpty();
                RuleFor(x => x.GuideId).NotEmpty();
            }
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
                //get the fish we are editing from the db
                var fish = await _context.FishCaught.FindAsync(request.Id);

                //if we don't have a fish with specific id, then we throw exception
                if (fish == null)
                    //here is where we use our error handling that we made, RestException
                    throw new RestException(HttpStatusCode.NotFound, new { fish = "Not found" });

                //check to see if any of these variables have changed. 
                //if they have, then it updates the fish object with the new values
                //request.FisherId, for example, will be null if the user hasn't changed it
                fish.FisherId = request.FisherId ?? fish.FisherId;
                fish.GuideId = request.GuideId ?? fish.GuideId;
                fish.OrganizationId = request.OrganizationId ?? fish.OrganizationId;
                fish.FishTypeId = request.FishTypeId ?? fish.FishTypeId;
                fish.Length = request.Length ?? fish.Length;
                fish.Weight = request.Weight ?? fish.Weight;
                fish.ExceptionalCatch = request.ExceptionalCatch ?? fish.ExceptionalCatch;
                fish.UnusualCatch = request.UnusualCatch ?? fish.UnusualCatch;
                fish.Latitude = request.Latitude ?? fish.Latitude;
                fish.Longitude = request.Longitude ?? fish.Longitude;
                fish.SkyTypeId = request.SkyTypeId ?? fish.SkyTypeId;
                fish.WindTypeId = request.WindTypeId ?? fish.WindTypeId;
                fish.WaterTypeId = request.WaterTypeId ?? fish.WaterTypeId;
                fish.MoonPhase = request.MoonPhase ?? fish.MoonPhase;
                fish.MoonIlluminationPercent = request.MoonIlluminationPercent ?? fish.MoonIlluminationPercent;
                fish.AirTemperature = request.AirTemperature ?? fish.AirTemperature;
                fish.WaterTemperature = request.WaterTemperature ?? fish.WaterTemperature;
                fish.CaughtDate = request.CaughtDate ?? fish.CaughtDate;
                fish.LastModifiedDate = request.LastModifiedDate ?? fish.LastModifiedDate;

                var success = await _context.SaveChangesAsync() > 0;
                if(success) return Unit.Value;

                //if request is unsuccessfull, we will throw an exception
                throw new Exception("Problem saving changes");
            }
        }
    }
}