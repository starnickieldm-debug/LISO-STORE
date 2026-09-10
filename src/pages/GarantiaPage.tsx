import React from 'react';
import { LegalLayout } from '../components/legal/LegalLayout';
import { LEGAL_SELLER, LEGAL_COMMERCIAL } from '../config/legalInfo';
import { ShieldCheck, Check, AlertTriangle, HelpCircle } from 'lucide-react';

export const GarantiaPage: React.FC = () => {
  return (
    <LegalLayout
      title="Política de Garantía Legal"
      subtitle="Condiciones de idoneidad, calidad, funcionamiento y procedimiento para hacer efectiva la garantía en Colombia."
      badge="GARANTÍA OFICIAL"
    >
      {/* Card resumen de garantía */}
      <div className="p-4 sm:p-5 bg-white/[0.04] border border-white/15 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Término y Cobertura Oficial</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <span className="text-bone/50 block text-[10px] uppercase">Término de Garantía</span>
            <span className="text-bone font-bold text-sm">{LEGAL_COMMERCIAL.warrantyTerm}</span>
            <span className="text-bone/50 block text-[10px] mt-0.5">Desde la entrega física</span>
          </div>
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <span className="text-bone/50 block text-[10px] uppercase">Tensión de Operación</span>
            <span className="text-bone font-bold text-sm">110 V Estándar</span>
            <span className="text-bone/50 block text-[10px] mt-0.5">Red eléctrica Colombia</span>
          </div>
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <span className="text-bone/50 block text-[10px] uppercase">Costo para el Cliente</span>
            <span className="text-bone font-bold text-sm">$0 COP en Garantía</span>
            <span className="text-bone/50 block text-[10px] mt-0.5">Fletes asumidos por LISO</span>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">01.</span> Fundamento y Término de la Garantía
        </h2>
        <p>
          En cumplimiento del artículo 7 y siguientes de la <strong>Ley 1480 de 2011 (Estatuto del Consumidor)</strong>, los productos LISO cuentan con una <strong>Garantía Legal de treinta (30) días calendario contados a partir de la entrega del producto al consumidor</strong>.
        </p>
        <p className="text-xs text-bone/70">
          Este es el término de garantía anunciado por el proveedor para el territorio colombiano y se encuentra sujeto a las normas imperativas y de orden público colombianas. En ningún caso las presentes estipulaciones pretenden limitar o menoscabar derechos irrenunciables reconocidos por la ley.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">02.</span> Cobertura de la Garantía
        </h2>
        <p>
          La garantía legal ampara la calidad, idoneidad técnica y correcto funcionamiento del producto frente a:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-bone/75">
          <li>Fallas de fabricación en componentes internos (resistencia calefactora, bomba de vapor, placa giratoria).</li>
          <li>Defectos en el panel digital o selector de temperatura que impidan su encendido o regulación normal.</li>
          <li>Fugas anormales de agua atribuibles a defectos de sellado o ensamble de fábrica.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">03.</span> Procedimiento para Hacer Efectiva la Garantía
        </h2>
        <p>
          Para solicitar la efectividad de la garantía, el consumidor debe seguir un trámite directo y transparente:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-bone/80">
          <li>
            <strong>Contacto inicial:</strong> Enviar un correo electrónico a <a href={`mailto:${LEGAL_SELLER.contactEmail}`} className="text-accent underline">{LEGAL_SELLER.contactEmail}</a> o radicar su solicitud en nuestro formulario oficial en <a href="/pqr" className="text-accent underline">PQR</a>.
          </li>
          <li>
            <strong>Información a suministrar:</strong>
            <ul className="list-disc pl-5 mt-1 text-xs text-bone/70 space-y-0.5">
              <li>Nombre completo del comprador y número de documento.</li>
              <li>Número de orden o pedido de compra.</li>
              <li>Fecha de entrega del producto.</li>
              <li>Descripción clara y concisa de la falla observada.</li>
              <li>Fotografías claras o un video corto donde se evidencie el defecto o comportamiento anómalo.</li>
            </ul>
          </li>
          <li>
            <strong>Evaluación técnica:</strong> Nuestro equipo técnico evaluará la solicitud en un término máximo de tres (3) a cinco (5) días hábiles para diagnosticar el caso e indicarle los pasos a seguir.
          </li>
          <li>
            <strong>Solución aplicable conforme a la ley:</strong>
            <ul className="list-disc pl-5 mt-1 text-xs text-bone/70 space-y-0.5">
              <li>En primer término, la <strong>reparación gratuita</strong> del bien y el suministro de repuestos legítimos, cuando resulte procedente.</li>
              <li>Si el bien no admite reparación o la falla se repite, el consumidor podrá optar por el <strong>cambio o reemplazo</strong> del producto por uno nuevo de idénticas o superiores características, o por la <strong>devolución total del dinero</strong> pagado.</li>
            </ul>
          </li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">04.</span> Costos de Transporte en Garantía
        </h2>
        <p>
          Cuando la reclamación de garantía resulte procedente conforme a la ley, <strong>los gastos de transporte y fletes de recolección y reenvío del producto serán asumidos en su totalidad por LISO</strong>. No se exigirán cobros adicionales al consumidor por la efectividad legal de la garantía.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">05.</span> Exclusiones de la Garantía (Causales Legales de Exoneración)
        </h2>
        <p>
          De conformidad con el artículo 16 del Estatuto del Consumidor, la garantía no aplicará en los siguientes supuestos legalmente previstos:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-bone/75 text-xs sm:text-sm">
          <li><strong>Uso indebido o contrario al manual:</strong> Daños por empleo de líquidos distintos a agua potable o desmineralizada (por ejemplo: perfumes, alcohol, químicos corrosivos, aceites esenciales).</li>
          <li><strong>Conexión a tensión eléctrica inadecuada:</strong> Daños por conexión a redes de voltaje superior al especificado de 110 V sin el uso de transformador adecuado, o sobrecargas eléctricas severas de la instalación doméstica.</li>
          <li><strong>Intervención de terceros no autorizados:</strong> Apertura, alteración, desensamble o reparación del aparato por personas no autorizadas por LISO.</li>
          <li><strong>Golpes o caídas accidentales:</strong> Fracturas externas, golpes mecánicos, inmersión en agua del cuerpo eléctrico o deterioro estético severo imputable a descuido del usuario.</li>
          <li><strong>Fuerza mayor o caso fortuito.</strong></li>
        </ul>
      </section>
    </LegalLayout>
  );
};
