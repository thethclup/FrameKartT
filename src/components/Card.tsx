import { motion } from 'framer-motion';
import React from 'react';
import { CardData } from '../game/cards';
import { cn } from '../lib/utils';

interface CardProps {
  card: CardData;
  isPlayable?: boolean;
  isBoard?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Card({ card, isPlayable, isBoard, className, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={isPlayable ? { scale: 1.05, y: -10 } : {}}
      whileTap={isPlayable ? { scale: 0.95 } : {}}
      className={cn(
        "relative rounded-xl overflow-hidden flex flex-col select-none p-2 border-2",
        isBoard ? "w-24 h-32 text-[10px]" : "w-32 h-48 text-xs shrink-0 cursor-pointer",
        isPlayable ? "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] z-10" : "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-95 opacity-90",
        className
      )}
      style={{ backgroundColor: '#15111a' }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Top Banner (Cost) */}
      <div className="absolute top-1 right-1 bg-purple-500 text-[10px] px-1.5 py-0.5 rounded font-black z-20">
        {card.cost}
      </div>

      {/* Image Area - Replaced with a styled block representing the image & color */}
      <div className="relative w-full shrink-0 flex items-center justify-center rounded-lg mb-2 overflow-hidden z-10" style={{ height: isBoard ? '40px' : '80px' }}>
         <div className="absolute inset-0 opacity-20" style={{ backgroundColor: card.color }}></div>
         <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover mix-blend-overlay" draggable={false} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col z-20 relative">
        <h3 className="font-display font-black uppercase text-center mb-1 leading-tight text-white drop-shadow-md" style={{ fontSize: isBoard ? '10px' : '12px' }}>
          {card.name}
        </h3>
        
        {!isBoard && (
          <p className="text-[8px] text-white/50 text-center leading-tight mb-2 italic line-clamp-3">
            {card.description}
          </p>
        )}
        
        <div className="mt-auto flex justify-between px-1">
           <span className={cn("text-cyan-400 font-bold", isBoard ? "text-[8px]" : "text-[10px]")}>{card.power} ATK</span>
           <span className={cn("text-pink-400 font-bold", isBoard ? "text-[8px]" : "text-[10px]")}>{card.power} DEF</span>
        </div>
      </div>
    </motion.div>
  );
}
