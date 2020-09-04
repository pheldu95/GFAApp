using Domain;

namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
        //when we pass this method a user, we will get a string back which will be our jwt tokern
         string CreateToken(AppUser user);
    }
}