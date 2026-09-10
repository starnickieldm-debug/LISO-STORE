import React from 'react';
import { LegalLayout } from '../components/legal/LegalLayout';
import { LEGAL_SELLER } from '../config/legalInfo';
import { Lock, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

export const PoliticaPrivacidadPage: React.FC = () => {
  return (
    <LegalLayout
      title="Política de Privacidad y Tratamiento de Datos Personales"
      subtitle="Compromiso de protección de datos personales conforme a la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 de Colombia."
      badge="PROTECCIÓN DE DATOS"
    >
      {/* Declaración inicial */}
      <div className="p-4 sm:p-5 bg-white/[0.04] border border-white/15 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-wider">
          <Lock className="w-4 h-4" />
          <span>Responsable del Tratamiento de Datos</span>
        </div>
        <p className="text-xs text-bone/80 leading-relaxed">
          <strong>{LEGAL_SELLER.name}</strong>, persona natural identificada con NIT <strong>{LEGAL_SELLER.nit}</strong>, con domicilio en {LEGAL_SELLER.notificationAddress}, y correo de contacto <a href={`mailto:${LEGAL_SELLER.contactEmail}`} className="text-accent underline">{LEGAL_SELLER.contactEmail}</a>, actúa como Responsable del tratamiento de sus datos personales.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">01.</span> Marco Legal Aplicable
        </h2>
        <p>
          Esta política se expide en cumplimiento de los artículos 15 y 20 de la Constitución Política de Colombia, la <strong>Ley 1581 de 2012</strong>, el <strong>Decreto 1377 de 2013</strong> y las normas concordantes que regulan el derecho de Hábeas Data en la República de Colombia.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">02.</span> Datos que Recopilamos
        </h2>
        <p>
          Para procesar su compra y garantizar la entrega de su pedido, podemos solicitar y almacenar los siguientes datos:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-bone/75">
          <li>Nombres y apellidos completos.</li>
          <li>Número de documento de identidad (Cédula de Ciudadanía o Extranjería).</li>
          <li>Dirección física de despacho, ciudad, departamento y código postal en Colombia.</li>
          <li>Número de teléfono móvil o de contacto.</li>
          <li>Dirección de correo electrónico.</li>
          <li>Historial de compras y registros de solicitudes de atención o PQR.</li>
        </ul>
        <p className="text-xs text-bone/60">
          <em>Nota sobre datos financieros:</em> LISO no almacena directamente números de tarjeta de crédito ni códigos de seguridad bancarios; toda transacción de pago es procesada de forma independiente y segura por las pasarelas certificadas integradas en Shopify Checkout bajo certificación PCI-DSS.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">03.</span> Finalidades Específicas del Tratamiento
        </h2>
        <p>
          Sus datos personales se tratan de forma exclusiva para las siguientes finalidades operativas legítimas:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-bone/80">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span><strong>Gestión y cumplimiento de la orden:</strong> Validar la compra, emitir la factura o comprobante legal y coordinar la entrega física del producto a través del operador logístico.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span><strong>Atención al cliente y postventa:</strong> Brindarle soporte sobre el uso del producto, atender solicitudes de garantía, derecho de retracto, reversión del pago o trámite de PQR.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span><strong>Cumplimiento de obligaciones legales:</strong> Conservar registros fiscales, contables y tributarios exigidos por la DIAN y las autoridades colombianas.</span>
          </li>
        </ul>
        <div className="p-3 bg-white/5 border border-white/10 rounded text-xs text-bone/75">
          <strong>Autorización independiente para fines comerciales:</strong> La aceptación de los términos de compra no autoriza de forma automática el envío de publicidad intrusiva. Las comunicaciones comerciales o boletines promocionales solo se enviarán si usted otorga un consentimiento previo, explícito e informado para dicha finalidad.
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">04.</span> Derechos de los Titulares de la Información
        </h2>
        <p>
          De conformidad con el artículo 8 de la Ley 1581 de 2012, usted como titular tiene los siguientes derechos:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-bone/75">
          <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales frente a LISO.</li>
          <li><strong>Solicitar prueba</strong> de la autorización otorgada para el tratamiento.</li>
          <li><strong>Ser informado</strong> previa solicitud respecto del uso que se le ha dado a sus datos.</li>
          <li><strong>Revocar la autorización</strong> y/o solicitar la supresión de sus datos cuando en el tratamiento no se respeten los principios constitucionales y legales.</li>
          <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio por infracciones a la normatividad de datos personales.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">05.</span> Canales para Ejercer sus Derechos (Hábeas Data)
        </h2>
        <p>
          Para ejercer sus derechos de consulta, rectificación, actualización o supresión de datos, puede remitir una solicitud escrita indicando su nombre, identificación y el detalle de su requerimiento a:
        </p>
        <div className="p-4 bg-night-900 border border-white/10 rounded-lg text-xs space-y-1">
          <p><strong>Correo oficial:</strong> <a href={`mailto:${LEGAL_SELLER.contactEmail}`} className="text-accent underline">{LEGAL_SELLER.contactEmail}</a></p>
          <p><strong>Asunto recomendado:</strong> Ejercicio Derechos Hábeas Data - [Su Nombre]</p>
          <p><strong>Término de respuesta:</strong> Las consultas se resolverán en un plazo máximo de diez (10) días hábiles; los reclamos y solicitudes de supresión o rectificación se tramitarán en un plazo máximo de quince (15) días hábiles conforme a la ley.</p>
        </div>
      </section>
    </LegalLayout>
  );
};
