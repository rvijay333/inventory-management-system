# Complete Frontend Explanation for Inventory Management System

## Introduction to Web Development

Before diving into the code, let's understand what a web application is and how it works. This will build your understanding from scratch.

### What is a Web Application?

A web application (or web app) is a software program that runs in a web browser. Unlike desktop apps (like Microsoft Word) that you install on your computer, web apps live on the internet and you access them through a browser like Chrome, Firefox, or Edge.

### Client-Server Architecture

Web apps typically follow a **client-server model**:

- **Client**: The part that runs in your browser (the frontend). This is what you see and interact with - buttons, forms, tables, etc.
- **Server**: The part that runs on a computer somewhere (often in the cloud). This handles data storage, business logic, and sends data to the client when requested.

In our Inventory Management System:
- **Frontend (Client)**: The HTML, CSS, and JavaScript/Angular code that displays the inventory interface
- **Backend (Server)**: The C# code (in the `IVS_BackEnd` folder) that manages the data and provides APIs

### Frontend Technologies

The frontend is built using three main technologies:

1. **HTML (HyperText Markup Language)**: Defines the structure and content of web pages
2. **CSS (Cascading Style Sheets)**: Controls the appearance and layout
3. **JavaScript**: Adds interactivity and dynamic behavior

### How It All Works Together

1. You open the web app in your browser
2. The browser loads the HTML file, which defines the page structure
3. CSS makes it look nice and organized
4. JavaScript makes it interactive - responding to clicks, fetching data from the server, updating the display
5. When you need data (like product lists), JavaScript sends requests to the backend API
6. The backend sends back data (usually in JSON format)
7. JavaScript updates the page with the new data

## The Plain HTML/CSS/JavaScript Frontend

This version uses vanilla (plain) HTML, CSS, and JavaScript without any frameworks. It's in the `IVS_FrontEnd` folder.

### What is HTML?

HTML is the foundation of any web page. It uses "tags" to define different types of content:

```html
<!-- This is a comment -->
<h1>This is a heading</h1>  <!-- Large heading -->
<p>This is a paragraph of text.</p>  <!-- Regular text -->
<button>Click me</button>  <!-- A clickable button -->
```

HTML elements are like building blocks. They have:
- **Opening tags**: `<tagname>`
- **Content**: The text or other elements inside
- **Closing tags**: `</tagname>`

Some elements are "self-closing" like `<input />` or `<img />`.

### The inventory.html File

This file defines the entire structure of the inventory management interface.

#### Basic Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Inventory Management</title>
  <link rel="stylesheet" href="inventory.css">
</head>
<body>
  <!-- All visible content goes here -->
  <script src="inventory.js"></script>
</body>
</html>
```

- `<!DOCTYPE html>`: Tells the browser this is an HTML5 document
- `<html>`: The root element
- `<head>`: Contains metadata (title, CSS links, etc.)
- `<body>`: Contains the visible content
- `<script>`: Loads the JavaScript file

#### Page Layout

The page is divided into sections:

1. **Top Bar**: Shows the app title
2. **Stats Boxes**: Four boxes showing counts (Total, In Stock, Low Stock, Out of Stock)
3. **Alerts Section**: Shows warnings for low/out of stock items
4. **Tabs**: Switches between Products and History views
5. **Products Tab**: Table of products with search and actions
6. **History Tab**: Table of stock movements
7. **Modals**: Popup forms for adding/editing products and updating stock

#### Key HTML Elements Used

- `<div>`: Generic container for grouping content
- `<h1>`, `<h2>`: Headings
- `<table>`, `<tr>`, `<td>`, `<th>`: Table structure
- `<input>`: Text/number input fields
- `<button>`: Clickable buttons
- `<select>`: Dropdown menus
- `<form>`: Groups form inputs (though not used as a real form here)

#### IDs and Classes

- **IDs** (like `id="alerts-box"`): Unique identifiers for specific elements
- **Classes** (like `class="btn-primary"`): Reusable styles that can be applied to multiple elements

### What is CSS?

CSS controls how HTML elements look and are positioned. It uses "selectors" to target elements and "properties" to define styles.

```css
/* Target all buttons */
button {
  padding: 10px 20px;  /* Space inside the button */
  background: blue;     /* Background color */
  color: white;         /* Text color */
  border: none;         /* Remove default border */
}

/* Target elements with class "btn-primary" */
.btn-primary {
  background: #2980b9;  /* Blue background */
}

/* Target element with id "alerts-box" */
#alerts-box {
  color: red;  /* Red text */
}
```

### The inventory.css File - Complete Breakdown

Here's every CSS rule in the plain JS version with detailed explanations:

```css
/* Reset default browser spacing */
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: Arial, sans-serif;
  font-size: 15px;
  background: #f5f5f5;
  color: #222;
}

/* ── TOP BAR ── */
.topbar {
  background: #2c3e50;
  color: white;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.topbar h1 { font-size: 20px; }
.topbar span { font-size: 13px; opacity: 0.7; }

/* ── PAGE LAYOUT ── */
.page { max-width: 1100px; margin: 24px auto; padding: 0 16px; }

/* ── SECTION CARD ── */
.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 24px;
}
.card h2 {
  font-size: 16px;
  margin-bottom: 14px;
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
  padding-bottom: 6px;
}

/* ── ALERTS BOX ── */
.alert-item {
  padding: 10px 14px;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 14px;
}
.alert-out  { background: #fde8e8; border-left: 4px solid #e74c3c; color: #c0392b; }
.alert-low  { background: #fef9e7; border-left: 4px solid #f39c12; color: #b7770d; }
.no-alerts  { color: #27ae60; font-size: 14px; }

/* ── STATS ROW ── */
.stats {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}
.stat-box {
  flex: 1;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 16px;
  text-align: center;
}
.stat-box .number { font-size: 32px; font-weight: bold; }
.stat-box .label  { font-size: 13px; color: #666; margin-top: 4px; }
.stat-box.blue   .number { color: #2980b9; }
.stat-box.green  .number { color: #27ae60; }
.stat-box.orange .number { color: #e67e22; }
.stat-box.red    .number { color: #e74c3c; }

/* ── TOOLBAR (search + add button) ── */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  gap: 10px;
}
.toolbar input {
  padding: 7px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 240px;
}

/* ── BUTTONS ── */
button {
  padding: 7px 14px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
.btn-primary  { background: #2980b9; color: white; }
.btn-success  { background: #27ae60; color: white; }
.btn-danger   { background: #e74c3c; color: white; }
.btn-warning  { background: #e67e22; color: white; }
.btn-small    { padding: 4px 10px; font-size: 12px; }
button:hover  { opacity: 0.85; }

/* ── DATA TABLE ── */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
thead th {
  background: #2c3e50;
  color: white;
  padding: 10px 12px;
  text-align: left;
  font-weight: normal;
}
tbody tr { border-bottom: 1px solid #eee; }
tbody tr:hover { background: #f9f9f9; }
tbody td { padding: 10px 12px; }

/* ── STATUS BADGE ── */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}
.badge-green  { background: #d5f5e3; color: #1e8449; }
.badge-orange { background: #fef9e7; color: #b7770d; }
.badge-red    { background: #fde8e8; color: #c0392b; }

/* ── MODAL (popup form) ── */
.modal-overlay {
  display: none;               /* hidden by default */
  position: fixed;
  inset: 0;                    /* covers the whole screen */
  background: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.modal-overlay.open { display: flex; } /* shown when we add the "open" class */
.modal {
  background: white;
  border-radius: 8px;
  padding: 24px;
  width: 420px;
  max-width: 95vw;
}
.modal h3 { margin-bottom: 16px; color: #2c3e50; }

/* ── FORM FIELDS ── */
.form-group { margin-bottom: 12px; }
.form-group label {
  display: block;
  font-size: 13px;
  color: #555;
  margin-bottom: 4px;
}
.form-group input, .form-group select {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
.form-row { display: flex; gap: 12px; }
.form-row .form-group { flex: 1; }
.modal-buttons { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }

/* ── HISTORY TABLE ── */
.in-text  { color: #27ae60; font-weight: bold; }
.out-text { color: #e74c3c; font-weight: bold; }

/* ── NAV TABS ── */
.tabs { display: flex; gap: 4px; margin-bottom: 20px; }
.tab {
  padding: 8px 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  font-size: 14px;
  color: #555;
}
.tab.active {
  background: #2c3e50;
  color: white;
  border-color: #2c3e50;
}
.tab-content { display: none; }
.tab-content.active { display: block; }
```

#### Key CSS Concepts Demonstrated:

- **Box Model**: Every element has content + padding + border + margin
- **Flexbox**: `display: flex` for layouts (stats boxes, toolbar, form rows)
- **Positioning**: `position: fixed` for modals that overlay the page
- **Colors**: Hex codes (#2980b9), named colors (white), opacity
- **Selectors**: Element (`button`), class (`.btn-primary`), ID (`#alerts-box`)
- **Pseudo-classes**: `:hover` for interactive effects
- **Responsive Design**: `max-width: 95vw` makes modals work on small screens

### What is JavaScript?

JavaScript (JS) is a programming language that runs in the browser. It can:

- Change HTML content dynamically
- Respond to user actions (clicks, typing)
- Send requests to servers and handle responses
- Store data temporarily
- Create interactive effects

In this app, JS handles all the logic - loading data, handling form submissions, updating the UI.

### The inventory.js File - Complete Code Breakdown

Here's every function in the plain JS version with detailed explanations:

#### Global Variables and Setup

```javascript
// The base URL of our C# API
const API = "http://localhost:5059";
```

- `const` declares a constant that can't be changed
- This is the address where our backend server runs

#### loadProducts() - Fetch and Display Products

```javascript
async function loadProducts() {
  const search = document.getElementById("search-input").value;

  // Build the URL — add search query if there is one
  let url = API + "/api/products";
  if (search) {
    url = url + "?search=" + search;
  }

  // fetch() makes an HTTP request — same as what you know from JS
  const response = await fetch(url);
  const products = await response.json();

  // Update the stat boxes at the top
  updateStats(products);

  // Clear the table body and rebuild it
  const tbody = document.getElementById("product-table-body");
  tbody.innerHTML = "";

  if (products.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:#999;padding:20px;">No products found.</td></tr>';
    return;
  }

  // Loop through each product and create a table row for it
  products.forEach(function(p) {

    // Pick the right badge colour based on status
    let badgeClass = "badge-green";
    if (p.status === "Low Stock")    badgeClass = "badge-orange";
    if (p.status === "Out of Stock") badgeClass = "badge-red";

    // Build the HTML for one row
    const row = `
      <tr>
        <td>${p.name}</td>
        <td>${p.sku}</td>
        <td>${p.category}</td>
        <td>${p.quantity}</td>
        <td>${p.threshold}</td>
        <td>₹${p.price.toLocaleString()}</td>
        <td><span class="badge ${badgeClass}">${p.status}</span></td>
        <td>
          <button class="btn-warning btn-small" onclick="openStockModal(${p.id}, '${p.name}')">Stock</button>
          <button class="btn-primary btn-small" onclick="openEditModal(${p.id})">Edit</button>
          <button class="btn-danger btn-small"  onclick="deleteProduct(${p.id}, '${p.name}')">Delete</button>
        </td>
      </tr>
    `;

    tbody.innerHTML += row;
  });
}
```

**How it works:**
- Gets search input value using `document.getElementById()`
- Builds URL with optional search parameter
- `fetch()` sends GET request to API
- `await response.json()` converts response to JavaScript objects
- `updateStats()` calculates and displays counts
- Clears table and rebuilds it with `innerHTML`
- Uses template literals (backticks) to build HTML strings
- `forEach()` loops through array, `toLocaleString()` formats numbers

#### updateStats() - Calculate Statistics

```javascript
function updateStats(products) {
  let total   = products.length;
  let inStock = 0;
  let low     = 0;
  let out     = 0;

  products.forEach(function(p) {
    if (p.status === "In Stock")      inStock++;
    else if (p.status === "Low Stock") low++;
    else if (p.status === "Out of Stock") out++;
  });

  document.getElementById("stat-total").textContent   = total;
  document.getElementById("stat-instock").textContent = inStock;
  document.getElementById("stat-low").textContent     = low;
  document.getElementById("stat-out").textContent     = out;
}
```

**How it works:**
- Counts products by status using `forEach()` loop
- Updates DOM elements with `textContent`

#### loadAlerts() - Fetch and Display Alerts

```javascript
async function loadAlerts() {
  const response = await fetch(API + "/api/alerts");
  const alerts   = await response.json();

  const box = document.getElementById("alerts-box");

  if (alerts.length === 0) {
    box.innerHTML = '<p class="no-alerts">✅ All products are sufficiently stocked.</p>';
    return;
  }

  let html = "";

  alerts.forEach(function(p) {
    if (p.status === "Out of Stock") {
      html += `<div class="alert-item alert-out">❌ <strong>OUT OF STOCK:</strong> ${p.name} (${p.sku}) — 0 units remaining. Reorder immediately.</div>`;
    } else {
      html += `<div class="alert-item alert-low">⚠️ <strong>LOW STOCK:</strong> ${p.name} (${p.sku}) — only ${p.quantity} units left (threshold: ${p.threshold}).</div>`;
    }
  });

  box.innerHTML = html;
}
```

**How it works:**
- Fetches alerts from `/api/alerts`
- Builds HTML string with conditional content
- Uses template literals for dynamic content

#### loadHistory() - Fetch and Display History

```javascript
async function loadHistory() {
  const response = await fetch(API + "/api/history");
  const history  = await response.json();

  const tbody = document.getElementById("history-table-body");
  tbody.innerHTML = "";

  if (history.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#999;padding:20px;">No stock movements yet.</td></tr>';
    return;
  }

  history.forEach(function(h) {
    // Format the date into a readable string
    const date = new Date(h.date).toLocaleString();

    const typeHtml = h.type === "In"
      ? '<span class="in-text">▲ In</span>'
      : '<span class="out-text">▼ Out</span>';

    const row = `
      <tr>
        <td>${date}</td>
        <td>${h.productName}</td>
        <td>${typeHtml}</td>
        <td>${h.quantity}</td>
        <td>${h.quantityBefore}</td>
        <td>${h.quantityAfter}</td>
        <td>${h.note || "—"}</td>
      </tr>
    `;

    tbody.innerHTML += row;
  });
}
```

**How it works:**
- `new Date(h.date).toLocaleString()` converts ISO date string to readable format
- Conditional (ternary) operator: `condition ? value1 : value2`
- `|| "—"` provides fallback for empty notes

#### Modal Functions

```javascript
function openAddModal() {
  // Clear all form fields
  document.getElementById("edit-id").value    = "";
  document.getElementById("f-name").value     = "";
  document.getElementById("f-sku").value      = "";
  document.getElementById("f-category").value = "";
  document.getElementById("f-price").value    = "";
  document.getElementById("f-qty").value      = "";
  document.getElementById("f-threshold").value= "10";

  document.getElementById("modal-title").textContent = "Add Product";
  openModal("product-modal");
}

async function openEditModal(id) {
  // Fetch the product details from the API
  const response = await fetch(API + "/api/products/" + id);
  const p        = await response.json();

  // Fill the form with existing values
  document.getElementById("edit-id").value     = p.id;
  document.getElementById("f-name").value      = p.name;
  document.getElementById("f-sku").value       = p.sku;
  document.getElementById("f-category").value  = p.category;
  document.getElementById("f-price").value     = p.price;
  document.getElementById("f-qty").value       = p.quantity;
  document.getElementById("f-threshold").value = p.threshold;

  document.getElementById("modal-title").textContent = "Edit Product";
  openModal("product-modal");
}

function openStockModal(id, name) {
  document.getElementById("stock-product-id").value = id;
  document.getElementById("stock-modal-title").textContent = "Update Stock — " + name;
  document.getElementById("s-qty").value  = 1;
  document.getElementById("s-note").value = "";
  openModal("stock-modal");
}

function openModal(id)  { document.getElementById(id).classList.add("open"); }
function closeModal(id) { document.getElementById(id).classList.remove("open"); }
```

**How it works:**
- `classList.add/remove()` shows/hides modals by adding/removing CSS classes
- Form fields are cleared/set using `value` property
- `async/await` used for API calls in `openEditModal()`

#### CRUD Operations

```javascript
async function saveProduct() {
  const id = document.getElementById("edit-id").value;

  // Build the product object from form values
  const product = {
    name:      document.getElementById("f-name").value,
    sku:       document.getElementById("f-sku").value,
    category:  document.getElementById("f-category").value,
    price:     parseFloat(document.getElementById("f-price").value) || 0,
    quantity:  parseInt(document.getElementById("f-qty").value)   || 0,
    threshold: parseInt(document.getElementById("f-threshold").value) || 10
  };

  // Decide whether to POST (add new) or PUT (update existing)
  let url    = API + "/api/products";
  let method = "POST";

  if (id) {
    url    = API + "/api/products/" + id;
    method = "PUT";
  }

  // Send the request to the API
  const response = await fetch(url, {
    method:  method,
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(product)   // Convert JS object to JSON string
  });

  if (response.ok) {
    closeModal("product-modal");
    loadProducts();   // Refresh the table
    loadAlerts();     // Refresh alerts in case threshold changed
  } else {
    const error = await response.text();
    alert("Error: " + error);
  }
}
```

**How it works:**
- `parseFloat()` and `parseInt()` convert strings to numbers
- `|| 0` provides fallback for invalid numbers
- `JSON.stringify()` converts JavaScript object to JSON string
- `response.ok` checks if HTTP status is 200-299
- `response.text()` gets error message from server

```javascript
async function deleteProduct(id, name) {
  // Confirm before deleting
  const confirmed = confirm("Are you sure you want to delete '" + name + "'?");

  if (!confirmed) return;

  const response = await fetch(API + "/api/products/" + id, {
    method: "DELETE"
  });

  if (response.ok) {
    loadProducts();
    loadAlerts();
  } else {
    alert("Could not delete product.");
  }
}
```

**How it works:**
- `confirm()` shows browser dialog, returns true/false
- DELETE request has no body

#### Stock Management

```javascript
async function saveStock() {
  const productId = document.getElementById("stock-product-id").value;

  const request = {
    type:     document.getElementById("s-type").value,
    quantity: parseInt(document.getElementById("s-qty").value) || 1,
    note:     document.getElementById("s-note").value
  };

  const response = await fetch(API + "/api/products/" + productId + "/stock", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(request)
  });

  if (response.ok) {
    closeModal("stock-modal");
    loadProducts();   // Refresh product table (quantity changed)
    loadAlerts();     // Refresh alerts (status may have changed)
  } else {
    const error = await response.text();
    alert("Error: " + error);
  }
}
```

**How it works:**
- POST to `/api/products/{id}/stock` endpoint
- Sends type ("In" or "Out"), quantity, and optional note

#### Tab Switching

```javascript
function showTab(name) {
  // Remove "active" from all tabs and tab-contents
  document.querySelectorAll(".tab").forEach(function(t) {
    t.classList.remove("active");
  });
  document.querySelectorAll(".tab-content").forEach(function(c) {
    c.classList.remove("active");
  });

  // Add "active" to the clicked tab
  event.target.classList.add("active");
  document.getElementById("tab-" + name).classList.add("active");

  // Load history data when that tab is opened
  if (name === "history") {
    loadHistory();
  }
}
```

**How it works:**
- `querySelectorAll()` gets all elements matching selector
- `forEach()` loops through NodeList
- `event.target` refers to clicked element
- Loads history data only when needed (lazy loading)

#### History Management

```javascript
async function clearHistory() {
  // Ask the user to confirm before wiping everything
  const confirmed = confirm("Are you sure you want to clear all stock history? This cannot be undone.");
  if (!confirmed) return;

  const response = await fetch(API + "/api/history", {
    method: "DELETE"
  });

  if (response.ok) {
    // Reload the history table — it will now be empty
    loadHistory();
  } else {
    alert("Something went wrong. Could not clear history.");
  }
}
```

**How it works:**
- DELETE request to `/api/history` clears all records

#### Initialization

```javascript
// When the page first opens, load products and alerts
loadProducts();
loadAlerts();
```

**How it works:**
- Runs automatically when script loads
- No `async` because these functions handle their own async operations

## The Angular Frontend

This is a more advanced version using the Angular framework. It's in the `IVS_FrontEnd/inventory-angular` folder.

### What is Angular?

Angular is a framework for building web applications. It provides:

- **Components**: Reusable UI pieces
- **Templates**: HTML with special syntax
- **Services**: For data management and API calls
- **Dependency Injection**: Automatic wiring of components
- **Two-way Data Binding**: Automatic sync between UI and data
- **Directives**: Special HTML attributes for dynamic behavior

Angular apps are more organized and maintainable than plain JS, especially for larger applications.

### Project Structure

```
inventory-angular/
├── src/
│   ├── main.ts              # App entry point
│   ├── index.html           # Main HTML file
│   ├── styles.css           # Global styles
│   └── app/
│       ├── app.ts           # Main component (logic)
│       ├── app.html         # Main component (template)
│       ├── app.css          # Main component (styles)
│       ├── app.config.ts    # App configuration
│       ├── models/
│       │   └── inventory.models.ts  # TypeScript interfaces
│       └── services/
│           └── inventory.service.ts  # API service
```

### Key Angular Concepts

#### Components

A component combines:
- **Class** (app.ts): Contains data and methods
- **Template** (app.html): The HTML structure
- **Styles** (app.css): Component-specific CSS

#### Templates

Angular templates extend HTML with special syntax:

- `{{ value }}`: Display a variable
- `*ngIf="condition"`: Show/hide elements
- `*ngFor="let item of items"`: Loop through arrays
- `(click)="method()"`: Handle click events
- `[(ngModel)]="variable"`: Two-way data binding

#### Services

Services handle data operations and can be injected into components.

#### TypeScript

Angular uses TypeScript (TS), which is JavaScript with types. Types help catch errors early:

```typescript
interface Product {
  id: number;
  name: string;
  sku: string;
  // ...
}
```

### app.ts - The Complete Component Class

Here's the full Angular component code with detailed explanations:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // gives us *ngIf, *ngFor, | date, | number
import { FormsModule } from '@angular/forms';     // gives us [(ngModel)] two-way binding

import { InventoryService } from './services/inventory.service';
import { Product, ProductForm, StockUpdate, HistoryEntry, Stats } from './models/inventory.models';

@Component({                           // it is a decorator ,,,  that adds metadata to the class below it, telling Angular how to use it as a component
  selector: 'app-root',                // matches <app-root> in index.html
  standalone: true,                    // no separate NgModule needed (Angular 17+)
  imports: [CommonModule, FormsModule],// loads stuff like : *ngIf, *ngFor, [(ngModel)], etc. into this component
  templateUrl: './app.html',           // links to the HTML template
  styleUrl: './app.css'                // links to the component-scoped CSS
})

export class AppComponent implements OnInit {

  products: Product[] = [];       // rows in the products table
  alerts:   Product[] = [];       // items in the alerts card
  history:  HistoryEntry[] = [];  // rows in the history table

  stats: Stats = { total: 0, inStock: 0, low: 0, out: 0 };

  searchTerm: string = '';        // bound to the search input

  activeTab: 'products' | 'history' = 'products';

  // Instead of classList.add('open'), we use simple true/false flags.
  // The template shows/hides modals based on these.

  showProductModal = false;
  showStockModal = false;
  isEditing = false;
  editingId: number | null = null;

  // These objects are two-way bound to the modal form inputs via [(ngModel)].
  // When you type in a field, the object updates. When you reset the object,
  // the fields clear. No more document.getElementById('f-name').value!

  productForm: ProductForm = { name: '', sku: '', category: '', price: 0, quantity: 0, threshold: 10 };
  stockForm: StockUpdate = { type: 'In', quantity: 1, note: '' };
  stockProductId: number | null = null;
  stockProductName: string = '';

  // Angular reads the parameter type (InventoryService) and automatically
  // injects the right object. We never call "new InventoryService()" ourselves.

  constructor(private inventoryService: InventoryService) { }

  // ── ngOnInit ──────────────────────────────────────────────────
  // Runs once when the page first loads.
  // Replaces the loadProducts() and loadAlerts() calls at the
  // bottom of your original inventory.js file.

  ngOnInit(): void {
    this.loadProducts();
    this.loadAlerts();
  }

  // API call methods use the injected inventoryService to fetch data from the backend.
  // given below are all API call methods

  // subscribe() returns two callback functions: one for success (next) and one for error.
  //  When the API call completes successfully, the next function is executed with the returned products data, 
  // which updates the products property and calls updateStats to refresh the statistics. 
  // If there's an error during the API call, the error function logs the error to the console.

  loadProducts(): void {
    this.inventoryService.getProducts(this.searchTerm).subscribe({
      next: (products) => {
        this.products = products;
        this.updateStats(products);
      },
      error: (err) => console.error('Failed to load products', err)
    });
  }

  updateStats(products: Product[]): void { // calculates the stats based on the current products list
    this.stats = {
      total: products.length,
      inStock: products.filter(p => p.status === 'In Stock').length,
      low: products.filter(p => p.status === 'Low Stock').length,
      out: products.filter(p => p.status === 'Out of Stock').length
    };
  }

  loadAlerts(): void {
    this.inventoryService.getAlerts().subscribe({
      next: (alerts) => this.alerts = alerts,
      error: (err) => console.error('Failed to load alerts', err)
    });
  }

  loadHistory(): void {
    this.inventoryService.getHistory().subscribe({
      next: (history) => this.history = history,
      error: (err) => console.error('Failed to load history', err)
    });
  }

  showTab(tab: 'products' | 'history'): void {
    this.activeTab = tab;
    if (tab === 'history') this.loadHistory();
  }

  openAddModal(): void {
    this.isEditing = false;
    this.editingId = null;
    this.productForm = { name: '', sku: '', category: '', price: 0, quantity: 0, threshold: 10 };
    this.showProductModal = true;
  }

  openEditModal(id: number): void {
    this.inventoryService.getProduct(id).subscribe({
      next: (p) => {
        this.isEditing = true;
        this.editingId = id;
        this.productForm = {
          name: p.name, sku: p.sku, category: p.category,
          price: p.price, quantity: p.quantity, threshold: p.threshold
        };
        this.showProductModal = true;
      }
    });
  }

  saveProduct(): void {
    const call = this.isEditing && this.editingId !== null
                 ? this.inventoryService.updateProduct(this.editingId, this.productForm)
                 : this.inventoryService.createProduct(this.productForm);

    call.subscribe({
      next: () => {
        this.showProductModal = false;
        this.loadProducts();
        this.loadAlerts();
      },
      error: (err) => alert('Error saving product: ' + err.message)
    });
  }

  // ── DELETE PRODUCT ────────────────────────────────────────────
  deleteProduct(id: number, name: string): void {
    if (!confirm(`Are you sure you want to delete '${name}'?`)) return;
    this.inventoryService.deleteProduct(id).subscribe({
      next: () => { this.loadProducts(); this.loadAlerts(); },
      error: () => alert('Could not delete product.')
    });
  }

  openStockModal(id: number, name: string): void {
    this.stockProductId = id;
    this.stockProductName = name;
    this.stockForm = { type: 'In', quantity: 1, note: '' };
    this.showStockModal = true;
  }

  saveStock(): void {
    if (this.stockProductId === null) return; // no stock product selected, so exit
    this.inventoryService.updateStock(this.stockProductId, this.stockForm).subscribe({
      next: () => {
        this.showStockModal = false;
        this.loadProducts();
        this.loadAlerts();
      },
      error: (err) => alert('Error updating stock: ' + err.message)
    });
  }

  clearHistory(): void {
    if (!confirm('Clear all stock history? This cannot be undone.')) return;
    this.inventoryService.clearHistory().subscribe({
      next: () => this.loadHistory(),
      error: () => alert('Could not clear history.')
    });
  }

  badgeClass(status: string): string {
    if (status === 'Low Stock') return 'badge-orange';
    if (status === 'Out of Stock') return 'badge-red';
    return 'badge-green';
  }
}
```

#### Key Angular Concepts in Code:

- **@Component Decorator**: Metadata telling Angular how to create the component
- **implements OnInit**: Interface requiring `ngOnInit()` method
- **Type Annotations**: `products: Product[]` ensures type safety
- **Dependency Injection**: `constructor(private inventoryService: InventoryService)`
- **Observable.subscribe()**: Handles async API responses
- **Arrow Functions**: `(products) => { ... }` for callbacks
- **Template Literals**: `` `Are you sure you want to delete '${name}'?` ``
- **Optional Chaining**: `err?.message` safely accesses properties
- **Ternary Operator**: `condition ? value1 : value2`
- **Array.filter()**: Functional programming for counting stats

### app.html - The Complete Template

Here's the full Angular template with detailed explanations:

```html
<!-- app.html — the Angular template
     
     Angular template syntax quick reference:
       {{ value }}              → show a variable's value
       *ngIf="condition"        → show/hide element based on condition
       *ngFor="let x of list"   → repeat element for each item in list
       (click)="method()"       → call method when clicked
       [(ngModel)]="variable"   → two-way bind input to a variable
       [class.name]="condition" → add CSS class when condition is true
       [ngClass]="expression"   → set class dynamically
       value | pipe             → transform a value (date, number, etc.)
-->

<!-- ══ TOPBAR ══════════════════════════════════════════════════ -->
<div class="topbar">
  <h1>📦 Inventory Management</h1>
  <span>Angular + C# Demo</span>
</div>

<div class="page">

  <!-- ══ STAT BOXES ══════════════════════════════════════════════
       {{ stats.total }} reads the stats object from app.ts
       Each number updates automatically when loadProducts() runs
  ══════════════════════════════════════════════════════════════ -->
  <div class="stats">
    <div class="stat-box blue">
      <div class="number">{{ stats.total }}</div>
      <div class="label">Total Products</div>
    </div>
    <div class="stat-box green">
      <div class="number">{{ stats.inStock }}</div>
      <div class="label">In Stock</div>
    </div>
    <div class="stat-box orange">
      <div class="number">{{ stats.low }}</div>
      <div class="label">Low Stock</div>
    </div>
    <div class="stat-box red">
      <div class="number">{{ stats.out }}</div>
      <div class="label">Out of Stock</div>
    </div>
  </div>

  <!-- ══ ALERTS ══════════════════════════════════════════════════
       *ngIf shows one block or the other based on alerts.length
       *ngFor loops through each alert and creates one div per alert
  ══════════════════════════════════════════════════════════════ -->
  <div class="card">
    <h2>⚠️ Stock Alerts</h2>

    <p *ngIf="alerts.length === 0" class="no-alerts">
      ✅ All products are sufficiently stocked.
    </p>

    <ng-container *ngIf="alerts.length > 0">
      <div
        *ngFor="let alert of alerts"
        class="alert-item"
        [class.alert-out]="alert.status === 'Out of Stock'"
        [class.alert-low]="alert.status === 'Low Stock'"
      >
        <ng-container *ngIf="alert.status === 'Out of Stock'">
          ❌ <strong>OUT OF STOCK:</strong> {{ alert.name }} ({{ alert.sku }}) — 0 units remaining.
        </ng-container>
        <ng-container *ngIf="alert.status === 'Low Stock'">
          ⚠️ <strong>LOW STOCK:</strong> {{ alert.name }} ({{ alert.sku }})
          — only {{ alert.quantity }} units left (threshold: {{ alert.threshold }}).
        </ng-container>
      </div>
    </ng-container>
  </div>

  <!-- ══ TABS ════════════════════════════════════════════════════
       [class.active] adds the 'active' CSS class when the condition is true
       (click) calls showTab() when the div is clicked
  ══════════════════════════════════════════════════════════════ -->
  <div class="tabs">
    <div class="tab" [class.active]="activeTab === 'products'" (click)="showTab('products')">
      Products
    </div>
    <div class="tab" [class.active]="activeTab === 'history'" (click)="showTab('history')">
      Stock History
    </div>
  </div>

  <!-- ══ PRODUCTS TAB ════════════════════════════════════════════ -->
  <div class="tab-content" [class.active]="activeTab === 'products'">
    <div class="card">
      <h2>Product List</h2>

      <div class="toolbar">
        <!-- [(ngModel)] keeps searchTerm in sync with what you type
             (input) calls loadProducts() on every keystroke -->
        <input
          type="text"
          placeholder="Search by name or SKU..."
          [(ngModel)]="searchTerm"
          (input)="loadProducts()"
        />
        <button class="btn-primary" (click)="openAddModal()">+ Add Product</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>SKU</th><th>Category</th><th>Quantity</th>
            <th>Threshold</th><th>Price (₹)</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>

          <!-- Empty state -->
          <tr *ngIf="products.length === 0" class="empty-row">
            <td colspan="8">No products found.</td>
          </tr>

          <!-- *ngFor creates one <tr> for each product in the array -->
          <tr *ngFor="let p of products">
            <td>{{ p.name }}</td>
            <td>{{ p.sku }}</td>
            <td>{{ p.category }}</td>
            <td>{{ p.quantity }}</td>
            <td>{{ p.threshold }}</td>
            <!-- | number:'1.0-0' is an Angular pipe that adds comma formatting -->
            <td>₹{{ p.price | number:'1.0-0' }}</td>
            <td>
              <!-- [ngClass] sets the badge colour by calling badgeClass() in app.ts -->
              <span class="badge" [ngClass]="badgeClass(p.status)">{{ p.status }}</span>
            </td>
            <td>
              <button class="btn-warning btn-small" (click)="openStockModal(p.id, p.name)">Stock</button>
              <button class="btn-primary btn-small" (click)="openEditModal(p.id)">Edit</button>
              <button class="btn-danger  btn-small" (click)="deleteProduct(p.id, p.name)">Delete</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>

  <!-- ══ HISTORY TAB ══════════════════════════════════════════════ -->
  <div class="tab-content" [class.active]="activeTab === 'history'">
    <div class="card">
      <div class="history-header">
        <h2>Stock Movement History</h2>
        <button class="btn-danger" (click)="clearHistory()">Clear History</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th><th>Product</th><th>Type</th>
            <th>Qty Changed</th><th>Before</th><th>After</th><th>Note</th>
          </tr>
        </thead>
        <tbody>

          <tr *ngIf="history.length === 0" class="empty-row">
            <td colspan="7">No stock movements yet.</td>
          </tr>

          <tr *ngFor="let h of history">
            <!-- | date:'medium' formats the date string into a readable format -->
            <td>{{ h.date | date:'medium' }}</td>
            <td>{{ h.productName }}</td>
            <td>
              <span *ngIf="h.type === 'In'"  class="in-text">▲ In</span>
              <span *ngIf="h.type === 'Out'" class="out-text">▼ Out</span>
            </td>
            <td>{{ h.quantity }}</td>
            <td>{{ h.quantityBefore }}</td>
            <td>{{ h.quantityAfter }}</td>
            <td>{{ h.note || '—' }}</td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>

</div><!-- end .page -->

<!-- ══ MODAL: ADD / EDIT PRODUCT ═══════════════════════════════════
     [class.open] shows the modal when showProductModal is true
     [(ngModel)] binds each input directly to productForm fields
════════════════════════════════════════════════════════════════ -->
<div class="modal-overlay" [class.open]="showProductModal">
  <div class="modal">

    <h3>{{ isEditing ? 'Edit Product' : 'Add Product' }}</h3>

    <div class="form-row">
      <div class="form-group">
        <label>Product Name</label>
        <input type="text" [(ngModel)]="productForm.name" placeholder="e.g. Arduino Uno" />
      </div>
      <div class="form-group">
        <label>SKU</label>
        <input type="text" [(ngModel)]="productForm.sku" placeholder="e.g. ARD-001" />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Category</label>
        <input type="text" [(ngModel)]="productForm.category" placeholder="e.g. Electronics" />
      </div>
      <div class="form-group">
        <label>Price (₹)</label>
        <input type="number" [(ngModel)]="productForm.price" placeholder="0" />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Quantity</label>
        <input type="number" [(ngModel)]="productForm.quantity" placeholder="0" />
      </div>
      <div class="form-group">
        <label>Low Stock Threshold</label>
        <input type="number" [(ngModel)]="productForm.threshold" placeholder="10" />
      </div>
    </div>

    <div class="modal-buttons">
      <button class="btn-ghost"   (click)="showProductModal = false">Cancel</button>
      <button class="btn-primary" (click)="saveProduct()">Save</button>
    </div>

  </div>
</div>

<!-- ══ MODAL: STOCK UPDATE ══════════════════════════════════════════ -->
<div class="modal-overlay" [class.open]="showStockModal">
  <div class="modal">

    <h3>Update Stock — {{ stockProductName }}</h3>

    <div class="form-group">
      <label>Type</label>
      <select [(ngModel)]="stockForm.type">
        <option value="In">Stock In (Add)</option>
        <option value="Out">Stock Out (Remove)</option>
      </select>
    </div>

    <div class="form-group">
      <label>Quantity</label>
      <input type="number" [(ngModel)]="stockForm.quantity" min="1" />
    </div>

    <div class="form-group">
      <label>Note (optional)</label>
      <input type="text" [(ngModel)]="stockForm.note" placeholder="e.g. Received from supplier" />
    </div>

    <div class="modal-buttons">
      <button class="btn-ghost"   (click)="showStockModal = false">Cancel</button>
      <button class="btn-success" (click)="saveStock()">Confirm</button>
    </div>

  </div>
</div>
```

#### Angular Template Syntax Used:

- **Interpolation**: `{{ stats.total }}` - Displays variable values
- **Property Binding**: `[class.active]="activeTab === 'products'"` - Sets attributes dynamically
- **Event Binding**: `(click)="openAddModal()"` - Handles user interactions
- **Two-way Binding**: `[(ngModel)]="searchTerm"` - Syncs input with component property
- **Structural Directives**:
  - `*ngIf="condition"` - Conditional rendering
  - `*ngFor="let item of items"` - Loops through arrays
- **Pipes**: `{{ p.price | number:'1.0-0' }}` - Transforms displayed values
- **Safe Navigation**: `h.note || '—'` - Provides fallback values

### inventory.service.ts - The Complete API Service

Here's the full service code with detailed explanations:

```typescript
// services/inventory.service.ts
//
// A "Service" in Angular is a class that handles data and API calls.
// It replaces all the fetch() calls from your original inventory.js.
//
// Instead of fetch(), Angular uses HttpClient which returns "Observables".
// Observables are similar to Promises — they represent a future value.
// You use .subscribe() to get the result when it arrives.
//
// @Injectable({ providedIn: 'root' }) means Angular creates ONE shared
// instance of this service and makes it available to any component that needs it.

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product, ProductForm, StockUpdate, HistoryEntry } from '../models/inventory.models';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  // Same base URL as in your original inventory.js
  private API = 'http://localhost:5059';

  // Angular automatically provides HttpClient here — we don't create it manually
  constructor(private http: HttpClient) {}

  // ── PRODUCTS ──────────────────────────────────────────────────

  // Replaces: fetch(API + '/api/products?search=' + search)
  getProducts(search: string = ''): Observable<Product[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<Product[]>(`${this.API}/api/products`, { params });
  }

  // Replaces: fetch(API + '/api/products/' + id)
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API}/api/products/${id}`);
  }

  // Replaces: fetch(url, { method: 'POST', body: JSON.stringify(product) })
  createProduct(product: ProductForm): Observable<Product> {
    return this.http.post<Product>(`${this.API}/api/products`, product);
  }

  // Replaces: fetch(url, { method: 'PUT', body: JSON.stringify(product) })
  updateProduct(id: number, product: ProductForm): Observable<Product> {
    return this.http.put<Product>(`${this.API}/api/products/${id}`, product);
  }

  // Replaces: fetch(url, { method: 'DELETE' })
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/api/products/${id}`);
  }

  // ── STOCK ─────────────────────────────────────────────────────

  updateStock(productId: number, update: StockUpdate): Observable<void> {
    return this.http.post<void>(
      `${this.API}/api/products/${productId}/stock`, update
    );
  }

  // ── ALERTS ────────────────────────────────────────────────────

  getAlerts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API}/api/alerts`);
  }

  // ── HISTORY ───────────────────────────────────────────────────

  getHistory(): Observable<HistoryEntry[]> {
    return this.http.get<HistoryEntry[]>(`${this.API}/api/history`);
  }

  clearHistory(): Observable<void> {
    return this.http.delete<void>(`${this.API}/api/history`);
  }
}
```

#### HttpClient Methods:

- `http.get<T>(url, options?)` - GET requests, returns Observable<T>
- `http.post<T>(url, body, options?)` - POST requests with data
- `http.put<T>(url, body, options?)` - PUT requests to update
- `http.delete<T>(url, options?)` - DELETE requests

#### Key Differences from fetch():

- Returns `Observable` instead of Promise
- Automatic JSON parsing with generic types (`<Product[]>`)
- Built-in error handling
- No need for `headers: { 'Content-Type': 'application/json' }`
- Query parameters handled with `HttpParams`

### inventory.models.ts - Complete Type Definitions

```typescript
// models/inventory.models.ts
// TypeScript "interfaces" define the SHAPE of our data objects.
// Think of them as blueprints — they tell TypeScript exactly
// what fields each object has and what type each field is.
// This catches mistakes early: if you typo "quatity" instead of
// "quantity", TypeScript will warn you immediately.

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

// Used when creating or editing (no id needed for new products)
export interface ProductForm {
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  threshold: number;
}

// Sent to the API when doing Stock In or Stock Out
export interface StockUpdate {
  type: 'In' | 'Out';
  quantity: number;
  note: string;
}

// One row in the Stock Movement History table
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

// The four numbers shown in the stat boxes at the top
export interface Stats {
  total: number;
  inStock: number;
  low: number;
  out: number;
}
```

#### TypeScript Benefits:

- **Type Safety**: Catches type mismatches at compile time
- **IntelliSense**: Auto-completion in your editor
- **Documentation**: Interfaces serve as living documentation
- **Refactoring**: Safe to rename properties across the codebase

### styles.css - Complete Global Styles

Here's the complete Angular global stylesheet:

```css
/* You can add global styles to this file, and also import other style files */
/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES  —  inventory-angular
   These apply to the whole app.
═══════════════════════════════════════════════════════════════ */

/* ── CSS VARIABLES ──────────────────────────────────────────────
   Define colours once here — change here, updates everywhere.
────────────────────────────────────────────────────────────── */
:root {
  --navy:      #1a2332;
  --accent:    #00c896;
  --blue:      #2980b9;
  --green:     #27ae60;
  --orange:    #e67e22;
  --red:       #e74c3c;
  --bg:        #f0f2f5;
  --white:     #ffffff;
  --border:    #dde3ea;
  --text:      #1a2332;
  --text-muted:#6b7a8d;
  --radius:    8px;
  --shadow:    0 2px 12px rgba(26,35,50,0.08);
}

/* ── RESET ───────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── BASE ────────────────────────────────────────────────────── */html, body {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
body {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 15px;
  background: var(--bg);
  color: var(--text);
  line-height: 1.5;
}

/* ── LAYOUT ──────────────────────────────────────────────────── */
.page { max-width: 1140px; margin: 28px auto; padding: 0 20px; }

/* ── TOPBAR ──────────────────────────────────────────────────── */
.topbar {
  background: var(--navy);
  color: white;
  padding: 16px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid var(--accent);
}
.topbar h1 {
  font-size: 19px;
  font-weight: 600;
  font-family: 'IBM Plex Mono', monospace;
}
.topbar span { font-size: 12px; opacity: 0.55; text-transform: uppercase; letter-spacing: 0.05em; }

/* ── CARD ────────────────────────────────────────────────────── */
.card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow);
}
.card h2 {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--navy);
  border-bottom: 2px solid var(--accent);
  padding-bottom: 10px;
  margin-bottom: 18px;
}

/* ── STAT BOXES ──────────────────────────────────────────────── */
.stats { display: flex; gap: 16px; margin-bottom: 24px; }
.stat-box {
  flex: 1;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  text-align: center;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}
.stat-box::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
}
.stat-box.blue::before   { background: var(--blue); }
.stat-box.green::before  { background: var(--green); }
.stat-box.orange::before { background: var(--orange); }
.stat-box.red::before    { background: var(--red); }

.stat-box .number {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 36px;
  font-weight: 600;
  line-height: 1;
}
.stat-box.blue   .number { color: var(--blue); }
.stat-box.green  .number { color: var(--green); }
.stat-box.orange .number { color: var(--orange); }
.stat-box.red    .number { color: var(--red); }
.stat-box .label { font-size: 12px; color: var(--text-muted); margin-top: 6px; text-transform: uppercase; letter-spacing: 0.05em; }

/* ── ALERTS ──────────────────────────────────────────────────── */
.alert-item { padding: 10px 16px; border-radius: 6px; margin-bottom: 8px; font-size: 14px; }
.alert-out  { background: #fde8e8; border-left: 4px solid var(--red);    color: #c0392b; }
.alert-low  { background: #fef9e7; border-left: 4px solid var(--orange); color: #b7770d; }
.no-alerts  { color: var(--green); font-size: 14px; }

/* ── TOOLBAR ─────────────────────────────────────────────────── */
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 12px; }
.toolbar input {
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 14px;
  font-family: 'IBM Plex Sans', sans-serif;
  width: 260px;
  transition: border-color 0.2s;
}
.toolbar input:focus { outline: none; border-color: var(--accent); }

/* ── BUTTONS ─────────────────────────────────────────────────── */
button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s;
}
button:hover  { opacity: 0.88; }
button:active { transform: scale(0.97); }
.btn-primary  { background: var(--blue);   color: white; }
.btn-success  { background: var(--green);  color: white; }
.btn-danger   { background: var(--red);    color: white; }
.btn-warning  { background: var(--orange); color: white; }
.btn-ghost    { background: #eef0f4;       color: var(--text); }
.btn-small    { padding: 4px 10px; font-size: 12px; }

/* ── TABLE ───────────────────────────────────────────────────── */
table { width: 100%; border-collapse: collapse; font-size: 14px; }
thead th {
  background: var(--navy);
  color: white;
  padding: 11px 14px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
thead th:first-child { border-radius: 6px 0 0 0; }
thead th:last-child  { border-radius: 0 6px 0 0; }
tbody tr { border-bottom: 1px solid var(--border); transition: background 0.1s; }
tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background: #f6f8fb; }
tbody td { padding: 11px 14px; }
td button + button { margin-left: 4px; }

/* ── BADGES ──────────────────────────────────────────────────── */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.badge-green  { background: #d5f5e3; color: #1e8449; }
.badge-orange { background: #fef9e7; color: #b7770d; }
.badge-red    { background: #fde8e8; color: #c0392b; }

/* ── TABS ────────────────────────────────────────────────────── */
.tabs { display: flex; gap: 4px; border-bottom: 2px solid var(--border); }
.tab {
  padding: 10px 24px;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  border: 1px solid transparent;
  border-bottom: none;
  transition: all 0.15s;
  user-select: none;
}
.tab:hover { color: var(--text); background: #eef0f4; }
.tab.active {
  background: var(--white);
  color: var(--navy);
  border-color: var(--border);
  border-bottom-color: var(--white);
  margin-bottom: -2px;
}
.tab-content { display: none; padding-top: 0; }
.tab-content.active { display: block; }

/* ── MODAL ───────────────────────────────────────────────────── */
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(26,35,50,0.55);
  justify-content: center;
  align-items: center;
  z-index: 200;
  backdrop-filter: blur(2px);
}
.modal-overlay.open { display: flex; }
.modal {
  background: var(--white);
  border-radius: 12px;
  padding: 28px;
  width: 440px;
  max-width: 95vw;
  box-shadow: 0 20px 60px rgba(26,35,50,0.2);
  animation: modalIn 0.2s ease;
}
@keyframes modalIn {
  from { opacity: 0; transform: translateY(-12px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.modal h3 { font-size: 17px; font-weight: 600; color: var(--navy); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }

/* ── FORM ────────────────────────────────────────────────────── */
.form-group { margin-bottom: 14px; }
.form-group label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 5px; }
.form-group input,
.form-group select {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 14px;
  font-family: 'IBM Plex Sans', sans-serif;
  color: var(--text);
  transition: border-color 0.2s;
}
.form-group input:focus,
.form-group select:focus { outline: none; border-color: var(--accent); }
.form-row { display: flex; gap: 14px; }
.form-row .form-group { flex: 1; }
.modal-buttons { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border); }

/* ── HISTORY ─────────────────────────────────────────────────── */
.in-text  { color: var(--green); font-weight: 700; font-family: 'IBM Plex Mono', monospace; }
.out-text { color: var(--red);   font-weight: 700; font-family: 'IBM Plex Mono', monospace; }
.history-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.history-header h2 { border: none; margin: 0; padding: 0; }

/* ── EMPTY STATE ─────────────────────────────────────────────── */
.empty-row td { text-align: center; color: var(--text-muted); padding: 32px !important; font-size: 14px; }
```

#### Advanced CSS Features:

- **CSS Variables**: `--navy`, `--accent`, etc. for consistent theming
- **CSS Grid/Flexbox**: Advanced layout techniques
- **Animations**: `@keyframes modalIn` for smooth modal appearance
- **Backdrop Filter**: `backdrop-filter: blur(2px)` for modern glass effect
- **Custom Fonts**: 'IBM Plex Sans' and 'IBM Plex Mono'
- **Advanced Selectors**: `:first-child`, `:last-child`, `::before`

### Other Important Angular Files

#### main.ts - Application Bootstrap

```typescript
import 'zone.js';// detects any chnages in the app/webpage like : clicks and updates , etc.

// This is the entry point of the Angular app.
// It bootstraps (starts) the AppComponent and provides HttpClient
// so our service can make API calls to the C# backend.

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => {
    console.error('Bootstrap failed:', err);
    // Display error on page so user knows something is wrong
    const errorHtml = `
      <div style="background: #333; color: #fff; padding: 30px; font-family: monospace; white-space: pre-wrap;">
        <h2 style="color: #ff6b6b; margin-top: 0;">⚠️ Application Bootstrap Error</h2>
        <p><strong>Error:</strong> ${err.message}</p>
        <pre style="color: #aaa; font-size: 12px; overflow: auto; max-height: 300px;">${err.stack || 'No stack trace'}</pre>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">Check browser console (F12) for more details.</p>
      </div>
    `;
    document.body.innerHTML = errorHtml;
    document.body.style.margin = '0';
    document.body.style.background = '#1a1a1a';
  });
```

**Purpose**: Starts the Angular application and handles bootstrap errors gracefully.

#### app.config.ts - Application Configuration

```typescript
// app.config.ts
// This file configures the Angular application.
// provideHttpClient() makes Angular's HTTP service available
// throughout the app so our inventory service can call the C# API.

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient()
  ]
};
```

**Purpose**: Configures Angular's dependency injection system and enables HTTP client.

#### app.css - Component-Scoped Styles

```css
/* app.css
   Component-scoped styles for the root component.
   These only apply inside app.html — Angular scopes them automatically.
   All shared/global styles live in src/styles.css
*/

/* Ensure app root is visible and takes up available space */
:host {
  display: contents;
}

/* Small spacing between the three action buttons in each table row */
td button + button {
  margin-left: 4px;
}
```

**Purpose**: Styles specific to the AppComponent, automatically scoped by Angular.

#### index.html - Main HTML File

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>InventoryAngular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

**Purpose**: The single HTML file that hosts the Angular app. `<app-root>` is where Angular renders the AppComponent.

## Comparison: Plain JS vs Angular

### Plain JavaScript Version
**Pros:**
- Simple, no build process
- Direct DOM manipulation
- Easy to understand basics
- No dependencies

**Cons:**
- Manual DOM updates
- Repetitive code
- Harder to maintain
- No type safety
- Error-prone

**Best for:** Learning fundamentals, small projects

### Angular Version
**Pros:**
- Organized structure
- Automatic UI updates
- Type safety (TypeScript)
- Reusable components
- Built-in form handling
- Dependency injection
- Professional architecture

**Cons:**
- Steeper learning curve
- Build process required
- More complex setup

**Best for:** Larger applications, team development, maintainability

## Running the Applications

### Plain JS Version
1. Open `IVS_FrontEnd/inventory.html` in a web browser
2. Make sure the backend is running on `http://localhost:5059`

### Angular Version
1. Navigate to `IVS_FrontEnd/inventory-angular`
2. Run `npm install` to install dependencies
3. Run `ng serve` to start the development server
4. Open `http://localhost:4200` in a browser
5. Make sure the backend is running on `http://localhost:5059`

Both frontends connect to the same C# backend API, so they work interchangeably. The Angular version is more "production-ready" while the plain JS version is great for learning the core concepts.

## Summary

You now have a complete understanding of both frontend implementations:

- **Plain JS**: Direct DOM manipulation, fetch API, manual state management
- **Angular**: Components, templates, services, reactive programming, TypeScript

Both achieve the same functionality but demonstrate different approaches to frontend development. The Angular version showcases modern web development practices with better maintainability and scalability.

#### Key Features

- **Interpolation**: `{{ stats.total }}` displays the total count
- **Structural Directives**:
  - `*ngIf="alerts.length === 0"`: Conditional display
  - `*ngFor="let p of products"`: Loops through products
- **Event Binding**: `(click)="openAddModal()"` calls methods
- **Two-way Binding**: `[(ngModel)]="searchTerm"` syncs input with variable
- **Property Binding**: `[class.active]="activeTab === 'products'"` sets CSS classes
- **Pipes**: `{{ p.price | number:'1.0-0' }}` formats numbers

#### Modals

Modals are shown/hidden using `[class.open]="showProductModal"` and boolean flags instead of DOM manipulation.

### inventory.service.ts - The API Service

This service handles all communication with the backend.

#### HttpClient

Angular's `HttpClient` replaces `fetch()`:

```typescript
getProducts(search: string = ''): Observable<Product[]> {
  let params = new HttpParams();
  if (search) params = params.set('search', search);
  return this.http.get<Product[]>(`${this.API}/api/products`, { params });
}
```

- Returns `Observable` instead of Promise
- Uses `.subscribe()` to handle responses
- Automatic JSON parsing
- Built-in error handling

#### Methods

- `getProducts()`, `getProduct()`, `createProduct()`, `updateProduct()`, `deleteProduct()`
- `updateStock()`, `getAlerts()`, `getHistory()`, `clearHistory()`

### inventory.models.ts - Type Definitions

Defines TypeScript interfaces for type safety:

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

### Other Important Files

#### main.ts

The entry point that bootstraps the Angular app:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig);
```

#### app.config.ts

Configures the app, including providers:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient()
  ]
};
```

#### styles.css

Global styles that apply to the entire app.

## Comparison: Plain JS vs Angular

### Plain JavaScript Version
- **Pros**: Simple, no build process, easy to understand basics
- **Cons**: Lots of repetitive code, manual DOM manipulation, harder to maintain
- **Best for**: Learning fundamentals, small projects

### Angular Version
- **Pros**: Organized structure, less code, automatic updates, type safety
- **Cons**: Steeper learning curve, build process required
- **Best for**: Larger applications, team development, maintainability

Both versions do the same thing but demonstrate different approaches to frontend development. The Angular version is more "production-ready" while the plain JS version is great for learning the core concepts.

## Running the Applications

### Plain JS Version
1. Open `IVS_FrontEnd/inventory.html` in a web browser
2. Make sure the backend is running on `http://localhost:5059`

### Angular Version
1. Navigate to `IVS_FrontEnd/inventory-angular`
2. Run `npm install` to install dependencies
3. Run `ng serve` to start the development server
4. Open `http://localhost:4200` in a browser
5. Make sure the backend is running on `http://localhost:5059`

Both frontends connect to the same C# backend API, so they work interchangeably.