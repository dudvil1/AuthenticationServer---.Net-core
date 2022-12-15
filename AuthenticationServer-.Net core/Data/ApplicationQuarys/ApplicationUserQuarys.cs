using AuthenticationServer_.Net_core.Data.Interfaces;
using AuthenticationServer_.Net_core.Models;
using AuthenticationServer_.Net_core.Models.Dto;
using AuthenticationServer_.Net_core.Models.ModelsBase;
using AuthenticationServer_.Net_core.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AuthenticationServer_.Net_core.Data.ApplicationQuary
{
    public class ApplicationUserQuarys : IUserQuerys
    {
        private readonly ApplicationDBContex _db;
        private readonly IHashService _hashService;
        public ApplicationUserQuarys(ApplicationDBContex db, IHashService hashService)
        {
            _db = db;
            _hashService = hashService;
        }

        public async Task<IUser> CreateUser(RegisterDto dto)
        {
            var user = _db.Users.Add(new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Password = _hashService.HashPassword(dto.Password)
            });
            await _db.SaveChangesAsync();
            return user.Entity;
        }

        public async Task<IUser> GetUserByEmail(string email)
        {
            return await _db.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
        }

        public async Task<IUser> GetUserById(int id)
        {
            return await _db.Users.Where(u => u.Id == id).FirstOrDefaultAsync();
        }

        public Task<IUser> UpdateUser(RegisterDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
