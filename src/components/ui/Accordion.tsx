import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../../types/content';

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isDarkTheme?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onToggle, index, isDarkTheme = true }) => {
  return (
    <div className={`border-b transition-colors ${isDarkTheme ? 'border-night-700' : 'border-graphite/15'}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-4 sm:py-6 text-left flex items-start justify-between gap-3 sm:gap-4 focus:outline-none group cursor-pointer active:bg-white/[0.02]"
        aria-expanded={isOpen}
      >
        <div className="flex items-baseline space-x-2.5 sm:space-x-4">
          <span className={`text-xs font-mono font-semibold ${isDarkTheme ? 'text-bone/40' : 'text-graphite/40'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`text-[15px] sm:text-lg font-medium transition-colors leading-snug ${
            isDarkTheme 
              ? 'text-bone group-hover:text-accent' 
              : 'text-graphite group-hover:text-accent'
          }`}>
            {item.question}
          </span>
        </div>
        <div className={`mt-0.5 flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-200 ${
          isOpen ? 'rotate-180 text-accent' : isDarkTheme ? 'text-bone/50 group-hover:text-bone' : 'text-graphite/50 group-hover:text-graphite'
        }`}>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </button>

      <div 
        className={`grid transition-[grid-template-rows,opacity] duration-250 ease-mech-s ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className={`pb-5 sm:pb-6 pl-6 sm:pl-10 pr-2 sm:pr-4 text-sm sm:text-base leading-relaxed ${isDarkTheme ? 'text-bone/80' : 'text-graphite/80'}`}>
            <p>{item.answer}</p>
            {!item.verified && (
              <div className={`mt-3 inline-flex items-center space-x-2 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono font-medium ${
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
}

export const Accordion: React.FC<AccordionProps> = ({ items, isDarkTheme = true }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default for immediate engagement

  const handleToggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className={`divide-y border-t ${isDarkTheme ? 'divide-night-700 border-night-700' : 'divide-graphite/10 border-graphite/15'}`}>
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
