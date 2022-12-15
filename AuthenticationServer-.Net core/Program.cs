using AuthenticationServer_.Net_core.Data;
using AuthenticationServer_.Net_core.Data.ApplicationQuary;
using AuthenticationServer_.Net_core.Data.ApplicationQuaryBase;
using AuthenticationServer_.Net_core.Data.ApplicationQuarys;
using AuthenticationServer_.Net_core.Data.Interfaces;
using AuthenticationServer_.Net_core.Services;
using AuthenticationServer_.Net_core.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDBContex>(option
                                                      => option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserQuerys, ApplicationUserQuarys>();
builder.Services.AddScoped<IUserTokenQuarys, ApplicationUserTokenQuarys>();
builder.Services.AddScoped<IResetTokenQuerys, ApplicationResetTokenQuerys>();
builder.Services.AddScoped<IHashService, HashService>();
builder.Services.AddScoped<ITokenService, TokenService>();

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
