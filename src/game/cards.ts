export type CardType = 'Meme' | 'Protocol' | 'Builder' | 'Event';

export interface CardData {
  id: string;
  name: string;
  type: CardType;
  cost: number;
  power: number;
  description: string;
  synergy?: string[]; // Array of tags this card synergizes with
  tags: string[];
  imageUrl: string;
  color: string;
}

export const INITIAL_DECK: CardData[] = [
  {
    id: 'c_gm',
    name: 'GM',
    type: 'Meme',
    cost: 1,
    power: 2,
    description: 'A standard greeting. Gains +1 Power for every other GM played this game.',
    tags: ['greeting', 'early'],
    imageUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=400&h=300',
    color: '#EAB308' // yellow
  },
  {
    id: 'c_based',
    name: 'Stay Based',
    type: 'Protocol',
    cost: 2,
    power: 3,
    description: 'Solid foundation. Reduces cost of next Builder card by 1.',
    tags: ['base', 'foundation'],
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=400&h=300',
    color: '#0052ff' // base blue
  },
  {
    id: 'c_degen',
    name: 'Degen Rush',
    type: 'Builder',
    cost: 3,
    power: 5,
    description: 'High risk, high reward. Deals 1 damage to your own hero.',
    tags: ['risk', 'aggressive'],
    imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&q=80&w=400&h=300',
    color: '#EF4444' // red
  },
  {
    id: 'c_vitalik',
    name: 'Founder Legacy',
    type: 'Builder',
    cost: 5,
    power: 7,
    description: 'Legendary aura. Boosts all Protocol cards in hand by +1 Power.',
    tags: ['legend'],
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20b41cd74312?auto=format&fit=crop&q=80&w=400&h=300',
    color: '#8A63D2' // purple
  },
  {
    id: 'c_rug',
    name: 'Rug Pull',
    type: 'Event',
    cost: 4,
    power: 0,
    description: "Destroy the highest power card on the opponent's board.",
    tags: ['removal', 'toxic'],
    imageUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=400&h=300',
    color: '#10B981' // green
  },
  {
    id: 'c_moon',
    name: 'Moon Mission',
    type: 'Event',
    cost: 6,
    power: 8,
    description: 'Massive surge. Only playable if you have 3 or more cards on board.',
    tags: ['finisher'],
    imageUrl: 'https://images.unsplash.com/photo-1536697246787-1f27132f83c1?auto=format&fit=crop&q=80&w=400&h=300',
    color: '#F8FAFC' // white
  }
];
