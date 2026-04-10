using Microsoft.EntityFrameworkCore;
namespace InventoryManagementSystem;

public class InventoryService
{
    private readonly IDbContextFactory<AppDbContext> _dbFactory;

    public InventoryService(IDbContextFactory<AppDbContext> dbFactory)
    {
        _dbFactory = dbFactory;
    }

    // 🔍 GET ALL PRODUCTS (with search)
    public List<Product> GetAllProducts(string search = "")
    {
        using AppDbContext db = _dbFactory.CreateDbContext();

        if (string.IsNullOrEmpty(search))
            return db.Products.ToList();

        return db.Products
            .Where(p => p.Name.ToLower().Contains(search.ToLower()) ||
                        p.Sku.ToLower().Contains(search.ToLower()))
            .ToList();
    }

    // 🔍 GET PRODUCT BY ID
    public Product? GetProductById(int id)
    {
        using AppDbContext db = _dbFactory.CreateDbContext();
        return db.Products.FirstOrDefault(p => p.Id == id);
    }

    // ➕ ADD PRODUCT
    public Product AddProduct(Product newProduct)
    {
        using AppDbContext db = _dbFactory.CreateDbContext();

        db.Products.Add(newProduct);
        db.SaveChanges();

        return newProduct;
    }

    // ✏️ UPDATE PRODUCT
    public bool UpdateProduct(int id, Product updatedData)
    {
        using AppDbContext db = _dbFactory.CreateDbContext();

        Product? existing = db.Products.FirstOrDefault(p => p.Id == id);
        if (existing == null) return false;

        existing.Name = updatedData.Name;
        existing.Sku = updatedData.Sku;
        existing.Category = updatedData.Category;
        existing.Threshold = updatedData.Threshold;
        existing.Price = updatedData.Price;

        db.SaveChanges();
        return true;
    }

    // ❌ DELETE PRODUCT
    public bool DeleteProduct(int id)
    {
        using AppDbContext db = _dbFactory.CreateDbContext();

        Product? existing = db.Products.FirstOrDefault(p => p.Id == id);
        if (existing == null) return false;

        db.Products.Remove(existing);
        db.SaveChanges();
        return true;
    }

    // 🔄 UPDATE STOCK + SAVE HISTORY
    public string UpdateStock(int productId, string type, int quantity, string note)
    {
        using AppDbContext db = _dbFactory.CreateDbContext();

        Product? product = db.Products.FirstOrDefault(p => p.Id == productId);
        if (product == null) return "Error: Product not found.";

        if (type == "Out" && quantity > product.Quantity)
            return $"Error: Cannot remove {quantity} units. Only {product.Quantity} in stock.";

        int quantityBefore = product.Quantity;

        if (type == "In")
            product.Quantity += quantity;
        else
            product.Quantity -= quantity;

        StockMovement movement = new StockMovement
        {
            ProductId = productId,
            ProductName = product.Name,
            Type = type,
            Quantity = quantity,
            QuantityBefore = quantityBefore,
            QuantityAfter = product.Quantity,
            Note = note,
            Date = DateTime.Now,
            IsHidden = false
        };

        db.StockMovements.Add(movement);
        db.SaveChanges();

        return "Success";
    }

    // 📜 GET HISTORY
    public List<StockMovement> GetHistory()
    {
        using AppDbContext db = _dbFactory.CreateDbContext();

        return db.StockMovements
            .Where(m => m.IsHidden == false)
            .OrderByDescending(m => m.Date)
            .ToList();
    }

    // 🙈 HIDE HISTORY (SOFT DELETE)
    public void HideHistory()
    {
        using AppDbContext db = _dbFactory.CreateDbContext();

        var visible = db.StockMovements
            .Where(m => m.IsHidden == false)
            .ToList();

        foreach (var m in visible)
        {
            m.IsHidden = true;
        }

        db.SaveChanges();
    }

    // ⚠️ GET ALERTS
    public List<Product> GetAlerts()
    {
        using AppDbContext db = _dbFactory.CreateDbContext();

        return db.Products
            .Where(p => p.Quantity == 0 || p.Quantity <= p.Threshold)
            .ToList();
    }
}