export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: string[];
  rating: number;
}

export type Page = 'home' | 'shop' | 'story' | 'contact' | 'process' | 'sustainability' | 'blog' | 'subscriptions' | 'gifts';

export interface CartItem extends Product {
  quantity: number;
}