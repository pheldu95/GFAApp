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
            CreateMap<UserFish, LikerDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}