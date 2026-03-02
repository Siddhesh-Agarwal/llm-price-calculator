import { NextResponse } from "next/server";
import { models } from "@/data";

export const runtime = "edge";

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
			{ status: 500 },
		);
	}
}
