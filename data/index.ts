import type { ProviderDetails } from "@/types/util";

export const models: ProviderDetails[] = [
	// OpenAI
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
		model: "gpt-4o-2024-05-13",
		price: {
			inputCostInDollarsPerMillionTokens: 5.0,
			outputCostInDollarsPerMillionTokens: 15.0,
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
		model: "gpt-4.1-nano",
		price: {
			inputCostInDollarsPerMillionTokens: 0.1,
			outputCostInDollarsPerMillionTokens: 0.4,
		},
	},
	{
		name: "OpenAI",
		model: "gpt-4.1-mini",
		price: {
			inputCostInDollarsPerMillionTokens: 0.4,
			outputCostInDollarsPerMillionTokens: 1.6,
		},
	},
	{
		name: "OpenAI",
		model: "gpt-4.1",
		price: {
			inputCostInDollarsPerMillionTokens: 2.0,
			outputCostInDollarsPerMillionTokens: 8.0,
		},
	},
	{
		name: "OpenAI",
		model: "gpt-5-codex",
		price: {
			inputCostInDollarsPerMillionTokens: 1.25,
			outputCostInDollarsPerMillionTokens: 10.0,
		},
	},
	{
		name: "OpenAI",
		model: "gpt-5-chat-latest",
		price: {
			inputCostInDollarsPerMillionTokens: 1.25,
			outputCostInDollarsPerMillionTokens: 10.0,
		},
	},
	{
		name: "OpenAI",
		model: "gpt-5-nano",
		price: {
			inputCostInDollarsPerMillionTokens: 0.05,
			outputCostInDollarsPerMillionTokens: 0.4,
		},
	},
	{
		name: "OpenAI",
		model: "gpt-5-mini",
		price: {
			inputCostInDollarsPerMillionTokens: 0.25,
			outputCostInDollarsPerMillionTokens: 4.0,
		},
	},
	{
		name: "OpenAI",
		model: "gpt-5",
		price: {
			inputCostInDollarsPerMillionTokens: 1.25,
			outputCostInDollarsPerMillionTokens: 10.0,
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
	{
		name: "OpenAI",
		model: "o1-mini",
		price: {
			inputCostInDollarsPerMillionTokens: 1.1,
			outputCostInDollarsPerMillionTokens: 4.4,
		},
	},
	{
		name: "OpenAI",
		model: "o1-pro",
		price: {
			inputCostInDollarsPerMillionTokens: 150.0,
			outputCostInDollarsPerMillionTokens: 600.0,
		},
	},
	{
		name: "OpenAI",
		model: "o3",
		price: {
			inputCostInDollarsPerMillionTokens: 2.0,
			outputCostInDollarsPerMillionTokens: 8.0,
		},
	},
	{
		name: "OpenAI",
		model: "o3-mini",
		price: {
			inputCostInDollarsPerMillionTokens: 1.1,
			outputCostInDollarsPerMillionTokens: 4.4,
		},
	},
	{
		name: "OpenAI",
		model: "o3-pro",
		price: {
			inputCostInDollarsPerMillionTokens: 20.0,
			outputCostInDollarsPerMillionTokens: 80.0,
		},
	},
	{
		name: "OpenAI",
		model: "o3-deep-research",
		price: {
			inputCostInDollarsPerMillionTokens: 10.0,
			outputCostInDollarsPerMillionTokens: 40.0,
		},
	},
	{
		name: "OpenAI",
		model: "o4-mini",
		price: {
			inputCostInDollarsPerMillionTokens: 1.1,
			outputCostInDollarsPerMillionTokens: 4.4,
		},
	},
	{
		name: "OpenAI",
		model: "o4-mini-deep-research",
		price: {
			inputCostInDollarsPerMillionTokens: 2.0,
			outputCostInDollarsPerMillionTokens: 8.0,
		},
	},
	{
		name: "OpenAI",
		model: "codex-mini-latest",
		price: {
			inputCostInDollarsPerMillionTokens: 1.5,
			outputCostInDollarsPerMillionTokens: 6.0,
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
	// Deepseek
	{
		name: "Deepseek",
		model: "deepseek-chat",
		price: {
			inputCostInDollarsPerMillionTokens: 0.27,
			outputCostInDollarsPerMillionTokens: 1.1,
		},
	},
	{
		name: "Deepseek",
		model: "deepseek-reasoner",
		price: {
			inputCostInDollarsPerMillionTokens: 0.55,
			outputCostInDollarsPerMillionTokens: 2.19,
		},
	},
];
