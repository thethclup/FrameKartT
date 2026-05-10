import { create } from 'zustand';
import { CardData, INITIAL_DECK } from './cards';

type GameScreen = 'title' | 'hub' | 'battle' | 'deck' | 'victory';

interface GameState {
  screen: GameScreen;
  setScreen: (screen: GameScreen) => void;
  
  // Player Stats
  playerHealth: number;
  playerMaxHealth: number;
  playerEnergy: number;
  playerMaxEnergy: number;
  
  // Opponent Stats
  opponentHealth: number;
  opponentMaxHealth: number;
  opponentEnergy: number;
  opponentMaxEnergy: number;
  
  // Decks & Hands
  deck: CardData[];
  hand: CardData[];
  board: CardData[];
  
  opponentBoard: CardData[];
  
  // Game Flow
  turn: number;
  isPlayerTurn: boolean;
  
  // Actions
  startGame: () => void;
  drawCard: () => void;
  playCard: (card: CardData, index: number) => void;
  endTurn: () => void;
  simulateOpponentTurn: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'title',
  setScreen: (screen) => set({ screen }),
  
  playerHealth: 20,
  playerMaxHealth: 20,
  playerEnergy: 1,
  playerMaxEnergy: 1,
  
  opponentHealth: 20,
  opponentMaxHealth: 20,
  opponentEnergy: 1,
  opponentMaxEnergy: 1,
  
  deck: [...INITIAL_DECK, ...INITIAL_DECK], // Double the initial cards
  hand: [],
  board: [],
  opponentBoard: [],
  
  turn: 1,
  isPlayerTurn: true,
  
  startGame: () => {
    // Shuffle deck
    const shuffled = [...INITIAL_DECK, ...INITIAL_DECK, ...INITIAL_DECK].sort(() => Math.random() - 0.5);
    const initialHand = shuffled.splice(0, 4);
    
    set({
      screen: 'battle',
      playerHealth: 20,
      playerEnergy: 1,
      playerMaxEnergy: 1,
      opponentHealth: 20,
      opponentEnergy: 1,
      opponentMaxEnergy: 1,
      deck: shuffled,
      hand: initialHand,
      board: [],
      opponentBoard: [],
      turn: 1,
      isPlayerTurn: true,
    });
  },
  
  drawCard: () => {
    const { deck, hand } = get();
    if (deck.length > 0 && hand.length < 6) {
      const newDeck = [...deck];
      const card = newDeck.pop()!;
      set({ deck: newDeck, hand: [...hand, card] });
    }
  },
  
  playCard: (card, index) => {
    const { playerEnergy, hand, board, opponentBoard, opponentHealth } = get();
    
    if (playerEnergy >= card.cost && board.length < 5) {
      const newHand = [...hand];
      newHand.splice(index, 1);
      
      // Handle Event cards immediately vs Board cards
      if (card.type === 'Event') {
        if (card.id === 'c_rug' && opponentBoard.length > 0) {
          const sortedOp = [...opponentBoard].sort((a,b) => b.power - a.power);
          const highest = sortedOp[0];
          
          let newOpBoard = [...opponentBoard];
          const indexToRemove = newOpBoard.findIndex(c => c === highest);
          if (indexToRemove !== -1) newOpBoard.splice(indexToRemove, 1);
          
          set({
             hand: newHand,
             playerEnergy: playerEnergy - card.cost,
             opponentBoard: newOpBoard
          });
        } else if (card.id === 'c_moon' && board.length >= 3) {
           set({
             hand: newHand,
             playerEnergy: playerEnergy - card.cost,
             opponentHealth: Math.max(0, opponentHealth - card.power)
           });
        } else if (card.id !== 'c_moon') {
          // Play generic event (just consume it)
           set({
             hand: newHand,
             playerEnergy: playerEnergy - card.cost
           });
        }
      } else {
        // Place on board
        set({
          hand: newHand,
          board: [...board, card],
          playerEnergy: playerEnergy - card.cost
        });
      }
      
      // Check win condition
      if (get().opponentHealth <= 0) {
        set({ screen: 'victory' });
      }
    }
  },
  
  endTurn: () => {
    // Attack phase! Player board attacks opponent directly for simplicity
    const { board, opponentHealth } = get();
    const totalDamage = board.reduce((sum, card) => sum + card.power, 0);
    
    set({
      isPlayerTurn: false,
      opponentHealth: Math.max(0, opponentHealth - totalDamage)
    });
    
    if (get().opponentHealth <= 0) {
      set({ screen: 'victory' });
      return;
    }
    
    // Trigger opponent logic
    setTimeout(() => {
      get().simulateOpponentTurn();
    }, 1000);
  },
  
  simulateOpponentTurn: () => {
    const { opponentMaxEnergy, turn, opponentBoard, playerHealth } = get();
    
    const nextMaxOpEnergy = Math.min(10, opponentMaxEnergy + 1);
    
    // Super basic AI: play a random card from "invisible" hand if enough energy
    let newOpBoard = [...opponentBoard];
    if (newOpBoard.length < 5 && Math.random() > 0.3) {
       const randomCard = INITIAL_DECK[Math.floor(Math.random() * INITIAL_DECK.length)];
       if (randomCard.type !== 'Event' && nextMaxOpEnergy >= randomCard.cost) {
         newOpBoard.push(randomCard);
       }
    }
    
    const opDamage = newOpBoard.reduce((sum, card) => sum + card.power, 0);
    
    set({
       opponentBoard: newOpBoard,
       opponentMaxEnergy: nextMaxOpEnergy,
       opponentEnergy: nextMaxOpEnergy,
       playerHealth: Math.max(0, playerHealth - opDamage)
    });
    
    if (get().playerHealth <= 0) {
       // Lose condition. Let's just go to hub for now.
       alert("You lost!");
       get().resetGame();
       return;
    }
    
    // Start Player Turn
    const { playerMaxEnergy } = get();
    const nextMaxEnergy = Math.min(10, playerMaxEnergy + 1);
    
    set({
      isPlayerTurn: true,
      turn: turn + 1,
      playerMaxEnergy: nextMaxEnergy,
      playerEnergy: nextMaxEnergy
    });
    
    get().drawCard();
  },
  
  resetGame: () => {
    set({ screen: 'hub' });
  }
}));
