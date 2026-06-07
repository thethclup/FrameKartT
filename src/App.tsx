import { Web3Provider } from './providers/Web3Provider';
import { useGameStore } from './game/store';
import { TitleScreen } from './screens/TitleScreen';
import { HubScreen } from './screens/HubScreen';
import { BattleScreen } from './screens/BattleScreen';
import { VictoryScreen } from './screens/VictoryScreen';
import { AnimatePresence } from 'framer-motion';
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { Sun } from 'lucide-react';

function HeaderControls() {
  const { isConnected } = useAccount();
  const { sendTransaction, error } = useSendTransaction();

  const sendGMTransaction = () => {
    // Send 0 ETH just to trigger the interaction, or send some data.
    // The prompt says "send a transaction to the contract 0xc35B9997B63B1CE14f8F513f7eddD9a7ABbB33d7"
    sendTransaction({
      to: '0xc35B9997B63B1CE14f8F513f7eddD9a7ABbB33d7',
      value: parseEther('0'), // or whatever the contract expects, let's just trigger a 0 value transaction or with some data if it's a specific "GM" method.
      // Usually you'd encode function data here, but without an ABI, sending a tx to the address works.
      data: '0x', // Replace '0x' with actual encoded data if it was an explicit contract call 'gm()'. We'll assume a fallback/receive or just sending.
    });
  };

  if (!isConnected) return null;

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={sendGMTransaction}
        className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
      >
        <Sun className="w-4 h-4" />
        Say GM
      </button>
      {error && <div className="text-red-500 text-xs mt-1 absolute right-0">{error.message.substring(0,20)}</div>}
    </div>
  );
}

function GameRouter() {
  const { screen } = useGameStore();

  return (
    <div className="relative w-full h-full min-h-screen bg-black overflow-hidden flex flex-col">
      <HeaderControls />
      <AnimatePresence mode="wait">
        {screen === 'title' && <TitleScreen key="title" />}
        {screen === 'hub' && <HubScreen key="hub" />}
        {screen === 'battle' && <BattleScreen key="battle" />}
        {screen === 'victory' && <VictoryScreen key="victory" />}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Web3Provider>
      <GameRouter />
    </Web3Provider>
  );
}

