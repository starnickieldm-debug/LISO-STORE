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
  heatUpTime: "3 segundos*",
  heatUpTimeNote: "*Según pruebas de laboratorio del fabricante.",
  steamLevels: "2 niveles de vapor",
  dryIronMode: true,
  swivelPlate: true,
  innerTankMaterial: "Aluminio inyectado",
  bodyMaterial: "ABS de alta densidad",
  display: "Pantalla digital LED",
  dockIncluded: true,
  measuringCupIncluded: true,
  storageBagIncluded: true,
  plugTypes: ["EU", "US", "UK", "AU"],
  weightPlaceholder: "[PESO — PENDIENTE]",
  dimensionsPlaceholder: "[DIMENSIONES — PENDIENTES]"
};

export const trustBarItems = [
  "Atención y soporte postventa",
  `Envío ${brandConfig.shippingPlaceholder}`,
  "Pago 100% seguro"
];

export const threeGestures = [
  {
    step: "01",
    title: "Llena",
    description: "100 ml con el vasito que viene dentro.",
    detail: "Es la medida exacta del depósito. No se riega el agua y no tienes que calcular nada.",
    footnote: null
  },
  {
    step: "02",
    title: "Enciende",
    description: "La pantalla marca hasta 150 °C*.",
    detail: "Ves la temperatura subir al instante. Lista en solo 3 segundos*.",
    footnote: brandConfig.labClaimNote
  },
  {
    step: "03",
    title: "Pasa y listo",
    description: "Vapor potente + placa giratoria.",
    detail: "Directo en la percha o sobre la cama. La placa se acomoda al ángulo que necesites.",
    footnote: null
  }
];

export const benefitBlocks = [
  {
    number: "01",
    title: "La conectas y empiezas en segundos.",
    description: "Con LISO puedes alisar directamente sobre la percha, sin montar la tabla ni preparar todo lo que normalmente implica planchar.",
    footnote: null,
    visualTag: "Macro de pantalla digital LED",
    meta: "1200 W · 3 s* · 150 °C"
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
  { id: "voltage", label: "110–240 V", desc: "Se conecta en cualquier país del mundo sin quemarse", x: "18%", y: "75%" },
  { id: "dock", label: "BASE DE APOYO", desc: "Para posarla caliente entre prenda y prenda", x: "14%", y: "45%" },
  { id: "abs", label: "ABS RESISTENTE", desc: "Aislante exterior: por donde la tomas no quema", x: "50%", y: "48%" },
];

export const honestyLabelData: HonestyLabelItem = {
  does: [
    {
      title: "Deja tu ropa lista en minutos",
      desc: "Directamente en la percha, sin sacar la tabla de planchar."
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
      desc: "Una camisa antes de salir, una prenda que se arrugó en la maleta o ese outfit que quieres volver a usar."
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
    description: "Para alcanzar los 3 segundos de calentamiento y mantener una temperatura estable de hasta 150 °C, LISO necesita corriente directa. Una batería capaz de entregar esa potencia haría que fuera más pesada, más grande y menos práctica."
  }
};

export const comparisonRows: ComparisonRow[] = [
  {
    feature: "Tiempo hasta empezar",
    traditionalIron: "5–10 min entre sacar, montar y calentar",
    cheapSteamer: "1–2 min, según el modelo",
    liso: "3 segundos. Enchufas y empiezas."
  },
  {
    feature: "Espacio que ocupa",
    traditionalIron: "Necesitas espacio para guardar la tabla",
    cheapSteamer: "Ocupa poco, pero necesitas dónde guardarlo",
    liso: "Entra en un rincón del armario o sobre tu mesa."
  },
  {
    feature: "Usarla directamente en la percha",
    traditionalIron: "Incómodo y poco práctico",
    cheapSteamer: "Sí, pero depende del resultado que busques",
    liso: "Sí. Vapor + placa caliente para dejar la prenda lisa."
  },
  {
    feature: "Usarla en horizontal",
    traditionalIron: "Es donde mejor funciona.",
    cheapSteamer: "Puede gotear al inclinarla",
    liso: "Sí. Giras la placa y trabajas sin que gotee."
  },
  {
    feature: "Cuellos, puños y detalles",
    traditionalIron: "Funciona, pero tienes que trabajar sobre la tabla",
    cheapSteamer: "El vapor ayuda, pero puede quedarse corto en arrugas marcadas",
    liso: "La placa caliente ayuda a marcar y alisar estos detalles."
  },
  {
    feature: "Retoques antes de salir",
    traditionalIron: "Sacar la tabla por una sola prenda da pereza",
    cheapSteamer: "Buena opción",
    liso: "Para eso está hecha."
  },
  {
    feature: "Llevarla en la maleta",
    traditionalIron: "Demasiado grande",
    cheapSteamer: "Depende del modelo",
    liso: "Ligera, compacta y con bolsa. 110–240 V."
  },
  {
    feature: "Cuando terminas",
    traditionalIron: "Esperar, guardar y volver a armar todo",
    cheapSteamer: "Esperar y guardar",
    liso: "La dejas en su base y sigues con tu día."
  },
  {
    feature: "Planchar 10+ prendas de una vez",
    traditionalIron: "Sí, es la herramienta adecuada.",
    cheapSteamer: "No es lo ideal.",
    liso: "No. Está pensada para 2–3 prendas por carga."
  }
];

export const lifestyleScenes: LifestyleScene[] = [
  {
    id: "scene-1",
    number: "01",
    title: "Camisa de oficina",
    caption: "La camisa que necesitas, lista en minutos.",
    context: "La cuelgas, pasas LISO y sales sin haber sacado la tabla de planchar.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: Camisa colgada en percha de madera, luz natural de mañana, cuello y solapa impecables.",
    aspectRatio: "4/5"
  },
  {
    id: "scene-2",
    number: "02",
    title: "Vestido delicado",
    caption: "Si tienes poco tiempo antes de salir, una arruga no debería complicarte el día.",
    context: "Vapor para las zonas más difíciles y placa caliente para dejar la prenda realmente lisa.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: Vestido de tela ligera colgado en percha, textura suave sin marcas de calor.",
    aspectRatio: "4/5"
  },
  {
    id: "scene-3",
    number: "03",
    title: "Cortinas y telas colgadas",
    caption: "Cuando planchar sobre una mesa no es una opción.",
    context: "Úsala directamente en la percha para refrescar prendas, cortinas y telas difíciles de llevar a la tabla.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: Cortina de lino en sala iluminada, alisando pliegues directamente colgada.",
    aspectRatio: "16/10"
  },
  {
    id: "scene-4",
    number: "04",
    title: "Hotel y maleta",
    caption: "Cuando llegas de viaje, tu ropa no siempre llega igual de bien.",
    context: "LISO cabe en la maleta, funciona a 110–240 V y está lista para devolverle el aspecto a tu ropa.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: Habitación de hotel, maleta abierta y LISO sobre el escritorio lista para usar.",
    aspectRatio: "4/5"
  },
  {
    id: "scene-5",
    number: "05",
    title: "En su base dock",
    caption: "La dejas a mano porque sabes que vas a volver a usarla.",
    context: "Diseño compacto, base segura y todo en su sitio para el próximo retoque.",
    imagePlaceholderText: "FOTOGRAFÍA REAL: LISO descansando en su base dock sobre superficie de madera clara.",
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
    name: "Base dock de apoyo",
    annotation: "Para posarla caliente entre prenda y prenda de forma segura.",
    includedCount: "1 unidad",
    placeholderText: "FOTOGRAFÍA REAL: Base dock de soporte térmico"
  },
  {
    id: "cup",
    name: "Vaso medidor de 100 ml",
    annotation: "La medida exacta para llenar el depósito de una vez y sin regar agua.",
    includedCount: "1 unidad",
    placeholderText: "FOTOGRAFÍA REAL: Vaso medidor dosificador calibrado"
  },
  {
    id: "bag",
    name: "Bolsa de viaje",
    annotation: "Para guardarla en el armario o meterla en la maleta protegida.",
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
    answer: "Entre 2 y 3 prendas. Por ejemplo, dos camisas para salir a trabajar o un vestido y una blusa. Es perfecta para el retoque del día a día; si necesitas más, solo rellenas con el vasito y sigues.",
    verified: true
  },
  {
    id: "faq-3",
    question: "¿Me escupe agua al planchar?",
    answer: "No escupe agua. Su cámara interna de aluminio inyectado calienta a 150 °C para convertir el agua en vapor antes de que salga por las boquillas. [RESPUESTA PENDIENTE DE PRUEBA/CONFIRMACIÓN SOBRE CONDICIONES DE CONDENSACIÓN EN LOS PRIMEROS SEGUNDOS].",
    verified: false
  },
  {
    id: "faq-4",
    question: "¿Qué telas puedo planchar?",
    answer: "Algodón, lino y mezclas habituales quedan impecables. Para telas delicadas o vestidos especiales, usa el Nivel 1 y haz una pequeña prueba en una costura interior que no se vea. [RESPUESTA PENDIENTE DE PRUEBA/CONFIRMACIÓN SOBRE TEJIDOS ESPECÍFICOS: SEDA, LANA, SINTÉTICOS].",
    verified: false
  },
  {
    id: "faq-5",
    question: "¿Se puede usar tanto en vertical como en horizontal?",
    answer: "Sí. Para eso tiene la placa giratoria: en vertical planchas la ropa colgada en la percha, y en horizontal puedes apoyarte sobre la cama o una mesa sin sacar ninguna tabla.",
    verified: true
  },
  {
    id: "faq-6",
    question: "¿Qué tipo de enchufe me envían?",
    answer: "El enchufe que elijas al hacer tu pedido: EU, US, UK o AU. Te enviamos la plancha con el cable y la clavija que calza directo en la toma de tu pared, sin adaptadores sueltos que bailen.",
    verified: true
  },
  {
    id: "faq-7",
    question: "¿Funciona en otros países con 110–240 V?",
    answer: "Sí. Es multivoltaje (110 a 240 V), así que puedes llevarla en tu maleta a cualquier parte del mundo sin miedo a que se queme.",
    verified: true
  },
  {
    id: "faq-8",
    question: "¿Pesa mucho al usarla?",
    answer: "[PESO — PENDIENTE DE CONFIRMACIÓN]. Es compacta, ligera y el depósito es de 100 ml justamente para que el centro de gravedad quede pegado a la mano y no te canse la muñeca.",
    verified: false
  },
  {
    id: "faq-9",
    question: "¿Cómo se cuida y se guarda?",
    answer: "Solo bota el agua que sobre al terminar para que no se formen sedimentos en el aluminio. Déjala enfriar en su base dock y luego guárdala en su bolsa de viaje. [RESPUESTA PENDIENTE DE PRUEBA/CONFIRMACIÓN SOBRE TIPO DE AGUA RECOMENDADA: GRIFO VS DESTILADA].",
    verified: false
  },
  {
    id: "faq-10",
    question: "¿Qué pasa si llega con algún daño o falla?",
    answer: "Si recibes un producto defectuoso, dañado o con algún problema, contáctanos con tu número de pedido y fotografías o un vídeo que muestre el caso. Revisaremos tu situación y te indicaremos la solución correspondiente con atención directa en tu idioma.",
    verified: true
  },
  {
    id: "faq-11",
    question: "¿Por qué no es inalámbrica?",
    answer: "Porque para darte 1200 W continuos, calentar en 3 segundos* y dejar la ropa impecable sin perder fuerza, necesita conexión a la pared. Una batería con esa potencia la haría pesada, aparatosa y al año no retendría carga.",
    verified: true
  },
  {
    id: "faq-12",
    question: "¿Por qué comprarla aquí y no en una plataforma genérica?",
    answer: "Porque te respaldamos nosotros con envío local, atención directa de personas reales y un equipo que responde ante cualquier duda o problema con tu pedido.",
    verified: true
  }
];
