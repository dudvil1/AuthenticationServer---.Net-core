using System.Text.Json.Serialization;

namespace AuthenticationServer_.Net_core.Models.Dto
{
    public class ResetPasswordDto
    {
        public string Token { get; set; } = default!;

        [JsonPropertyName("password")]
        public string Password { get; set; } = default!;

        [JsonPropertyName("Password_confirm")]
        public string PasswordConfirm { get; set; } = default!;
    }
}
