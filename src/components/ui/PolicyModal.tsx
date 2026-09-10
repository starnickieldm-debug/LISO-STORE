import React, { useEffect, useRef } from 'react';
import { X, Truck, RotateCcw, Shield, FileText, Lock } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';

export type PolicyTab = 'shipping' | 'returns' | 'warranty' | 'terms' | 'privacy';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: PolicyTab;
  onTabChange: (tab: PolicyTab) => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
}) => {
  const { currentMarket } = useMarket();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs: { id: PolicyTab; label: string; icon: React.ReactNode }[] = [
    { id: 'shipping', label: 'Envíos', icon: <Truck className="w-4 h-4" /> },
    { id: 'returns', label: 'Devoluciones y reembolsos', icon: <RotateCcw className="w-4 h-4" /> },
    { id: 'warranty', label: 'Garantía', icon: <Shield className="w-4 h-4" /> },
    { id: 'terms', label: 'Términos y condiciones', icon: <FileText className="w-4 h-4" /> },
    { id: 'privacy', label: 'Política de privacidad', icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[85vh] bg-night-900 border border-white/15 shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
        style={{ backgroundColor: '#121318' }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-night-950/60">
          <div className="flex items-center gap-2">
            <span className="text-base font-display font-bold text-bone" id="policy-modal-title">
              Información y Políticas
            </span>
            <span className="text-xs font-sans text-bone/60 border border-white/15 px-1.5 py-0.5">
              {currentMarket.flag} {currentMarket.countryName}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-bone/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Scrollable on small devices) */}
        <div className="flex border-b border-white/10 overflow-x-auto horizontal-scroll-touch bg-white/[0.02]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-sans font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-accent text-white bg-white/5'
                    : 'border-transparent text-bone/60 hover:text-bone hover:bg-white/[0.02]'
                }`}
              >
                <span className={isActive ? 'text-accent' : 'text-bone/50'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-bone/80 font-sans leading-relaxed">
          {activeTab === 'shipping' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-base font-display font-semibold text-bone">
                Política de Envíos
              </h3>
              <p>
                El tiempo estimado de entrega informado actualmente por la operación logística es de 15 a 20 días hábiles. Realizamos despachos a nivel nacional a toda Colombia a través de empresas transportadoras reconocidas.
              </p>
              <p className="text-bone/70">
                Una vez despachado el paquete, recibirás vía correo electrónico tu número de guía y el enlace para realizar seguimiento en línea de tu entrega.
              </p>
              <div className="p-3 bg-white/5 border border-white/10 text-xs text-bone/70 space-y-1">
                <p className="font-semibold text-bone">Cobertura: Colombia (Nivel Nacional)</p>
                <p>Tu orden incluye {currentMarket.shippingLabel} y seguimiento en línea continuo hasta tu puerta.</p>
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-base font-display font-semibold text-bone">
                Política de Devoluciones y Reembolsos
              </h3>
              <p>
                Queremos que tengas la mejor experiencia con LISO. Conforme a la legislación colombiana (Ley 1480 de 2011), cuentas con derecho de retracto dentro de los primeros 5 días hábiles posteriores a la entrega.
              </p>
              <p>
                Para iniciar cualquier solicitud, contáctanos a través de nuestro correo oficial antes de enviar el producto para asignarte un caso y darte las instrucciones detalladas del proceso.
              </p>
              <div className="p-3 bg-white/5 border border-white/10 text-xs text-bone/70">
                <p className="font-semibold text-bone mb-1">Canal de atención</p>
                <p>
                  Escríbenos a atencion@lisostore.co con tu número de pedido y los datos de tu compra para recibir asistencia rápida y personalizada.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-base font-display font-semibold text-bone">
                Garantía y Asistencia
              </h3>
              <div className="space-y-2">
                <h4 className="font-semibold text-bone">Garantía Legal de 3 Meses</h4>
                <p>
                  El producto cuenta con una garantía legal de tres (3) meses a partir de su entrega física, que cubre fallas de fabricación, calidad e idoneidad a 110 V.
                </p>
                <p>
                  Si recibes un producto defectuoso, con daños de transporte o diferente al solicitado, contáctanos a atencion@lisostore.co con tu número de pedido y fotografías o un video que muestre la situación.
                </p>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 text-xs text-bone/70">
                <p>
                  La atención y soporte de garantías se gestiona de forma directa y los fletes correspondientes a la garantía son cubiertos por LISO.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-base font-display font-semibold text-bone">
                Términos y Condiciones del Servicio
              </h3>
              <p>
                Al realizar una orden a través de este sitio, aceptas las condiciones comerciales, los precios vigentes en pesos colombianos (COP) y los términos de servicio aquí descritos.
              </p>
              <p>
                Las especificaciones técnicas y operativas corresponden a las fichas técnicas de fábrica. Las órdenes son procesadas conforme a la disponibilidad del producto para el territorio nacional.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-base font-display font-semibold text-bone">
                Política de Privacidad y Protección de Datos
              </h3>
              <p>
                Tus datos personales y de contacto se utilizan exclusivamente para procesar tus órdenes, coordinar la entrega y brindarte soporte postventa.
              </p>
              <p>
                No comercializamos tus datos con terceros. Todas las transacciones de pago son procesadas a través de pasarelas de pago seguras y encriptadas.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-night-950/60 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-sans font-semibold text-bone/80 hover:text-white bg-white/10 hover:bg-white/15 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
