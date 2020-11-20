using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.FishCaught
{
    public class FishDto
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
        
        //this will make it so it returns something called 'likers' instead of UserFIshCaught
        [JsonPropertyName("likers")]
        public ICollection<LikerDto> UserFishCaught { get; set; }
    }
}