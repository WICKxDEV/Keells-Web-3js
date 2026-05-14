import { collection, getDocs, writeBatch, doc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { FEATURED_PRODUCTS } from '../constants';
import { handleFirestoreError, OperationType } from './firestore-errors';

const EXTENDED_PRODUCTS = [
  ...FEATURED_PRODUCTS,
  {
    id: '4',
    name: 'Red Onion (Lunu)',
    nameSi: 'රතු ළූණු',
    price: 380,
    image: 'https://images.unsplash.com/photo-1580148192663-549071727787?auto=format&fit=crop&q=80',
    category: 'Vegetables',
    unit: 'kg',
    isFresh: true,
    rating: 4.5,
    stock: 500
  },
  {
    id: '5',
    name: 'Munchee Super Cream Cracker',
    nameSi: 'සුපර් ක්‍රීම් ක්‍රැකර්',
    price: 240,
    image: 'https://images.unsplash.com/photo-1558961776-6f4bb6397ad6?auto=format&fit=crop&q=80',
    category: 'Snacks',
    unit: 'pack',
    isFresh: false,
    rating: 4.9,
    stock: 1200
  },
  {
    id: '6',
    name: 'Fresh Whole Milk (1L)',
    nameSi: 'නැවුම් කිරි',
    price: 490,
    image: 'https://images.unsplash.com/photo-1550583724-125581f778d3?auto=format&fit=crop&q=80',
    category: 'Dairy',
    unit: 'bottle',
    isFresh: true,
    rating: 4.8,
    stock: 250
  },
  {
    id: '7',
    name: 'Traditional Sri Lankan Spices Pack',
    nameSi: 'කුළුබඩු පැකේජය',
    price: 850,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd05ce?auto=format&fit=crop&q=80',
    category: 'Sri Lankan Local Products',
    unit: 'pack',
    isFresh: false,
    rating: 4.9,
    stock: 300
  },
  {
    id: '8',
    name: 'Panadol Advance (24 Tablets)',
    nameSi: 'පැනඩෝල්',
    price: 420,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80',
    category: 'Pharmacy',
    unit: 'pack',
    isFresh: false,
    rating: 5.0,
    stock: 1000
  }
];

export const seedDatabase = async () => {
  try {
    let productsSnapshot;
    try {
      productsSnapshot = await getDocs(collection(db, 'products'));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'products');
      return;
    }

    if (productsSnapshot.empty) {
      console.log('Seeding products...');
      const batch = writeBatch(db);
      
      EXTENDED_PRODUCTS.forEach((product) => {
        const productRef = doc(collection(db, 'products'), product.id);
        batch.set(productRef, {
          ...product,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      });

      const categories = [
        { id: 'fruits', name: 'Fruits', nameSi: 'පළතුරු' },
        { id: 'vegetables', name: 'Vegetables', nameSi: 'එළවළු' },
        { id: 'bakery', name: 'Bakery', nameSi: 'බේකරි නිෂ්පාදන' },
        { id: 'dairy', name: 'Dairy', nameSi: 'කිරි නිෂ්පාදන' },
        { id: 'frozen', name: 'Frozen Foods', nameSi: 'ශීත කළ ආහාර' },
        { id: 'household', name: 'Household', nameSi: 'ගෘහස්ථ අවශ්‍යතා' },
        { id: 'pharmacy', name: 'Pharmacy', nameSi: 'ඔසුසල' },
        { id: 'snacks', name: 'Snacks', nameSi: 'කෑම වර්ග' },
        { id: 'electronics', name: 'Electronics', nameSi: 'විද්‍යුත් උපකරණ' },
        { id: 'personal-care', name: 'Personal Care', nameSi: 'පුද්ගලික සත්කාර' },
        { id: 'baby-care', name: 'Baby Care', nameSi: 'ළදරු සත්කාර' },
        { id: 'local', name: 'Sri Lankan Local Products', nameSi: 'දේශීය නිෂ්පාදන' }
      ];

      categories.forEach(cat => {
        const catRef = doc(collection(db, 'categories'), cat.id);
        batch.set(catRef, cat);
      });

      try {
        await batch.commit();
        console.log('Database seeded successfully with enterprise data');
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'batch-seed');
      }
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
