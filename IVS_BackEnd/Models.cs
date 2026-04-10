namespace InventoryManagementSystem;


public class Product
{
    public int Id { get; set; }                 // Unique number for each product (1, 2, 3...)
    public string Name { get; set; } = "";      // Name of the product e.g. "Arduino Uno"
    public string Sku { get; set; } = "";       // Short code e.g. "ARD-001"
    public string Category { get; set; } = "";  // e.g. "Electronics"
    public int Quantity { get; set; }           // How many are in stock right now
    public int Threshold { get; set; } = 10;    // When quantity goes below this → low stock alert
    public decimal Price { get; set; }          // Price per unit


    public string Status
    {
        get
        {
            if (Quantity == 0)               return "Out of Stock";
            else if (Quantity <= Threshold)  return "Low Stock";
            else                             return "In Stock";
        }
    }
}


// ----------------------------------------------------------
// This is the StockMovement class.
// Every time stock goes IN or OUT, we save one of these.
// It is our history / audit trail.
// ----------------------------------------------------------

public class StockMovement
{
    public int Id { get; set; }                        // Unique number for this movement
    public int ProductId { get; set; }                 // Which product this movement belongs to
    public string ProductName { get; set; } = "";      // Product name (stored for easy display)
    public string Type { get; set; } = "";             // "In" or "Out"
    public int Quantity { get; set; }                  // How many units moved
    public int QuantityBefore { get; set; }            // Stock level before this movement
    public int QuantityAfter { get; set; }             // Stock level after this movement
    public string Note { get; set; } = "";             // Optional note e.g. "Received from supplier"
    public DateTime Date { get; set; } = DateTime.Now; // When this happened
    public bool IsHidden { get; set; } = false;    
}

public class StockUpdateRequest
    {
        public string Type { get; set; } = "";
        public int Quantity { get; set; }
        public string? Note { get; set; }
    }
