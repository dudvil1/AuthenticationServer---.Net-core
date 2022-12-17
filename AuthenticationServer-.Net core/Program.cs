using AuthenticationServer_.Net_core.Data;
using AuthenticationServer_.Net_core.Data.ApplicationQuary;
using AuthenticationServer_.Net_core.Data.ApplicationQuaryBase;
using AuthenticationServer_.Net_core.Data.ApplicationQuarys;
using AuthenticationServer_.Net_core.Data.Interfaces;
using AuthenticationServer_.Net_core.Services;
using AuthenticationServer_.Net_core.Services.Interfaces;
using EmailService.Service;
using EmailService.Service.ServiceBase;
using Invoices_API.Filters;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var emailConfig = builder.Configuration
        .GetSection("EmailConfiguration")
        .Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfig);

builder.Services.AddControllers(options => options.Filters.Add(typeof(ExceptionFilter)));

builder.Services.AddDbContext<ApplicationDBContex>(option
                                                      => option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserQuerys, ApplicationUserQuarys>();
builder.Services.AddScoped<IUserTokenQuarys, ApplicationUserTokenQuarys>();
builder.Services.AddScoped<IResetTokenQuerys, ApplicationResetTokenQuerys>(); 
builder.Services.AddScoped<IHashService, HashService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IEmailSender, EmailSender>();

builder.Services.Configure<FormOptions>(o => {
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(option => option.
WithOrigins(new[] { "frontSide" })
.AllowAnyHeader()
.AllowAnyMethod()
.AllowCredentials());

app.UseAuthorization();

app.MapControllers();

app.Run();
