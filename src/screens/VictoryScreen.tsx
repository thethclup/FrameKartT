import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, UploadCloud } from 'lucide-react';
import { useGameStore } from '../game/store';
import { Button } from '../components/ui/Button';
import { useAccount, useSignMessage } from 'wagmi';

export function VictoryScreen() {
  const { playerHealth, opponentHealth, resetGame } = useGameStore();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  
  const isVictory = opponentHealth <= 0;
  
  const handleRecordOnChain = async () => {
    if (!address) {
      alert("Please connect wallet from Hub to record on-chain!");
      return;
    }
    
    try {
      // Create SIWE-like message for the battle result
      const message = `I verify my Frame Kart match result on Base Mainnet.
User: ${address}
Result: ${isVictory ? 'Victory' : 'Defeat'}
Score: ${playerHealth} HP remaining
Timestamp: ${new Date().toISOString()}
App ID: 691a1313669aee60603bddd3
Builder: bc_606ahbgu`;

      const signature = await signMessageAsync({ account: address, message });
      
      console.log("SIWE Signature generated:", signature);
      alert(`Successfully signed and recorded via Trustless Agent ERC-8004 simulation.\nHash: 0xMOCK...${signature.slice(-4)}`);
      
    } catch (e) {
      console.error(e);
      alert("Failed to record on-chain");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a050f] text-white font-sans p-6 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className={isVictory ? "absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[150px]" : "absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-red-900 rounded-full blur-[150px]"}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 text-center flex flex-col items-center max-w-md w-full bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
      >
        <Trophy className={isVictory ? "w-24 h-24 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] mb-6" : "w-24 h-24 text-white/30 mb-6"} />
        
        <h1 className="font-display text-5xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400 mb-2">
          {isVictory ? 'VICTORY' : 'DEFEAT'}
        </h1>
        <p className="text-white/50 mb-8 font-bold tracking-widest uppercase text-xs">
          Final HP: {playerHealth} vs {opponentHealth}
        </p>

        <div className="flex flex-col gap-4 w-full">
           <button className="w-full h-14 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 border-2 border-white/30 hover:brightness-110 transition-all font-display text-lg font-bold italic text-white uppercase" onClick={handleRecordOnChain}>
             <UploadCloud className="w-5 h-5" />
             Record on-chain
           </button>
           
           <button className="w-full h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors font-bold tracking-widest uppercase text-xs text-white/70" onClick={resetGame}>
             <ArrowLeft className="w-5 h-5" />
             Return to Hub
           </button>
        </div>
      </motion.div>
    </div>
  );
}
