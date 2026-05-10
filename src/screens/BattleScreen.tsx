import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Swords } from 'lucide-react';
import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/ui/Button';
import { useGameStore } from '../game/store';

export function BattleScreen() {
  const { 
    playerHealth, playerMaxHealth, playerEnergy, playerMaxEnergy,
    opponentHealth, opponentMaxHealth, opponentEnergy, opponentMaxEnergy,
    hand, board, opponentBoard, turn, isPlayerTurn,
    playCard, endTurn, setScreen
  } = useGameStore();

  return (
    <div className="flex flex-col h-screen bg-[#0a050f] text-white font-sans relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Opponent Area */}
      <div className="h-1/3 border-b border-white/5 flex flex-col justify-between p-4 relative z-10">
         {/* Opponent Profile & Stats */}
         <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                 <span className="text-xl">🤖</span>
               </div>
               <div>
                  <h3 className="font-display font-black italic uppercase tracking-tighter text-white/80 drop-shadow-sm">Rival Agent</h3>
                  <div className="flex gap-2 text-[10px] mt-1 font-bold uppercase tracking-widest">
                    <span className="text-pink-400 flex items-center gap-1"><Shield className="w-3 h-3"/> {opponentHealth}/{opponentMaxHealth}</span>
                    <span className="text-cyan-400 flex items-center gap-1"><Zap className="w-3 h-3"/> {opponentEnergy}/{opponentMaxEnergy}</span>
                  </div>
               </div>
            </div>
            
            {/* Phase Indicator */}
            {!isPlayerTurn && (
              <div className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse border border-pink-500/30">
                OPPONENT TURN
              </div>
            )}
         </div>

         {/* Opponent Board */}
         <div className="flex justify-center gap-2 mt-4 perspective-1000 h-32 relative">
            <AnimatePresence>
              {opponentBoard.map((card, i) => (
                <motion.div
                  key={`op-board-${i}-${card.id}`}
                  initial={{ opacity: 0, y: -20, rotateX: 45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Card card={card} isBoard className="border-red-500/30" />
                </motion.div>
              ))}
            </AnimatePresence>
            {opponentBoard.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-600 border border-dashed border-white/10 rounded-xl opacity-50 text-xs">
                Opponent Board
              </div>
            )}
         </div>
      </div>

      {/* Center Action Line */}
      <div className="absolute top-1/2 left-0 w-full flex items-center justify-center pointer-events-none z-0">
         <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
         <div className="bg-[#0a050f] px-4 py-1 border border-white/10 rounded-full flex items-center gap-2 z-10 text-[10px] text-white/50 font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(255,255,255,0.1)]">
           TURN {turn}
           <Swords className="w-3 h-3 text-cyan-400" />
         </div>
      </div>

      {/* Player Area */}
      <div className="h-2/3 flex flex-col justify-between p-4 relative z-10 pt-8">
        
        {/* Player Board */}
        <div className="flex justify-center gap-2 mb-4 perspective-1000 relative h-32">
            <AnimatePresence>
              {board.map((card, i) => (
                <motion.div
                  key={`pl-board-${i}-${card.id}`}
                  initial={{ opacity: 0, y: 20, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Card card={card} isBoard className="border-[--color-base-blue]/50" />
                </motion.div>
              ))}
            </AnimatePresence>
            {board.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-600 border border-dashed border-white/10 rounded-xl opacity-50 text-xs">
                Drag cards here to play
              </div>
            )}
        </div>

        {/* Player Controls & Stats */}
        <div className="flex justify-between items-end mb-4">
           {/* Player Details */}
           <div className="flex items-center gap-3">
               <div className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-pink-500 p-[2px] rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                 <div className="w-full h-full bg-[#0a050f] rounded-[10px] flex items-center justify-center text-2xl">😎</div>
               </div>
               <div>
                  <h3 className="font-display font-black italic uppercase tracking-tighter text-white text-lg drop-shadow-sm">You</h3>
                  <div className="flex gap-3 text-[10px] mt-1 font-bold uppercase tracking-widest">
                    <span className="text-pink-400 flex items-center gap-1"><Shield className="w-3 h-3"/> {playerHealth}/{playerMaxHealth}</span>
                    <span className="text-cyan-400 flex items-center gap-1 bg-cyan-400/10 px-2 py-0.5 rounded-sm shadow-[0_0_10px_rgba(34,211,238,0.2)]"><Zap className="w-3 h-3"/> {playerEnergy}/{playerMaxEnergy}</span>
                  </div>
               </div>
            </div>

            <button 
              className={`px-6 py-3 font-black uppercase tracking-tighter text-xs rounded-xl transition-all border shadow-lg ${isPlayerTurn ? 'bg-white text-black border-white hover:bg-cyan-400 hover:border-cyan-400 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-transparent text-white/30 border-white/10 opacity-50 cursor-not-allowed'}`}
              disabled={!isPlayerTurn}
              onClick={endTurn}
            >
              END TURN
            </button>
        </div>

        {/* Player Hand */}
        <div className="h-40 bg-black/40 border-t border-white/10 rounded-t-3xl sm:rounded-3xl flex justify-center items-center pb-4 px-4 overflow-visible -mx-4 sm:mx-0">
           <div className="flex gap-[-10px] ml-0 items-end h-full pt-8">
             <AnimatePresence>
               {hand.map((card, i) => (
                  <motion.div
                    key={`pl-hand-${i}-${card.id}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0, marginLeft: i === 0 ? 0 : -20, rotate: (i - hand.length/2)*5 }}
                    exit={{ opacity: 0, y: 50 }}
                    style={{ zIndex: i }}
                  >
                    <Card 
                      card={card} 
                      isPlayable={isPlayerTurn && playerEnergy >= card.cost} 
                      onClick={() => {
                        if (isPlayerTurn && playerEnergy >= card.cost) {
                           if (card.id === 'c_moon' && board.length < 3) {
                             alert("Moon Mission requires at least 3 cards on the board!");
                             return;
                           }
                           if (card.id === 'c_rug' && opponentBoard.length === 0) {
                             alert("No enemy cards to target with Rug Pull!");
                             return;
                           }
                           playCard(card, i);
                        }
                      }}
                    />
                  </motion.div>
               ))}
             </AnimatePresence>
           </div>
        </div>
      </div>
      
      {!isPlayerTurn && (
         <div className="absolute inset-0 z-50 bg-black/10 backdrop-blur-[1px]" />
      )}
    </div>
  );
}
