import { ProviderDetails } from '@/types/util';
import { NextResponse } from 'next/server';



const models: ProviderDetails[] = [
    { name: "OpenAI", model: "gpt-3.5-turbo", price: { inputCostInDollarsPerMillionTokens: 1.00, outputCostInDollarsPerMillionTokens: 2.00 } },
    { name: "OpenAI", model: "gpt-4o-mini", price: { inputCostInDollarsPerMillionTokens: 0.15, outputCostInDollarsPerMillionTokens: 0.60 } },
    { name: "OpenAI", model: "gpt-4o", price: { inputCostInDollarsPerMillionTokens: 2.50, outputCostInDollarsPerMillionTokens: 10.00 } },
    { name: "OpenAI", model: "gpt-4o-2024-05-13", price: { inputCostInDollarsPerMillionTokens: 5.00, outputCostInDollarsPerMillionTokens: 20.00 } },
    { name: "OpenAI", model: "gpt-4", price: { inputCostInDollarsPerMillionTokens: 30.00, outputCostInDollarsPerMillionTokens: 60.00 } },
    { name: "OpenAI", model: "gpt-4-32k", price: { inputCostInDollarsPerMillionTokens: 60.00, outputCostInDollarsPerMillionTokens: 120.00 } },
    { name: "OpenAI", model: "o1-mini", price: { inputCostInDollarsPerMillionTokens: 3.00, outputCostInDollarsPerMillionTokens: 12.00 } },
    { name: "OpenAI", model: "o1-preview", price: { inputCostInDollarsPerMillionTokens: 15.00, outputCostInDollarsPerMillionTokens: 60.00 } },
    { name: "OpenAI", model: "o1", price: { inputCostInDollarsPerMillionTokens: 15.00, outputCostInDollarsPerMillionTokens: 60.00 } },
    { name: "Claude", model: "3 Haiku", price: { inputCostInDollarsPerMillionTokens: 0.25, outputCostInDollarsPerMillionTokens: 1.25 } },
    { name: "Claude", model: "3 Sonnet", price: { inputCostInDollarsPerMillionTokens: 3.00, outputCostInDollarsPerMillionTokens: 15.00 } },
    { name: "Claude", model: "3 Opus", price: { inputCostInDollarsPerMillionTokens: 15.00, outputCostInDollarsPerMillionTokens: 75.00 } },
    { name: "Claude", model: "3.5 Haiku", price: { inputCostInDollarsPerMillionTokens: 0.80, outputCostInDollarsPerMillionTokens: 4.00 } },
    { name: "Claude", model: "3.5 Sonnet", price: { inputCostInDollarsPerMillionTokens: 3.00, outputCostInDollarsPerMillionTokens: 15.00 } },
    { name: "Claude", model: "Sonnet 3.7", price: { inputCostInDollarsPerMillionTokens: 3.00, outputCostInDollarsPerMillionTokens: 15.00 } },
    { name: "Claude", model: "Sonnet 4", price: { inputCostInDollarsPerMillionTokens: 3.00, outputCostInDollarsPerMillionTokens: 15.0 } },
    { name: "Claude", model: "Opus 4", price: { inputCostInDollarsPerMillionTokens: 15.00, outputCostInDollarsPerMillionTokens: 75.0 } },
    { name: "Google", model: "1.0 Pro", price: { inputCostInDollarsPerMillionTokens: 0.50, outputCostInDollarsPerMillionTokens: 1.50 } },
    { name: "Google", model: "1.5 Flash-8b", price: { inputCostInDollarsPerMillionTokens: 0.0375, outputCostInDollarsPerMillionTokens: 0.15 } },
    { name: "Google", model: "1.5 Flash", price: { inputCostInDollarsPerMillionTokens: 0.075, outputCostInDollarsPerMillionTokens: 0.30 } },
    { name: "Google", model: "1.5 Pro", price: { inputCostInDollarsPerMillionTokens: 1.25, outputCostInDollarsPerMillionTokens: 5.00 } },
];

export async function GET() {
    try {
        return NextResponse.json(models, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch models data' },
            { status: 500 }
        );
    }
}