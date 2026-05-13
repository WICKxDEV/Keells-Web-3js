import { NavItem, Product } from './types';

export const COLORS = {
  primary: '#008444', // Keells Deep Green
  secondary: '#79B729', // Keells Light Green
  accent: '#FFD700', // Nexus Gold
  background: '#FCFDFB',
  text: '#1A2E1A',
  muted: '#4A5A4A',
  glass: 'bg-white/40 backdrop-blur-md border border-white/20'
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', labelSi: 'මුල් පිටුව', path: '/' },
  { label: 'Shop', labelSi: 'වෙළඳසැල', path: '/shop' },
  { label: 'Deals', labelSi: 'දීමනා', path: '/deals' },
  { label: 'Fresh Market', labelSi: 'නැවුම් වෙළඳපොළ', path: '/fresh' },
  { label: 'Recipes', labelSi: 'වට්ටෝරු', path: '/recipes' },
  { label: 'Loyalty', labelSi: 'ප්‍රසාද ලකුණු', path: '/loyalty' },
  { label: 'Delivery', labelSi: 'බෙදාහැරීම්', path: '/delivery' },
  { label: 'Careers', labelSi: 'වෘත්තීන්', path: '/careers' },
  { label: 'Contact', labelSi: 'සම්බන්ධ වන්න', path: '/contact' },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sri Lankan Rata Amba',
    nameSi: 'රට අඹ',
    price: 450,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80',
    category: 'Fruits',
    isFresh: true,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Organic Cavendish Banana',
    nameSi: 'පුවාලු කෙසෙල්',
    price: 320,
    image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&q=80',
    category: 'Fruits',
    isFresh: true,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Fresh Ceylon Tea (Gold Leaf)',
    nameSi: 'සිලෝන් තේ',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80',
    category: 'Beverages',
    isFresh: false,
    rating: 4.9
  }
];
