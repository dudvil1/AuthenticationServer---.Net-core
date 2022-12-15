using AuthenticationServer_.Net_core.Models.Dto;
using AuthenticationServer_.Net_core.Models.ModelsBase;

namespace AuthenticationServer_.Net_core.Data.Interfaces
{
    public interface IUserQuerys
    {
        Task<IUser> CreateUser(RegisterDto dto);

        Task<IUser> UpdateUser(RegisterDto dto);

        Task<IUser> GetUserByEmail(string email);

        Task<IUser> GetUserById(int id);
    }
}
