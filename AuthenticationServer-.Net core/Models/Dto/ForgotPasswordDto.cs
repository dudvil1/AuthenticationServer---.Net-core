using System.Text.Json.Serialization;

namespace AuthenticationServer_.Net_core.Models.Dto
{
    public class ForgotPasswordDto
    {
        [JsonPropertyName("email")]
        public string Email { get; set; } = default!;
    }
}
