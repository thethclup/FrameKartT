import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { useGameStore } from '../game/store';
import { Button } from '../components/ui/Button';

export function TitleScreen() {
  const { setScreen } = useGameStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a050f] p-6 relative overflow-hidden text-white font-sans">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Layers className="w-12 h-12 text-cyan-400" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-black italic uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400 drop-shadow-sm mb-4">
          FRAME KART
        </h1>
        <p className="text-white/50 max-w-md mx-auto text-sm md:text-base font-bold uppercase tracking-widest">
          The Farcaster Trading Card Game
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="z-10 flex flex-col gap-4 w-full max-w-xs"
      >
        <Button size="lg" onClick={() => setScreen('hub')}>
          ENTER ARENA
        </Button>
      </motion.div>
      
      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-slate-600 font-mono">
        BASE MAINNET READY | SIWE ENABLED
      </div>
    </div>
  );
}
