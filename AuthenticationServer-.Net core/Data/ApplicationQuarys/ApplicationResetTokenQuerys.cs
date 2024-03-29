﻿using AuthenticationServer_.Net_core.Data.ApplicationQuaryBase;
using AuthenticationServer_.Net_core.Models;
using AuthenticationServer_.Net_core.Models.ModelsBase;
using Microsoft.EntityFrameworkCore;

namespace AuthenticationServer_.Net_core.Data.ApplicationQuarys
{
    public class ApplicationResetTokenQuerys : IResetTokenQuerys
    {
        private readonly ApplicationDBContex _db;

        public ApplicationResetTokenQuerys(ApplicationDBContex db)
        {
            _db = db;
        }

        public async Task<IResetToken> CreateResetToken(string email)
        {
            var resetToken = _db.ResetTokens.Add(new ResetToken
            {
                Email = email,
                Token = Guid.NewGuid().ToString()
            });
            await _db.SaveChangesAsync();
            return resetToken.Entity;
        }

        public async Task<IResetToken> GetResetTokenByToken(string token)
        {
            return await _db.ResetTokens.Where(u => u.Token == token).FirstOrDefaultAsync();
        }
    }
}
