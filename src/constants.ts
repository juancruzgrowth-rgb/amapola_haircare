import { Product } from './types';

// Número de WhatsApp de la fundadora (formato internacional sin + ni espacios)
export const WHATSAPP_ORDER_NUMBER = '34625443926';

export const PRODUCTS: Product[] = [
  {
    id: 'tratamiento-profundo',
    name: 'Tratamiento Profundo',
    subtitle: 'Mascarilla intensiva · Nutrición y suavidad',
    price: 24.90,
    category: 'tratamiento',
    image: 'https://picsum.photos/seed/deeptreatment/800/800',
    description: 'Mascarilla nutritiva de uso semanal. Nutre, suaviza y aporta brillo al cabello seco, opaco o con frizz.',
    badge: 'Bestseller',
    fullDescription: 'Tratamiento de enjuague con una combinación rica de manteca de mango, aceites vegetales y activos acondicionadores. Su textura está pensada para envolver la fibra capilar, mejorar la sensación al tacto y acompañar la rutina de cabellos secos, opacos o con frizz.',
    benefits: [
      'Nutre intensamente los largos y puntas',
      'Ayuda a reducir la sensación de sequedad y aspereza',
      'Deja el cabello más suave, brillante y fácil de peinar',
      'Acompaña la rutina anti-frizz en cabellos sensibilizados'
    ],
    idealFor: 'Cabellos secos, con frizz, porosos, opacos o expuestos a calor y coloración.',
    ingredients: [
      { name: 'Manteca de mango', benefit: 'Sensación nutritiva y emoliente' },
      { name: 'Aceites de uva, aguacate, oliva, amapola, almendras y ricino', benefit: 'Suavidad, brillo y acondicionamiento' },
      { name: 'Glicerina + vitamina B5', benefit: 'Mantienen la hidratación y la manejabilidad' },
      { name: 'Aloe vera + vitamina E', benefit: 'Cuidado y protección cosmética de la fibra' },
      { name: 'Proteína de trigo + phytokeratina', benefit: 'Cuerpo y apariencia más uniforme' }
    ],
    usage: 'Luego del shampoo, aplicar de medios a puntas sobre cabello húmedo. Dejar actuar entre 10 y 15 minutos y enjuagar. Usar 1 o 2 veces por semana.'
  },
  {
    id: 'tratamiento-folicular',
    name: 'Tratamiento Folicular Pre Shampoo',
    subtitle: 'Pre-lavado oleoso · Sellado y control del frizz',
    price: 22.90,
    category: 'crecimiento',
    image: 'https://picsum.photos/seed/folicular/800/800',
    description: 'Ritual previo al lavado con aceites vegetales y fitosilicona natural. Suaviza, sella y protege la fibra antes de lavar.',
    fullDescription: 'Mezcla nutritiva de aceites vegetales y fitosilicona natural concebida para aplicarse antes del shampoo. Forma una película cosmética liviana sobre el cabello y ayuda a disminuir la sensación de resequedad que puede aparecer luego del lavado.',
    benefits: [
      'Ayuda a suavizar y sellar visualmente la fibra',
      'Reduce el frizz y facilita el peinado',
      'Aporta brillo, elasticidad y tacto sedoso',
      'Protege cosméticamente los largos antes del lavado'
    ],
    idealFor: 'Cabellos secos, encrespados, con puntas ásperas o que necesitan nutrición extra antes del lavado.',
    ingredients: [
      { name: 'Aceite de semilla de uva', benefit: 'Ligereza y brillo sin sensación pesada' },
      { name: 'Aceites de almendras, aguacate y oliva', benefit: 'Nutrición y suavidad para los largos' },
      { name: 'Aceite de amapola', benefit: 'Ingrediente distintivo alineado con la identidad natural de la marca' },
      { name: 'Fitosilicona natural', benefit: 'Acabado sedoso, mejor deslizamiento y control visual del frizz' }
    ],
    usage: 'Aplicar sobre cabello seco, principalmente en medios y puntas, antes del shampoo. Dejar actuar entre 15 y 30 minutos y luego lavar con normalidad.'
  },
  {
    id: 'shampoo',
    name: 'Shampoo',
    subtitle: 'Limpieza suave · Hidratación y confort',
    price: 18.90,
    category: 'limpieza',
    image: 'https://picsum.photos/seed/shampoo-seco/800/800',
    description: 'Shampoo de uso habitual con botánicos aromáticos, proteínas capilares y humectantes. Limpieza delicada y experiencia sensorial.',
    fullDescription: 'Shampoo de uso habitual enriquecido con botánicos aromáticos, humectantes y proteínas capilares. Su propuesta combina limpieza con una experiencia sensorial serena, respetando la estética natural y delicada de Amapola.',
    benefits: [
      'Limpia con suavidad el cabello y el cuero cabelludo',
      'Ayuda a evitar una sensación tirante o reseca tras el lavado',
      'Aporta suavidad y mejor manejabilidad',
      'Prepara la fibra para acondicionador o tratamiento profundo'
    ],
    idealFor: 'Rutinas de cuidado delicado, cabellos que buscan limpieza confortable y una experiencia floral natural.',
    ingredients: [
      { name: 'Lavanda', benefit: 'Experiencia relajante y fresca' },
      { name: 'Azahar', benefit: 'Sensación floral suave y elegante' },
      { name: 'Glicerina', benefit: 'Conserva la hidratación durante el lavado' },
      { name: 'Proteína de seda', benefit: 'Mejora la suavidad y el deslizamiento cosmético' },
      { name: 'Proteína de trigo', benefit: 'Apariencia de fibra más cuidada' }
    ],
    usage: 'Aplicar sobre cabello mojado, masajear suavemente el cuero cabelludo con las yemas de los dedos y enjuagar. Continuar con acondicionador o mascarilla.'
  },
  {
    id: 'gotero',
    name: 'Gotero Crecimiento',
    subtitle: 'Sérum botánico · Ritual de cuero cabelludo',
    price: 19.50,
    category: 'crecimiento',
    image: '/gotero.png',
    description: 'Sérum botánico de textura liviana para el ritual del cuero cabelludo. Romero, ortiga verde y aloe vera para un cabello más fuerte.',
    fullDescription: 'Gotero de textura liviana pensado para incorporar a la rutina del cuero cabelludo. Combina romero, ortiga verde y otros extractos botánicos con aloe vera y glicerina, creando un ritual fresco, hidratante y sensorial.',
    benefits: [
      'Acompaña la rutina de masaje del cuero cabelludo',
      'Aporta una sensación fresca, equilibrada y confortable',
      'Contribuye a que el cabello luzca más fuerte y cuidado',
      'Ideal como gesto de autocuidado entre lavados'
    ],
    idealFor: 'Personas que buscan sumar un ritual botánico de cuero cabelludo a su rutina capilar.',
    ingredients: [
      { name: 'Romero + ortiga verde', benefit: 'Botánicos protagonistas del ritual capilar' },
      { name: 'Lavanda, jengibre y clavo dulce', benefit: 'Perfil aromático y sensorial intenso' },
      { name: 'Aloe vera + glicerina', benefit: 'Hidratación y confort' },
      { name: 'Vitamina E + neem', benefit: 'Activos complementarios para el cuidado cosmético' }
    ],
    usage: 'Aplicar pocas gotas por secciones, masajear suavemente el cuero cabelludo y evitar contacto con ojos. Realizar prueba de tolerancia antes del uso regular.'
  },
  {
    id: 'acondicionador',
    name: 'Acondicionador',
    subtitle: 'Desenredo y reparación cosmética · Uso post-lavado',
    price: 16.50,
    category: 'hidratacion-nutricion',
    image: 'https://picsum.photos/seed/conditioner/800/800',
    description: 'Acondicionador cremoso post-lavado. Hidrata, suaviza y facilita el desenredo. Aceites de aguacate, coco y proteína de arroz.',
    fullDescription: 'Acondicionador cremoso que combina aceites vegetales, aloe vera, glicerina y activos acondicionadores para mejorar el tacto de la fibra luego del shampoo. Su función es cerrar la rutina de lavado dejando el cabello más suave y protegido cosméticamente.',
    benefits: [
      'Hidrata y suaviza después del lavado',
      'Facilita el desenredo y reduce la fricción al peinar',
      'Ayuda a controlar el frizz y mejora el brillo',
      'Aporta una sensación de fibra reparada y flexible'
    ],
    idealFor: 'Todo tipo de cabello, especialmente largos secos, con frizz o con necesidad de suavidad adicional.',
    ingredients: [
      { name: 'Aceites de aguacate y coco', benefit: 'Nutrición, suavidad y brillo' },
      { name: 'Azahar', benefit: 'Toque floral delicado y sensorial' },
      { name: 'Aloe vera + glicerina', benefit: 'Hidratación y confort' },
      { name: 'Proteína de arroz + hidroqueratina natural', benefit: 'Apariencia de fibra más uniforme y cuidada' },
      { name: 'Vitamina B5 + fitosilicona natural', benefit: 'Manejabilidad, desenredo y acabado sedoso' }
    ],
    usage: 'Aplicar luego del shampoo sobre medios y puntas. Dejar actuar entre 2 y 5 minutos y enjuagar. Para mayor nutrición, complementar con el Tratamiento Profundo.'
  },
  {
    id: 'exfoliante-capilar',
    name: 'Exfoliante Capilar',
    subtitle: 'Renovación suave · Cuidado del cuero cabelludo',
    price: 21.90,
    category: 'limpieza',
    image: 'https://picsum.photos/seed/exfoliante/800/800',
    description: 'Limpieza complementaria y renovación del cuero cabelludo. Base acondicionadora con aceite de coco para una experiencia suave.',
    fullDescription: 'Producto pensado para sumar una limpieza complementaria a la rutina capilar. La base acondicionadora junto con aceite de coco y vitamina B3 busca mantener una experiencia suave y nutritiva durante el ritual de renovación.',
    benefits: [
      'Acompaña una limpieza profunda pero amable del cuero cabelludo',
      'Brinda sensación de renovación y frescura',
      'Busca evitar una experiencia áspera gracias a su base acondicionadora',
      'Puede integrarse como paso previo al shampoo'
    ],
    idealFor: 'Rutinas que incorporan una renovación ocasional del cuero cabelludo, sin irritación ni sensibilidad activa.',
    ingredients: [
      { name: 'Aceite de coco', benefit: 'Suavidad y nutrición cosmética' },
      { name: 'Vitamina B3', benefit: 'Activo complementario para el cuidado de la zona' },
      { name: 'Base acondicionadora', benefit: 'Deslizamiento y confort durante el uso' }
    ],
    usage: 'Aplicar sobre cuero cabelludo húmedo antes del shampoo, masajear con extrema suavidad y enjuagar. No usar sobre piel irritada. Uso ocasional.'
  }
];
