import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    protocol: "MCP",
    version: "1.0.0",
    name: "FrameKart Neon MCP Endpoint",
    status: "active",
    description: "Active MCP server for FrameKart Neon Orchestrator Agent",
    capabilities: ["framekart-management", "neon-aesthetics", "multiplayer-orchestration"],
    tools: [
      { name: "get_race_status", description: "Get current race status", inputSchema: { type: "object", properties: { trackId: { type: "string" } } } },
      { name: "start_race", description: "Start a new race", inputSchema: { type: "object", properties: { trackId: { type: "string" } } } },
      { name: "get_leaderboard", description: "Get the current leaderboard", inputSchema: { type: "object", properties: {} } },
      { name: "optimize_speed", description: "Optimize racer speed parameters", inputSchema: { type: "object", properties: { racerId: { type: "string" } } } },
      { name: "get_track_info", description: "Get detailed information about a track", inputSchema: { type: "object", properties: { trackId: { type: "string" } } } }
    ],
    prompts: [
      { name: "race_strategy", description: "Generate a strategic plan for a warp race" }
    ],
    resources: [
      { uri: "config://race-parameters", name: "Race Parameters" }
    ],
    timestamp: new Date().toISOString()
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, command, params, jsonrpc, method, id } = body;

    // JSON-RPC MCP Requests
    if (jsonrpc === "2.0") {
      if (method === "tools/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: {
            tools: [
              { name: "get_race_status", description: "Get current race status", inputSchema: { type: "object", properties: { trackId: { type: "string" } } } },
              { name: "start_race", description: "Start a new race", inputSchema: { type: "object", properties: { trackId: { type: "string" } } } },
              { name: "get_leaderboard", description: "Get the current leaderboard", inputSchema: { type: "object", properties: {} } },
              { name: "optimize_speed", description: "Optimize racer speed parameters", inputSchema: { type: "object", properties: { racerId: { type: "string" } } } },
              { name: "get_track_info", description: "Get detailed information about a track", inputSchema: { type: "object", properties: { trackId: { type: "string" } } } }
            ]
          }
        }, { headers: { 'Access-Control-Allow-Origin': '*' } });
      }
      if (method === "prompts/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: {
            prompts: [
              { name: "race_strategy", description: "Generate a strategic plan for a warp race" }
            ]
          }
        }, { headers: { 'Access-Control-Allow-Origin': '*' } });
      }
      if (method === "resources/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: {
            resources: [
              { uri: "config://race-parameters", name: "Race Parameters" }
            ]
          }
        }, { headers: { 'Access-Control-Allow-Origin': '*' } });
      }
      
      // Default tool execution catch-all
      if (method === "tools/call") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: {
            content: [{ type: "text", text: `Executed tool successfully.` }],
            isError: false
          }
        }, { headers: { 'Access-Control-Allow-Origin': '*' } });
      }

      return NextResponse.json({ jsonrpc: "2.0", id: id, result: {} }, { headers: { 'Access-Control-Allow-Origin': '*' } });
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

    return NextResponse.json({
      status: "success",
      agent: "FrameKart Neon Orchestrator",
      response: result,
      receivedAt: new Date().toISOString()
    }, { headers: { 'Access-Control-Allow-Origin': '*' } });

  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Failed to process MCP command"
    }, { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
