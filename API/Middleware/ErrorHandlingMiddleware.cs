using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        //the ILogger lets us log out whats going on
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
            _next = next;
        }
        public async Task Invoke(HttpContext context)
        {
           try
           {
               //if there is no exception, then the request will be passed on to the next piece of middleware
               await _next(context);
           }
           //if there is an exception, we catch it and use our HandleExceptionsAsync method
           catch(Exception ex)
           {
               await HandleExceptionAsync(context, ex, _logger);
           } 
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex, ILogger<ErrorHandlingMiddleware> logger)
        {
            object errors = null;
            switch (ex)
            {
                //if it is a RestException, we run this case
                case RestException re:
                    //log the error
                    logger.LogError(ex, "REST ERROR");
                    //make our errors object equal to the rest exception error
                    errors = re.Errors;
                    //give our context that we are passing down the pipleine the status code
                    context.Response.StatusCode = (int)re.Code;
                    break;
                //if its just normal error, not a rest error, we run with case
                case Exception e:
                    logger.LogError(ex, "SERVER ERROR");
                    //if the error is null or empty text/whitespace, then error = the string "Error"
                    //if there is a message, then error = that message. e.Message
                    errors = string.IsNullOrWhiteSpace(e.Message)? "Error" : e.Message;
                    //this will return a 500 error
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }
            //idk what this does
            //serialized as json?
            context.Response.ContentType = "application/jason";
            //check to see if we have errors
            if(errors != null)
            {
              //if we have errors, serialize result as a json object
              var result = JsonSerializer.Serialize(new
              {
                 errors 
              });
              await context.Response.WriteAsync(result);  
            }
        }
    }
}