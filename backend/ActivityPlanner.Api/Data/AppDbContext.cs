using ActivityPlanner.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ActivityPlanner.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();
    public DbSet<Category> Categories => Set<Category>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskItem>()
            .HasOne(t => t.Category)
            .WithMany(c => c.Tasks)
            .HasForeignKey(t => t.CategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        // Seed a few default categories so the app isn't empty on first run
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Chores" },
            new Category { Id = 2, Name = "School" },
            new Category { Id = 3, Name = "Personal" }
        );
    }
}
