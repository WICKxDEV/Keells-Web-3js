import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'welcome': 'Welcome to Keells',
      'shop_now': 'Shop Now',
      'fresh_market': 'Fresh Market',
      'deals': 'Daily Deals',
      'recipes': 'Recipes',
      'loyalty': 'Loyalty',
      'delivery': 'Track Delivery',
      'ai_assistant': 'AI Assistant',
      'cart': 'Your Cart',
      'sinhala': 'සිංහල',
      'english': 'English',
      'hero_title': 'The Future of Freshness',
      'hero_subtitle': 'Experience Sri Lanka\'s most immersive supermarket journey.',
      'search_placeholder': 'Search for fresh groceries...',
      'categories': 'Categories',
      'featured': 'Featured Products'
    }
  },
  si: {
    translation: {
      'welcome': 'කීල්ස් වෙත සාදරයෙන් පිළිගනිමු',
      'shop_now': 'දැන් මිලදී ගන්න',
      'fresh_market': 'නැවුම් එළවළු සහ පළතුරු',
      'deals': 'අද දවසේ විශේෂ දීමනා',
      'recipes': 'රෙසිපි',
      'loyalty': 'ප්‍රසාද ලකුණු',
      'delivery': 'ඇණවුම පරීක්ෂා කරන්න',
      'ai_assistant': 'AI සහායක',
      'cart': 'ඔබේ කරත්තය',
      'sinhala': 'සිංහල',
      'english': 'English',
      'hero_title': 'නැවුම්බවේ අනාගතය',
      'hero_subtitle': 'ශ්‍රී ලංකාවේ වඩාත් ආකර්ෂණීය සුපිරි වෙළඳසැල් අත්දැකීම විඳගන්න.',
      'search_placeholder': 'නැවුම් බඩු බාහිරාදිය සොයන්න...',
      'categories': 'අංශයන්',
      'featured': 'විශේෂිත නිෂ්පාදන'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
