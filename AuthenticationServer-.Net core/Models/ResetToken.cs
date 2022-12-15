using AuthenticationServer_.Net_core.Models.ModelsBase;
using System.ComponentModel.DataAnnotations;

namespace AuthenticationServer_.Net_core.Models
{
    public class ResetToken : IResetToken
    {
        [Key()]
        public string Email { get; set; } = default!;
        public string Token { get; set; } = default!;
 
    }
}
