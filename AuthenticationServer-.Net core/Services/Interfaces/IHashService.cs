namespace AuthenticationServer_.Net_core.Services.Interfaces
{
    public interface IHashService
    {
        string HashPassword(string password);

        bool CompreHashPassword(string passwordDto, string passwordDb);
    }
}
