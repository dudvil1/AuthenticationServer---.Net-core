using AuthenticationServer_.Net_core.Models.ModelsBase;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AuthenticationServer_.Net_core.Models
{
    public class User : IUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity),Key()]
        public int Id { get; set; }
        [JsonPropertyName("First_Name")]
        public string FirstName { get; set; } = default!;
        [JsonPropertyName("Last_Name")]
        public string LastName { get; set; } = default!;
        public string Email { get; set; } = default!;
        [JsonIgnore]
        public string Password { get; set; } = default!;
    }
}
