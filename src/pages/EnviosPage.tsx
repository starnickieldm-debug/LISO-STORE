import React from 'react';
import { LegalLayout } from '../components/legal/LegalLayout';
import { LEGAL_SELLER, LEGAL_COMMERCIAL } from '../config/legalInfo';
import { Truck, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const EnviosPage: React.FC = () => {
  return (
    <LegalLayout
      title="Política de Envíos y Entregas"
      subtitle="Información transparente sobre tiempos estimados, cobertura nacional en Colombia y condiciones de despacho."
      badge="INFORMACIÓN LOGÍSTICA"
    >
      <div className="p-4 sm:p-5 bg-white/[0.04] border border-white/15 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-wider">
          <Truck className="w-4 h-4" />
          <span>Condiciones de Envío Vigentes</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <span className="text-bone/50 block text-[10px] uppercase">Costo de Envío</span>
            <span className="text-bone font-bold text-sm">GRATIS</span>
            <span className="text-bone/50 block text-[10px] mt-0.5">Incluido en el precio final</span>
          </div>
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <span className="text-bone/50 block text-[10px] uppercase">Tiempo Estimado</span>
            <span className="text-bone font-bold text-sm">15–20 Días Hábiles</span>
            <span className="text-bone/50 block text-[10px] mt-0.5">Informado por el proveedor</span>
          </div>
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <span className="text-bone/50 block text-[10px] uppercase">Cobertura</span>
            <span className="text-bone font-bold text-sm">Toda Colombia</span>
            <span className="text-bone/50 block text-[10px] mt-0.5">Despacho nacional</span>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">01.</span> Cobertura Exclusiva en Colombia
        </h2>
        <p>
          LISO realiza envíos de manera exclusiva dentro del territorio de la República de Colombia. Llegamos a ciudades principales, intermedias y municipios con cobertura de transporte terrestre nacional.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">02.</span> Costo del Envío
        </h2>
        <p>
          El costo de transporte para envíos estándar a nivel nacional está <strong>100% incluido en el precio publicado de {LEGAL_COMMERCIAL.priceCOP}</strong>. El comprador no deberá cancelar ningún valor adicional por concepto de fletes al momento de la entrega.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">03.</span> Tiempos Estimados de Entrega
        </h2>
        <p>
          El tiempo estimado de entrega informado actualmente por la operación logística es de <strong>15 a 20 días hábiles</strong> posteriores a la aprobación del pago.
        </p>
        <div className="p-4 bg-white/[0.03] border-l-2 border-accent text-xs space-y-1.5">
          <p className="font-semibold text-bone">Información legal y veraz al consumidor:</p>
          <p className="text-bone/75">
            LISO informa de manera previa y transparente dicho rango con el fin de que el consumidor tome una decisión de compra plenamente informada. No hacemos promesas falsas de entregas inmediatas ni inventamos tiempos de tránsito irreales.
          </p>
          <p className="text-bone/60">
            Dicho plazo es un estimado que puede presentar variaciones por factores de orden público, bloqueos viales, contingencias climáticas o inspecciones rutinarias de transporte. En todo caso, cualquier plazo contractual se aplicará rigurosamente conforme a los límites de la legislación colombiana (artículo 50 Ley 1480 de 2011).
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bone flex items-center gap-2">
          <span className="text-accent text-sm">04.</span> Seguimiento y Novedades del Paquete
        </h2>
        <p>
          Una vez despachada la orden, el comprador recibirá un correo electrónico con la confirmación de envío y la información de guía para realizar seguimiento en línea del tránsito de su paquete.
        </p>
        <p>
          En caso de presentarse una novedad en la entrega (dirección incompleta, destinatario ausente o reintentos de entrega), nuestro canal de atención oficial <a href={`mailto:${LEGAL_SELLER.contactEmail}`} className="text-accent underline">{LEGAL_SELLER.contactEmail}</a> estará disponible para coordinar oportunamente la reprogramación con el operador logístico.
        </p>
      </section>
    </LegalLayout>
  );
};
