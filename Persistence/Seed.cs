using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {   
            //seed users if there are no users stored in the db yet
            if(!userManager.Users.Any())
            {
                //list of users. type <AppUser>
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Randy",
                        UserName = "Randy55",
                        Email = "Randy@randy.edu"
                    },
                    new AppUser
                    {
                        DisplayName = "Steve",
                        UserName = "Steve55",
                        Email = "Steve@Steve.edu"
                    },
                    new AppUser
                    {
                        DisplayName = "Jimbo",
                        UserName = "Jimbo",
                        Email = "Jimbo@jimbo.edu"
                    }
                };
                foreach (var user in users)
                {
                    //create the users with the user manager
                    //must pass it a user, and a password
                    //because we use CreateAsync, we must go back and return async Task instead of void 
                    //add 'async Task' to the method in place of 'void'
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if(!context.FishCaught.Any()){
                var fishCaught = new List<Fish>
                {
                    new Fish
                    {
                        FisherId = 1,
                        GuideId = 1,
                        OrganizationId = 1,
                        FishTypeId = 1,
                        Length = 20.2F,
                        Weight = 3.4F,
                        ExceptionalCatch = true,
                        UnusualCatch = false,
                        Latitude = 44.9778F,
                        Longitude = 93.2650F,
                        SkyTypeId = 1,
                        WindTypeId = 1,
                        WaterTypeId = 1,
                        MoonPhase = "Waining gibbous",
                        MoonIlluminationPercent = 50,
                        AirTemperature = 85,
                        WaterTemperature = 60,
                        CaughtDate =  DateTime.Now.AddMonths(-2),
                        LastModifiedDate = DateTime.Now
                    },
                    new Fish
                    {
                        FisherId = 2,
                        GuideId = 2,
                        OrganizationId = 1,
                        FishTypeId = 2,
                        Length = 12.2F,
                        Weight = 1.4F,
                        ExceptionalCatch = false,
                        UnusualCatch = true,
                        Latitude = 44.9778F,
                        Longitude = 93.2650F,
                        SkyTypeId = 2,
                        WindTypeId = 2,
                        WaterTypeId = 2,
                        MoonPhase = "Waining gibbous",
                        MoonIlluminationPercent = 50,
                        AirTemperature = 85,
                        WaterTemperature = 60,
                        CaughtDate =  DateTime.Now.AddMonths(-1),
                        LastModifiedDate = DateTime.Now
                    },
                    new Fish
                    {
                        FisherId = 3,
                        GuideId = 2,
                        OrganizationId = 1,
                        FishTypeId = 1,
                        Length = 19.2F,
                        Weight = 3F,
                        ExceptionalCatch = true,
                        UnusualCatch = false,
                        Latitude = 44.9778F,
                        Longitude = 93.2650F,
                        SkyTypeId = 2,
                        WindTypeId = 2,
                        WaterTypeId = 1,
                        MoonPhase = "Waining crescent",
                        MoonIlluminationPercent = 50,
                        AirTemperature = 85,
                        WaterTemperature = 60,
                        CaughtDate =  DateTime.Now.AddMonths(-3),
                        LastModifiedDate = DateTime.Now
                    },
                    new Fish
                    {
                        FisherId = 1,
                        GuideId = 1,
                        OrganizationId = 1,
                        FishTypeId = 3,
                        Length = 20.2F,
                        Weight = 3.4F,
                        ExceptionalCatch = false,
                        UnusualCatch = false,
                        Latitude = 44.1756F,
                        Longitude = 94.3420F,
                        SkyTypeId = 1,
                        WindTypeId = 2,
                        WaterTypeId = 2,
                        MoonPhase = "Waxing gibbous",
                        MoonIlluminationPercent = 50,
                        AirTemperature = 85,
                        WaterTemperature = 60,
                        CaughtDate =  DateTime.Now.AddMonths(-3),
                        LastModifiedDate = DateTime.Now
                    }
                };
                context.FishCaught.AddRange(fishCaught);
                context.SaveChanges();
            }
        }
    }
}