using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interfaces;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Security
{
    //we have to add this as a service to our startup class
    //so that we can inject the IJwtGenerator
    //this class will build our jwt token
    public class JwtGenerator : IJwtGenerator
    {
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                //adds our username as a nameid to our token
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };
            //generate signing credentials. allows our API to trust the tokens
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));
            //we specify the algorithm that will decode our super secret key?
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                //the token can be used for 7 days
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}