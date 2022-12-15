using AuthenticationServer_.Net_core.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthenticationServer_.Net_core.Services
{
    public class TokenService : ITokenService
    {
        public string CreateAccessToken(int id, string accessKey)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, id.ToString()),
            };

            SymmetricSecurityKey? key = new(Encoding.UTF8.GetBytes(accessKey));
            SigningCredentials creds = new(key, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken? token = new(
                                      claims: claims,
                                      notBefore: DateTime.Now,
                                      expires: DateTime.Now.AddSeconds(30),
                                      signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public string CreateRefreshToken(int id, string refreshToken)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, id.ToString()),
            };

            SymmetricSecurityKey? key = new(Encoding.UTF8.GetBytes(refreshToken));
            SigningCredentials creds = new(key, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken? token = new(
                                      claims: claims,
                                      notBefore: DateTime.Now,
                                      expires: DateTime.Now.AddDays(7),
                                      signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public int DecodedToken(string? token, out bool hesTokenExpired)
        {
            JwtSecurityToken? jwtToken = new(token);
            var id = int.Parse(jwtToken.Claims.FirstOrDefault(c => ClaimTypes.NameIdentifier == c.Type).Value);

            hesTokenExpired = jwtToken.ValidTo < DateTime.UtcNow;

            return id;

        }
    }
}
