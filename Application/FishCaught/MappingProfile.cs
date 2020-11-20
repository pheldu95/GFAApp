using AutoMapper;
using Domain;

namespace Application.FishCaught
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //omap fish onto fishdto
            CreateMap<Fish, FishDto>();
            CreateMap<UserFish, LikerDto>();
        }
    }
}