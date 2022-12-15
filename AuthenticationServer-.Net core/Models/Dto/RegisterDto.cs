﻿using System.Text.Json.Serialization;

namespace AuthenticationServer_.Net_core.Models.Dto
{
    public class RegisterDto
    {
        [JsonPropertyName("first_name")]
        public string FirstName { get; set; } = default!;

        [JsonPropertyName("last_name")]
        public string LastName { get; set; } = default!;

        [JsonPropertyName("email")]
        public string Email { get; set; } = default!;

        [JsonPropertyName("password")]
        public string Password { get; set; } = default!;

        [JsonPropertyName("Password_confirm")]
        public string PasswordConfirm { get; set; } = default!;
    }
}
