import { Product } from './types';

// Número de WhatsApp de la fundadora (formato internacional sin + ni espacios)
// Ejemplo: "34612345678" para España
export const WHATSAPP_ORDER_NUMBER = '34625443926';

export const PRODUCTS: Product[] = [
  {
    id: 'gotero',
    name: 'Gotero Capilar',
    price: 19.50,
    category: 'tratamiento',
    image: '/gotero.png',
    description: 'Tratamiento concentrado en aceite para nutrir, fortalecer y dar brillo al cabello. Uso diario.',
    badge: 'Bestseller'
  },
  {
    id: 'acondicionador',
    name: 'Acondicionador',
    price: 16.50,
    category: 'hidratacion-nutricion',
    image: 'https://picsum.photos/seed/conditioner/800/800',
    description: 'Desenreda y sella la hidratación. Sedosidad instantánea sin residuos.'
  },
  {
    id: 'tratamiento-profundo',
    name: 'Tratamiento Profundo',
    price: 24.90,
    category: 'tratamiento',
    image: 'https://picsum.photos/seed/deeptreatment/800/800',
    description: 'Mascarilla intensiva de uso semanal. Repara, hidrata y restaura el cabello dañado.'
  },
  {
    id: 'shampoo-graso',
    name: 'Champú Pelo Graso',
    price: 18.90,
    category: 'limpieza',
    image: 'https://picsum.photos/seed/shampoo-graso/800/800',
    description: 'Limpieza profunda sin sulfatos agresivos. Regula el sebo y deja el cuero cabelludo equilibrado.'
  },
  {
    id: 'shampoo-seco',
    name: 'Champú Pelo Seco',
    price: 18.90,
    category: 'limpieza',
    image: 'https://picsum.photos/seed/shampoo-seco/800/800',
    description: 'Limpieza suave y nutritiva. Aporta hidratación desde la primera aplicación.'
  },
  {
    id: 'exfoliante-capilar',
    name: 'Exfoliante Capilar',
    price: 21.90,
    category: 'limpieza',
    image: 'https://picsum.photos/seed/exfoliante/800/800',
    description: 'Elimina la acumulación de producto y células muertas del cuero cabelludo. Uso quincenal.'
  },
  {
    id: 'tratamiento-folicular',
    name: 'Tratamiento Folicular',
    price: 22.90,
    category: 'crecimiento',
    image: 'https://picsum.photos/seed/folicular/800/800',
    description: 'Estimula el folículo capilar y reduce la caída. Formulado con activos naturales.'
  }
];
