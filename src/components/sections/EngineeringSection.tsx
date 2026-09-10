import React, { useState } from 'react';
import { productSpecs } from '../../config/siteContent';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { 
  Zap, 
  Thermometer, 
  Gauge, 
  RotateCw, 
  ShieldCheck, 
  Cable, 
  Sparkles 
} from 'lucide-react';
import { RotatingGuaranteeStamp } from '../ui/RotatingGuaranteeStamp';

interface SystemBullet {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface SystemComponent {
  name: string;
  img: string;
}

interface SystemData {
  tag: string;
  title: string;
  subtitle: string;
  bullets: SystemBullet[];
  components: SystemComponent[];
}

export const EngineeringSection: React.FC = () => {
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  const prefersReduced = useReducedMotion();
  const [plateAngle, setPlateAngle] = useState<0 | 45 | 90>(0);

  const thermalSystem: SystemData = {
    tag: "01 · POTENCIA Y VAPOR",
    title: "Sistema Térmico y Vapor",
    subtitle: "Calor constante y vapor presurizado en pocos segundos.",
    bullets: [
      {
        icon: <Zap className="w-4 h-4 text-accent stroke-[2.2]" />,
        title: "Alimentación Directa 1200 W",
        description: "Potencia constante por cable directo. Cero caídas de temperatura ni baterías que se degraden con el tiempo."
      },
      {
        icon: <Thermometer className="w-4 h-4 text-accent stroke-[2.2]" />,
        title: "Pantalla Digital LED a 150 °C",
        description: "Lectura térmica real en vivo. Ves la temperatura subir al instante sin adivinar si ya está lista."
      },
      {
        icon: <Gauge className="w-4 h-4 text-accent stroke-[2.2]" />,
        title: "Cámara Térmica de Aluminio Inyectado",
        description: "El metal reparte el calor parejo por toda la placa y emite vapor uniforme antes de colgar la prenda."
      }
    ],
    components: [
      { name: "Cámara de aluminio", img: "/images/liso-main.webp" },
      { name: "Pantalla LED 150 °C", img: "/images/liso-pantalla.webp" },
      { name: "Depósito 100 ml", img: "/images/paso-01-llenar.webp" },
      { name: "Cable 1200 W", img: "/images/liso-cable.webp" }
    ]
  };

  const ergonomicSystem: SystemData = {
    tag: "02 · ERGONOMÍA Y MECÁNICA",
    title: "Sistema Ergonómico y Mecánica",
    subtitle: "Doble eje giratorio para planchar en cualquier ángulo sin fatiga.",
    bullets: [
      {
        icon: <RotateCw className="w-4 h-4 text-accent stroke-[2.2]" />,
        title: "Placa Giratoria 90°",
        description: "Gira con un solo clic. Plancha vertical en el gancho, horizontal sobre mesa o entra con precisión entre botones."
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-accent stroke-[2.2]" />,
        title: "Carcasa Bicapa Termoaislante",
        description: "150 °C concentrados en la placa cerámica mientras el mango contorneado permanece frío y seguro al tacto."
      },
      {
        icon: <Cable className="w-4 h-4 text-accent stroke-[2.2]" />,
        title: "Clavija Estándar + 110–240 V",
        description: "Clavija plana estándar (110 V) de agarre firme para tomas en Colombia y rango multivoltaje para viajes."
      }
    ],
    components: [
      { name: "Placa giratoria 90°", img: "/images/liso-placa-90.webp" },
      { name: "Mango bicapa", img: "/images/liso-mango.webp" },
      { name: "Base dock térmica", img: "/images/escena-05-dock.webp" },
      { name: "Clavija estándar 110 V", img: "/images/liso-plug-us.webp" }
    ]
  };

  const angleDetails = {
    0: {
      label: "0° VERTICAL",
      desc: "Planchado vertical directo en el gancho",
      img: "/images/liso-placa-0.webp"
    },
    45: {
      label: "45° CUELLOS",
      desc: "Sisas, esquinas, pliegues y hombros",
      img: "/images/liso-placa-45.webp"
    },
    90: {
      label: "90° PLANO",
      desc: "Planchado horizontal en cama o mesa y entre botones",
      img: "/images/liso-placa-90.webp"
    }
  };

  return (
    <section 
      id="ingenieria" 
      ref={sectionRef}
      className="py-20 sm:py-28 bg-night-950 text-bone border-b border-white/10 relative overflow-hidden technical-grid scroll-mt-16 sm:scroll-mt-20 select-none"
      style={{ backgroundColor: '#0B0C0F' }}
    >
      {/* Subtle warm ambient lighting in top-left */}
      <div 
        className="pointer-events-none absolute -top-32 -left-32 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_top_left,rgba(255,195,130,0.06)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true" 
      />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* =========================================================================
            HEADER: Centered Title + Subtitle + Floating Top-Right Rotating Seal
            ========================================================================= */}
        <div className="relative mb-12 sm:mb-16 lg:mb-20 text-center max-w-3xl mx-auto">
          {/* Overline */}
          <div className="inline-flex items-center gap-2 mb-3 font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            <span>[04]</span>
            <span>ARQUITECTURA TÉCNICA</span>
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] text-bone leading-[1.2]">
            Ingeniería <span className="italic font-normal">visible.</span>
          </h2>
          
          {/* Subtitle */}
          <p className="mt-3.5 sm:mt-4 text-base sm:text-lg font-sans font-normal leading-relaxed text-bone/75 max-w-2xl mx-auto">
            Disección técnica del dispositivo. Cada componente responde a una función real de planchado sin adornos superfluos.
          </p>

          {/* Floating Rotating Seal (Top-Right of the section like Liquid+ 13 Fruits + Veggies) */}
          <div className="hidden xl:block absolute -top-2 -right-64 2xl:-right-80 pointer-events-none">
            <RotatingGuaranteeStamp 
              size={110}
              circularText="★ 1200 W POTENCIA ★ 150 °C CONTROL ★ CERO TABLA ★"
              centerText="LISO"
              textColor="text-bone"
              customIcon={<Sparkles className="w-4 h-4 text-accent stroke-[2.2]" />}
            />
          </div>
        </div>

        {/* =========================================================================
            MAIN 3-PART HERO STAGE: [ Left System Card ] [ Central Product ] [ Right System Card ]
            ========================================================================= */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-stretch"
          style={prefersReduced ? undefined : {
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.98)',
            transition: 'opacity 650ms cubic-bezier(0.16, 1, 0.3, 1), transform 650ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          
          {/* 1. LEFT CARD: SISTEMA TÉRMICO Y VAPOR */}
          <div className="lg:col-span-4 bg-night-900/85 border border-white/12 rounded-3xl p-6 sm:p-7 xl:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-md hover:border-white/20 transition-all duration-300">
            <div>
              {/* Header */}
              <div className="pb-4 mb-5 border-b border-white/10">
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-accent font-bold block mb-1">
                  {thermalSystem.tag}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-bone tracking-tight">
                  {thermalSystem.title}
                </h3>
                <p className="text-xs sm:text-sm text-bone/60 font-normal mt-1 leading-relaxed">
                  {thermalSystem.subtitle}
                </p>
              </div>

              {/* 3 Benefit Bullets with Circular Outline Icons */}
              <div className="space-y-4 sm:space-y-5">
                {thermalSystem.bullets.map((b) => (
                  <div key={b.title} className="flex items-start gap-3.5 group">
                    <div className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                      {b.icon}
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="font-sans text-sm sm:text-[15px] font-bold text-bone tracking-tight leading-snug">
                        {b.title}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-bone/70 leading-relaxed font-normal">
                        {b.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subcomponents Row (Liquid+ Ingredients Formula) */}
            <div className="mt-8 pt-5 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-bone/50 font-bold block mb-3">
                COMPONENTES DEL SISTEMA:
              </span>
              <div className="grid grid-cols-2 gap-3">
                {thermalSystem.components.map((comp) => (
                  <div key={comp.name} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/25 bg-night-950 shrink-0 shadow-sm">
                      <img src={comp.img} alt={comp.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <span className="text-xs font-sans text-bone/85 font-medium leading-tight">
                      {comp.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. CENTER: HERO PRODUCT WITH STEAM AURA & INTERACTIVE ANGLE VISOR */}
          <div className="lg:col-span-4 flex flex-col items-center justify-between relative py-4 lg:py-0">
            {/* Background Steam / Vapor Aura (Radial glow mimicking Liquid+ fluid splash) */}
            <div 
              className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              {/* Warm core steam glow */}
              <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-[radial-gradient(circle,rgba(180,36,124,0.24)_0%,rgba(255,195,130,0.12)_38%,transparent_70%)] blur-2xl animate-pulse" />
              {/* Outer dashed compass ring */}
              <div className="absolute w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full border border-dashed border-white/15" />
            </div>

            {/* Top Floating Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-night-900/90 border border-white/15 shadow-lg backdrop-blur-md mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-bone font-semibold">
                1200 W · VAPOR CONTINUO · 150 °C
              </span>
            </div>

            {/* Central Product Cutout Image */}
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] flex items-center justify-center my-2">
              <img 
                src="/images/liso-clean-cutout.webp" 
                alt="Plancha de vapor portátil LISO en perspectiva técnica"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] select-none pointer-events-none"
              />
            </div>

            {/* Interactive Angle Selector Stage */}
            <div className="w-full max-w-[340px] bg-night-900/90 border border-white/15 rounded-2xl p-3 shadow-xl backdrop-blur-md flex flex-col items-center mt-2">
              <div className="flex items-center justify-between w-full pb-2 mb-2 border-b border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-bone/50 font-bold">
                  PLACA GIRATORIA 90°
                </span>
                <span className="text-[10px] font-mono text-accent font-bold">
                  {angleDetails[plateAngle].label}
                </span>
              </div>

              {/* 3-Angle Pills Toggle */}
              <div className="flex items-center justify-between gap-1.5 w-full">
                {([0, 45, 90] as const).map((angle) => {
                  const isActive = plateAngle === angle;
                  return (
                    <button
                      key={angle}
                      type="button"
                      onClick={() => setPlateAngle(angle)}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-[11px] font-bold tracking-wider transition-all active:scale-95 ${
                        isActive 
                          ? 'bg-accent text-white shadow-sm' 
                          : 'bg-white/[0.04] text-bone/60 hover:text-bone hover:bg-white/[0.08]'
                      }`}
                    >
                      {angle}°
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Angle Description */}
              <p className="text-[11px] font-sans text-bone/70 text-center mt-2 font-medium">
                {angleDetails[plateAngle].desc}
              </p>
            </div>
          </div>

          {/* 3. RIGHT CARD: SISTEMA ERGONÓMICO Y MECÁNICA */}
          <div className="lg:col-span-4 bg-night-900/85 border border-white/12 rounded-3xl p-6 sm:p-7 xl:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-md hover:border-white/20 transition-all duration-300">
            <div>
              {/* Header */}
              <div className="pb-4 mb-5 border-b border-white/10">
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-accent font-bold block mb-1">
                  {ergonomicSystem.tag}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-bone tracking-tight">
                  {ergonomicSystem.title}
                </h3>
                <p className="text-xs sm:text-sm text-bone/60 font-normal mt-1 leading-relaxed">
                  {ergonomicSystem.subtitle}
                </p>
              </div>

              {/* 3 Benefit Bullets with Circular Outline Icons */}
              <div className="space-y-4 sm:space-y-5">
                {ergonomicSystem.bullets.map((b) => (
                  <div key={b.title} className="flex items-start gap-3.5 group">
                    <div className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                      {b.icon}
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="font-sans text-sm sm:text-[15px] font-bold text-bone tracking-tight leading-snug">
                        {b.title}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-bone/70 leading-relaxed font-normal">
                        {b.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subcomponents Row (Liquid+ Ingredients Formula) */}
            <div className="mt-8 pt-5 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-bone/50 font-bold block mb-3">
                COMPONENTES DEL SISTEMA:
              </span>
              <div className="grid grid-cols-2 gap-3">
                {ergonomicSystem.components.map((comp) => (
                  <div key={comp.name} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/25 bg-night-950 shrink-0 shadow-sm">
                      <img src={comp.img} alt={comp.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <span className="text-xs font-sans text-bone/85 font-medium leading-tight">
                      {comp.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM SPECS STRIP (4 Key Parameters)
            ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 sm:mt-16 text-xs font-sans">
          <div className="p-4 bg-night-900/90 border border-white/12 rounded-xl">
            <span className="text-bone/50 block uppercase text-[10px] font-mono font-semibold tracking-wider">Potencia Sostenida</span>
            <span className="text-lg font-bold text-bone mt-1 block font-sans">{productSpecs.power}</span>
          </div>
          <div className="p-4 bg-night-900/90 border border-white/12 rounded-xl">
            <span className="text-bone/50 block uppercase text-[10px] font-mono font-semibold tracking-wider">Temperatura Máxima</span>
            <span className="text-lg font-bold text-bone mt-1 block font-sans">{productSpecs.maxTemperature}</span>
          </div>
          <div className="p-4 bg-night-900/90 border border-white/12 rounded-xl">
            <span className="text-bone/50 block uppercase text-[10px] font-mono font-semibold tracking-wider">Depósito Calibrado</span>
            <span className="text-lg font-bold text-bone mt-1 block font-sans">{productSpecs.tankCapacity} (~5 min)</span>
          </div>
          <div className="p-4 bg-night-900/90 border border-white/12 rounded-xl">
            <span className="text-bone/50 block uppercase text-[10px] font-mono font-semibold tracking-wider">Cámara Térmica</span>
            <span className="text-lg font-bold text-bone mt-1 block font-sans">{productSpecs.innerTankMaterial}</span>
          </div>
        </div>

        {/* =========================================================================
            FOOTNOTE & HONESTY LABEL LINK
            ========================================================================= */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left border-t border-white/10">
          <p className="text-[11px] font-sans text-bone/45 italic">
            *Especificaciones técnicas y tiempos de calentamiento verificados según pruebas de laboratorio del fabricante.
          </p>

          <a
            href="#etiqueta"
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-accent hover:text-white pb-0.5 transition-colors"
          >
            <span>Ver qué hace y qué NO hace en la Etiqueta de Honestidad ↓</span>
          </a>
        </div>

      </div>
    </section>
  );
};
