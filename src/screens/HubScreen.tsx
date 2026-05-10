import { motion } from 'framer-motion';
import { Gamepad2, LayoutDashboard, Trophy, MessageSquare } from 'lucide-react';
import { useGameStore } from '../game/store';
import { Button } from '../components/ui/Button';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function HubScreen() {
  const { startGame, setScreen } = useGameStore();
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleSayGM = async () => {
    // Mock GM Transaction
    alert("On-chain action: GM Submitted to Base Mainnet! (Simulation)");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a050f] text-white font-sans overflow-hidden p-6 relative">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center mb-8 z-10 border-b border-white/10 backdrop-blur-md bg-black/40 -mx-6 px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-[#0a050f] flex items-center justify-center text-xs font-bold">FK</div>
          </div>
          <h2 className="text-xl font-black tracking-tighter italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
            Frame Kart
          </h2>
        </div>
        
        <div className="flex gap-2 items-center">
          {isConnected ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-[10px] uppercase text-purple-400 font-bold tracking-widest">Player</span>
                <span className="text-xs font-bold text-white mt-1">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
              <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
              <button className="px-4 py-1.5 bg-white/5 border border-white/10 font-bold tracking-widest uppercase text-white hover:bg-white/10 transition-colors text-xs rounded-full" onClick={() => disconnect()}>Disconnect</button>
            </div>
          ) : (
             <button className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-cyan-400 transition-colors uppercase tracking-widest" onClick={() => connect({ connector: connectors[0] })}>
               Connect Wallet
             </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 max-w-md mx-auto w-full z-10 mt-8">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <button className="w-full h-24 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.5)] flex items-center px-6 gap-4 border-2 border-white/30 hover:brightness-110 transition-all font-display text-2xl font-bold italic text-white uppercase" onClick={startGame}>
            <Gamepad2 className="w-8 h-8 opacity-80" />
            <div className="flex flex-col items-start px-2 font-sans not-italic text-left">
              <span className="tracking-tighter uppercase font-black text-xl">Find Match</span>
              <span className="text-[10px] text-white/70 font-bold tracking-widest uppercase hidden sm:block">Battle in the arena</span>
            </div>
          </button>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <button className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors" onClick={() => alert("Deck builder coming soon!")}>
              <LayoutDashboard className="w-6 h-6 text-purple-400" />
              <span className="text-xs font-black uppercase tracking-widest text-white/40">My Deck</span>
            </button>
          </motion.div>
          
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <button className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors" onClick={() => alert("Leaderboard coming soon!")}>
              <Trophy className="w-6 h-6 text-cyan-400" />
              <span className="text-xs font-black uppercase tracking-widest text-white/40">Leaderboard</span>
            </button>
          </motion.div>
        </div>
        
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4">
           <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/20 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_15px_rgba(168,85,247,0.1)]">
             <div className="flex items-center gap-3">
               <div className="bg-gradient-to-tr from-purple-600 to-pink-500 p-2 rounded-xl">
                 <MessageSquare className="w-5 h-5 text-white" />
               </div>
               <div>
                  <h4 className="text-[10px] font-bold text-purple-300 uppercase tracking-widest mb-1">Daily GM</h4>
                  <p className="text-[11px] leading-relaxed text-white/70">Claim on-chain rewards.</p>
               </div>
             </div>
             <button className="px-4 py-2 border border-white/20 rounded-lg text-[10px] bg-white/5 font-black uppercase tracking-tighter hover:bg-white/10 transition-colors" onClick={handleSayGM}>Say GM</button>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
