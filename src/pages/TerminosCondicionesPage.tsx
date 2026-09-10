import React from 'react';
import { LegalLayout } from '../components/legal/LegalLayout';
import { LEGAL_SELLER, LEGAL_COMMERCIAL } from '../config/legalInfo';
import { ShieldCheck, Check, AlertCircle, FileText, ExternalLink } from 'lucide-react';

export const TerminosCondicionesPage: React.FC = () => {
  return (
    <LegalLayout
      title="Términos y Condiciones de Uso y Venta"
      subtitle="Reglas contractuales, derechos del consumidor y condiciones de compra para la tienda LISO en la República de Colombia."
      badge="DOCUMENTO LEGAL"
    >
      {/* Resumen ejecutivo de compra */}
      <div className="p-4 sm:p-5 bg-white/[0.04] border border-white/15 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Resumen de Condiciones Comerciales Clave</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <span className="text-bone/50 block text-[10px] uppercase">Producto</span>
            <span className="text-bone font-bold">{LEGAL_COMMERCIAL.productName}</span>
          </div>
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <span className="text-bone/50 block text-[10px] uppercase">Precio Total</span>
            <span className="text-bone font-bold">{LEGAL_COMMERCIAL.priceCOP}</span>
          </div>
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <span className="text-bone/50 block text-[10px] uppercase">Tiempo de Entrega</span>
            <span className="text-bone font-bold">{LEGAL_COMMERCIAL.shippingEstimate}</span>
          </div>
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <span className="text-bone/50 block text-[10px] uppercase">Garantía Legal</span>
            <span className="text-bone font-bold">{LEGAL_COMMERCIAL.warrantyTerm} (110 V)</span>
          </div>
        </div>
      </div>

      {/* Sección 1: Identificación del Vendedor */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">01.</span> Identificación del Vendedor
        </h2>
        <p>
          El presente sitio web y la oferta de productos comercializados bajo la marca <strong>LISO</strong> son operados por <strong>{LEGAL_SELLER.name}</strong>, identificada tributariamente bajo el Registro Único Tributario (RUT) número <strong>{LEGAL_SELLER.rut}</strong>, actuando como persona natural en la República de Colombia, con domicilio y dirección de notificación judicial en {LEGAL_SELLER.notificationAddress}, correo electrónico de atención oficial: <a href={`mailto:${LEGAL_SELLER.contactEmail}`} className="text-accent underline">{LEGAL_SELLER.contactEmail}</a>.
        </p>
      </section>

      {/* Sección 2: Ámbito y Objeto */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">02.</span> Ámbito de Aplicación y Objeto
        </h2>
        <p>
          Los presentes Términos y Condiciones regulan el acceso, navegación y las operaciones comerciales de compraventa a través de este storefront de comercio electrónico, celebrado entre {LEGAL_SELLER.name} (en adelante, el "Vendedor") y cualquier consumidor adquirente (en adelante, el "Cliente" o "Consumidor") ubicado exclusivamente en el territorio de la República de Colombia.
        </p>
        <p>
          La relación de consumo se rige bajo la <strong>Ley 1480 de 2011 (Estatuto del Consumidor)</strong>, el <strong>Decreto 587 de 2016</strong>, la <strong>Ley 1581 de 2012</strong> y las demás normas colombianas aplicables al comercio electrónico.
        </p>
      </section>

      {/* Sección 3: Descripción del Producto y Especificaciones */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">03.</span> Características e Idoneidad del Producto
        </h2>
        <p>
          El producto principal ofertado corresponde a la <strong>Plancha de vapor portátil LISO</strong>, cuyas especificaciones técnicas son:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-bone/75">
          <li><strong>Potencia:</strong> {LEGAL_COMMERCIAL.power}.</li>
          <li><strong>Tensión eléctrica:</strong> {LEGAL_COMMERCIAL.voltage} (clavija plana estándar tipo A/B de conexión directa a tomacorrientes domésticos en Colombia).</li>
          <li><strong>Funcionalidad:</strong> Placa giratoria bidireccional, pantalla digital con visualización de temperatura y modo de vapor continuo para alisar prendas en percha o en plano.</li>
          <li><strong>Accesorios incluidos:</strong> Base dock térmica de apoyo, vaso medidor de 100 ml, bolsa de transporte y manual de uso.</li>
        </ul>
      </section>

      {/* Sección 4: Precios y Facturación */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">04.</span> Precios y Condiciones de Pago
        </h2>
        <p>
          El precio de venta al público para el producto es de <strong>{LEGAL_COMMERCIAL.priceCOP}</strong>. Este precio corresponde al valor total a pagar e <strong>incluye los costos de despacho y entrega en cualquier destino nacional con cobertura en Colombia</strong>. No existen costos ocultos ni cargos adicionales por transporte estándar.
        </p>
        <p>
          Los pagos se procesan a través de pasarelas de pago seguras habilitadas en la infraestructura oficial de Shopify Checkout (tarjetas de crédito, débito y transferencias electrónicas autorizadas en Colombia). La transacción está encriptada bajo estándares bancarios internacionales.
        </p>
      </section>

      {/* Sección 5: Formación del Contrato */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">05.</span> Proceso de Compra y Formación del Contrato
        </h2>
        <p>
          El contrato de compraventa a distancia se perfecciona en el momento en que el Cliente selecciona la variante de color deseada, completa los datos de entrega, acepta expresamente estos términos y la pasarela de pagos emite la confirmación de transacción aprobada. El Cliente recibirá un correo electrónico automático de confirmación con el resumen de su orden.
        </p>
      </section>

      {/* Sección 6: Envíos y Plazos de Entrega */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">06.</span> Envíos, Despachos y Tiempos de Entrega
        </h2>
        <p>
          Los envíos se realizan exclusivamente dentro del territorio de la República de Colombia. El tiempo de entrega informado actualmente por la operación logística corresponde a un <strong>estimado de 15 a 20 días hábiles</strong> posteriores a la confirmación del pago.
        </p>
        <div className="p-3 bg-white/5 border-l-2 border-accent text-xs space-y-1">
          <p className="font-semibold text-bone">Claridad sobre los tiempos estimados:</p>
          <p className="text-bone/70">
            Dicho plazo es informativo y puede variar en función de contingencias operativas del transporte terrestre o ubicación geográfica del destinatario. En todo caso, cualquier plazo contractual se aplicará rigurosamente conforme al artículo 50 de la Ley 1480 de 2011. Si se presentare un retraso insalvable o indisponibilidad del producto, se notificará de inmediato al consumidor para acordar la solución procedente o la devolución inmediata del dinero.
          </p>
        </div>
      </section>

      {/* Sección 7: Derecho de Retracto */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">07.</span> Derecho de Retracto (Art. 47 Ley 1480 de 2011)
        </h2>
        <p>
          El Consumidor goza del derecho de retracto en las ventas a distancia mediante comercio electrónico. Para ejercerlo, el Cliente dispone de un término máximo de <strong>cinco (5) días hábiles</strong> contados a partir de la entrega física del producto.
        </p>
        <p>
          El producto deberá devolverse en las mismas condiciones en que fue recibido, conservando sus empaques, accesorios y sin señales de deterioro indebido. De acuerdo con la ley, los costos de transporte de la devolución son a cargo del consumidor. LISO reintegrará la totalidad del dinero pagado en un plazo máximo de <strong>quince (15) días calendario</strong> desde que se ejerza el derecho y se cumplan los requisitos legales de devolución.
        </p>
      </section>

      {/* Sección 8: Reversión del Pago */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">08.</span> Reversión del Pago (Art. 51 Ley 1480 y Dec. 587 de 2016)
        </h2>
        <p>
          El Consumidor podrá solicitar la reversión de los pagos efectuados mediante mecanismos de comercio electrónico cuando: (i) sea objeto de fraude, (ii) corresponda a una operación no solicitada, (iii) el producto adquirido no sea recibido, (iv) el producto entregado no corresponda a lo solicitado, o (v) el producto entregado resulte defectuoso.
        </p>
        <p>
          Para ello, el Consumidor deberá presentar su queja ante LISO y notificar al emisor de su instrumento de pago dentro de los <strong>cinco (5) días hábiles</strong> siguientes a la fecha en que tuvo conocimiento del hecho.
        </p>
      </section>

      {/* Sección 9: Garantía Legal */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">09.</span> Garantía Legal
        </h2>
        <p>
          El producto cuenta con una <strong>Garantía Legal de tres (3) meses</strong> contados a partir de la entrega física del bien, que ampara defectos de calidad, idoneidad técnica o fabricación que impidan su funcionamiento normal bajo condiciones de uso recomendadas a 110 V. La garantía no cubre averías ocasionadas por uso indebido, manipulación contraria al manual o fluctuaciones eléctricas imputables a la red del usuario.
        </p>
      </section>

      {/* Sección 10: PQR y Protección al Consumidor */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">10.</span> Peticiones, Quejas, Reclamos y Autoridad de Control
        </h2>
        <p>
          Para radicar peticiones, quejas o reclamos (PQR), el Cliente puede escribir al correo <a href={`mailto:${LEGAL_SELLER.contactEmail}`} className="text-accent underline">{LEGAL_SELLER.contactEmail}</a> o diligenciar el formulario disponible en nuestra sección <a href="/pqr" className="text-accent underline">PQR</a>. Las solicitudes se resolverán dentro de los quince (15) días hábiles siguientes a su recepción.
        </p>
        <p>
          Para conocer sus derechos como consumidor y los mecanismos de protección, el Cliente puede consultar el portal oficial de la <strong>Superintendencia de Industria y Comercio (SIC)</strong> en <a href={LEGAL_SELLER.sicUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline">{LEGAL_SELLER.sicUrl}</a>.
        </p>
      </section>

      {/* Sección 11: Legislación y Jurisdicción */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">11.</span> Ley Aplicable y Jurisdicción
        </h2>
        <p>
          Los presentes Términos y Condiciones se interpretan conforme a las leyes de la República de Colombia. Cualquier diferencia se resolverá ante las autoridades administrativas y jurisdiccionales competentes de Colombia.
        </p>
      </section>
    </LegalLayout>
  );
};
