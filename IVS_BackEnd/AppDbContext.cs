using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {  

    }

    public DbSet<StockMovement> StockMovements { get; set; }
    public DbSet<Product> Products { get; set; }
}