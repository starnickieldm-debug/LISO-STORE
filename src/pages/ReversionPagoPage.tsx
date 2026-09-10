import React from 'react';
import { LegalLayout } from '../components/legal/LegalLayout';
import { LEGAL_SELLER } from '../config/legalInfo';
import { Scale, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ReversionPagoPage: React.FC = () => {
  return (
    <LegalLayout
      title="Política de Reversión del Pago"
      subtitle="Regulación, causales legales y procedimiento conforme al Artículo 51 de la Ley 1480 de 2011 y el Decreto 587 de 2016."
      badge="DERECHO DEL CONSUMIDOR"
    >
      <div className="p-4 sm:p-5 bg-white/[0.04] border border-white/15 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-wider">
          <Scale className="w-4 h-4" />
          <span>Mecanismo Legal Específico (Decreto 587 de 2016)</span>
        </div>
        <p className="text-xs text-bone/80 leading-relaxed">
          La reversión del pago es un mecanismo de protección legal aplicable exclusivamente a ventas realizadas mediante mecanismos de comercio electrónico en las que se hayan utilizado tarjetas de crédito, débito o cualquier otro instrumento de pago electrónico en Colombia.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">01.</span> Causales Legales de Procedencia
        </h2>
        <p>
          De conformidad con el artículo 51 de la <strong>Ley 1480 de 2011</strong> y el <strong>Decreto 587 de 2016</strong>, la reversión procede de manera obligatoria cuando se configure alguna de las siguientes cinco (5) causales:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-bone/80">
          <li className="p-2.5 bg-white/5 border border-white/10 rounded">
            <strong>1. Fraude:</strong> Cuando el consumidor haya sido objeto de una transacción fraudulenta.
          </li>
          <li className="p-2.5 bg-white/5 border border-white/10 rounded">
            <strong>2. Operación no solicitada:</strong> Cuando se haya cargado un cobro no consentido por el titular del instrumento de pago.
          </li>
          <li className="p-2.5 bg-white/5 border border-white/10 rounded">
            <strong>3. Producto no recibido:</strong> Cuando el producto adquirido no haya sido entregado en el plazo convenido o en el plazo legal supletorio.
          </li>
          <li className="p-2.5 bg-white/5 border border-white/10 rounded">
            <strong>4. Producto no conforme:</strong> Cuando el producto entregado no corresponda a lo solicitado, no cumpla con las características inherentes o las atribuidas en la información suministrada.
          </li>
          <li className="p-2.5 bg-white/5 border border-white/10 rounded">
            <strong>5. Producto defectuoso:</strong> Cuando el producto recibido presente averías o defectos de calidad que impidan su uso adecuado.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">02.</span> Término para Presentar la Solicitud
        </h2>
        <p>
          El consumidor dispone de un término perentorio de <strong>cinco (5) días hábiles</strong> siguientes a:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-bone/75">
          <li>La fecha en que tuvo noticia de la operación fraudulenta o no solicitada.</li>
          <li>La fecha en que debió haber recibido el producto según el plazo estimado de entrega.</li>
          <li>La fecha en que recibió el producto defectuoso o que no correspondía a lo adquirido.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">03.</span> Procedimiento Legal Dual (Obligatorio)
        </h2>
        <p>
          El Decreto 587 de 2016 exige que el consumidor adelante <strong>dos notificaciones paralelas</strong> dentro del término de los cinco (5) días hábiles:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 bg-night-900 border border-white/10 rounded-lg space-y-2">
            <h4 className="font-bold text-bone text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Paso 1: Reclamación ante LISO</span>
            </h4>
            <p className="text-bone/70">
              Presentar queja formal ante el vendedor vía correo <a href={`mailto:${LEGAL_SELLER.contactEmail}`} className="text-accent underline">{LEGAL_SELLER.contactEmail}</a> o en <a href="/pqr" className="text-accent underline">PQR</a> expresando la causal invocada, el número de orden, el valor y manifestando que el producto está a disposición para su devolución cuando corresponda.
            </p>
          </div>
          <div className="p-4 bg-night-900 border border-white/10 rounded-lg space-y-2">
            <h4 className="font-bold text-bone text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Paso 2: Notificación al Emisor del Pago</span>
            </h4>
            <p className="text-bone/70">
              Notificar simultáneamente al emisor del instrumento de pago electrónico (banco o entidad financiera emisora de la tarjeta) acreditando haber presentado la reclamación previa ante LISO e indicando la causal aplicable.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">04.</span> Diferencia con Retracto y Garantía
        </h2>
        <p>
          Es importante distinguir estos tres mecanismos legales:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-bone/75 text-xs sm:text-sm">
          <li><strong>Derecho de Retracto:</strong> Arrepentimiento voluntario de la compra dentro de los primeros 5 días hábiles, sin necesidad de justificar fallas (el flete lo cubre el consumidor).</li>
          <li><strong>Garantía Legal:</strong> Amparo por fallas de calidad o funcionamiento durante los 30 días calendario de vigencia (el flete y reparación corren por cuenta de LISO).</li>
          <li><strong>Reversión del Pago:</strong> Reintegro bancario forzoso ante fraude, no entrega, producto defectuoso o no solicitado mediante notificación conjunta a la tienda y al banco.</li>
        </ul>
      </section>
    </LegalLayout>
  );
};
