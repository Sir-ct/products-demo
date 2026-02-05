// Product returned from API
export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

// Product stored in cart (extends Product)
export type CartItem = Product & {
  quantity: number;
};

// Order placed after checkout (mock)
export type Order = {
  id?: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: string;
  createdAt?: string;
  status?: 'pending' | 'completed';
};

// Checkout form data
export type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};
