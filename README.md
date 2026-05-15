# Frame Kart Neon

A fast, strategic, and fun digital collectible card game set in the Farcaster universe, running on Base Mainnet.

## Game Concept
Frame Kart is a digital collectible card game where players build decks from Frame Cards (representing memes, protocols, personalities, and on-chain moments) and battle to become the ultimate Frame Champion.

### Core Mechanics
- Classic collectible card battle mechanics optimized for mobile touch screens
- Build custom decks
- Real-time or fast turn-based battles
- Unique abilities and Farcaster-themed synergies ("gm", "Based", "Degen")
- Energy system for playing cards
- **Base Network**: Complete on-chain SIWE result recording and Transaction Attribution via ERC-8021 and Trustless Agent integration via ERC-8004.

## AI Agent / Orchestrator
We utilize the **FrameKart Neon Orchestrator**, an ERC-8004 compatible AI Agent. It leverages the Model Context Protocol (MCP) to perform dynamic game automation, orchestration, and advanced state management.
Find and interact with our agent at:
- `/.well-known/agent-card.json`
- `/api/mcp`
- `/api/agent`

## Sensitive Information
* **Environment Variables:** All keys, secrets, and environment-specific endpoints should be defined in your `.env` file instead. Use `.env.example` as a template.
* **Never commit API keys or private wallet keys** to the repository!
* **Wallet**: The agent utilizes `0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6`.

## Development

```bash
# Install dependencies
npm install

# Start the full-stack dev server
npm run dev

# Build for production
npm run build
```
