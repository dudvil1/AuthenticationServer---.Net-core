using AuthenticationServer_.Net_core.Data.ApplicationQuaryBase;
using AuthenticationServer_.Net_core.Models;
using AuthenticationServer_.Net_core.Models.ModelsBase;
using Microsoft.EntityFrameworkCore;

namespace AuthenticationServer_.Net_core.Data.ApplicationQuary
{
    public class ApplicationUserTokenQuarys : IUserTokenQuarys
    {
        private readonly ApplicationDBContex _db;

        public ApplicationUserTokenQuarys(ApplicationDBContex db)
        {
            _db = db;
        }

        public async Task<IUserToken> CreateUserToken(int id, string refreshToken, DateTime expired)
        {
            var userToken = _db.UsersTokens.Add(new UserToken
            {
                UserId = id,
                Token = refreshToken,
                ExpiredAt = expired
            });
            await _db.SaveChangesAsync();
            return userToken.Entity;
        }

        public async Task DeleteToken(string token)
        {
            _db.UsersTokens.Remove(_db.UsersTokens.Where(ut => ut.Token == token).FirstOrDefault());
            await _db.SaveChangesAsync();
        }

        public async Task<bool> IsTokenValid(int id, string refreshToken, DateTime expired)
        {
            return await _db.UsersTokens.Where(ut => ut.UserId == id &&
                                               ut.Token == refreshToken && 
                                               ut.ExpiredAt > expired).AnyAsync();
        }
    }
}
