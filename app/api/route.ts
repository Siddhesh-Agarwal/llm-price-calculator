import { ProviderDetails } from "@/types/util";
import { NextResponse } from "next/server";

const models: ProviderDetails[] = [
  // OpenAI
  {
    name: "OpenAI",
    model: "gpt-3.5-turbo",
    price: {
      inputCostInDollarsPerMillionTokens: 1.0,
      outputCostInDollarsPerMillionTokens: 2.0,
    },
  },
  {
    name: "OpenAI",
    model: "gpt-4o-mini",
    price: {
      inputCostInDollarsPerMillionTokens: 0.15,
      outputCostInDollarsPerMillionTokens: 0.6,
    },
  },
  {
    name: "OpenAI",
    model: "gpt-4o",
    price: {
      inputCostInDollarsPerMillionTokens: 2.5,
      outputCostInDollarsPerMillionTokens: 10.0,
    },
  },
  {
    name: "OpenAI",
    model: "gpt-4o-2024-05-13",
    price: {
      inputCostInDollarsPerMillionTokens: 5.0,
      outputCostInDollarsPerMillionTokens: 20.0,
    },
  },
  {
    name: "OpenAI",
    model: "gpt-4",
    price: {
      inputCostInDollarsPerMillionTokens: 30.0,
      outputCostInDollarsPerMillionTokens: 60.0,
    },
  },
  {
    name: "OpenAI",
    model: "gpt-4-32k",
    price: {
      inputCostInDollarsPerMillionTokens: 60.0,
      outputCostInDollarsPerMillionTokens: 120.0,
    },
  },
  {
    name: "OpenAI",
    model: "o1-mini",
    price: {
      inputCostInDollarsPerMillionTokens: 3.0,
      outputCostInDollarsPerMillionTokens: 12.0,
    },
  },
  {
    name: "OpenAI",
    model: "o1-preview",
    price: {
      inputCostInDollarsPerMillionTokens: 15.0,
      outputCostInDollarsPerMillionTokens: 60.0,
    },
  },
  {
    name: "OpenAI",
    model: "o1",
    price: {
      inputCostInDollarsPerMillionTokens: 15.0,
      outputCostInDollarsPerMillionTokens: 60.0,
    },
  },
  // Claude
  {
    name: "Claude",
    model: "Haiku 3",
    price: {
      inputCostInDollarsPerMillionTokens: 0.25,
      outputCostInDollarsPerMillionTokens: 1.25,
    },
  },
  {
    name: "Claude",
    model: "Sonnet 3",
    price: {
      inputCostInDollarsPerMillionTokens: 3.0,
      outputCostInDollarsPerMillionTokens: 15.0,
    },
  },
  {
    name: "Claude",
    model: "Opus 3",
    price: {
      inputCostInDollarsPerMillionTokens: 15.0,
      outputCostInDollarsPerMillionTokens: 75.0,
    },
  },
  {
    name: "Claude",
    model: "Haiku 3.5",
    price: {
      inputCostInDollarsPerMillionTokens: 0.8,
      outputCostInDollarsPerMillionTokens: 4.0,
    },
  },
  {
    name: "Claude",
    model: "Sonnet 3.5",
    price: {
      inputCostInDollarsPerMillionTokens: 3.0,
      outputCostInDollarsPerMillionTokens: 15.0,
    },
  },
  {
    name: "Claude",
    model: "Sonnet 3.7",
    price: {
      inputCostInDollarsPerMillionTokens: 3.0,
      outputCostInDollarsPerMillionTokens: 15.0,
    },
  },
  {
    name: "Claude",
    model: "Sonnet 4",
    price: {
      inputCostInDollarsPerMillionTokens: 3.0,
      outputCostInDollarsPerMillionTokens: 15.0,
    },
  },
  {
    name: "Claude",
    model: "Opus 4",
    price: {
      inputCostInDollarsPerMillionTokens: 15.0,
      outputCostInDollarsPerMillionTokens: 75.0,
    },
  },
  // Google
  {
    name: "Google",
    model: "Gemini 1.0 Pro",
    price: {
      inputCostInDollarsPerMillionTokens: 0.5,
      outputCostInDollarsPerMillionTokens: 1.5,
    },
  },
  {
    name: "Google",
    model: "Gemini 1.5 Flash-8b",
    price: {
      inputCostInDollarsPerMillionTokens: 0.0375,
      outputCostInDollarsPerMillionTokens: 0.15,
    },
  },
  {
    name: "Google",
    model: "Gemini 1.5 Flash",
    price: {
      inputCostInDollarsPerMillionTokens: 0.075,
      outputCostInDollarsPerMillionTokens: 0.3,
    },
  },
  {
    name: "Google",
    model: "Gemini 1.5 Pro",
    price: {
      inputCostInDollarsPerMillionTokens: 1.25,
      outputCostInDollarsPerMillionTokens: 5.0,
    },
  },
  {
    name: "Google",
    model: "Gemini 2.0 Flash Lite",
    price: {
      inputCostInDollarsPerMillionTokens: 0.075,
      outputCostInDollarsPerMillionTokens: 0.3,
    },
  },
  {
    name: "Google",
    model: "Gemini 2.0 Flash",
    price: {
      inputCostInDollarsPerMillionTokens: 0.15,
      outputCostInDollarsPerMillionTokens: 0.6,
    },
  },
  {
    name: "Google",
    model: "Gemini 2.0 Pro (<=128K)",
    price: {
      inputCostInDollarsPerMillionTokens: 1.25,
      outputCostInDollarsPerMillionTokens: 2.5,
    },
  },
  {
    name: "Google",
    model: "Gemini 2.0 Pro (>128K)",
    price: {
      inputCostInDollarsPerMillionTokens: 2.5,
      outputCostInDollarsPerMillionTokens: 10.0,
    },
  },
  {
    name: "Google",
    model: "Gemini 2.5 Flash Lite",
    price: {
      inputCostInDollarsPerMillionTokens: 0.1,
      outputCostInDollarsPerMillionTokens: 0.4,
    },
  },
  {
    name: "Google",
    model: "Gemini 2.5 Flash Live",
    price: {
      inputCostInDollarsPerMillionTokens: 0.5,
      outputCostInDollarsPerMillionTokens: 2.0,
    },
  },
  {
    name: "Google",
    model: "Gemini 2.5 Flash Preview",
    price: {
      inputCostInDollarsPerMillionTokens: 0.15,
      outputCostInDollarsPerMillionTokens: 0.6,
    },
  },
  {
    name: "Google",
    model: "Gemini 2.5 Flash GA",
    price: {
      inputCostInDollarsPerMillionTokens: 0.3,
      outputCostInDollarsPerMillionTokens: 2.5,
    },
  },
  {
    name: "Google",
    model: "Gemini 2.5 Pro (<=200K)",
    price: {
      inputCostInDollarsPerMillionTokens: 1.25,
      outputCostInDollarsPerMillionTokens: 10.0,
    },
  },
  {
    name: "Google",
    model: "Gemini 2.5 Pro (>200K)",
    price: {
      inputCostInDollarsPerMillionTokens: 2.5,
      outputCostInDollarsPerMillionTokens: 15.0,
    },
  },
  // Moonshot
  {
    name: "Moonshot",
    model: "moonshot-v1-8k",
    price: {
      inputCostInDollarsPerMillionTokens: 0.2,
      outputCostInDollarsPerMillionTokens: 2,
    },
  },
  {
    name: "Moonshot",
    model: "moonshot-v1-32k",
    price: {
      inputCostInDollarsPerMillionTokens: 1,
      outputCostInDollarsPerMillionTokens: 3,
    },
  },
  {
    name: "Moonshot",
    model: "moonshot-v1-128k",
    price: {
      inputCostInDollarsPerMillionTokens: 2,
      outputCostInDollarsPerMillionTokens: 5,
    },
  },
  {
    name: "Moonshot",
    model: "moonshot-v1-8k-vision-preview",
    price: {
      inputCostInDollarsPerMillionTokens: 0.2,
      outputCostInDollarsPerMillionTokens: 2,
    },
  },
  {
    name: "Moonshot",
    model: "moonshot-v1-32k-vision-preview",
    price: {
      inputCostInDollarsPerMillionTokens: 1,
      outputCostInDollarsPerMillionTokens: 3,
    },
  },
  {
    name: "Moonshot",
    model: "moonshot-v1-128k-vision-preview",
    price: {
      inputCostInDollarsPerMillionTokens: 2,
      outputCostInDollarsPerMillionTokens: 5,
    },
  },
  {
    name: "Moonshot",
    model: "kimi-thinking-preview",
    price: {
      inputCostInDollarsPerMillionTokens: 30,
      outputCostInDollarsPerMillionTokens: 30,
    },
  },
  {
    name: "Moonshot",
    model: "kimi-k2-0711-preview",
    price: {
      inputCostInDollarsPerMillionTokens: 0.6,
      outputCostInDollarsPerMillionTokens: 2.5,
    },
  },
];

export async function GET() {
  try {
    return NextResponse.json(models, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch models data" },
      { status: 500 }
    );
  }
}
