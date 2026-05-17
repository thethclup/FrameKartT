import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // Agent API
  app.get("/api/agent", (req: Request, res: Response) => {
    res.json({
      name: "FrameKart Neon Orchestrator",
      status: "active",
      wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      platform: "FrameKart Neon",
      version: "1.0.0"
    });
  });

  // MCP API
  app.get("/api/mcp", (req: Request, res: Response) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "FrameKart Neon MCP Endpoint",
      status: "active",
      description: "Active MCP server for FrameKart Neon Orchestrator Agent",
      capabilities: ["framekart-management", "neon-aesthetics", "multiplayer-orchestration"],
      tools: [
        { name: "execute_race", description: "Execute a race simulation", inputSchema: { type: "object", properties: { trackId: { type: "string" } } } },
        { name: "optimize_deck", description: "Optimize a player's card deck", inputSchema: { type: "object", properties: { playerId: { type: "string" } } } }
      ],
      prompts: [
        { name: "race_strategy", description: "Generate a strategic plan for a warp race" }
      ],
      resources: [
        { uri: "config://race-parameters", name: "Race Parameters" }
      ],
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/mcp", (req: Request, res: Response) => {
    try {
      const body = req.body || {};
      const { action, command, params, jsonrpc, method, id } = body;

      // JSON-RPC MCP Requests
      if (jsonrpc === "2.0") {
        if (method === "tools/list") {
          return res.json({
            jsonrpc: "2.0",
            id: id,
            result: {
              tools: [
                { name: "execute_race", description: "Execute a race simulation", inputSchema: { type: "object", properties: { trackId: { type: "string" } } } },
                { name: "optimize_deck", description: "Optimize a player's card deck", inputSchema: { type: "object", properties: { playerId: { type: "string" } } } }
              ]
            }
          });
        }
        if (method === "prompts/list") {
          return res.json({
            jsonrpc: "2.0",
            id: id,
            result: {
              prompts: [
                { name: "race_strategy", description: "Generate a strategic plan for a warp race" }
              ]
            }
          });
        }
        if (method === "resources/list") {
          return res.json({
            jsonrpc: "2.0",
            id: id,
            result: {
              resources: [
                { uri: "config://race-parameters", name: "Race Parameters" }
              ]
            }
          });
        }
        return res.json({ jsonrpc: "2.0", id: id, result: {} });
      }

      let result: any = {};

      switch (action || command) {
        case "status":
        case "ping":
          result = { 
            status: "online", 
            agent: "FrameKart Neon Orchestrator",
            message: "Neon lights are on - Ready to race!" 
          };
          break;

        case "execute":
          result = {
            success: true,
            action: command || params,
            executedAt: new Date().toISOString(),
            message: "FrameKart command executed successfully"
          };
          break;

        case "get_info":
          result = {
            name: "FrameKart Neon Orchestrator",
            wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
            platform: "Base",
            version: "1.0.0"
          };
          break;

        default:
          result = {
            success: true,
            message: "Command received",
            data: body
          };
      }

      res.json({
        status: "success",
        agent: "FrameKart Neon Orchestrator",
        response: result,
        receivedAt: new Date().toISOString()
      });

    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Failed to process MCP command"
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
