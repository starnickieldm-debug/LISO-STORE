import React, { useState } from 'react';
import { LegalLayout } from '../components/legal/LegalLayout';
import { LEGAL_SELLER } from '../config/legalInfo';
import { HelpCircle, Send, CheckCircle2, Clock, ShieldCheck, Mail, ExternalLink } from 'lucide-react';

export const PQRPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    correo: '',
    telefono: '',
    numeroPedido: '',
    tipoSolicitud: 'Petición / Consulta General',
    descripcion: '',
  });

  const [radicado, setRadicado] = useState<string | null>(null);
  const [radicadoTime, setRadicadoTime] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.correo || !formData.descripcion) {
      alert('Por favor completa los campos obligatorios marcados con asterisco (*).');
      return;
    }

    // Generar código de radicado único referencial
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `LISO-PQR-${dateStr}-${randomNum}`;
    
    setRadicado(code);
    setRadicadoTime(now.toLocaleString('es-CO', { timeZone: 'America/Bogota' }));
  };

  const handleReset = () => {
    setRadicado(null);
    setRadicadoTime(null);
    setFormData({
      nombre: '',
      documento: '',
      correo: '',
      telefono: '',
      numeroPedido: '',
      tipoSolicitud: 'Petición / Consulta General',
      descripcion: '',
    });
  };

  const mailtoSubject = encodeURIComponent(`Solicitud PQR - Radicado ${radicado || 'Pendiente'}: ${formData.tipoSolicitud}`);
  const mailtoBody = encodeURIComponent(
    `SOLICITUD FORMAL DE PQR - LISO COLOMBIA\n` +
    `Radicado de Referencia: ${radicado}\n` +
    `Fecha y Hora: ${radicadoTime}\n\n` +
    `DATOS DEL CONSUMIDOR:\n` +
    `Nombre: ${formData.nombre}\n` +
    `Documento: ${formData.documento || 'No especificado'}\n` +
    `Correo: ${formData.correo}\n` +
    `Teléfono: ${formData.telefono || 'No especificado'}\n` +
    `Número de Pedido: ${formData.numeroPedido || 'No aplica / Consulta general'}\n` +
    `Tipo de Solicitud: ${formData.tipoSolicitud}\n\n` +
    `DESCRIPCIÓN DE LOS HECHOS:\n${formData.descripcion}\n\n` +
    `Información remitida al Vendedor conforme a la Ley 1480 de 2011.`
  );

  return (
    <LegalLayout
      title="PQR y Atención al Cliente"
      subtitle="Canal oficial para radicar Peticiones, Quejas, Reclamos y Solicitudes conforme a la legislación colombiana."
      badge="ATENCIÓN AL CONSUMIDOR"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
        <div className="p-4 bg-white/[0.04] border border-white/15 rounded-lg space-y-1">
          <span className="text-accent font-bold uppercase text-[10px]">Término de Respuesta</span>
          <p className="text-bone font-semibold text-sm">Máximo 15 Días Hábiles</p>
          <p className="text-bone/60 text-[11px]">Conforme al Código de Procedimiento Administrativo y Ley 1480.</p>
        </div>
        <div className="p-4 bg-white/[0.04] border border-white/15 rounded-lg space-y-1">
          <span className="text-accent font-bold uppercase text-[10px]">Correo Oficial</span>
          <p className="text-bone font-semibold text-sm">{LEGAL_SELLER.contactEmail}</p>
          <p className="text-bone/60 text-[11px]">Canal directo sin intermediarios.</p>
        </div>
        <div className="p-4 bg-white/[0.04] border border-white/15 rounded-lg space-y-1">
          <span className="text-accent font-bold uppercase text-[10px]">Autoridad de Control</span>
          <a href={LEGAL_SELLER.sicUrl} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-accent font-semibold text-sm underline flex items-center gap-1">
            <span>Portal SIC (sic.gov.co)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <p className="text-bone/60 text-[11px]">Superintendencia de Industria y Comercio.</p>
        </div>
      </div>

      {/* Formulario / Pantalla de Radicación */}
      <section className="mt-8 pt-8 border-t border-white/10 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-display font-bold text-bone">
            Formulario Oficial de Radicación de PQR
          </h2>
          <p className="text-xs sm:text-sm text-bone/70">
            Diligencie el siguiente formulario para generar su comprobante formal de radicación con fecha y hora oficial.
          </p>
        </div>

        {radicado ? (
          /* Pantalla de Confirmación de Radicación */
          <div className="p-6 bg-night-900 border border-accent/40 rounded-xl space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3 text-accent">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              <h3 className="font-display font-bold text-lg text-bone">
                Solicitud Registrada con Éxito
              </h3>
            </div>

            <div className="p-4 bg-black/50 border border-white/15 rounded-lg space-y-2 text-xs font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-white/10">
                <span className="text-bone/50 uppercase tracking-wider text-[10px]">Código de Radicado:</span>
                <span className="font-mono text-sm sm:text-base font-bold text-accent tracking-wider">{radicado}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-bone/50">Fecha y Hora de Radicación:</span>
                <span className="text-bone font-medium">{radicadoTime} (Hora Colombia)</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-bone/50">Titular Solicitante:</span>
                <span className="text-bone font-medium">{formData.nombre}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-bone/50">Tipo de Trámite:</span>
                <span className="text-bone font-medium">{formData.tipoSolicitud}</span>
              </div>
            </div>

            <div className="text-xs text-bone/80 space-y-2">
              <p>
                <strong>Importante para el seguimiento:</strong> Hemos preparado el comprobante de su solicitud con los datos suministrados. Para asegurar la constancia de entrega formal, pulse el botón a continuación para enviar copia directa a nuestro buzón oficial:
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`mailto:${LEGAL_SELLER.contactEmail}?subject=${mailtoSubject}&body=${mailtoBody}`}
                  className="px-4 py-2 bg-accent hover:bg-accent-hover text-white font-sans font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 rounded"
                >
                  <Mail className="w-4 h-4" />
                  <span>Enviar copia por Correo a atencion@lisostore.co</span>
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 text-bone text-xs font-sans font-medium transition-colors rounded"
                >
                  Radicar otra solicitud
                </button>
              </div>
            </div>

            <p className="text-[11px] text-bone/50 pt-2 border-t border-white/10">
              * El término legal máximo para emitir respuesta de fondo a su solicitud es de quince (15) días hábiles conforme al artículo 14 del Código de Procedimiento Administrativo y de lo Contencioso Administrativo (CPACA) y la Ley 1480 de 2011.
            </p>
          </div>
        ) : (
          /* Formulario */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 bg-night-900/80 border border-white/15 rounded-xl space-y-4 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-bone/80 font-semibold block">
                  Nombre Completo <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Tu nombre y apellido"
                  className="w-full px-3 py-2.5 bg-night-950 border border-white/15 focus:border-accent text-bone rounded outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-bone/80 font-semibold block">
                  Número de Documento (C.C. / C.E.)
                </label>
                <input
                  type="text"
                  value={formData.documento}
                  onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                  placeholder="Ej: 1012345678"
                  className="w-full px-3 py-2.5 bg-night-950 border border-white/15 focus:border-accent text-bone rounded outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-bone/80 font-semibold block">
                  Correo Electrónico <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-3 py-2.5 bg-night-950 border border-white/15 focus:border-accent text-bone rounded outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-bone/80 font-semibold block">
                  Teléfono de Contacto
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="Ej: 300 123 4567"
                  className="w-full px-3 py-2.5 bg-night-950 border border-white/15 focus:border-accent text-bone rounded outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-bone/80 font-semibold block">
                  Número de Pedido (si aplica a una compra realizada)
                </label>
                <input
                  type="text"
                  value={formData.numeroPedido}
                  onChange={(e) => setFormData({ ...formData, numeroPedido: e.target.value })}
                  placeholder="Ej: #1042 o fecha aproximada de compra"
                  className="w-full px-3 py-2.5 bg-night-950 border border-white/15 focus:border-accent text-bone rounded outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-bone/80 font-semibold block">
                  Tipo de Solicitud <span className="text-accent">*</span>
                </label>
                <select
                  value={formData.tipoSolicitud}
                  onChange={(e) => setFormData({ ...formData, tipoSolicitud: e.target.value })}
                  className="w-full px-3 py-2.5 bg-night-950 border border-white/15 focus:border-accent text-bone rounded outline-none"
                >
                  <option value="Petición / Consulta General">Petición / Consulta General de Información</option>
                  <option value="Queja por Servicio">Queja por Servicio o Inconformidad</option>
                  <option value="Reclamo por Calidad o Garantía (30 días)">Reclamo por Calidad o Garantía Legal (30 días calendario)</option>
                  <option value="Ejercicio del Derecho de Retracto (5 días)">Ejercicio del Derecho de Retracto (5 días hábiles)</option>
                  <option value="Solicitud de Reversión del Pago (Dec. 587/2016)">Solicitud de Reversión del Pago (Decreto 587 de 2016)</option>
                  <option value="Novedad sobre Envío o Entrega">Novedad o Consulta sobre Envío y Entrega</option>
                  <option value="Consulta sobre Tratamiento de Datos (Hábeas Data)">Consulta sobre Tratamiento de Datos Personales (Hábeas Data)</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-bone/80 font-semibold block">
                  Descripción Detallada de los Hechos <span className="text-accent">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Describa con claridad los hechos de su solicitud, fechas, antecedentes y la solución o petición que formula."
                  className="w-full px-3 py-2.5 bg-night-950 border border-white/15 focus:border-accent text-bone rounded outline-none resize-y"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <p className="text-[11px] text-bone/50">
                Sus datos serán tratados conforme a nuestra <a href="/politica-de-privacidad" target="_blank" className="text-accent underline">Política de Privacidad</a>.
              </p>
              <button
                type="submit"
                className="px-6 py-3 bg-accent hover:bg-accent-hover active:scale-[0.98] text-white font-sans font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 rounded"
              >
                <Send className="w-4 h-4" />
                <span>Generar Radicado y Radicar PQR</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </LegalLayout>
  );
};
