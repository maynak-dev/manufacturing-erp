export interface User {
  id: string; email: string; name: string; role: string;
}

export interface Company {
  id: string; name: string; industry?: string; gst?: string; address?: string;
  city?: string; state?: string; country?: string; pincode?: string;
  contacts?: Contact[]; orders?: Order[];
}

export interface Contact {
  id: string; name: string; phone?: string; email?: string;
  designation?: string; role?: string; companyId: string; company?: Company;
}

export interface Product {
  id: string; name: string; sku: string; category?: string;
  unit?: string; price: number; description?: string;
}

export interface Order {
  id: string; orderNumber: string; companyId: string; company?: Company;
  contactId?: string; contact?: Contact; status: string;
  deliveryDate?: string; totalAmount: number; notes?: string;
  items?: OrderItem[]; workOrders?: WorkOrder[];
  createdAt: string;
}

export interface OrderItem {
  id: string; productId: string; product?: Product;
  quantity: number; unitPrice: number; total: number;
}

export interface WorkOrder {
  id: string; workOrderNumber: string; orderId: string; order?: Order;
  productionUnit?: string; status: string;
  startDate?: string; endDate?: string; notes?: string;
}

export interface Inventory {
  id: string; productId: string; product?: Product;
  type: string; quantity: number; warehouse?: string; reorderLevel?: number;
}

export interface Vendor {
  id: string; name: string; email?: string; phone?: string; address?: string; gst?: string;
}

export interface PurchaseOrder {
  id: string; poNumber: string; vendorId: string; vendor?: Vendor;
  status: string; totalAmount: number; expectedDate?: string;
}

export interface Invoice {
  id: string; invoiceNumber: string; orderId: string; order?: Order;
  status: string; amount: number; dueDate?: string; payments?: Payment[];
}

export interface Payment {
  id: string; invoiceId: string; invoice?: Invoice;
  amount: number; status: string; method?: string; paidAt?: string;
}

export interface Dispatch {
  id: string; dispatchNumber: string; orderId: string; order?: Order;
  status: string; transportDetails?: string; trackingNumber?: string;
}

export interface PaginatedResponse<T> {
  data: T[]; total: number; page: number; totalPages: number;
}
