-- Amapola Haircare — seed inicial de blog posts
-- Ejecutar contra la instancia local o cloud de Supabase

INSERT INTO blog_posts (
  id, title, excerpt, content, image_url, category,
  related_product_id, product_recommendation_text,
  target_audience, status, published_at
) VALUES

-- POST 1: Porosidad capilar
(
  'b1000000-0000-0000-0000-000000000001',
  'Cómo Determinar tu Tipo de Porosidad Capilar',
  'La porosidad define cómo tu cabello absorbe y retiene la humedad. Conocerla es el primer paso para construir una rutina que de verdad funcione.',
  E'## ¿Qué es la porosidad capilar?\n\nLa porosidad capilar describe la capacidad de tu cabello para absorber y retener la humedad. Está determinada por la estructura de la cutícula — la capa exterior de cada hebra de cabello. Conocer tu porosidad es, posiblemente, el dato más importante para elegir los productos correctos.\n\n## Los tres tipos de porosidad\n\n### Porosidad baja\nLas cutículas están muy cerradas y apretadas. El agua y los productos tienen dificultad para entrar, pero una vez dentro, la humedad se retiene bien. Señales: el cabello tarda mucho en mojarse y en secarse, los productos tienden a acumularse en la superficie.\n\n**Lo que necesitas:** calor suave para abrir las cutículas antes de aplicar tratamientos. Productos ligeros como sérums y aceites de molécula pequeña (argán, camellia). Evita ingredientes pesados como mantequillas densas.\n\n### Porosidad media\nLas cutículas están en un estado de apertura equilibrado. El cabello absorbe la humedad con facilidad y la retiene razonablemente bien. Es el tipo más común y el más fácil de manejar.\n\n**Lo que necesitas:** mantener ese equilibrio con una rutina regular de hidratación y un tratamiento semanal reparador.\n\n### Porosidad alta\nLas cutículas están muy abiertas o dañadas. El cabello absorbe la humedad muy rápido pero también la pierde con igual velocidad. Puede deberse a daño químico (tinte, decoloración), calor excesivo o genética.\n\n**Lo que necesitas:** ingredientes que sellen la cutícula — aceites pesados, mantequillas, proteínas. Finalizar siempre con un aceite o sérum para sellar.\n\n## El test casero de la porosidad\n\nToma un mechón de cabello limpio (sin producto) y colócalo en un vaso de agua a temperatura ambiente:\n\n- **Flota en la superficie**: porosidad baja\n- **Se queda en el medio**: porosidad media\n- **Se hunde rápido**: porosidad alta\n\n## Cómo adaptar tu rutina según tu porosidad\n\nUna vez que conoces tu porosidad, cada decisión de producto tiene sentido. No se trata de usar los productos más caros, sino los más adecuados para tu estructura capilar.\n\nEn Amapola formulamos cada producto pensando en esta diversidad. Nuestro acondicionador está diseñado para sellar la cutícula y aportar hidratación duradera, ideal tanto para porosidad media como alta.',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=500&fit=crop&auto=format',
  'Educación',
  'acondicionador',
  'Nuestro Acondicionador sella la cutícula y aporta hidratación duradera — perfecto para cualquier tipo de porosidad.',
  'female',
  'published',
  '2026-05-05 10:00:00+00'
),

-- POST 2: Rutina para cabello seco
(
  'b2000000-0000-0000-0000-000000000002',
  'Rutina Capilar para Cabello Seco: Guía Paso a Paso',
  'El cabello seco necesita hidratación profunda y protección constante. Esta guía completa te explica cómo armar una rutina eficaz sin complicarte.',
  E'## Por qué el cabello se vuelve seco\n\nEl cabello seco no produce suficiente sebo natural — o lo pierde antes de distribuirse por la hebra. Las causas más frecuentes son: lavado demasiado frecuente con champús agresivos, exceso de calor sin protección, exposición al sol y al mar, tratamientos químicos, y simplemente la genética.\n\nLa buena noticia: con la rutina correcta, el cabello seco puede verse brillante, suave y sano.\n\n## La rutina completa para cabello seco\n\n### Paso 1 — Champú hidratante (1-2 veces por semana)\n\nLavar demasiado agota el sebo natural que protege la fibra capilar. Con cabello seco, lavar una o dos veces por semana es suficiente. Usa un champú sin sulfatos agresivos (SLS/SLES) formulado para cabello seco.\n\n**Cómo aplicarlo:** concentra el champú en el cuero cabelludo, no en los largos. Masajea con las yemas de los dedos durante 2-3 minutos para estimular la circulación y eliminar el sebo acumulado. Aclara bien.\n\n### Paso 2 — Acondicionador (cada lavado)\n\nEl acondicionador repone la humedad que el champú puede haber eliminado y sella la cutícula. Aplícalo desde la mitad hasta las puntas — nunca en el cuero cabelludo.\n\nDeja actuar 3-5 minutos con el cabello envuelto en un gorro de plástico para que el calor corporal potencie la penetración.\n\n### Paso 3 — Mascarilla intensiva (1 vez por semana)\n\nEste es el paso que más diferencia hace en el cabello seco. Una mascarilla hidratante profunda repara la fibra, restaura la elasticidad y devuelve el brillo.\n\nAplícala sobre el cabello húmedo después del champú, en lugar del acondicionador. Deja actuar 15-20 minutos.\n\n### Paso 4 — Aceite capilar (2-3 veces por semana)\n\nUna o dos gotas de aceite capilar sobre las puntas sella la humedad y previene el frizz. Puedes aplicarlo también antes de lavar — como pre-poo — para proteger las fibras del proceso de lavado.\n\n### Paso 5 — Protección térmica (siempre que uses calor)\n\nSi usas secador, planchas o rizadores, el protector térmico es innegociable. El calor abre la cutícula y acelera la pérdida de humedad.\n\n## Errores comunes que secan más el cabello\n\n- Secar con toalla frotando (usa microfibra o camiseta de algodón, presionando suavemente)\n- Secador al máximo de temperatura (usa temperatura media con difusor)\n- Champús con sulfatos en cabello ya seco\n- Saltarse el acondicionador para "no apelmazar"\n- No proteger el cabello del sol en verano\n\n## Resultado esperado\n\nCon esta rutina, en 4-6 semanas notarás menos rotura, puntas más sanas y un brillo natural que el cabello seco raramente tiene. La clave es la constancia.',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=500&fit=crop&auto=format',
  'Rutinas',
  'tratamiento-profundo',
  'Nuestro Tratamiento Profundo es la mascarilla ideal para cabello seco: repara, hidrata y restaura la elasticidad en una sola aplicación semanal.',
  'female',
  'published',
  '2026-05-08 10:00:00+00'
),

-- POST 3: Ingredientes para el crecimiento
(
  'b3000000-0000-0000-0000-000000000003',
  'Los Mejores Ingredientes Naturales para el Crecimiento Capilar',
  'Antes de gastar en suplementos, descubre qué activos naturales aplicados directamente en el cuero cabelludo sí tienen evidencia científica detrás.',
  E'## Crecimiento capilar: qué funciona de verdad\n\nEl mercado está lleno de promesas de crecimiento instantáneo. La realidad es que el cabello crece entre 1 y 1,5 cm al mes en condiciones óptimas. Ningún producto lo acelera milagrosamente, pero sí hay ingredientes que crean el ambiente ideal para que el folículo funcione al máximo de su capacidad y reduzcan la caída causada por estrés, déficits nutricionales o inflamación del cuero cabelludo.\n\n## Ingredientes con respaldo científico\n\n### 1. Aceite de ricino (Castor Oil)\nRico en ácido ricinoleico — un ácido graso que penetra en el cuero cabelludo y mejora la circulación local. Varios estudios lo asocian con la reducción de la caída y el fortalecimiento de la raíz. Es denso, por lo que se recomienda mezclarlo con otro aceite más ligero (argán, jojoba) para facilitar la aplicación.\n\n**Cómo usarlo:** masaje en el cuero cabelludo 1-2 veces por semana. Deja actuar 30 minutos o toda la noche antes de lavar.\n\n### 2. Aceite de romero\nUn estudio publicado en *Skincare in Dermatological Practice* comparó el aceite de romero al 2% con minoxidil (el tratamiento farmacológico estándar para la alopecia androgénica) — con resultados similares a los 6 meses, y con menos picor como efecto secundario.\n\nEl mecanismo: el ácido carnósico del romero reactiva las células madre del folículo y estimula la circulación periférica.\n\n**Cómo usarlo:** diluido al 2-3% en un aceite portador o directamente en el cuero cabelludo 2-3 veces por semana.\n\n### 3. Biotina (aplicación tópica)\nMás conocida como suplemento oral, la biotina aplicada directamente en el cuero cabelludo refuerza la queratina — la proteína principal de la fibra capilar. Su déficit causa cabello quebradizo y mayor caída.\n\n### 4. Niacinamida (Vitamina B3)\nMejora la barrera del cuero cabelludo, regula la producción de sebo y tiene efecto antiinflamatorio. Un cuero cabelludo sin inflamación es un cuero cabelludo donde los folículos trabajan mejor.\n\n### 5. Proteínas hidrolizadas (queratina, seda, trigo)\nNo estimulan el crecimiento directamente, pero fortalecen la fibra existente y reducen la rotura — que visualmente equivale a "más longitud".\n\n## Lo que sí puedes hacer hoy\n\n1. **Masajea el cuero cabelludo** 5 minutos al día en seco o con aceite. Estudios recientes confirman que el masaje mecánico estimula los folículos de forma independiente a cualquier producto.\n\n2. **Revisa tu alimentación** — hierro, zinc, vitamina D y proteínas son los pilares del crecimiento capilar desde dentro.\n\n3. **Reduce el estrés mecánico** — recogidos muy apretados, gomas, extensiones y calor constante provocan rotura y alopecia por tracción.\n\n4. **Usa un tratamiento folicular** con activos concentrados específicos para el cuero cabelludo.\n\n## El papel del cuero cabelludo\n\nEl cabello crece desde el folículo, y el folículo vive en el cuero cabelludo. Cuidar el cuero cabelludo es, literalmente, cuidar la raíz del problema. Sin embargo, la mayoría de las rutinas capilares ignoran completamente esta área y se centran solo en la fibra. Invertir esa lógica es el cambio más importante que puedes hacer.',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=500&fit=crop&auto=format',
  'Ingredientes',
  'tratamiento-folicular',
  'Nuestro Tratamiento Folicular combina activos naturales con evidencia científica para estimular el folículo y reducir la caída desde la raíz.',
  'female',
  'published',
  '2026-05-10 10:00:00+00'
);
