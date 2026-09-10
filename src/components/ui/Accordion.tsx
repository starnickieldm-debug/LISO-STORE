import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQItem } from '../../types/content';

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isDarkTheme?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onToggle, index, isDarkTheme = false }) => {
  return (
    <div 
      className={`rounded-2xl transition-all duration-200 border ${
        isDarkTheme 
          ? isOpen 
            ? 'bg-night-900 border-white/20 shadow-md' 
            : 'bg-night-900/60 border-white/10 hover:border-white/20'
          : isOpen 
            ? 'bg-white border-graphite/20 shadow-md' 
            : 'bg-white/70 border-graphite/10 hover:bg-white hover:border-graphite/20 shadow-sm'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-none group cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 sm:gap-3.5 flex-1 min-w-0">
          <span className={`text-xs font-sans font-bold shrink-0 ${isDarkTheme ? 'text-accent' : 'text-accent'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`text-[15px] sm:text-base lg:text-[17px] font-semibold transition-colors leading-snug ${
            isDarkTheme 
              ? 'text-bone group-hover:text-accent' 
              : 'text-graphite group-hover:text-accent'
          }`}>
            {item.question}
          </span>
        </div>

        {/* Plus icon that rotates 45deg to an X when open */}
        <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-accent text-white rotate-45 shadow-sm' 
            : isDarkTheme 
              ? 'bg-white/5 text-bone/70 group-hover:bg-white/10 group-hover:text-white' 
              : 'bg-graphite/[0.04] text-graphite/70 group-hover:bg-graphite/10 group-hover:text-graphite'
        }`}>
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </div>
      </button>

      <div 
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-mech-s ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className={`px-4 sm:px-5 pb-5 pt-1 text-sm sm:text-[15px] leading-relaxed border-t ${
            isDarkTheme 
              ? 'text-bone/80 border-white/10' 
              : 'text-graphite/80 border-graphite/10'
          }`}>
            <p>{item.answer}</p>
            {!item.verified && (
              <div className={`mt-3 inline-flex items-center space-x-2 px-2.5 py-1 text-[10px] sm:text-[11px] font-sans font-medium rounded ${
                isDarkTheme 
                  ? 'bg-white/5 border border-white/10 text-bone/70' 
                  : 'bg-graphite/5 border border-graphite/10 text-graphite/70'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>DATO PENDIENTE DE ENSAYO / VALIDACIÓN EN LABORATORIO</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: FAQItem[];
  isDarkTheme?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, isDarkTheme = false, className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const handleToggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id}
          item={item}
          index={idx}
          isOpen={openIndex === idx}
          onToggle={() => handleToggle(idx)}
          isDarkTheme={isDarkTheme}
        />
      ))}
    </div>
  );
};
