import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'shampoo-nutritivo',
    name: 'Champú Nutritivo',
    price: 18.90,
    category: 'limpieza',
    image: 'https://picsum.photos/seed/shampoo/800/800',
    description: 'Limpieza suave sin sulfatos agresivos. Nutre desde la raíz.',
    badge: 'Bestseller'
  },
  {
    id: 'acondicionador-hidratante',
    name: 'Acondicionador Hidratante',
    price: 16.50,
    category: 'hidratacion',
    image: 'https://picsum.photos/seed/conditioner/800/800',
    description: 'Desenreda y sella la hidratación. Sedosidad instantánea.'
  },
  {
    id: 'mascarilla-reparadora',
    name: 'Mascarilla Reparadora',
    price: 22.90,
    category: 'tratamiento',
    image: 'https://picsum.photos/seed/mask/800/800',
    description: 'Reparación profunda para cabello dañado por químicos o calor.',
    badge: 'Nuevo'
  },
  {
    id: 'serum-brillo',
    name: 'Sérum de Brillo',
    price: 14.90,
    category: 'hidratacion',
    image: 'https://picsum.photos/seed/serum/800/800',
    description: 'Acabado brillante sin peso. Sella las puntas abiertas.'
  },
  {
    id: 'aceite-nutritivo',
    name: 'Aceite Nutritivo',
    price: 19.50,
    category: 'tratamiento',
    image: 'https://picsum.photos/seed/oil/800/800',
    description: 'Nutrición intensa con aceites naturales. Para todo tipo de cabello.'
  },
  {
    id: 'crema-rizos',
    name: 'Crema de Rizos',
    price: 15.90,
    category: 'styling',
    image: 'https://picsum.photos/seed/curls/800/800',
    description: 'Define y controla los rizos sin efecto cartón. Fijación flexible.'
  }
];
