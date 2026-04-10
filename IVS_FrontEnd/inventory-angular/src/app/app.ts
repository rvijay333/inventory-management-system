
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';     

import { InventoryService } from './services/inventory.service';
import { Product, ProductForm, StockUpdate, HistoryEntry, Stats } from './models/inventory.models';

@Component({                           
  selector: 'app-root',               
  standalone: true,                    
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',           
  styleUrl: './app.css'                
})

export class AppComponent implements OnInit {

  products: Product[] = [];       
  alerts:   Product[] = [];       
  history:  HistoryEntry[] = [];  

  stats: Stats = { total: 0, inStock: 0, low: 0, out: 0 };

  searchTerm: string = '';        

  activeTab: 'products' | 'history' = 'products';
  
  showProductModal = false;
  showStockModal = false;
  isEditing = false;
  editingId: number | null = null;

  productForm: ProductForm = { name: '', sku: '', category: '', price: 0, quantity: 0, threshold: 10 };
  stockForm: StockUpdate = { type: 'In', quantity: 1, note: '' };
  stockProductId: number | null = null;
  stockProductName: string = '';
  
  constructor(private inventoryService: InventoryService) { }
  
  ngOnInit(): void {
    this.loadProducts();
    this.loadAlerts();
  }

  loadProducts(): void {
    this.inventoryService.getProducts(this.searchTerm).subscribe({
      next: (products) => {
        this.products = products;
        this.updateStats(products);
      },
      error: (err) => console.error('Failed to load products', err)
    });
  }
  
  updateStats(products: Product[]): void { 
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
    if (this.stockProductId === null) return; 
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
