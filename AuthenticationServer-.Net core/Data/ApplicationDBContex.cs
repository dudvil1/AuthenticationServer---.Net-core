using AuthenticationServer_.Net_core.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthenticationServer_.Net_core.Data
{
    public class ApplicationDBContex : DbContext
    {
        public ApplicationDBContex(DbContextOptions<ApplicationDBContex> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; } = default!;
        public DbSet<UserToken> UsersTokens { get; set; } = default!;
        public DbSet<ResetToken> ResetTokens { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });
            modelBuilder.Entity<ResetToken>(entity => { entity.HasIndex(e => e.Token).IsUnique(); });
        }
    }
}
