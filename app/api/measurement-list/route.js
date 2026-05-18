import { NextResponse } from "next/server";
import { requireAuth } from "../backend/middleware/authMiddleware";
import { getCombinedMeasurementList } from "../backend/services/measurementListService";

export async function POST(request) {
  try {
    requireAuth(request);
    const body = await request.json();
    const { tab = "all", page = 1, limit = 12 } = body;
    const result = await getCombinedMeasurementList({ tab, page, limit });
    return NextResponse.json({ success: true, ...result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
