export interface ReferenceStoreItem {
  id: string;
  storeName: string;
  shortName: string;
  screenshotUrl: string;
  publishedPrice: string;
  referenceUrl: string;
  ctaLabel: string;
}

export interface PriceTransparencyData {
  sectionId: string;
  title: string;
  subtitle: string;
  referenceStores: ReferenceStoreItem[];
  ourOffer: {
    title: string;
    price: string;
    badge: string;
    imageCutoutUrl: string;
  };
  operationalContext: {
    title: string;
    body: string;
  };
  verificationCallout: {
    title: string;
    description: string;
  };
}

export const priceTransparencyConfig: PriceTransparencyData = {
  sectionId: "compara-precios",
  title: "Compara antes de comprar",
  subtitle: "Encontramos el mismo modelo publicado en otros comercios a precios superiores. Compruébalo tú mismo.",
  
  referenceStores: [
    {
      id: "ref-1",
      storeName: "Homecenter Colombia",
      shortName: "Homecenter",
      screenshotUrl: "/images/referencia-homecenter.png",
      publishedPrice: "$239.900",
      referenceUrl: "https://www.homecenter.com.co/homecenter-co/product/3096000/plancha-a-vapor-btobtyd-1200w-2-en-1-de-viaje-cabezal-giratorio-90-grados-b0gjdwz4ds/3096000/?kid=shopp_goosho_1430598&shop=1&gad_source=4&gad_campaignid=22296499605&gbraid=0AAAAADt6wnqW_QS91a2HP4xd859L5j6qG&gclid=CjwKCAjwn67VBhBnEiwAXUIN1e9-meFZ29sd5xkFnjXQS2Z2YpisBFpA-Az15B2NXWqqv8vISXQ2ChoCFNoQAvD_BwE",
      ctaLabel: "Ver en Homecenter"
    },
    {
      id: "ref-2",
      storeName: "Mercado Libre Colombia",
      shortName: "Mercado Libre",
      screenshotUrl: "/images/referencia-mercadolibre.png",
      publishedPrice: "$231.600",
      referenceUrl: "https://www.mercadolibre.com.co/vaporizador-de-ropa-2-en-1-ultra-rapido-1200w/up/MCOU3936323982",
      ctaLabel: "Ver en Mercado Libre"
    },
    {
      id: "ref-3",
      storeName: "AliExpress",
      shortName: "AliExpress",
      screenshotUrl: "/images/referencia-aliexpress.png",
      publishedPrice: "$190.142",
      referenceUrl: "https://es.aliexpress.com/item/1005012599300369.html?spm=a2g0o.imagesearchproductlist.main.1.3e30tOkStOkSPp&algo_pvid=9fd0f1a1-3cc0-436d-b365-4c560b7aafce&algo_exp_id=9fd0f1a1-3cc0-436d-b365-4c560b7aafce&pdp_ext_f=%7B%22order%22%3A%22115%22%2C%22fromPage%22%3A%22search%22%7D&pdp_npi=6%40dis%21COP%21428635.02%21190142.00%21%21%21902.53%21400.36%21%402103117b17896711403503632e0d0b%2112000058779419936%21sea%21CO%210%21ABX%211%210%21n_tag%3A-29910%3Bd%3A4ae5f3dc%3Bm03_new_user%3A-29895%3BpisId%3A5000000217421364&curPageLogUid=HNgVFSz300yI&utparam-url=scene%3Aimage_search%7Cquery_from%3Apc_web_image_search%7Cx_object_id%3A1005012599300369%7C_p_origin_prod%3A",
      ctaLabel: "Ver en AliExpress"
    }
  ],

  ourOffer: {
    title: "El mismo modelo, por $149.900",
    price: "$149.900",
    badge: "Precio final — envío gratis incluido",
    imageCutoutUrl: "/images/liso-pure-cutout.webp"
  },

  operationalContext: {
    title: "¿Cómo podemos ofrecerlo a este precio?",
    body: "Trabajamos bajo pedido y mediante venta directa, reduciendo costos asociados a intermediarios y almacenamiento."
  },

  verificationCallout: {
    title: "¿Quieres comprobarlo?",
    description: "Consulta las publicaciones de referencia y compara el modelo y el precio por ti mismo."
  }
};
