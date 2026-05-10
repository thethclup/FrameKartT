import { Web3Provider } from './providers/Web3Provider';
import { useGameStore } from './game/store';
import { TitleScreen } from './screens/TitleScreen';
import { HubScreen } from './screens/HubScreen';
import { BattleScreen } from './screens/BattleScreen';
import { VictoryScreen } from './screens/VictoryScreen';
import { AnimatePresence } from 'framer-motion';

function GameRouter() {
  const { screen } = useGameStore();

  return (
    <AnimatePresence mode="wait">
      {screen === 'title' && <TitleScreen key="title" />}
      {screen === 'hub' && <HubScreen key="hub" />}
      {screen === 'battle' && <BattleScreen key="battle" />}
      {screen === 'victory' && <VictoryScreen key="victory" />}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Web3Provider>
      <GameRouter />
    </Web3Provider>
  );
}

