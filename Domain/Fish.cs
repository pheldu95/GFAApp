using System;
using System.Collections.Generic;

namespace Domain
{
    public class Fish
    {
        public Guid Id { get; set;}
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
        public ICollection<UserFish> UserFishCaught { set; get; }
    }
}

// [Id] [int] IDENTITY(1,1) NOT NULL,

//     [FisherId] [int] NOT NULL,

//     [GuideId] [int] NULL,
// 	[OrganizationId] [int] NULL,
// 	[FishTypeId] [int] NULL,
// 	[ExceptionalCatch] [bit] NULL,
// 	[UnusualCatch] [bit] NULL,
// 	[GeoPoint] [geography] NULL,
// 	[SkyTypeId] [int] NULL,
// 	[WindTypeId] [int] NULL,
// 	[WaterTypeId] [int] NULL,
// 	[MoonPhase] [nvarchar](32) NULL,
// 	[MoonIlluminationPercent] [int] NULL,
// 	[AirTemperature] [int] NULL,
// 	[WaterTemperature] [int] NULL,
// 	[CaughtDate] [datetime] NOT NULL,

//     [CreateDate] [datetime] NOT NULL,

//     [LastModifedDate] [datetime] NOT NULL,