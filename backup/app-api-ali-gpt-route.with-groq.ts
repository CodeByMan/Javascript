import { NextResponse } from "next/server";
import {
  buildAliGPTSystemPrompt,
  buildLocalAliGPTReply,
} from "@/lib/ali-gpt-context";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "openai/gpt-oss-20b";
const MAX_HISTORY_MESSAGES = 8;

function normalizeHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((message): message is ChatMessage => {
      if (!message || typeof message !== "object") {
        return false;
      }

      const candidate = message as Record<string, unknown>;

      return (
        (candidate.role === "user" || candidate.role === "assistant") &&
        typeof candidate.content === "string" &&
        candidate.content.trim().length > 0
      );
    })
    .slice(-MAX_HISTORY_MESSAGES);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: unknown;
      history?: unknown;
    };

    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    const history = normalizeHistory(body.history);

    if (!message) {
      return NextResponse.json(
        { error: "A message is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: buildLocalAliGPTReply(message),
        mode: "local",
      });
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.2,
        max_tokens: 600,
        messages: [
          {
            role: "system",
            content: buildAliGPTSystemPrompt(),
          },
          ...history,
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      return NextResponse.json({
        reply: buildLocalAliGPTReply(message),
        mode: "local-fallback",
        providerError: errorText,
      });
    }

    const data = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
    };

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({
        reply: buildLocalAliGPTReply(message),
        mode: "local-fallback",
        providerError: "Groq returned an empty response.",
      });
    }

    return NextResponse.json({ reply, mode: "groq" });
  } catch (error) {
    const details =
      error instanceof Error ? error.message : "Unknown server error.";

    return NextResponse.json(
      {
        error: "Unable to process AliGPT request.",
        details,
      },
      { status: 500 }
    );
  }
}
