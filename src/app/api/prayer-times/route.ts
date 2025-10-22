import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://api.myquran.com/v1/sholat/jadwal";
const CITY_ID = "741"; // Makassar

function withCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Headers", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS");
  return response;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");
    const formattedDate = dateParam ? decodeURIComponent(dateParam) : null;
    const endpoint = formattedDate
      ? `${API_BASE_URL}/${CITY_ID}/${formattedDate}`
      : `${API_BASE_URL}/${CITY_ID}/hariini`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return withCors(
        NextResponse.json(
          { error: `Upstream error ${response.status}` },
          { status: 502 },
        ),
      );
    }

    const data = await response.json();
    return withCors(NextResponse.json(data));
  } catch (error) {
    console.error("Prayer times proxy error:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to fetch prayer times" },
        { status: 500 },
      ),
    );
  }
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}
