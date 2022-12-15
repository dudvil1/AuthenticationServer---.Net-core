using AuthenticationServer_.Net_core.Services.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace AuthenticationServer_.Net_core.Services
{
    public class HashService : IHashService
    {
        public bool CompreHashPassword(string passwordDto, string passwordDb)
        {
            var hash = HashPassword(passwordDto);
            if (hash != passwordDb)
                return false;
            return true;
        }

        public string HashPassword(string password)
        {
            using SHA256 sHA256 = SHA256.Create();
            byte[] hashBytes = sHA256.ComputeHash(Encoding.UTF8.GetBytes(password));
            string hashPassword = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            return hashPassword;
        }
    }
}
