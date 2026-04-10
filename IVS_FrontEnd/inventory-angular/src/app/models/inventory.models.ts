

// TypeScript "interfaces" define the SHAPE of our data objects.
// what fields each object has and what type each field is.




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


export interface ProductForm {
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  threshold: number;
}


export interface StockUpdate {
  type: 'In' | 'Out';
  quantity: number;
  note: string;
}


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


export interface Stats {
  total: number;
  inStock: number;
  low: number;
  out: number;
}
