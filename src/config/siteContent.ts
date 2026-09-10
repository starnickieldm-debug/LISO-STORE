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
  tagline: "El planchado que sí vas a usar.",
  creativeConcept: "La verdad plancha mejor.",
  targetTransformation: "Olvídate de la plancha pesada y la tabla: tu ropa lista e impecable en minutos.",
  pricePlaceholder: "[PRECIO]",
  shippingPlaceholder: "[ENVÍO 24–72 H — CONFIRMAR]",
  guaranteeLegalPlaceholder: "[LEGAL SEGÚN MERCADO]",
  countryPlaceholder: "[PAÍS]",
  factoryWarranty: "Garantía oficial y soporte directo",
  labClaimNote: "*Según pruebas de laboratorio del fabricante."
};

export const productSpecs: ProductSpecs = {
  power: "1200 W",
  voltage: "110–240 V",
  tankCapacity: "100 ml",
  continuousSteam: "Aprox. 5 minutos",
  garmentsPerTank: "2–3 prendas por carga",
  maxTemperature: "150 °C",
  heatUpTime: "Pocos segundos*",
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
    detail: "Es la medida exacta del depósito. No se riega el agua y no tienes que calcular nada.",
    footnote: null
  },
  {
    step: "02",
    title: "Enciende",
    description: "La pantalla marca hasta 150 °C.",
    detail: "Ves la temperatura subir al instante. Lista en pocos segundos para empezar.",
    footnote: null
  },
  {
    step: "03",
    title: "Pasa y listo",
    description: "Vapor potente + placa giratoria.",
    detail: "Directo en el gancho o sobre la cama. La placa se acomoda al ángulo que necesites.",
    footnote: null
  }
];

export const benefitBlocks = [
  {
    number: "01",
    title: "La conectas y empiezas en segundos.",
    description: "Con LISO puedes alisar directamente en el gancho, sin montar la tabla ni preparar todo lo que normalmente implica planchar.",
    footnote: null,
    visualTag: "Macro de pantalla digital LED",
    meta: "1200 W · Calentamiento rápido · 150 °C"
  },
  {
    number: "02",
    title: "Tienes la temperatura a la vista y el vapor bajo control.",
    description: "Elige la temperatura que necesitas y ajusta el vapor según la prenda que estés tratando. Así sabes exactamente cómo la estás cuidando.",
    footnote: null,
    visualTag: "Indicador térmico en pantalla",
    meta: "2 niveles vapor + modo seco"
  },
  {
    number: "03",
    title: "La dejas a mano y está lista cuando la vuelves a necesitar.",
    description: "Su base de apoyo te permite guardarla fácilmente después de usarla, sin tener que desmontar nada ni buscarle un lugar especial.",
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
      title: "Deja tu ropa lista en minutos",
      desc: "Directamente en el gancho, sin sacar la tabla de planchar."
    },
    {
      title: "Cuellos y puños sin complicarte",
      desc: "Su placa giratoria llega justo donde una plancha convencional puede resultar incómoda."
    },
    {
      title: "Refresca prendas entre lavadas",
      desc: "Ayuda a quitar arrugas y a neutralizar olores de uso."
    },
    {
      title: "Perfecta para retoques rápidos",
      desc: "Una camisa antes de salir, una prenda que se arrugó en la maleta o esa ropa que quieres volver a ponerte."
    },
    {
      title: "También puedes usarla en prendas delicadas",
      desc: "Empieza en el nivel 1 y prueba primero en una zona poco visible."
    }
  ],
  doesNot: [
    {
      title: "No reemplaza una plancha tradicional",
      desc: "Si necesitas planchar una montaña de ropa de una sola vez, una plancha convencional es más adecuada."
    },
    {
      title: "No está pensada para sesiones largas",
      desc: "LISO está hecha para resolver esos retoques rápidos, no para estar 30 minutos seguidos planchando."
    },
    {
      title: "Su depósito es compacto",
      desc: "Los 100 ml alcanzan para aproximadamente 2–3 prendas por carga, dependiendo del uso."
    },
    {
      title: "Necesita estar conectada",
      desc: "El cable permite mantener el calor estable y la potencia del vapor durante el uso."
    }
  ],
  cordRationale: {
    title: "¿Por qué tiene cable?",
    description: "Para calentar rápido y mantener una temperatura constante de hasta 150 °C sin caídas de fuerza, LISO necesita corriente directa. Una batería con esa potencia la haría pesada, aparatosa y perdería rendimiento con los meses."
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
    lisoHighlight: "Pocos segundos",
    liso: "Enchufas y alisas directo en el gancho",
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
    lisoHighlight: "Cero tabla",
    liso: "Directo en el gancho o sobre la cama (placa 90°)",
    lisoVerdict: "good"
  },
  {
    feature: "Firmeza en cuellos y detalles",
    traditionalHighlight: "Muy buena",
    traditionalIron: "Peso y calor directo sobre la tabla",
    traditionalVerdict: "good",
    steamerHighlight: "Insuficiente",
    cheapSteamer: "Solo vapor; arrugas marcadas persisten",
    steamerVerdict: "bad",
    lisoHighlight: "Placa caliente 150 °C",
    liso: "Alisa y prensa cuellos con precisión",
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
    lisoHighlight: "Cero goteo",
    liso: "Vapor seco continuo en cualquier ángulo",
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
    lisoHighlight: "Mínimo espacio",
    liso: "Cabe en tu mesa de noche o gaveta",
    lisoVerdict: "good"
  },
  {
    feature: "Planchar 10+ prendas seguidas",
    traditionalHighlight: "Sí, es la ideal",
    traditionalIron: "Diseñada para grandes tandas de ropa",
    traditionalVerdict: "good",
    steamerHighlight: "No recomendado",
    cheapSteamer: "Se recalienta y cansa la mano",
    steamerVerdict: "bad",
    lisoHighlight: "No (hecha para 2–3)",
    liso: "Pensada para el retoque rápido diario",
    lisoVerdict: "neutral"
  }
];

export const lifestyleScenes: LifestyleScene[] = [
  {
    id: "scene-1",
    number: "01",
    title: "Camisa de oficina",
    caption: "La camisa que necesitas, lista en minutos.",
    context: "La cuelgas en el gancho, pasas LISO y sales sin haber sacado la tabla de planchar.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: Camisa colgada en gancho de madera, luz natural de mañana, cuello y solapa impecables.",
    aspectRatio: "4/5"
  },
  {
    id: "scene-2",
    number: "02",
    title: "Vestido delicado",
    caption: "Si tienes poco tiempo antes de salir, una arruga no debería complicarte el día.",
    context: "Vapor para las zonas más difíciles y placa caliente para dejar la prenda realmente lisa.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: Vestido de tela ligera colgado en gancho, textura suave sin marcas de calor.",
    aspectRatio: "4/5"
  },
  {
    id: "scene-3",
    number: "03",
    title: "Cortinas y telas colgadas",
    caption: "Cuando planchar sobre una mesa no es una opción.",
    context: "Úsala directamente en el gancho para refrescar prendas, cortinas y telas difíciles de llevar a la tabla.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: Cortina de lino en sala iluminada, alisando pliegues directamente colgada.",
    aspectRatio: "16/10"
  },
  {
    id: "scene-4",
    number: "04",
    title: "Hotel y maleta",
    caption: "Cuando llegas de viaje, tu ropa no siempre llega igual de bien.",
    context: "LISO cabe en la maleta, funciona a 110–240 V y está lista para devolverle el aspecto a tu ropa.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: Habitación de hotel, maleta abierta y LISO sobre la mesa lista para usar.",
    aspectRatio: "4/5"
  },
  {
    id: "scene-5",
    number: "05",
    title: "En su base de apoyo",
    caption: "La dejas a mano porque sabes que vas a volver a usarla.",
    context: "Diseño compacto, base segura y todo en su sitio para el próximo retoque.",
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
    question: "¿Cuánto dura el tanque de agua?",
    answer: "El depósito de 100 ml da para unos 5 minutos de vapor continuo a máxima fuerza. Está pensado así para que la plancha sea liviana y no te canse la mano mientras la usas.",
    verified: true
  },
  {
    id: "faq-2",
    question: "¿Cuántas prendas puedo dejar listas con una sola carga?",
    answer: "Entre 2 y 3 prendas. Por ejemplo, dos camisas para salir a trabajar o un vestido y una blusa. Es perfecta para el retoque del día a día; si necesitas más, solo rellenas con el vaso dosificador y sigues.",
    verified: true
  },
  {
    id: "faq-3",
    question: "¿Gotea o moja la ropa al usarla?",
    answer: "No gotea ni moja tus prendas. Su cámara interna calienta a 150 °C y vaporiza el agua por completo antes de expulsarla por las boquillas, evitando manchas de agua o humedad en la tela.",
    verified: true
  },
  {
    id: "faq-4",
    question: "¿Qué telas puedo planchar?",
    answer: "Algodón, lino, mezclas de poliéster, lana y sedas quedan impecables. Para prendas muy delicadas o tejidos especiales, recomendamos usar el Nivel 1 de vapor y hacer una pequeña prueba en una costura interior o dobladillo que no se vea.",
    verified: true
  },
  {
    id: "faq-5",
    question: "¿Se puede usar tanto en vertical como en horizontal?",
    answer: "Sí. Para eso tiene la placa giratoria: en vertical planchas la ropa colgada en el gancho, y en horizontal puedes apoyarte sobre la cama o una mesa sin sacar ninguna tabla.",
    verified: true
  },
  {
    id: "faq-6",
    question: "¿Qué tipo de enchufe me envían?",
    answer: "Te enviamos la versión con clavija plana estándar (Tipo A/B americano, 110 V), el estándar en los hogares colombianos. Se conecta directo a cualquier enchufe de la casa, sin necesidad de adaptadores.",
    verified: true
  },
  {
    id: "faq-7",
    question: "¿Funciona en otros países con 110–240 V?",
    answer: "Sí. Es multivoltaje (110 a 240 V). Funciona directo en Colombia a 110 V y además puedes llevarla en tu maleta a cualquier parte del mundo sin miedo a que se queme.",
    verified: true
  },
  {
    id: "faq-8",
    question: "¿Pesa mucho al usarla?",
    answer: "Es compacta y liviana (aprox. 650 gramos vacía). El depósito de 100 ml está ubicado estratégicamente para que el centro de gravedad quede pegado a la mano y no te canse la muñeca ni el brazo mientras la pasas.",
    verified: true
  },
  {
    id: "faq-9",
    question: "¿Cómo se cuida y se guarda?",
    answer: "Recomendamos usar agua potable o filtrada y vaciar el agua sobrante al terminar de usarla para evitar la formación de sedimentos minerales en el aluminio. Déjala enfriar en su base de apoyo y luego guárdala cómodamente en su bolsa de viaje incluida.",
    verified: true
  },
  {
    id: "faq-10",
    question: "¿Qué pasa si llega con algún daño o falla?",
    answer: "Si recibes un producto defectuoso, dañado o con algún problema, contáctanos con tu número de pedido y fotografías o un video que muestre el caso. Revisaremos tu situación y te indicaremos la solución correspondiente con atención y soporte directo para tu compra.",
    verified: true
  },
  {
    id: "faq-11",
    question: "¿Por qué no es inalámbrica?",
    answer: "Porque para darte 1200 W continuos, calentar en pocos segundos y dejar la ropa impecable sin perder fuerza, necesita conexión a la pared. Una batería con esa potencia la haría pesada, aparatosa y al año no retendría carga.",
    verified: true
  },
  {
    id: "faq-12",
    question: "¿Por qué comprarla aquí y no en una plataforma genérica?",
    answer: "Porque te respaldamos nosotros con envío nacional, atención personalizada de personas reales y un equipo que responde ante cualquier duda o problema con tu pedido.",
    verified: true
  }
];
