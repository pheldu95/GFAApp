using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        //returns <User>, our user object
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        //to validate the command
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }
        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _context = context;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                //we want to make sure cannot create a user with an email or username that's already been used
                //using anyasync will check to see if it is in use, and return a boolean
                if(await _context.Users.AnyAsync(x => x.Email == request.Email))
                    //throw a rest exception if it is in use
                    throw new RestException(HttpStatusCode.BadRequest, new {Email = "Email already exists"});
                //do the same thing for the username
                if (await _context.Users.AnyAsync(x => x.UserName == request.Username))
                    //throw a rest exception if it is in use
                    throw new RestException(HttpStatusCode.BadRequest, new { Username = "Username already exists" });
                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Username
                };
                var result = await _userManager.CreateAsync(user, request.Password);
                
                if(result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        Username = user.UserName,
                        Image = null
                    };
                }
                //if request is unsuccessfull, we will throw an exception
                throw new Exception("Problem creating user");
            }
        }
    }
}