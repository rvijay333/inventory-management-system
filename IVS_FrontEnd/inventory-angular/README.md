# InventoryAngular

This project is the frontend for the Inventory Management System and uses the existing code exactly as written in the project files. This README can be used for presentation study prep and reflects your current, unmodified app logic.

---

## 1) What this app does

- Shows a product table loaded from backend API.
- Provides search filtering by name and SKU.
- Supports creating, updating, deleting products.
- Supports stock in/out operations with note records.
- Shows low-stock and out-of-stock alert badges.
- Displays stock movement history.
- Displays summary statistics (total, in stock, low stock, out of stock).

---

## 2) Getting started

From `IVS_FrontEnd/inventory-angular`:

```bash
npm install
ng serve
```

Then open `http://localhost:4200`.

---

## 3) Key source files (your exact code)

### 3.1 `src/app/app.ts`

- Root component class, holding app state and functions.
- `products: Product[]`, `alerts: Product[]`, `history: HistoryEntry[]`, `stats: Stats`.
- `searchTerm`, `activeTab`, `showProductModal`, `showStockModal`.
- `ngOnInit()` calls `loadProducts()`, `loadAlerts()`, `loadHistory()` once on startup.
- `loadProducts()` calls `inventoryService.getProducts(searchTerm)` and sets `products` then `calculateStats()`.
- `loadAlerts()` and `loadHistory()` query backend APIs.
- `calculateStats()` computes counts using filters over `products`.
- Actions:
  - `openProductModal()`, `editProduct()`, `closeProductModal()`
  - `saveProduct()` chooses create/update path
  - `deleteProduct()` confirms then deletes
  - `openStockModal()`, `updateStock()`, `closeStockModal()` updates stock

### 3.2 `src/app/app.html`

Directives used exactly as coded:

- `[(ngModel)]="searchTerm"`, `[(ngModel)]="productForm.name"`, etc.
- `*ngIf` for conditional blocks (alerts, modals, tabs).
- `*ngFor="let product of products"` to render rows.
- `(click)` event handlers map to methods in `app.ts`.
- Interpolation `{{ stats.total }}`, `{{ product.quantity }}`.
- Pipes `{{ product.price | currency }}` and `{{ entry.date | date:'short' }}`.

### 3.3 `src/app/services/inventory.service.ts`

All API calls exactly as present:

- `getProducts(search)`  GET `/api/products` with optional `search` query.
- `getProduct(id)`  GET `/api/products/{id}`.
- `createProduct(product)`  POST `/api/products`.
- `updateProduct(id, product)`  PUT `/api/products/{id}`.
- `deleteProduct(id)`  DELETE `/api/products/{id}`.
- `updateStock(productId, update)`  POST `/api/products/{productId}/stock`.
- `getAlerts()`  GET `/api/alerts`.
- `getHistory()`  GET `/api/history`.
- `clearHistory()`  DELETE `/api/history`.

### 3.4 `src/app/models/inventory.models.ts`

TypeScript interfaces exactly as shown in your code:

- Product { id, name, sku, category, price, quantity, threshold, status }
- ProductForm { name, sku, category, price, quantity, threshold }
- StockUpdate { type, quantity, note }
- HistoryEntry { id, productName, type, quantity, quantityBefore, quantityAfter, note, date }
- Stats { total, inStock, low, out }

---

## 4) Component route flows (without code changes)

### 4.1 Search request

1. User types in `app.html` search input.
2. `loadProducts()` is triggered by `(input)` event.
3. `inventoryService.getProducts(searchTerm)` sends backend API call.
4. Response updates `products` and recalculates stats.
5. Table rerenders automatically.

### 4.2 Add/edit/delete product

- `saveProduct()` uses form state and calls service.
- `createProduct()` or `updateProduct()` endpoint from service.
- On success, calls `loadProducts()` and hides modal.
- `deleteProduct()` uses confirmation and calls backend.

### 4.3 Stock update

- `openStockModal(product)` sets form state for a product.
- `updateStock()` sends `StockUpdate` object with type/note.
- On success, reloads products, alerts, history.

### 4.4 Alerts and history

- `loadHistory()` uses `/api/history`.
- `loadAlerts()` uses `/api/alerts`.

---

## 5) What remains unchanged

- All frontend code is kept exactly as in the repo.
- No modifications were introduced in `app.ts`, `app.html`, `inventory.service.ts`, or `inventory.models.ts`.
- This README describes what is already in place.

---

## 6) Quick demo checklist

- Run backend: `cd IVS_BackEnd && dotnet run`
- Run frontend: `cd IVS_FrontEnd/inventory-angular && ng serve`
- Open `http://localhost:4200`
- Verify:
  - Product list appears
  - Search works
  - Add product works
  - Edit product works
  - Delete product works
  - Stock in/out works
  - History tab has entries
  - Alerts show low/out-of-stock products

---

## 7) Prepped presentation sentences

- "This Angular app renders the UI and executes user actions through `app.ts` and `app.html`."
- "The service layer in `inventory.service.ts` talks to backend endpoints using HttpClient."
- "Model definitions in `inventory.models.ts` ensure type safety and match backend data."
- "No behavior or logic was altered while preparing this explanation; this mirrors the exact code."

---

## 8) Additional help

If you want, I can also generate a short cheat sheet markdown bullet list based on this exact code for quick memory during your talk.
