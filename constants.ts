import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Original Roasted Nibs",
    description: "Granos puros de origen ecuatoriano, tostados a la perfección para un perfil intenso y nuez.",
    price: 24.00,
    image: "https://picsum.photos/id/1060/800/800",
    tags: ["Best Seller", "Organic"],
    rating: 5
  },
  {
    id: 2,
    name: "Raw Cacao Nibs",
    description: "Nibs crudos prensados en frío, conservando todos los antioxidantes y el sabor frutal natural.",
    price: 28.00,
    image: "https://picsum.photos/id/1062/800/800",
    tags: ["Raw", "Superfood"],
    rating: 4.8
  },
  {
    id: 3,
    name: "Espresso Infused Nibs",
    description: "Una mezcla audaz de nuestros nibs premium con granos de café arábica finamente molidos.",
    price: 26.50,
    image: "https://picsum.photos/id/425/800/800",
    tags: ["New", "Caffeinated"],
    rating: 4.9
  },
  {
    id: 4,
    name: "Sweetened with Yacon",
    description: "Dulzura natural sin culpa. Nibs cubiertos con jarabe de yacón orgánico.",
    price: 30.00,
    image: "https://picsum.photos/id/429/800/800",
    tags: ["Sugar Free", "Keto"],
    rating: 4.7
  },
  {
    id: 5,
    name: "Chili & Sea Salt",
    description: "Una experiencia exótica. Un toque de picante seguido de la profundidad del cacao.",
    price: 25.00,
    image: "https://picsum.photos/id/493/800/800",
    tags: ["Spicy", "Gourmet"],
    rating: 4.6
  },
  {
    id: 6,
    name: "Ceremonial Block",
    description: "Bloque sólido de pasta de cacao 100% puro para bebidas ceremoniales.",
    price: 35.00,
    image: "https://picsum.photos/id/431/800/800",
    tags: ["Ceremonial", "Solid"],
    rating: 5
  }
];

export const NAV_LINKS = [
  { label: 'Inicio', value: 'home' },
  { label: 'Tienda', value: 'shop' },
  { label: 'Nuestra Historia', value: 'story' },
  { label: 'Contacto', value: 'contact' },
];