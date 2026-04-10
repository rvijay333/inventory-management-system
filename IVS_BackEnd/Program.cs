using InventoryManagementSystem;
using Microsoft.EntityFrameworkCore; 

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<InventoryService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContextFactory<AppDbContext>(options =>
    options.UseSqlite(connectionString));


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});



var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    if (!db.Products.Any())
    {
        db.Products.AddRange(
            new Product { Name = "Arduino Uno R3",     Sku = "ARD-001",  Category = "Electronics", Quantity = 45, Threshold = 10, Price = 850  },
            new Product { Name = "Raspberry Pi 4B",    Sku = "RPI-004",  Category = "Electronics", Quantity = 6,  Threshold = 8,  Price = 4500 },
            new Product { Name = "USB-C Cable 2m",     Sku = "CAB-USB2", Category = "Accessories", Quantity = 0,  Threshold = 15, Price = 299  },
            new Product { Name = "Soldering Iron Kit", Sku = "TOOL-SI1", Category = "Tools",       Quantity = 3,  Threshold = 5,  Price = 750  },
            new Product { Name = "Multimeter Pro",     Sku = "TOOL-MM1", Category = "Tools",       Quantity = 12, Threshold = 4,  Price = 1800 },
            new Product { Name = "Jumper Wire Set",    Sku = "JMP-SET",  Category = "Electronics", Quantity = 55, Threshold = 20, Price = 89   }
        );
        db.SaveChanges();
    }
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowAll");
app.UseCors("AllowAngular");

//MapGet("URL", handlerFunction)
app.MapGet("/api/products", (InventoryService service, string? search) =>
{
    string searchTerm = search ?? "";
    List<Product> products = service.GetAllProducts(searchTerm);
    return Results.Ok(products);
});      // HTTP response = 200 + data (list of products in JSON format)


app.MapGet("/api/products/{id}", (InventoryService service, int id) =>
{
    Product? product = service.GetProductById(id);
    if (product == null)
        return Results.NotFound("Product with Id " + id + " was not found.");
    return Results.Ok(product);
});


app.MapPost("/api/products", (InventoryService service, Product newProduct) =>
{
    if (string.IsNullOrEmpty(newProduct.Name) || string.IsNullOrEmpty(newProduct.Sku))
        return Results.BadRequest("Product Name and SKU are required."); // 400 code + error message

    Product created = service.AddProduct(newProduct);
    return Results.Created("/api/products/" + created.Id , created); // 201 code = location of created resource + resource (data)
});

app.MapPut("/api/products/{id}", (InventoryService service, int id, Product updatedProduct) =>
{
    bool success = service.UpdateProduct(id, updatedProduct);
    if (!success)
        return Results.NotFound("Product with Id " + id + " was not found."); // 404 code + error message

    Product? updated = service.GetProductById(id);
    return Results.Ok(updated);
});


app.MapDelete("/api/products/{id}", (InventoryService service, int id) =>
{
    bool success = service.DeleteProduct(id);
    if (!success)
        return Results.NotFound("Product with Id " + id + " was not found.");

    return Results.NoContent();// 204 code, no data 
});

app.MapPost("/api/products/{id}/stock", (InventoryService service, int id, StockUpdateRequest request) =>
{
    if (request.Type != "In" && request.Type != "Out")
        return Results.BadRequest("Type must be 'In' or 'Out'.");

    if (request.Quantity < 1)
        return Results.BadRequest("Quantity must be at least 1.");

    string result = service.UpdateStock(id, request.Type, request.Quantity, request.Note ?? "");

    if (result.StartsWith("Error"))
        return Results.BadRequest(result);

    Product? updated = service.GetProductById(id);
    return Results.Ok(updated);
});


app.MapGet("/api/alerts", (InventoryService service) =>
{
    List<Product> alerts = service.GetAlerts();
    return Results.Ok(alerts);
});

app.MapGet("/api/history", (InventoryService service) =>
{
    List<StockMovement> history = service.GetHistory();
    return Results.Ok(history);
});


app.MapPost("/api/history/hide", (InventoryService service) =>
{
    service.HideHistory();
    return Results.Ok("History hidden.");
});


app.Run();

