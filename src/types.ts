export interface Product {
  id: string;
  name: string;
  nameSi: string;
  price: number;
  image: string;
  category: string;
  isFresh: boolean;
  rating: number;
}

export interface NavItem {
  label: string;
  labelSi: string;
  path: string;
  icon?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
