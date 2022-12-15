namespace AuthenticationServer_.Net_core.Services.Interfaces
{
    public interface ITokenService
    {
        string CreateAccessToken(int id, string accessKey);

        string CreateRefreshToken(int id, string refreshToken);

        int DecodedToken(string? token, out bool hesTokenExpired);
    }
}
