using AuthenticationServer_.Net_core.Data.ApplicationQuaryBase;
using AuthenticationServer_.Net_core.Data.Interfaces;
using AuthenticationServer_.Net_core.Helpers;
using AuthenticationServer_.Net_core.Models;
using AuthenticationServer_.Net_core.Models.Dto;
using AuthenticationServer_.Net_core.Models.ModelsBase;
using AuthenticationServer_.Net_core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationServer_.Net_core.Controllers
{
    [ApiController]
    [Route("Authentication")]
    public class AuthenticationController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IUserQuerys _dbUserQuery;
        private readonly IUserTokenQuarys _dbUserTokenQuery;
        private readonly IHashService _hashService;
        private readonly ITokenService _tokenService;
        private static AuthenticationControllerHelper _controllerHelper { get; } = new AuthenticationControllerHelper();
        public AuthenticationController(IConfiguration configuration, IUserQuerys userQuerys, IUserTokenQuarys userTokenQuarys
                                       , IHashService hashService, ITokenService tokenService)
        {
            _configuration = configuration;
            _dbUserQuery = userQuerys;
            _dbUserTokenQuery = userTokenQuarys;
            _hashService = hashService;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<IUser>> Register(RegisterDto dto)
        {
            try
            {
                if (!_controllerHelper.CheckPasswordConfirm(dto.Password, dto.PasswordConfirm))
                    return Unauthorized("Password don't match");

                var query = await _dbUserQuery.CreateUser(dto);
                if (query == null)
                    return Problem();

                return Ok(query);
            }
            catch (Exception e) { return BadRequest(e.Message); }
        }

        [HttpGet("login")]
        public async Task<ActionResult<IUser>> Login(LoginDto dto)
        {
            try
            {
                var user = await _dbUserQuery.GetUserByEmail(dto.Email);
                if (user == null)
                    return Unauthorized("User didn't exists");

                if (!_hashService.CompreHashPassword(dto.Password, user.Password))
                    return Unauthorized("Wrong password");


                var accessToken = _tokenService.CreateAccessToken(user.Id, _configuration.GetSection("JWT:AccessKey").Value);
                var refreshToken = _tokenService.CreateRefreshToken(user.Id, _configuration.GetSection("JWT:RefreshKey").Value);

                var userToken = await _dbUserTokenQuery.CreateUserToken(user.Id, refreshToken, DateTime.Now.AddDays(3));
                Response.Cookies.Append("refresh_token", refreshToken, _controllerHelper.SetCookieOptionsHttpOnlyToTrue());


                return Ok(new
                {
                    token = accessToken,
                });
            }
            catch (Exception e) { return BadRequest(e.Message); }
        }

        [HttpGet("user")]
        public async Task<ActionResult<IUser>> User()
        {
            try
            {
                string authorizationHeader = Request.Headers["Authorization"];

                if (authorizationHeader is null || authorizationHeader.Length <= 0)
                    return Unauthorized("Unauthenticated!");

                var accessToken = authorizationHeader[7..];
                var id = _tokenService.DecodedToken(accessToken, out bool hesTokenExpired);

                if (hesTokenExpired)
                    return Unauthorized("Unauthenticated");

                var user = await _dbUserQuery.GetUserById(id);
                if (user == null)
                    return Unauthorized("User didn't exists");

                return Ok(user);
            }
            catch (Exception e) { return BadRequest(e.Message); }
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            try
            {
                var refreshToken = Request.Cookies["refresh_token"];
                if (refreshToken is null)
                    return Unauthorized("Unauthenticated!");

                var id = _tokenService.DecodedToken(refreshToken, out bool hesTokenExpired);

                if (!await _dbUserTokenQuery.IsTokenValid(id, refreshToken, DateTime.Now))
                    return Unauthorized("Unauthenticated!");

                if (hesTokenExpired)
                    return Unauthorized("Unauthenticated");

                var accessToken = _tokenService.CreateAccessToken(id, _configuration.GetSection("JWT:AccessKey").Value);

                return Ok(new
                {
                    token = accessToken,
                });
            }
            catch (Exception e) { return BadRequest(e.Message); }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                var token = Request.Cookies["refresh_token"];
                if (token is null)
                    return Unauthorized("");

                await _dbUserTokenQuery.DeleteToken(token);
                Response.Cookies.Delete("refresh_token");
                return Ok("Logout successfully");
            }
            catch (Exception e) { return BadRequest(e.Message); }
        }
    }
}
