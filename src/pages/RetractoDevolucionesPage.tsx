import React from 'react';
import { LegalLayout } from '../components/legal/LegalLayout';
import { LEGAL_SELLER, LEGAL_COMMERCIAL } from '../config/legalInfo';
import { RotateCcw, Clock, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RetractoDevolucionesPage: React.FC = () => {
  return (
    <LegalLayout
      title="Política de Derecho de Retracto y Devoluciones"
      subtitle="Condiciones, términos legales y procedimiento para ejercer el derecho de retracto en compras a distancia en Colombia."
      badge="DERECHO DEL CONSUMIDOR"
    >
      {/* Resumen de plazos legales */}
      <div className="p-4 sm:p-5 bg-white/[0.04] border border-white/15 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-wider">
          <RotateCcw className="w-4 h-4" />
          <span>Plazos del Derecho de Retracto (Art. 47 Ley 1480 de 2011)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <span className="text-bone/50 block text-[10px] uppercase">Plazo para Notificar Retracto</span>
            <span className="text-bone font-bold text-sm">5 Días Hábiles</span>
            <span className="text-bone/50 block text-[10px] mt-0.5">A partir de la entrega física del producto</span>
          </div>
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <span className="text-bone/50 block text-[10px] uppercase">Plazo para Reembolso del Dinero</span>
            <span className="text-bone font-bold text-sm">Máximo 15 Días Calendario</span>
            <span className="text-bone/50 block text-[10px] mt-0.5">Desde el ejercicio y cumplimiento de la devolución</span>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">01.</span> ¿Qué es el Derecho de Retracto?
        </h2>
        <p>
          El derecho de retracto es la facultad legal que tiene todo consumidor en Colombia para resolver unilateralmente el contrato de compraventa cuando la transacción se haya realizado a través de mecanismos de comercio electrónico, compras por internet o ventas a distancia, reintegrando el producto y recibiendo la devolución total del dinero pagado.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">02.</span> Plazo Legal para su Ejercicio
        </h2>
        <p>
          De conformidad con el artículo 47 de la <strong>Ley 1480 de 2011</strong>, el término máximo para ejercer el derecho de retracto es de <strong>cinco (5) días hábiles</strong> contados a partir de la fecha en que el consumidor o quien este autorice reciba efectivamente el producto en la dirección de despacho acordada.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">03.</span> Condiciones Obligatorias del Producto
        </h2>
        <p>
          Para que proceda válidamente el derecho de retracto, el consumidor debe cumplir con las siguientes condiciones establecidas por la ley:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-bone/75">
          <li>El producto debe devolverse por los mismos medios y en las mismas condiciones en que fue recibido.</li>
          <li>Debe conservar sus empaques originales, etiquetas, bolsas de protección, accesorios completos (base de apoyo, vaso dosificador de 100 ml) y manuales de usuario.</li>
          <li>No debe presentar signos de maltrato, golpes, fracturas o intervenciones mecánicas ajenas al ensamble original.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">04.</span> Costos de Transporte en el Retracto
        </h2>
        <p>
          El artículo 47 del Estatuto del Consumidor dispone expresamente que <strong>los costos de transporte y los demás que conlleve la devolución del bien serán cubiertos por el consumidor</strong>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">05.</span> Procedimiento para Ejercer el Retracto
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-bone/80">
          <li>
            <strong>Notificación formal:</strong> Dentro de los cinco (5) días hábiles posteriores a la entrega, envíe una comunicación al correo <a href={`mailto:${LEGAL_SELLER.contactEmail}`} className="text-accent underline">{LEGAL_SELLER.contactEmail}</a> o a través de nuestra sección <a href="/pqr" className="text-accent underline">PQR</a>, indicando:
            <ul className="list-disc pl-5 mt-1 text-xs text-bone/70 space-y-0.5">
              <li>Nombre completo del titular de la compra y cédula.</li>
              <li>Número de orden o pedido.</li>
              <li>Manifestación inequívoca de ejercer el derecho de retracto.</li>
            </ul>
          </li>
          <li>
            <strong>Coordinación de envío:</strong> Nuestro equipo le responderá indicándole la dirección de recepción y las instrucciones para el despacho del paquete.
          </li>
          <li>
            <strong>Recepción e inspección:</strong> Una vez recibido el paquete en nuestras instalaciones, se verificará que cumpla con el estado de conservación exigido por la ley.
          </li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">06.</span> Plazo y Devolución del Dinero
        </h2>
        <p>
          Una vez ejercido válidamente el derecho de retracto y recibido el producto a satisfacción conforme a los requisitos legales, LISO reintegrará el 100% del dinero pagado por el bien en un plazo máximo de <strong>quince (15) días calendario</strong>, mediante el mismo medio de pago utilizado o transferencia bancaria coordinada con el consumidor.
        </p>
      </section>
    </LegalLayout>
  );
};
