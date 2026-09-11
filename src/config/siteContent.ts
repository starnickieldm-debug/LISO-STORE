import {
  BrandConfig,
  ProductSpecs,
  HonestyLabelItem,
  ComparisonRow,
  LifestyleScene,
  BoxItem,
  FAQItem
} from '../types/content';

export const brandConfig: BrandConfig = {
  name: "LISO",
  tagline: "Impecable antes de salir.",
  creativeConcept: "No necesitas una sesión de planchado. Solo necesitas arreglar la ropa que te vas a poner.",
  targetTransformation: "Arregla directamente en el gancho la ropa que te vas a poner hoy, lista en minutos.",
  pricePlaceholder: "$189.900",
  shippingPlaceholder: "Envío gratis a toda Colombia",
  guaranteeLegalPlaceholder: "Garantía de 30 días",
  countryPlaceholder: "Colombia",
  factoryWarranty: "Garantía oficial y soporte directo en Colombia",
  labClaimNote: "*Según pruebas térmicas de laboratorio del fabricante."
};

export const productSpecs: ProductSpecs = {
  power: "1200 W",
  voltage: "110–240 V",
  tankCapacity: "100 ml",
  continuousSteam: "Aprox. 5 minutos",
  garmentsPerTank: "2–3 prendas por carga",
  maxTemperature: "150 °C",
  heatUpTime: "15 segundos*",
  heatUpTimeNote: "*Según pruebas térmicas de laboratorio.",
  steamLevels: "2 niveles de vapor",
  dryIronMode: true,
  swivelPlate: true,
  innerTankMaterial: "Aluminio inyectado",
  bodyMaterial: "ABS de alta densidad",
  display: "Pantalla digital LED",
  dockIncluded: true,
  measuringCupIncluded: true,
  storageBagIncluded: true,
  plugTypes: ["US"],
  weightPlaceholder: "650 g",
  dimensionsPlaceholder: "Compacta portátil"
};

export const trustBarItems = [
  "Envío gratis a toda Colombia",
  "Pago seguro con PSE y tarjetas",
  "Garantía legal de 30 días"
];

export const threeGestures = [
  {
    step: "01",
    title: "Llena",
    description: "100 ml con el vaso dosificador incluido.",
    detail: "La medida exacta para dejar listas 2 o 3 prendas sin cargar peso muerto en la mano.",
    footnote: null
  },
  {
    step: "02",
    title: "Enciende",
    description: "Lista en 15 segundos hasta 150 °C.",
    detail: "Pantalla digital LED que te muestra la temperatura en tiempo real.",
    footnote: null
  },
  {
    step: "03",
    title: "Alisa y sal",
    description: "En el gancho y en minutos.",
    detail: "Vapor continuo y placa cerámica caliente para salir impecable sin armar la tabla.",
    footnote: null
  }
];

export const benefitBlocks = [
  {
    number: "01",
    title: "Enciende en 15 segundos y alisa directo en el gancho.",
    description: "Sin sacar la tabla pesada ni esperar una eternidad. Arregla la prenda de hoy en 2 o 3 minutos antes de salir de casa.",
    footnote: null,
    visualTag: "Macro de pantalla digital LED",
    meta: "1200 W · Calentamiento en 15s · 150 °C"
  },
  {
    number: "02",
    title: "1200 W de potencia y placa cerámica que sí alisan.",
    description: "A diferencia de los vaporizadores comunes que solo echan vapor tibio, la placa cerámica a 150 °C fija cuellos, puños y pliegues rebeldes.",
    footnote: null,
    visualTag: "Indicador térmico en pantalla",
    meta: "2 niveles vapor + modo seco"
  },
  {
    number: "03",
    title: "Bomba presurizada 100% antigoteo y base de descanso.",
    description: "Cero manchas de agua hirviendo en tu ropa antes de salir. Déjala reposar con seguridad en su base térmica mientras terminas de alistarte.",
    footnote: null,
    visualTag: "Escala real junto a taza de café y maleta",
    meta: "100 ml ≈ 5 min ≈ 2–3 prendas"
  }
];

export const engineeringCallouts = [
  { id: "power", label: "1200 W", desc: "Calor constante y potente, sin caídas de fuerza", x: "18%", y: "22%" },
  { id: "temp", label: "150 °C", desc: "Temperatura máxima que alisa la fibra al instante", x: "32%", y: "15%" },
  { id: "plate", label: "PLACA GIRATORIA", desc: "Cambia de ángulo para llegar a cualquier costura", x: "78%", y: "26%" },
  { id: "tank", label: "TANQUE DE ALUMINIO", desc: "Aluminio inyectado: reparte el calor parejo", x: "82%", y: "55%" },
  { id: "steam", label: "2 NIVELES DE VAPOR", desc: "Nivel 1 para telas suaves, Nivel 2 para algodón y lino", x: "75%", y: "78%" },
  { id: "dry", label: "PLANCHADO EN SECO", desc: "Solo calor, sin humedad, para acabados firmes", x: "42%", y: "85%" },
  { id: "voltage", label: "110–240 V", desc: "Conexión directa estándar de 110 V y compatible con 110–240 V para viajes", x: "18%", y: "75%" },
  { id: "dock", label: "BASE DE APOYO", desc: "Para posarla caliente entre prenda y prenda con seguridad", x: "14%", y: "45%" },
  { id: "abs", label: "ABS RESISTENTE", desc: "Aislante exterior: mango frío al tacto para no quemarte", x: "50%", y: "48%" },
];

export const honestyLabelData: HonestyLabelItem = {
  does: [
    {
      title: "Deja lista la ropa que te vas a poner hoy",
      desc: "Directamente en el gancho en 2 a 3 minutos, sin sacar la tabla de planchar."
    },
    {
      title: "Cuellos, solapas y puños firmes",
      desc: "Su placa de cerámica a 150 °C alisa con precisión donde los vaporizadores normales no dan abasto."
    },
    {
      title: "Refresca y desodoriza entre puestas",
      desc: "El calor continuo a 150 °C relaja la fibra, neutraliza olores y deja la tela suave al instante."
    },
    {
      title: "Salva tu ropa al desempacar la maleta",
      desc: "Llega al hotel o destino de viaje, cuelga la prenda y quita las arrugas del viaje en minutos."
    },
    {
      title: "Apta para telas finas y delicadas",
      desc: "Seda, satén, lino o mezclas delicadas con control térmico real sin riesgo de quemadura."
    }
  ],
  doesNot: [
    {
      title: "No reemplaza la plancha para tandas del fin de semana",
      desc: "Si vas a planchar 30 sábanas y toallas juntas, la plancha pesada tradicional sigue siendo la indicada."
    },
    {
      title: "No está pensada para sesiones largas de 1 hora",
      desc: "LISO está diseñada para resolver la prenda del momento antes de salir, no para maratones de lavandería."
    },
    {
      title: "El depósito es para 2 a 3 prendas por carga",
      desc: "Carga 100 ml para mantenerse liviana y ágil en la mano. Si necesitas más, se rellena en segundos con el vaso dosificador."
    }
  ],
  cordRationale: {
    title: "¿Por qué tiene cable?",
    description: "Para entregar 1200 W de potencia real y mantener 150 °C constantes sin caídas de vapor, LISO necesita corriente directa. Una batería con esa fuerza pesaría más de 1 kg y perdería rendimiento a los pocos meses."
  }
};

export const comparisonRows: ComparisonRow[] = [
  {
    feature: "Tiempo para empezar",
    traditionalHighlight: "5–10 minutos",
    traditionalIron: "Entre sacar la tabla, armarla y calentar",
    traditionalVerdict: "bad",
    steamerHighlight: "1–2 minutos",
    cheapSteamer: "Variable según potencia",
    steamerVerdict: "neutral",
    lisoHighlight: "Lista en 15 segundos",
    liso: "Lista en 15 segundos",
    lisoVerdict: "good"
  },
  {
    feature: "¿Requiere tabla de planchar?",
    traditionalHighlight: "Obligatoria",
    traditionalIron: "Sin tabla no se puede usar",
    traditionalVerdict: "bad",
    steamerHighlight: "Solo en vertical",
    cheapSteamer: "Difícil apoyo en horizontal",
    steamerVerdict: "neutral",
    lisoHighlight: "Sin tabla",
    liso: "Sin tabla (Plancha en el gancho)",
    lisoVerdict: "good"
  },
  {
    feature: "Firmeza en cuellos y detalles",
    traditionalHighlight: "Muy buena",
    traditionalIron: "Peso y calor directo sobre la tabla",
    traditionalVerdict: "good",
    steamerHighlight: "Insuficiente",
    cheapSteamer: "Solo vapor tibio; pliegues persisten",
    steamerVerdict: "bad",
    lisoHighlight: "Acabado perfecto 150 °C",
    liso: "Acabado perfecto a 150 °C con placa cerámica",
    lisoVerdict: "good"
  },
  {
    feature: "Seguridad contra goteo",
    traditionalHighlight: "Riesgo de manchas",
    traditionalIron: "Puede botar gotas de agua caliente",
    traditionalVerdict: "neutral",
    steamerHighlight: "Gotea al inclinarlo",
    cheapSteamer: "Condensa y moja la prenda",
    steamerVerdict: "bad",
    lisoHighlight: "100% Antigoteo",
    liso: "Bomba presurizada 100% antigoteo (Cero manchas)",
    lisoVerdict: "good"
  },
  {
    feature: "Espacio y guardado",
    traditionalHighlight: "Ocupa un clóset",
    traditionalIron: "Tabla pesada y plancha grande",
    traditionalVerdict: "bad",
    steamerHighlight: "Ocupa espacio medio",
    cheapSteamer: "Cuerpo voluminoso",
    steamerVerdict: "neutral",
    lisoHighlight: "Cajón o maleta",
    liso: "Cabe en cualquier cajón o maleta",
    lisoVerdict: "good"
  },
  {
    feature: "Uso ideal",
    traditionalHighlight: "Tandas grandes",
    traditionalIron: "Ideal para 20+ prendas los domingos",
    traditionalVerdict: "good",
    steamerHighlight: "Arrugas leves",
    cheapSteamer: "Vapor débil, se recalienta rápido",
    steamerVerdict: "bad",
    lisoHighlight: "Impecable antes de salir",
    liso: "La prenda de hoy lista en 2 a 3 minutos",
    lisoVerdict: "good"
  }
];

export const lifestyleScenes: LifestyleScene[] = [
  {
    id: "scene-1",
    number: "01",
    title: "La camisa de la mañana",
    caption: "La camisa de hoy, impecable en minutos.",
    context: "La cuelgas en el gancho, pasas LISO y sales directo a tu día sin haber sacado la tabla de planchar.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: Camisa colgada en gancho de madera, luz natural de mañana, cuello y solapa impecables.",
    aspectRatio: "4/5"
  },
  {
    id: "scene-2",
    number: "02",
    title: "Vestidos y telas delicadas",
    caption: "Seda, satén o lino sin temor a quemarlos.",
    context: "La placa cerámica a 150 °C y el vapor continuo relajan las arrugas más difíciles cuidando las telas más finas.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: Vestido de tela ligera colgado en gancho, textura suave sin marcas de calor.",
    aspectRatio: "4/5"
  },
  {
    id: "scene-3",
    number: "03",
    title: "Cortinas y espacios del hogar",
    caption: "Alisa en vertical sin tener que descolgar.",
    context: "Vaporiza cortinas, manteles o cobijas colgadas, refrescando la tela y eliminando arrugas al instante.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: Cortina de lino en sala iluminada, alisando pliegues directamente colgada.",
    aspectRatio: "16/10"
  },
  {
    id: "scene-4",
    number: "04",
    title: "Directo de la maleta",
    caption: "Desempaca en el hotel y sal listo a tu evento.",
    context: "Compacta para tu maleta de mano y lista a 110 V para dejarte impecable en cualquier viaje de trabajo o descanso.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: Habitación de hotel, maleta abierta y LISO sobre la mesa lista para usar.",
    aspectRatio: "4/5"
  },
  {
    id: "scene-5",
    number: "05",
    title: "Base de descanso seguro",
    caption: "Pósala con tranquilidad mientras te vistes.",
    context: "Su base de apoyo térmico te permite dejarla caliente sobre cualquier tocador o mesa de noche sin riesgo de daño.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: LISO descansando en su base de apoyo sobre superficie de madera clara.",
    aspectRatio: "16/10"
  }
];

export const boxItems: BoxItem[] = [
  {
    id: "iron",
    name: "Plancha de vapor LISO",
    annotation: "Con placa giratoria, pantalla digital y depósito de 100 ml.",
    includedCount: "1 unidad",
    placeholderText: "FOTOGRAFÍA REAL: Dispositivo principal LISO vista cenital"
  },
  {
    id: "dock",
    name: "Base de apoyo resistente al calor",
    annotation: "Para posarla caliente entre prenda y prenda de forma segura.",
    includedCount: "1 unidad",
    placeholderText: "FOTOGRAFÍA REAL: Base de soporte térmico"
  },
  {
    id: "cup",
    name: "Vaso dosificador de 100 ml",
    annotation: "La medida exacta para llenar el depósito de una vez y sin regar agua.",
    includedCount: "1 unidad",
    placeholderText: "FOTOGRAFÍA REAL: Vaso dosificador calibrado"
  },
  {
    id: "bag",
    name: "Bolsa de viaje",
    annotation: "Para guardarla en el clóset o meterla en la maleta protegida.",
    includedCount: "1 unidad",
    placeholderText: "FOTOGRAFÍA REAL: Bolsa de transporte en tejido natural"
  },
  {
    id: "manual",
    name: "Guía rápida y manual",
    annotation: "Instrucciones sencillas para cuidarla y sacarle provecho desde el primer día.",
    includedCount: "1 documento",
    placeholderText: "FOTOGRAFÍA REAL: Manual técnico impreso en papel mate"
  }
];

export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "¿Reemplaza mi plancha tradicional grande?",
    answer: "No pretendemos reemplazarla para el domingo de lavandería cuando tienes 30 prendas amontonadas. LISO está pensada para el día a día: para la ropa que te vas a poner hoy antes de salir, directamente en el gancho y en 3 minutos sin armar la tabla.",
    verified: true
  },
  {
    id: "faq-2",
    question: "¿Por qué cuesta $189.900 si hay vaporizadores de $60.000?",
    answer: "Los vaporizadores económicos de $60.000 tienen resistencias plásticas de 600 W que solo hierven agua, escupen gotas calientes y no alisan arrugas de verdad. LISO entrega 1200 W reales con placa cerámica a 150 °C, bomba presurizada 100% antigoteo y pantalla digital con materiales de alta durabilidad.",
    verified: true
  },
  {
    id: "faq-3",
    question: "¿Gotea o moja la ropa al usarla?",
    answer: "No gotea ni moja tus prendas. Su bomba electrónica presurizada y la cámara térmica a 150 °C convierten el agua en vapor seco continuo, evitando salpicaduras y manchas de agua antes de salir.",
    verified: true
  },
  {
    id: "faq-4",
    question: "¿Cuántas prendas puedo dejar listas con una sola carga?",
    answer: "Entre 2 y 3 prendas. Por ejemplo, la camisa y el pantalón para salir hoy. Es perfecta para dejarte impecable en el momento; si necesitas más, solo rellenas en segundos con el vaso dosificador incluido y sigues.",
    verified: true
  },
  {
    id: "faq-5",
    question: "¿Cuánto dura el tanque de agua?",
    answer: "El depósito de 100 ml da para unos 5 minutos de vapor continuo a máxima potencia. Está calibrado a esa medida para que la plancha sea liviana (650 g) y no te canse la muñeca mientras la pasas.",
    verified: true
  },
  {
    id: "faq-6",
    question: "¿Qué telas puedo planchar?",
    answer: "Algodón, lino, lana, satén, sedas y telas sintéticas quedan impecables. Para tejidos especialmente delicados recomendamos empezar en el nivel 1 de vapor y hacer una pasada suave.",
    verified: true
  },
  {
    id: "faq-7",
    question: "¿Se puede usar tanto en vertical como en horizontal?",
    answer: "Sí. Su cabezal giratorio de 90° te permite alisar en vertical directo en el gancho, o girarlo para apoyarte horizontalmente sobre la cama o una mesa cuando quieras fijar cuellos, solapas o puños.",
    verified: true
  },
  {
    id: "faq-8",
    question: "¿Qué tipo de enchufe tiene en Colombia?",
    answer: "Viene con clavija estándar para Colombia (Tipo A/B americano, 110 V). Se conecta directo a cualquier tomacorriente de pared en tu casa u hotel sin necesidad de adaptadores.",
    verified: true
  },
  {
    id: "faq-9",
    question: "¿Puedo llevarla en la maleta de viaje?",
    answer: "Sí. Es compacta, liviana y multivoltaje (110–240 V). Cabe perfectamente en cualquier maleta de mano y viene con su bolsa de viaje incluida para llevarla protegida.",
    verified: true
  },
  {
    id: "faq-10",
    question: "¿Por qué tiene cable en lugar de batería?",
    answer: "Porque para darte 1200 W continuos y calentar a 150 °C en 15 segundos sin perder fuerza, necesita conexión a la pared. Una batería con esa fuerza pesaría más de 1 kg y perdería rendimiento rápidamente.",
    verified: true
  },
  {
    id: "faq-11",
    question: "¿Cómo se cuida y se guarda?",
    answer: "Recomendamos usar agua potable o filtrada y vaciar el agua sobrante al terminar. Déjala reposar en su base de apoyo térmica y guárdala cómodamente en su bolsa de viaje cuando esté fría.",
    verified: true
  },
  {
    id: "faq-12",
    question: "¿Qué garantía tengo en Colombia?",
    answer: "Cuentas con 30 días de garantía por defectos de fábrica y soporte directo por WhatsApp. Si tu producto presenta algún fallo, te respondemos de inmediato con atención humana en Colombia.",
    verified: true
  }
];
