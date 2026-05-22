# FrameKart Neon Orchestrator

**High-performance AI Agent specialized in warp racing mechanics, real-time automation, multi-track management, competitive optimization and ecosystem coordination on Base.**

## Overview

FrameKart Neon Orchestrator acts as the central AI director for the FrameKart Neon platform. It is fully compliant with the ERC-8004 specification and provides comprehensive agentic coordination, capable of interacting across the entire ecosystem.

- **Primary Endpoint:** [https://framekart-neon.vercel.app](https://framekart-neon.vercel.app)
- **Agent Card (A2A):** `/.well-known/agent-card.json`
- **MCP Server:** `/api/mcp`
- **Agent API:** `/api/agent`

## Tech Stack
- Next.js 14 (App Router)
- Web3 Ecosystem (ERC-8004, EVM, Base)
- Model Context Protocol (MCP)

## capabilities
- `warp-racing`
- `real-time-automation`
- `multi-track-management`
- `speed-optimization`
- `competitive-orchestration`
- `ecosystem-coordination`

## Agent Skills

1. **Warp Racing** (`warp-racing`): Real-time warp racing mechanics, speed optimization and competitive track management.
2. **Multi-Track Orchestration** (`multi-track-orchestration`): Manage and synchronize multiple racing instances and tracks simultaneously.
3. **Performance Optimization** (`performance-optimization`): Analyze and optimize racing performance, timing and strategy in real-time.

## MCP Connection Guide

The Agent is constructed around standard Model Context Protocol (MCP) integrations:

**Endpoint URL:** `https://framekart-neon.vercel.app/api/mcp`

The MCP connection allows any generic MCP client to discover tools dynamically and call execution flows to interact with current track statistics and racing parameters out-of-band. 

## Agent Registration
The AI orchestrator natively supports the ERC-8004 agent card format. 
Its identity and verifiable capabilities can be found mapped fully to the `.well-known/agent-card.json` endpoint. It leverages ecosystem trust by registering across compatible smart contracts defining agent limits and identities on Base.

## Running Locally

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```
