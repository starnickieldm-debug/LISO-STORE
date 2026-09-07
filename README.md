# LISO — Landing Page de Producto de Alta Conversión

Landing page editorial de alta conversión para la marca provisional **LISO** y su plancha de vapor portátil con placa giratoria (**OEM Asurson / Modelo 7005**).

Diseñada bajo el principio estético y conceptual de **"Calidez Precisa"**:
- **Lifestyle editorial**: Mañanas tranquilas, tonos hueso (`#F5F1EA`), luz natural y ropa real.
- **Ingeniería visible**: Sección oscura grafito (`#14151A`), planos técnicos, especificaciones tabulares y acento magenta inspirado en la placa (`#B4247C`).
- **Honestidad radical**: Sin reseñas inventadas, sin falsas urgencias, sin claims exagerados y con la **Etiqueta de Honestidad** (HACE vs. NO HACE).

---

## Estructura del Proyecto

```
dropshipping/
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── index.html
└── src/
    ├── config/
    │   └── siteContent.ts        # << CENTRALIZACIÓN TOTAL DE DATOS, PRECIOS Y TEXTOS
    ├── types/
    │   └── content.ts            # Tipos e interfaces en TypeScript
    ├── components/
    │   ├── layout/
    │   │   ├── TrustBar.tsx      # S0: Barra superior de confianza
    │   │   ├── Navbar.tsx        # Navegación y llamada directa
    │   │   ├── StickyBuyBar.tsx  # Barra fija inferior móvil (<=56px, botón >=52px)
    │   │   └── Footer.tsx        # S17: Pie de página minimalista
    │   ├── ui/
    │   │   ├── CTAButton.tsx     # Botón de conversión con ergonomía táctil (>=52px)
    │   │   ├── SectionHeader.tsx # Encabezados editoriales numerados (01–12)
    │   │   ├── MediaPlaceholder.tsx # Contenedor editorial para foto/vídeo real
    │   │   └── Accordion.tsx     # Acordeón accesible para FAQs
    │   └── sections/
    │       ├── HeroSection.tsx            # S1: Hero 50/50 + loop 6–8s
    │       ├── ThreeGesturesSection.tsx   # S2: Método de 3 gestos (Llena, Enciende, Pasa)
    │       ├── BenefitEvidenceSection.tsx # S3: 4 bloques con evidencia técnica
    │       ├── EngineeringSection.tsx     # S4: Plano técnico oscuro interactivo (#14151A)
    │       ├── HonestyLabelSection.tsx    # S5: Etiqueta de honestidad (HACE vs NO HACE)
    │       ├── ComparisonSection.tsx      # S6: Tabla comparativa con columna fija en scroll
    │       ├── LifestyleScenesSection.tsx # S7: 5 escenas de uso adulto real
    │       ├── BoxContentsSection.tsx     # S8: Flat-lay con desglose del kit
    │       ├── SocialProofSection.tsx     # S9: Vídeo sin cortes de 4 min + incentivo
    │       ├── OfferSection.tsx           # S10: Ficha de compra + selector enchufe EU/US/UK/AU
    │       ├── FAQSection.tsx             # S11: Acordeón con las 12 preguntas oficiales
    │       └── FinalCTASection.tsx        # S12: CTA de cierre a las 8:12
    ├── App.tsx
    ├── main.tsx
    └── index.css
```

---

## Cómo Ejecutar el Proyecto

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abrirá la aplicación en local (por defecto `http://localhost:3000` o `http://localhost:5173`).

3. **Compilar para producción**:
   ```bash
   npm run build
   ```
   Generará los archivos estáticos listos para desplegar en la carpeta `/dist`.

---

## Cómo Personalizar la Landing sin Tocar Código

Toda la información comercial, legal, técnica y de precios está desacoplada en:
👉 `src/config/siteContent.ts`

Desde ese único archivo puedes actualizar:
- **Precios y monedas**: variable `pricePlaceholder` (ej: cambiar `"[PRECIO]"` por `"59 €"` o `"$64 USD"`).
- **Plazos de envío**: variable `shippingPlaceholder` (ej: `"24–48 h en península"`).
- **Garantías legales**: variable `guaranteeLegalPlaceholder` (ej: `"3 años según legislación UE"`).
- **Incentivo de opiniones**: sustituir `"[INCENTIVO REAL A CONFIRMAR]"` por `"15% de reembolso en tu próxima compra"`.
- **Selector de Enchufes**: modificar o añadir tipos de clavija en `plugOptions`.
- **Preguntas frecuentes (FAQ)**: actualizar cualquiera de las 12 preguntas o completar las respuestas con placeholders una vez finalizadas las pruebas de laboratorio.

---

## Sustitución de Medios (Fotos y Vídeos Reales)

El diseño utiliza `MediaPlaceholder`, un componente que marca visualmente la escala, encuadre y especificación requerida sin utilizar imágenes falsas generadas por IA ni modelos de stock genéricos.

Para sustituir un placeholder por tu foto o vídeo real:
1. Coloca tus archivos en la carpeta `public/images/` o `public/videos/`.
2. En la sección correspondiente (ej. `HeroSection.tsx`, `LifestyleScenesSection.tsx`), reemplaza el `<MediaPlaceholder>` por la etiqueta estándar:
   ```tsx
   <video autoPlay loop muted playsInline className="w-full h-full object-cover">
     <source src="/videos/hero-loop.mp4" type="video/mp4" />
   </video>
   ```
   o
   ```tsx
   <img src="/images/escena-01.jpg" alt="Camisa de oficina a las 8:12" className="w-full h-full object-cover" />
   ```

---

## Integración con Pasarela de Pago / Checkout

En `OfferSection.tsx` y `CTAButton.tsx`, puedes enlazar el botón a:
- Un enlace directo de checkout de Shopify (`https://tu-tienda.myshopify.com/cart/...`)
- Stripe Checkout o Payment Link
- WooCommerce / carrito custom
- Redirección con parámetro de enchufe seleccionado (`?plug=${selectedPlug}`)
