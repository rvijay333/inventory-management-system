 

    // The base URL of our C# API
    // Make sure this matches the port shown when you run "dotnet run"
    const API = "http://localhost:5059";


    // ──────────────────────────────────────────────────────
    // LOAD PRODUCTS
    // Calls GET /api/products and fills the table with results
    // ──────────────────────────────────────────────────────
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


    // ──────────────────────────────────────────────────────
    // UPDATE STATS
    // Counts how many products are in each status category
    // and updates the four boxes at the top of the page
    // ──────────────────────────────────────────────────────
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


    // ──────────────────────────────────────────────────────
    // LOAD ALERTS
    // Calls GET /api/alerts and shows the alert boxes
    // ──────────────────────────────────────────────────────
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


    // ──────────────────────────────────────────────────────
    // LOAD HISTORY
    // Calls GET /api/history and fills the history table
    // ──────────────────────────────────────────────────────
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


    // ──────────────────────────────────────────────────────
    // OPEN / CLOSE MODALS
    // ──────────────────────────────────────────────────────
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


    // ──────────────────────────────────────────────────────
    // SAVE PRODUCT (Add or Edit)
    // Reads the form values and sends them to the API
    // ──────────────────────────────────────────────────────
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


    // ──────────────────────────────────────────────────────
    // DELETE PRODUCT
    // Asks the user to confirm, then sends DELETE to the API
    // ──────────────────────────────────────────────────────
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


    // ──────────────────────────────────────────────────────
    // SAVE STOCK UPDATE (In or Out)
    // ──────────────────────────────────────────────────────
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


    // ──────────────────────────────────────────────────────
    // TAB SWITCHING
    // Shows/hides the Products or History tab
    // ──────────────────────────────────────────────────────
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



    // ──────────────────────────────────────────────────────
    // CLEAR HISTORY
    // Calls DELETE /api/history to wipe all movement records
    // ──────────────────────────────────────────────────────
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
        } 
        else {
            alert("Something went wrong. Could not clear history.");
        }
    }


    // ──────────────────────────────────────────────────────
    // INITIAL LOAD
    // When the page first opens, load products and alerts
    // ──────────────────────────────────────────────────────
    loadProducts();
    loadAlerts();

  
