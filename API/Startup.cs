using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Middleware;
using Application.FishCaught;
using Application.Interfaces;
using Domain;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt =>{
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt =>{
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddControllers()
                .AddFluentValidation(cfg=>
                {
                    //use validators on the Create class. If we add to Create, should do it for all classes automaticlly
                    cfg.RegisterValidatorsFromAssemblyContaining<Create>();
                });
            //adds and configures the identity system
            //must specify user type, which will be the one we made, AppUser
            var builder = services.AddIdentityCore<AppUser>();
            //create new instance of identity builder class
            //must pass it the user type, and the services we are adding. both come from builder
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            //add the entity framework stores. creates user stores we need
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            //this gives our app the ability to create and manage users. as well as sign in manager
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();
            services.AddAuthentication();

            services.AddScoped<IJwtGenerator,  JwtGenerator>();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //introduce our own error handling middlware
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                //return developer exception page if we get an error
                //commented out so we can use our own error handling middleware instead of the built in one
                // app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors("CorsPolicy");
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
