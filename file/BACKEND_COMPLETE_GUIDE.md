# INVENTORY MANAGEMENT SYSTEM - BACKEND COMPLETE GUIDE
*Your Presentation Guide - Everything Explained*

---

## 📌 TABLE OF CONTENTS
1. [What is an API?](#what-is-an-api)
2. [Project Overview](#project-overview)
3. [Architecture Diagram](#architecture-diagram)
4. [Backend Structure](#backend-structure)
5. [Each File Explained](#each-file-explained)
6. [How Data Flows](#how-data-flows)
7. [All API Endpoints](#all-api-endpoints)
8. [Business Logic Explained](#business-logic-explained)
9. [Key Concepts](#key-concepts)
10. [Q&A for Your Presentation](#qa-for-your-presentation)

---

## 🤔 What is an API?

**API = Application Programming Interface**

Think of an API like a **restaurant menu**:
- You (the Frontend/User) don't cook the food yourself
- The restaurant (the Backend/Server) has a kitchen that knows how to cook
- The **menu** (the API) is the agreement between you and the restaurant
- You order using the menu → the kitchen prepares it → you get the result

**In our project:**
- The Frontend (HTML, JavaScript, Angular) is the **customer** ordering food
- The Backend (.NET/C#) is the **kitchen** preparing food
- The **API Endpoints** (like `/api/products`) are the **menu items** available to order
- HTTP Methods (GET, POST, PUT, DELETE) are the **types of orders** you can place

---

## 👁️ Project Overview

**What does this system do?**

This is an **Inventory Management System** - it manages products and their stock levels.

Real-world analogy:
- **What:** A company has products (Arduino boards, cables, tools, etc.)
- **Why:** They need to track how many of each product is in stock
- **Problem:** When stock runs low, they want alerts. They want to see history of all stock movements
- **Solution:** This system lets them see products, add products, update stock, and see alerts

**Key Features:**
1. ✅ View all products
2. ✅ Search for products
3. ✅ Add new products
4. ✅ Update product details
5. ✅ Delete products
6. ✅ Add stock (inventory comes in)
7. ✅ Remove stock (inventory goes out)
8. ✅ View low stock alerts
9. ✅ View complete history of all stock movements

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (User Interface)                 │
│  (Angular App, HTML, CSS, JavaScript - runs in browser)     │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ Makes HTTP Requests
                 │ (GET, POST, PUT, DELETE)
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (This Code)                        │
│              (.NET 9.0 / C# - runs on server)               │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Program.cs                                           │   │
│  │ ├─ Starts the server                                 │   │
│  │ ├─ Sets up API endpoints (6 endpoints)              │   │
│  │ ├─ Enables CORS (lets Frontend talk to Backend)     │   │
│  │ └─ Enables Swagger (test API in browser)            │   │
│  └────────────┬─────────────────────────────────────────┘   │
│               │                                              │
│               │ Calls methods from                           │
│               ▼                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ InventoryService.cs (Business Logic)                │   │
│  │ ├─ GetAllProducts()    - fetch products             │   │
│  │ ├─ GetProductById()    - find one product           │   │
│  │ ├─ AddProduct()        - create new product         │   │
│  │ ├─ UpdateProduct()     - modify product             │   │
│  │ ├─ DeleteProduct()     - remove product             │   │
│  │ ├─ UpdateStock()       - change stock quantity      │   │
│  │ ├─ GetAlerts()         - show low stock items       │   │
│  │ └─ GetHistory()        - show stock movements       │   │
│  └────────────┬─────────────────────────────────────────┘   │
│               │                                              │
│               │ Works with data structures                   │
│               ▼                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Models.cs (Data Structures)                          │   │
│  │ ├─ Product         - represents an item in stock    │   │
│  │ ├─ StockMovement   - records of stock changes       │   │
│  │ └─ StockUpdateRequest - data container for updates  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ In-Memory Storage (Lists - NO DATABASE)              │   │
│  │ ├─ products list     - stores all products           │   │
│  │ └─ movements list    - stores all stock changes      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Backend Structure

```
IVS_BackEnd/
├── Program.cs                    ← ENTRY POINT (Where everything starts)
├── Models.cs                     ← Data structures (Product, StockMovement)
├── InventoryService.cs           ← Business logic (all operations)
├── InventoryManagementSystem.csproj  ← Project configuration
├── InventoryManagementSystem.http    ← API test file (like Postman)
├── appsettings.json              ← Configuration settings
└── bin/, obj/                    ← Compiled code (created during build)
```

---

## 📄 Each File Explained

### 1️⃣ **Models.cs** - The Data Structures

This file defines the **shape** of the data in our system.

```csharp
public class Product
{
    public int Id { get; set; }                 // Unique identifier (1, 2, 3...)
    public string Name { get; set; } = "";      // Product name (e.g., "Arduino Uno")
    public string Sku { get; set; } = "";       // SKU code (e.g., "ARD-001")
    public string Category { get; set; } = "";  // Category (e.g., "Electronics")
    public int Quantity { get; set; }           // Current stock quantity
    public int Threshold { get; set; } = 10;    // Low stock alert threshold
    public decimal Price { get; set; }          // Price per unit
    
    public string Status  // COMPUTED PROPERTY (calculated on the fly)
    {
        get
        {
            if (Quantity == 0)
                return "Out of Stock";
            else if (Quantity <= Threshold)
                return "Low Stock";
            else
                return "In Stock";
        }
    }
}
```

**What is a Property vs Method?**
- Property: accessed with `.FieldName` (like `product.Name`)
- Method: called with `.MethodName()` (like `product.GetStatus()`)
- The `Status` property is **computed** - it calculates based on other fields

**Why this design?**
- `Id`: Every product needs a unique identifier for searching/updating
- `Sku`: Products in real warehouses have SKU codes (barcode numbers)
- `Quantity`: We need to track current stock
- `Threshold`: If stock drops below this, we show an alert
- `Status`: Tells us at a glance if stock is critical

---

**StockMovement Class:**

```csharp
public class StockMovement
{
    public int Id { get; set; }                    // Unique ID for this movement
    public int ProductId { get; set; }             // Which product this affects
    public string ProductName { get; set; } = "";  // Product name (for display)
    public string Type { get; set; } = "";         // "In" or "Out"
    public int Quantity { get; set; }              // How many units moved
    public int QuantityBefore { get; set; }        // Stock level BEFORE change
    public int QuantityAfter { get; set; }         // Stock level AFTER change
    public string Note { get; set; } = "";         // Optional note
    public DateTime Date { get; set; }             // When this happened
}
```

**Why do we need StockMovement?**
- It's like a **bank statement** for inventory
- Every time stock goes in or out, we record it
- Allows us to see **history** and **audit trail**
- Can answer questions like: "When did we run out of this product?"

---

### 2️⃣ **InventoryService.cs** - The Business Logic

This is the **brain** of the backend. It contains all the operations.

```csharp
public class InventoryService
{
    // DATA STORAGE (In-Memory - no database)
    private List<Product> products = new List<Product>();
    private List<StockMovement> movements = new List<StockMovement>();
    
    // AUTO-INCREMENT COUNTERS
    private int nextProductId = 1;
    private int nextMovementId = 1;
```

**What are these?**
- `products`: A C# List (like an array) that stores all Product objects
- `movements`: A C# List that stores all StockMovement records
- `nextProductId`: Counter that ensures each new product gets a unique ID
- `nextMovementId`: Counter that ensures each stock movement gets a unique ID

**Why auto-increment counters?**
- When we add a new product, we don't manually assign IDs
- The counter automatically gives the next available ID
- This prevents duplicate IDs and keeps things organized

---

**The Constructor - Initial Data:**

```csharp
public InventoryService()
{
    // Add sample products so the system isn't empty on startup
    products.Add(new Product { 
        Id = nextProductId++,  // Use current ID, then increment
        Name = "Arduino Uno R3",
        Sku = "ARD-001",
        Category = "Electronics",
        Quantity = 45,
        Threshold = 10,
        Price = 850
    });
    // ... more products
}
```

**What happens here?**
1. When the service starts, it loads 6 sample products
2. `nextProductId++` means: "use the current value, then add 1"
3. After first product: `nextProductId` becomes 2
4. This ensures the 2nd product gets ID = 2
5. Without sample data, the system would be empty

---

**The GetAllProducts() Method:**

```csharp
public List<Product> GetAllProducts(string search = "")
{
    // If no search term, return everything
    if (string.IsNullOrEmpty(search))
    {
        return products;
    }

    // Otherwise, search by Name or SKU
    List<Product> results = new List<Product>();
    
    foreach (Product p in products)
    {
        bool nameMatches = p.Name.ToLower().Contains(search.ToLower());
        bool skuMatches = p.Sku.ToLower().Contains(search.ToLower());
        
        if (nameMatches || skuMatches)
        {
            results.Add(p);
        }
    }
    
    return results;
}
```

**How does this work?**
1. **Parameter:** `search = ""` means search is optional (default is empty string)
2. **Step 1:** If no search term, return ALL products
3. **Step 2:** Create empty results list
4. **Step 3:** Loop through each product
5. **Step 4:** Check if product name OR SKU contains the search term
6. **Step 5:** ToLower() makes it case-insensitive (e.g., "ARDUINO" = "arduino")
7. **Step 6:** Return only matching products

**Example:**
- Search: "arduino"
- Checks: "Arduino Uno R3".ToLower() = "arduino uno r3"
- Result: "arduino uno r3".Contains("arduino") = TRUE ✓
- Product is added to results

---

**The UpdateStock() Method - Core Logic:**

```csharp
public string UpdateStock(int productId, string type, int quantity, string note)
{
    // STEP 1: Find the product
    Product? product = GetProductById(productId);
    
    if (product == null)
    {
        return "Error: Product not found.";
    }
    
    // STEP 2: Business Rule Check
    // Cannot remove more than currently in stock
    if (type == "Out" && quantity > product.Quantity)
    {
        return "Error: Cannot remove " + quantity + " units. Only " + 
               product.Quantity + " in stock.";
    }
    
    // STEP 3: Remember quantity BEFORE change
    int quantityBefore = product.Quantity;
    
    // STEP 4: Apply the change
    if (type == "In")
    {
        product.Quantity = product.Quantity + quantity;
    }
    else // type == "Out"
    {
        product.Quantity = product.Quantity - quantity;
    }
    
    // STEP 5: Create history record
    StockMovement movement = new StockMovement
    {
        Id = nextMovementId,
        ProductId = productId,
        ProductName = product.Name,
        Type = type,
        Quantity = quantity,
        QuantityBefore = quantityBefore,
        QuantityAfter = product.Quantity,
        Note = note,
        Date = DateTime.Now
    };
    
    nextMovementId++;
    movements.Add(movement);
    
    return "Success";
}
```

**This is the most important method! Let's break it down:**

**STEP 1: Find the product**
- Uses `GetProductById()` to find the product
- The `?` means the result can be null (not found)

**STEP 2: Business rule check**
- Rule: Can't remove more units than are in stock
- If someone tries to remove 100 items but only 20 exist → Error
- This prevents negative inventory

**STEP 3: Remember the "before" state**
- We save the quantity BEFORE the change
- Why? So we can show the change in history

**STEP 4: Apply the change**
- If "In": Quantity increases
- If "Out": Quantity decreases

**STEP 5: Create history record**
- Creates a StockMovement object with all details
- This becomes the audit trail
- Shows what changed, when, and by how much

**Example Flow:**
```
Product: Arduino (currently has 45 units)
User: Upload 10 more units

Step 1: Find Arduino (found ✓)
Step 2: Check if we can remove 10 (we're adding, so passes ✓)
Step 3: Remember: quantityBefore = 45
Step 4: Calculate: quantity = 45 + 10 = 55
Step 5: Record movement:
        - Before: 45
        - After: 55
        - Quantity changed: +10
        - DateTime: Now
```

---

**The GetAlerts() Method:**

```csharp
public List<Product> GetAlerts()
{
    List<Product> alerts = new List<Product>();
    
    foreach (Product p in products)
    {
        if (p.Status == "Low Stock" || p.Status == "Out of Stock")
        {
            alerts.Add(p);
        }
    }
    
    return alerts;
}
```

**What it does:**
- Returns only products that are low stock or out of stock
- Used to show warnings/alerts on the frontend
- Example: If Raspberry Pi has 6 units but threshold is 8, it shows as "Low Stock"

---

### 3️⃣ **Program.cs** - The Server Setup

This file is the **entry point** - where everything starts.

```csharp
using InventoryManagementSystem;

var builder = WebApplication.CreateBuilder(args);
```

**What is WebApplication.CreateBuilder()?**
- It creates a builder object that configures the web server
- Think of it as "preparing the kitchen"

---

**Setting up the Service (Dependency Injection):**

```csharp
builder.Services.AddSingleton<InventoryService>();
```

**What is this?**
- `AddSingleton` means: Create ONE instance of InventoryService and reuse it forever
- Why? So all requests share the same data (products list)
- If we didn't do this, each request would get a new empty service

**Analogy:**
- `AddSingleton`: One waiter for the entire restaurant
- `AddTransient`: A new waiter for each customer
- `AddScoped`: A new waiter for each table session

We use Singleton because we want all users to see the same product data.

---

**Setting up Swagger:**

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
```

**What is Swagger?**
- It's an interactive API documentation tool
- Run the server and go to `http://localhost:5059/swagger`
- You can see all endpoints and test them in the browser
- No need for external tools like Postman

---

**Setting up CORS (Cross-Origin Resource Sharing):**

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

**Why do we need CORS?**
- The Frontend runs on `localhost:4200` (different port)
- The Backend runs on `localhost:5059`
- Browsers block requests between different origins (ports) for security
- CORS says: "It's OK for localhost:4200 to talk to us"

**`AllowAnyOrigin()` = any website can access**
**`AllowAnyMethod()` = GET, POST, PUT, DELETE all allowed**
**`AllowAnyHeader()` = any HTTP headers allowed**

**Why two policies?**
- `AllowAll`: Allows any origin (unsafe for production, good for testing)
- `AllowAngular`: Specifically allows `http://localhost:4200` (our Angular app)

---

**The 6 API Endpoints:**

These are like the "menu items" the frontend can order:

```csharp
// ENDPOINT 1: GET ALL PRODUCTS
app.MapGet("/api/products", (InventoryService service, string? search) =>
{
    string searchTerm = search ?? "";
    List<Product> products = service.GetAllProducts(searchTerm);
    return Results.Ok(products);  // Sends list back as JSON
});
```

**How this works:**
1. Frontend calls: `GET http://localhost:5059/api/products?search=arduino`
2. `MapGet` catches this request
3. The `search` parameter is extracted from the URL (`?search=arduino`)
4. `??` operator: If search is null, use empty string instead
5. Calls service method to get products
6. `Results.Ok()` returns the data as JSON with status 200

---

## 🔄 How Data Flows

**Example: User searches for "Arduino"**

```
USER (Frontend)
    │
    └─→ Clicks search, types "Arduino"
        │
        └─→ Sends HTTP request:
            GET /api/products?search=Arduino
        │
        └─→ BACKEND receives request
            │
            └─→ Program.cs MapGet catches it
                │
                └─→ Extracts search parameter: "Arduino"
                    │
                    └─→ Calls InventoryService.GetAllProducts("Arduino")
                        │
                        └─→ Loops through products list
                            │
                            └─→ "Arduino Uno R3".Contains("Arduino") = TRUE ✓
                            └─→ "Raspberry Pi".Contains("Arduino") = FALSE ✗
                        │
                        └─→ Returns: [{ Arduino product }]
                    │
                    └─→ Program.cs sends back JSON response
            │
        └─→ Frontend receives response as JSON
            │
            └─→ Shows results to user
```

---

## 📡 All API Endpoints

### **ENDPOINT 1: GET ALL PRODUCTS**
```
REQUEST:  GET /api/products?search=arduino
RESPONSE: 200 OK
[
  {
    "id": 1,
    "name": "Arduino Uno R3",
    "sku": "ARD-001",
    "category": "Electronics",
    "quantity": 45,
    "threshold": 10,
    "price": 850,
    "status": "In Stock"
  }
]
```

**When used:** On page load, after search

---

### **ENDPOINT 2: GET ONE PRODUCT**
```
REQUEST:  GET /api/products/1
RESPONSE: 200 OK
{
  "id": 1,
  "name": "Arduino Uno R3",
  "sku": "ARD-001",
  ...
}

If not found:
RESPONSE: 404 NOT FOUND
"Product with Id 1 was not found."
```

**When used:** When viewing details of one product

---

### **ENDPOINT 3: ADD NEW PRODUCT**
```
REQUEST:  POST /api/products
BODY:
{
  "name": "New Product",
  "sku": "NEW-001",
  "category": "Electronics",
  "quantity": 10,
  "threshold": 5,
  "price": 1000
}

RESPONSE: 201 CREATED
{
  "id": 7,  ← Auto-generated
  "name": "New Product",
  ...
}

Error: 400 BAD REQUEST
"Product Name and SKU are required."
```

**When used:** Creating new product

---

### **ENDPOINT 4: UPDATE A PRODUCT**
```
REQUEST:  PUT /api/products/1
BODY:
{
  "name": "Arduino Uno R3 V2",
  "sku": "ARD-001",
  ...
}

RESPONSE: 200 OK
{
  "id": 1,
  "name": "Arduino Uno R3 V2",
  ...
}

Error: 404 NOT FOUND
"Product with Id 1 was not found."
```

**When used:** Editing product details

---

### **ENDPOINT 5: DELETE A PRODUCT**
```
REQUEST:  DELETE /api/products/1

RESPONSE: 204 NO CONTENT
(Empty body - just means "success")

Error: 404 NOT FOUND
"Product with Id 1 was not found."
```

**When used:** Removing a product from inventory

---

### **ENDPOINT 6: UPDATE STOCK**
```
REQUEST:  POST /api/products/1/stock
BODY:
{
  "type": "In",
  "quantity": 10,
  "note": "Received from supplier ABC"
}

RESPONSE: 200 OK
"Success"

Error cases:
"Type must be 'In' or 'Out'."
"Quantity must be at least 1."
"Error: Cannot remove 100 units. Only 45 in stock."
```

**When used:** Adding or removing stock

---

## 💭 Business Logic Explained

### **What is Business Logic?**
Business logic = the **rules** of how the system should behave

**Examples in this system:**

1. **Unique IDs**
   - Every product must have a unique ID
   - Auto-increment ensures this automatically

2. **Stock can't go negative**
   - Can't remove more units than currently in stock
   - Prevents: "Remove 100 but only 5 exist" errors

3. **Status calculation**
   - If Quantity = 0 → "Out of Stock"
   - If Quantity ≤ Threshold → "Low Stock"
   - Otherwise → "In Stock"

4. **Audit trail**
   - Every stock movement is recorded
   - Can't delete history (well, there is `ClearHistory()` but shouldn't use it)
   - Provides accountability

5. **Search is case-insensitive**
   - Search for "arduino" or "ARDUINO" both work
   - ToLower() ensures this

---

## 🎓 Key Concepts

### **1. HTTP Methods (CRUD Operations)**

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Read data | Fetch product list |
| POST | Create data | Add new product |
| PUT | Update data | Change product price |
| DELETE | Remove data | Delete product |

Why do we need different methods?
- It's a **semantic convention** - tells the server what you're trying to do
- GET is safe (doesn't change anything), POST/PUT/DELETE change data
- Security tools can restrict these differently

---

### **2. Status Codes**

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Request succeeded |
| 201 | Created | New resource was created |
| 204 | No Content | Request succeeded but nothing returned |
| 400 | Bad Request | Invalid data sent |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Something broke |

---

### **3. JSON Format**

```json
{
  "id": 1,
  "name": "Arduino",
  "quantity": 45,
  "status": "In Stock"
}
```

**Why JSON?**
- Universal format (every language can read/write it)
- Human readable
- Easy to parse

---

### **4. In-Memory Storage**

```csharp
private List<Product> products = new List<Product>();
```

**What is this?**
- Data stored in RAM (computer memory)
- NOT in a database
- When server restarts, all data is lost

**Why use in-memory?**
- Simple for learning/demos
- Fast (no database queries)
- Disadvantage: Can't persist data

**In production:**
- Would use SQL Server, PostgreSQL, MongoDB
- Data survives server restarts

---

### **5. Auto-Increment Pattern**

```csharp
private int nextProductId = 1;

public Product AddProduct(Product newProduct)
{
    newProduct.Id = nextProductId;
    nextProductId = nextProductId + 1;  // or nextProductId++
    products.Add(newProduct);
    return newProduct;
}
```

**How it works:**
1. Start with nextProductId = 1
2. Assign ID 1 to first product
3. Increment to 2
4. Assign ID 2 to second product
5. Continue...

**Result:** Each product gets unique ID automatically

---

## ❓ Q&A for Your Presentation

### **Q1: "What does the backend do?"**
A: The backend stores data and performs operations. When the frontend asks for products, the backend searches the database, validates rules, and sends back the results.

---

### **Q2: "Why do we need a backend? Can't the frontend do everything?"**
A: No, because:
- If data was only in the browser, losing the tab loses all data
- Multiple users can't see the same data
- Security: Sensitive operations should happen on the server
- Performance: Heavy calculations on server, not user's computer

---

### **Q3: "What if we tried to remove 100 items but only 50 exist?"**
A: The backend checks this rule:
```csharp
if (type == "Out" && quantity > product.Quantity)
    return "Error: Cannot remove...";
```
It prevents the operation and sends an error message back.

---

### **Q4: "How does the frontend know we updated the product?"**
A: The backend sends back the updated product:
```csharp
Product? updated = service.GetProductById(id);
return Results.Ok(updated);  // Sends updated data
```
Then frontend's code can refresh the display.

---

### **Q5: "What happens when two users try to update the same product?"**
A: With in-memory storage, it's not handled (race condition).
In real databases, use transactions/locks.

---

### **Q6: "Why Swagger?"**
A: It's a built-in test tool. Go to `/swagger` and test all endpoints without writing any frontend code.

---

### **Q7: "What does 'Status' do?"**
A: It's a computed property that tells us the stock level at a glance:
```csharp
if (Quantity == 0)           return "Out of Stock";
else if (Quantity <= 10)     return "Low Stock";
else                         return "In Stock";
```

---

### **Q8: "Why record history?"**
A: For audit trail - can answer:
- When did we run out of this product?
- Who added stock and when?
- Is stock matching physical count?

---

### **Q9: "What does CORS do?"**
A: It allows the frontend (running on port 4200) to make requests to the backend (port 5059). Without it, browsers block cross-port requests for security.

---

### **Q10: "Is this okay for production?"**
A: NO! Issues:
- No database (data lost on restart)
- No authentication (anyone can access)
- No logging
- Cannot handle thousands of users
- Not scalable

Would need: Database, Auth, Error handling, Caching, etc.

---

## 🎯 Quick Summary for Presentation

**What is the project?**
- Inventory management system for tracking products and stock levels

**What does it do?**
- Store products, search them, update stock, show alerts, keep history

**How many endpoints?**
- 6 endpoints: All products, One product, Add, Update, Delete, Update stock

**What technology?**
- .NET 9.0 (C#) framework for building APIs

**How is data stored?**
- In-memory lists (not database) - simple for learning

**Why backend?**
- Multiple users share data, security, reliability

**Key concepts?**
- HTTP methods (GET/POST/PUT/DELETE)
- APIs return JSON
- Status codes (200, 404, etc.)
- CORS for cross-origin requests
- Audit trails for history

---

**Practice saying:** "The backend is an API that manages product data. When the frontend asks for products, the backend validates the request, applies business rules, updates the data, and sends back JSON responses. It keeps everything organized and ensures data integrity with validation rules."

---
