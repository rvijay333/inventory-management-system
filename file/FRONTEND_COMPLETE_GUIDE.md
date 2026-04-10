# INVENTORY MANAGEMENT SYSTEM - FRONTEND COMPLETE GUIDE
*Your Complete Frontend Explanation*

---

## 📌 TABLE OF CONTENTS
1. [What is Angular?](#what-is-angular)
2. [Project Structure](#project-structure)
3. [How Frontend & Backend Talk](#how-frontend--backend-talk)
4. [app.ts - The Main Component](#appts---the-main-component)
5. [inventory.service.ts - API Calls](#inventoryservicets---api-calls)
6. [inventory.models.ts - Data Types](#inventorymodelsts---data-types)
7. [app.html - The Template](#apphtml---the-template)
8. [Two-Way Binding Explained](#two-way-binding-explained)
9. [Data Flow Through the App](#data-flow-through-the-app)
10. [Key Angular Concepts](#key-angular-concepts)

---

## 🤔 What is Angular?

**Angular is a JavaScript framework for building web applications.**

Think of it like this:
- **Vanilla JavaScript (Old Way):** You manually update HTML every time data changes
- **Angular (New Way):** It automatically updates HTML when data changes (reactive)

**Why Angular?**
- 🔄 Two-way data binding (see changes instantly)
- 🧩 Reusable components
- 📋 Organized structure (Components, Services, Models)
- 🛡️ Type safety with TypeScript
- 📦 Built-in tools (routing, forms, HTTP)

**Angular Versions:**
- Angular 1: AngularJS (very old)
- Angular 2-16: Standard versions
- Angular 17+ (latest): New standalone components (simpler, no NgModule)

**Your project uses:** Angular 21 with standalone components

---

## 📁 Frontend Project Structure

```
inventory-angular/
├── src/
│   ├── index.html              ← Entry point (contains <app-root>)
│   ├── main.ts                 ← Bootstrap file (loads Angular)
│   ├── styles.css              ← Global styles
│   └── app/                    ← Main component (your app)
│       ├── app.ts              ← Root component class (logic)
│       ├── app.html            ← Root component template (UI)
│       ├── app.css             ← Component styles
│       ├── models/
│       │   └── inventory.models.ts  ← TypeScript interfaces (data types)
│       └── services/
│           └── inventory.service.ts ← API communication
├── angular.json                ← Angular build configuration
├── package.json                ← Dependencies (npm packages)
└── tsconfig.json               ← TypeScript configuration
```

---

## 🔗 How Frontend & Backend Talk

```
┌──────────────────────────────┐
│    FRONTEND (Angular App)    │
│  Runs in browser (browser)   │
└──────────────┬───────────────┘
               │
               │ Makes HTTP request
               │ (GET /api/products)
               ▼
┌──────────────────────────────┐
│   BACKEND (.NET API Server)  │
│   Runs on computer (server)  │
├──────────────────────────────┤
│ • Processes request          │
│ • Queries data               │
│ • Applies business rules     │
│ • Returns JSON response      │
└──────────────┬───────────────┘
               │
               │ Sends HTTP response
               │ (JSON data)
               ▼
┌──────────────────────────────┐
│    FRONTEND Receives Data    │
│  Updates HTML & variables    │
│  User sees new information   │
└──────────────────────────────┘
```

---

## 🎯 app.ts - The Main Component

This is the **heart** of your Angular app. It's equivalent to your original `inventory.js` but better organized.

### **Understanding the Structure**

```typescript
import { Component, OnInit } from '@angular/core';
```

**What is an import?**
- It loads code from another file/library
- `Component` and `OnInit` are Angular classes
- Lets us use them in this file

---

```typescript
@Component({
  selector: 'app-root',              // Matches <app-root> in HTML
  standalone: true,                  // No NgModule needed (modern Angular)
  imports: [CommonModule, FormsModule], // Import Angular directives/pipes
  templateUrl: './app.html',         // HTML file for this component
  styleUrl: './app.css'              // CSS file for this component
})
```

**What is a decorator?**
- The `@` symbol marks a decorator
- It's metadata that tells Angular what this class is
- `@Component` means "this class is an Angular component"

**Breaking down the config:**
- `selector`: When Angular sees `<app-root>`, it loads this component
- `standalone`: Modern Angular doesn't need NgModule wrapper
- `imports`: Brings in:
  - `CommonModule`: Gives you `*ngIf`, `*ngFor`, `| date` pipe, etc.
  - `FormsModule`: Gives you `[(ngModel)]` two-way binding
- `templateUrl`: Points to the HTML file
- `styleUrl`: Points to the CSS file

---

```typescript
export class AppComponent implements OnInit {
  // Properties (variables)
  products: Product[] = [];
  alerts: Product[] = [];
  history: HistoryEntry[] = [];
  stats: Stats = { total: 0, inStock: 0, low: 0, out: 0 };
  searchTerm: string = '';
  activeTab: 'products' | 'history' = 'products';
  showProductModal = false;
}
```

**What are these?**

| Variable | Type | Purpose |
|----------|------|---------|
| `products` | `Product[]` | List of all products to show in table |
| `alerts` | `Product[]` | List of low/out-of-stock items |
| `history` | `HistoryEntry[]` | List of stock movements |
| `stats` | `Stats` | Numbers for stat boxes (total, inStock, etc.) |
| `searchTerm` | `string` | What user typed in search box |
| `activeTab` | `'products' \| 'history'` | Which tab is currently shown |
| `showProductModal` | `boolean` | Should product modal be visible? |

**What is `Product[]`?**
- `[]` means array (list)
- `Product` is the type of items in the list
- Must match the interface from `inventory.models.ts`
- TypeScript will warn if you add wrong type

---

### **The Constructor**

```typescript
constructor(
  private inventoryService: InventoryService
) {}
```

**What is this?**
- Constructor runs when the component is created
- `private inventoryService: InventoryService` means:
  - Create a reference to the service
  - Call it `inventoryService` 
  - Type is `InventoryService`
  - `private` means only this component can use it

**Why inject the service?**
- So we can call methods like `inventoryService.getProducts()`
- Angular handles creating the service for us
- This is called "Dependency Injection"

---

### **The ngOnInit Method**

```typescript
ngOnInit() {
  this.loadProducts();
  this.loadAlerts();
  this.loadHistory();
}
```

**What is ngOnInit?**
- It's a lifecycle hook that runs once when component loads
- Like the code at the bottom of your original `inventory.js`
- Perfect place to load initial data

**What happens:**
1. Page loads
2. Angular creates AppComponent
3. Angular calls `ngOnInit()`
4. This loads products, alerts, and history from the backend
5. HTML updates automatically to show the data

---

### **The loadProducts() Method**

```typescript
loadProducts() {
  this.inventoryService.getProducts(this.searchTerm).subscribe({
    next: (data: Product[]) => {
      this.products = data;
      this.calculateStats();
    },
    error: (error) => {
      console.error('Error loading products:', error);
      alert('Could not load products. Is the backend running?');
    }
  });
}
```

**What is .subscribe()?**
- The service returns an "Observable" (like a Promise)
- `.subscribe()` registers a callback when the data arrives
- It's like saying "notify me when the API response arrives"

**Breaking it down:**

```typescript
this.inventoryService.getProducts(this.searchTerm)
  // API call (returns Observable)
  
.subscribe({
  next: (data: Product[]) => {
    // SUCCESS: data arrived
    this.products = data;  // Update component variable
    this.calculateStats(); // Recalculate stats
  },
  error: (error) => {
    // ERROR: something went wrong
    console.error('Error loading products:', error);
    alert('Could not load products. Is the backend running?');
  }
})
```

**Real-world analogy:**
```
You: "Hey delivery driver, bring my package"
Driver: "OK, I'm going..."
You: "Call me when it arrives"

[Later]
Driver calls: "Package arrived!"
You: Do something with the package
```

---

### **The calculateStats() Method**

```typescript
calculateStats() {
  this.stats.total = this.products.length;
  this.stats.inStock = this.products.filter(p => p.status === 'In Stock').length;
  this.stats.low = this.products.filter(p => p.status === 'Low Stock').length;
  this.stats.out = this.products.filter(p => p.status === 'Out of Stock').length;
}
```

**What is `.filter()`?**
- Array method that creates a new array with only items matching condition
- `products.filter(p => p.status === 'In Stock')`
  - Goes through each product `p`
  - Keeps only those where `p.status === 'In Stock'`
  - Returns new filtered array

**What is `.length`?**
- The number of items in the array
- `products.length` = how many products total
- `filtered.length` = how many match the condition

**Example:**
```
Products: [
  { name: 'Arduino', status: 'In Stock' },
  { name: 'Cable', status: 'Low Stock' },
  { name: 'Wire', status: 'Out of Stock' }
]

stats.total = 3  (all products)
stats.inStock = 1  (Arduino)
stats.low = 1  (Cable)
stats.out = 1  (Wire)
```

---

### **The saveProduct() Method**

```typescript
saveProduct() {
  if (!this.isFormValid()) return;
  
  if (this.editingProductId) {
    // UPDATE existing product
    this.inventoryService.updateProduct(
      this.editingProductId,
      this.productForm
    ).subscribe({
      next: () => {
        this.loadProducts();
        this.closeProductModal();
      }
    });
  } else {
    // CREATE new product
    this.inventoryService.createProduct(this.productForm).subscribe({
      next: () => {
        this.loadProducts();
        this.closeProductModal();
      }
    });
  }
}
```

**What happens:**
1. Check if form is valid
2. Check if editing or creating:
   - **Editing:** Use `updateProduct()` with ID
   - **Creating:** Use `createProduct()` (no ID needed)
3. After success, reload products list
4. Close the modal

---

### **The deleteProduct() Method**

```typescript
deleteProduct(id: number) {
  if (confirm('Are you sure?')) {
    this.inventoryService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      }
    });
  }
}
```

**What is `confirm()`?**
- Built-in browser function
- Shows "Yes/No" popup to user
- Returns `true` if user clicks "Yes", `false` if "No"
- Safety measure: prevents accidental deletes

---

### **The updateStock() Method**

```typescript
updateStock(productId: number) {
  const request = {
    type: this.stockType,
    quantity: this.stockQuantity,
    note: this.stockNote
  };
  
  this.inventoryService.updateStock(productId, request).subscribe({
    next: () => {
      this.loadProducts();
      this.loadHistory();
      this.loadAlerts();
      this.closeStockModal();
    }
  });
}
```

**What happens:**
1. Create an object with stock update details
2. Call the service
3. On success:
   - Reload products (quantities changed)
   - Reload history (new movement recorded)
   - Reload alerts (status might have changed)
   - Close the modal

---

## 🔌 inventory.service.ts - API Calls

This file handles all communication with the backend.

```typescript
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private API = 'http://localhost:5059';
  
  constructor(private http: HttpClient) {}
}
```

**What is @Injectable?**
- Marks this class as a service
- `providedIn: 'root'` creates ONE instance for the whole app
- All components use the same service (share the same methods)

**What is `private http: HttpClient`?**
- Angular's HTTP client for making requests
- Injected for us automatically
- Used to make GET, POST, PUT, DELETE requests

---

### **HTTP Methods in the Service**

**GET - Fetch all products**
```typescript
getProducts(search: string = ''): Observable<Product[]> {
  let params = new HttpParams();
  if (search) params = params.set('search', search);
  return this.http.get<Product[]>(`${this.API}/api/products`, { params });
}
```

**What is HttpParams?**
- Object for URL query parameters
- `?search=arduino` → params.set('search', 'arduino')
- Gets added to URL automatically

**What is `Observable<Product[]>`?**
- The return type
- `Observable` = will emit a value in the future
- `<Product[]>` = the value will be an array of Products

---

**POST - Create new product**
```typescript
createProduct(product: ProductForm): Observable<Product> {
  return this.http.post<Product>(`${this.API}/api/products`, product);
}
```

**What happens:**
1. Sends product data to `/api/products` endpoint
2. Backend creates new product
3. Backend returns created product (with ID)
4. Returns an Observable that emits the created product

---

**PUT - Update product**
```typescript
updateProduct(id: number, product: ProductForm): Observable<Product> {
  return this.http.put<Product>(`${this.API}/api/products/${id}`, product);
}
```

**Difference from POST:**
- PUT = update existing
- POST = create new
- Uses product ID in the URL path

---

**DELETE - Remove product**
```typescript
deleteProduct(id: number): Observable<void> {
  return this.http.delete<void>(`${this.API}/api/products/${id}`);
}
```

**What is `Observable<void>`?**
- `void` means nothing is returned
- Just confirms the delete succeeded
- No data to use, just confirmation

---

**POST - Update stock**
```typescript
updateStock(productId: number, update: StockUpdate): Observable<void> {
  return this.http.post<void>(
    `${this.API}/api/products/${productId}/stock`,
    update
  );
}
```

**Example request body:**
```json
{
  "type": "In",
  "quantity": 10,
  "note": "Received from supplier"
}
```

---

## 📋 inventory.models.ts - Data Types

This file defines TypeScript interfaces (blueprints for data).

```typescript
export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  threshold: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}
```

**What is an interface?**
- Blueprint for an object's structure
- Says "Product objects MUST have these exact fields"
- Type checker warns if you access wrong fields

**Example (Wrong):**
```typescript
let product: Product = {
  id: 1,
  name: 'Arduino',
  // Missing: sku, category, price, quantity, threshold, status
};
// TypeScript ERROR: Missing required fields
```

**Example (Right):**
```typescript
let product: Product = {
  id: 1,
  name: 'Arduino',
  sku: 'ARD-001',
  category: 'Electronics',
  price: 850,
  quantity: 45,
  threshold: 10,
  status: 'In Stock'
};
// TypeScript OK ✓
```

---

**The `|` Character (Union Type):**
```typescript
status: 'In Stock' | 'Low Stock' | 'Out of Stock'
```

**What does this mean?**
- Status can be ONLY one of these three values
- Not: 'In Stock Or Low Stock' (string)
- But: 'In Stock' OR 'Low Stock' OR 'Out of Stock'
- TypeScript will error if you use other values

---

**StockUpdate Interface:**
```typescript
export interface StockUpdate {
  type: 'In' | 'Out';
  quantity: number;
  note: string;
}
```

**Used when:**
- Sending stock update request to backend
- Ensures you send the right fields

---

**HistoryEntry Interface:**
```typescript
export interface HistoryEntry {
  id: number;
  productName: string;
  type: 'In' | 'Out';
  quantity: number;
  quantityBefore: number;
  quantityAfter: number;
  note: string;
  date: string;
}
```

**What is this?**
- Represents one row in the stock history table
- Comes from the backend's StockMovement class
- Shows what changed and when

---

## 🎨 app.html - The Template

This is the HTML that gets rendered in the browser.

### **Template Syntax (Angular Directives)**

| Syntax | Meaning | Example |
|--------|---------|---------|
| `{{ value }}` | Show variable | `{{ product.name }}` |
| `*ngIf="condition"` | Show/hide element | `*ngIf="alerts.length > 0"` |
| `*ngFor="let x of list"` | Loop through items | `*ngFor="let p of products"` |
| `(click)="method()"` | Call method on click | `(click)="deleteProduct(p.id)"` |
| `[(ngModel)]="var"` | Two-way bind | `[(ngModel)]="searchTerm"` |
| `[value]="expr"` | Property binding | `[disabled]="!isFormValid()" ` |
| `[class.name]="expr"` | Add CSS class | `[class.active]="activeTab === 'products'"` |
| `\| pipe` | Transform value | `{{ date \| date:'short' }}` |

---

### **The Search Input**

```html
<input
  type="text"
  placeholder="Search by name or SKU..."
  [(ngModel)]="searchTerm"
  (input)="loadProducts()"
/>
```

**Breaking it down:**
- `[(ngModel)]="searchTerm"`: Two-way bind the input to a variable
  - When user types → `searchTerm` updates
  - When `searchTerm` changes in code → input updates
- `(input)="loadProducts()"`: Call loadProducts() every time user types

**Flow:**
1. User types "arduino"
2. `searchTerm` becomes "arduino"
3. `(input)` triggers `loadProducts()`
4. Backend gets searched
5. Results shown immediately

---

### **The Stat Boxes**

```html
<div class="stat-box blue">
  <div class="number">{{ stats.total }}</div>
  <div class="label">Total Products</div>
</div>
```

**What is `{{ stats.total }}`?**
- Interpolation syntax
- Gets value from `stats.total` variable in app.ts
- Shows it as text in the HTML
- Updates automatically when variable changes

---

### **The Alerts Section**

```html
<div *ngIf="alerts.length === 0" class="no-alerts">
  ✅ All products are sufficiently stocked.
</div>

<ng-container *ngIf="alerts.length > 0">
  <div *ngFor="let alert of alerts" class="alert-item">
    <strong>{{ alert.status }}:</strong> {{ alert.name }}
  </div>
</ng-container>
```

**What is `*ngIf`?**
- Conditional rendering
- If condition is true, element is shown
- If false, element is removed from DOM

**What is `*ngFor`?**
- Loop through array
- Creates one element per item
- `let alert of alerts` means:
  - For each item in `alerts` array
  - Name it `alert`
  - Create one div with it

**What is `<ng-container>`?**
- Wrapper that doesn't create a real DOM element
- Used when you need to wrap things but don't want extra markup
- The `*ngIf` applies to it, not shown in final HTML

**Example Flow:**
```
alerts = [
  { name: 'Cable', status: 'Out of Stock' },
  { name: 'Wire', status: 'Low Stock' }
]

Rendered HTML:
<div class="alert-item">
  <strong>Out of Stock:</strong> Cable
</div>
<div class="alert-item">
  <strong>Low Stock:</strong> Wire
</div>
```

---

### **The Tabs**

```html
<div class="tabs">
  <div 
    class="tab" 
    [class.active]="activeTab === 'products'" 
    (click)="showTab('products')"
  >
    Products
  </div>
  <div 
    class="tab" 
    [class.active]="activeTab === 'history'" 
    (click)="showTab('history')"
  >
    Stock History
  </div>
</div>
```

**What is `[class.active]`?**
- Dynamically adds/removes CSS class
- If `activeTab === 'products'` is true → adds class "active"
- If false → doesn't add class
- CSS then makes ".active" tabs look different (bold, underlined, etc.)

**What is `(click)="showTab('products')`?**
- Calls `showTab()` method when user clicks
- Passes 'products' as argument
- Method updates `activeTab` variable
- HTML re-renders with new active tab

---

### **The Products Table**

```html
<table>
  <thead>
    <tr>
      <th>Product Name</th>
      <th>SKU</th>
      <th>Category</th>
      <th>Quantity</th>
      <th>Status</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let product of products" [class.out-of-stock]="product.status === 'Out of Stock'">
      <td>{{ product.name }}</td>
      <td>{{ product.sku }}</td>
      <td>{{ product.category }}</td>
      <td>{{ product.quantity }}</td>
      <td>
        <span [class]="'status ' + (product.status === 'In Stock' ? 'in-stock' : 'alert')">
          {{ product.status }}
        </span>
      </td>
      <td>{{ product.price | currency }}</td>
      <td>
        <button (click)="editProduct(product)">Edit</button>
        <button (click)="deleteProduct(product.id)">Delete</button>
        <button (click)="openStockModal(product)">Stock</button>
      </td>
    </tr>
  </tbody>
</table>
```

**What is `*ngFor`?**
- Creates one `<tr>` (table row) per product
- Each row shows one product's data

**What is `{{ product.price | currency }}`?**
- `| currency` is a pipe (formatter)
- Transforms 850 → $850.00
- Other pipes: `date`, `number`, `uppercase`, `lowercase`

**What is `[class]="expression"`?**
- Dynamic class binding
- Result of expression becomes the class name
- Example: `product.status === 'In Stock' ? 'in-stock' : 'alert'`
  - If In Stock → class="status in-stock"
  - Otherwise → class="status alert"
- Conditional CSS classes let you style differently

---

## 🔄 Two-Way Binding Explained

**Two-way binding: `[(ngModel)]="variable"`**

**What does it do?**
- User types in input → variable updates
- Code changes variable → input updates

**Example:**
```typescript
// app.ts
searchTerm: string = '';
```

```html
<!-- app.html -->
<input [(ngModel)]="searchTerm" />
<p>You typed: {{ searchTerm }}</p>
```

**Flow:**
1. User types "arduino" in input
2. Browser fires change event
3. Angular updates `searchTerm = 'arduino'`
4. Angular updates HTML to show "You typed: arduino"
5. All happens instantly!

**Why is it called "two-way"?**
- **One-way (from code to HTML):**
  ```html
  <p>{{ variable }}</p>  <!-- Shows value -->
  ```

- **Two-way (both directions):**
  ```html
  <input [(ngModel)]="variable" />  <!-- Show AND update -->
  ```

---

## 📊 Data Flow Through the App

**Complete flow from user action to screen update:**

```
USER TYPES IN SEARCH → 
  input fires (input) event handler
  ↓
loadProducts() method called
  ↓
this.inventoryService.getProducts(searchTerm)
  ↓
Service makes HTTP GET request to backend
  ↓
Backend processes request
  ↓
Backend sends back JSON list of products
  ↓
.subscribe() receives the data
  ↓
this.products = data (updates component property)
  ↓
Angular detects change
  ↓
*ngFor in template loops through products
  ↓
Each product renders as a table row
  ↓
{{ product.name }}, {{ product.sku }}, etc. filled in
  ↓
USER SEES UPDATED TABLE
```

---

**Complete flow for updating stock:**

```
USER CLICKS "Stock" BUTTON →
  openStockModal() shows modal dialog
  ↓
USER ENTERS QUANTITY & NOTES →
  Input bound with [(ngModel)] updates component variables
  ↓
USER CLICKS "CONFIRM" BUTTON →
  updateStock() method called
  ↓
Create StockUpdate object with type, quantity, note
  ↓
this.inventoryService.updateStock(productId, request)
  ↓
Service makes HTTP POST request to backend  
  ↓
Backend:
  - Finds product
  - Checks business rules
  - Updates quantity
  - Records in history
  - Returns success
  ↓
.subscribe() receives success
  ↓
loadProducts() reloads all products
loadHistory() reloads stock history
loadAlerts() reloads alerts
closeStockModal() closes the dialog
  ↓
USER SEES:
  - Updated quantity
  - New entry in history
  - Alerts updated if needed
```

---

## 🎓 Key Angular Concepts

### **1. Components**

**Definition:** Reusable piece of UI with logic and template

**Structure:**
```typescript
@Component({
  selector: 'app-root',          // Used as <app-root> in HTML
  template / templateUrl: ...,   // HTML
  styles / styleUrl: ...         // CSS
})
export class AppComponent {
  // Properties (data)
  // Methods (logic)
}
```

**In this project:**
- ONE main component: `AppComponent`
- Could be split into multiple components:
  - `ProductListComponent`
  - `AlertsComponent`
  - `ProductFormComponent`
  - etc.

---

### **2. Services**

**Definition:** Class that handles logic and data, shared across components

**Use for:**
- API calls
- Data management
- Business logic
- Shared utilities

**Dependency Injection:**
```typescript
constructor(private inventoryService: InventoryService) {}
```

---

### **3. TypeScript Interfaces**

**Definition:** Blueprint for object shape

**Benefits:**
- Type checking catches errors early
- IDE autocomplete works
- Self-documenting code

---

### **4. Observables & Promises**

**Promise (older):**
```typescript
fetch('/api/products')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
```

**Observable (Angular):**
```typescript
this.http.get('/api/products').subscribe({
  next: data => console.log(data),
  error: error => console.error(error),
  complete: () => console.log('Done')
})
```

**Difference:**
- Promise: one-time future value
- Observable: stream of values over time
- Observables can emit multiple times (not in our case, but possible)

---

### **5. Change Detection**

**What is it?**
- Angular's mechanism to detect when data changes
- Automatically updates the HTML
- Called "Angular Magic"

**How it works:**
1. Something changes (user input, API response, etc.)
2. Angular zones catch the event
3. Template is re-evaluated
4. HTML is updated with new values

**Example:**
```typescript
this.products = newProducts;  // This line triggers update
// Angular sees products changed
// All {{ product.X }} in template re-render
```

---

### **6. Template Binding Syntax**

| Syntax | Type | Direction |
|--------|------|-----------|
| `{{ value }}` | Interpolation | Code → HTML |
| `[property]="value"` | Property Binding | Code → HTML |
| `(event)="method()"` | Event Binding | HTML → Code |
| `[(ngModel)]="value"` | Two-way Binding | Code ↔ HTML |

---

### **7. Built-in Directives**

**Directives:** Tags that add behavior to elements

| Directive | Purpose | Example |
|-----------|---------|---------|
| `*ngIf` | Conditional rendering | `*ngIf="condition"` |
| `*ngFor` | Loop | `*ngFor="let x of items"` |
| `*ngSwitch` | Multiple conditions | `*ngSwitchCase="'value'"` |
| `ngClass` | Add classes | `[ngClass]="{'active': isActive}"` |
| `ngShow` | Show/hide (CSS) | `[ngShow]="condition"` |
| `ngStyle` | Add inline styles | `[ngStyle]="{'color': color}"` |

---

### **8. Pipes**

**Pipes:** Transform values for display (don't change actual value)

| Pipe | What it does | Example |
|------|------|---------|
| `currency` | Format as money | `{{ 50 \| currency }}` → `$50.00` |
| `date` | Format date | `{{ date \| date:'short' }}` |
| `number` | Format number | `{{ 1234.5 \| number:'1.2-2' }}` |
| `uppercase` | All caps | `{{ 'hello' \| uppercase }}` → `HELLO` |
| `lowercase` | All lowercase | `{{ 'HELLO' \| lowercase }}` → `hello` |
| `slice` | Get part of array | `{{ items \| slice:0:5 }}` → first 5 items |

---

## 🎯 Summary of How It All Works Together

1. **User opens the app** → `ngOnInit()` runs
   
2. **loadProducts() called** → Service requests data from backend
   
3. **Backend returns JSON** → Observable emits data
   
4. **this.products = data** → Component property updated
   
5. **Angular detects change** → Re-renders template
   
6. **{{}} and *ngFor in HTML** → Shows data to user
   
7. **User interacts** (searches, clicks) → Event handler fires
   
8. **loadProducts() again** → Repeat from step 2

**This cycle repeats constantly**, keeping the UI in sync with data.

---

## 💡 Key Takeaway

Angular makes it much better than vanilla JavaScript because:
- ✅ Automatic HTML updates
- ✅ Organized structure (components, services, models)
- ✅ Type safety with TypeScript
- ✅ Built-in tools (HTTP, forms, directives)
- ✅ Two-way data binding
- ✅ Reusable components

The backend remains on the server, the frontend in the browser, and they talk via HTTP/JSON.

