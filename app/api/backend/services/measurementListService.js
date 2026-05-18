import ShirtMeasurement from "../models/shirtMeasurementModel";
import PantMeasurement from "../models/pantMeasurementModel";
import User from "../models/userModel";
import { connectDB } from "../db/mongo";

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function tabToMatch(tab) {
  const today = startOfToday();
  const normalized = String(tab || "all").toLowerCase();
  switch (normalized) {
    case "pending":
      return { status: "Pending", date: { $gte: today } };
    case "inprogress":
      return { status: "Inprogress", date: { $gte: today } };
    case "done":
      return { status: "Done" };
    case "delayed":
      return {
        $and: [
          { status: { $in: ["Pending", "Inprogress"] } },
          { date: { $lt: today } },
        ],
      };
    case "all":
    default:
      return {};
  }
}

async function attachCustomers(rows) {
  const ids = [
    ...new Set(
      rows.map((r) => r.customerId).filter(Boolean).map((id) => String(id)),
    ),
  ];
  if (!ids.length) {
    return rows.map((r) => ({ ...r, customer: null }));
  }
  const users = await User.find(
    { _id: { $in: ids } },
    { name: 1, lastName: 1, email: 1, phone: 1 },
  ).lean();
  const map = new Map(users.map((u) => [String(u._id), u]));
  return rows.map((r) => ({
    ...r,
    customer: map.get(String(r.customerId)) || null,
  }));
}

/**
 * Paginated shirt + pant rows for the admin list view.
 * Uses $unionWith so skip/limit apply to the merged, sorted set.
 */
export async function getCombinedMeasurementList({
  tab = "all",
  page = 1,
  limit = 12,
} = {}) {
  await connectDB();
  const p = Math.max(1, parseInt(String(page), 10) || 1);
  const l = Math.min(100, Math.max(1, parseInt(String(limit), 10) || 12));
  const match = tabToMatch(tab);
  const pantColl = PantMeasurement.collection.collectionName;

  const pipeline = [
    { $match: match },
    { $addFields: { _garmentType: "shirt" } },
    {
      $unionWith: {
        coll: pantColl,
        pipeline: [
          { $match: match },
          { $addFields: { _garmentType: "pant" } },
        ],
      },
    },
    { $sort: { date: 1, createdAt: -1 } },
    {
      $facet: {
        rows: [{ $skip: (p - 1) * l }, { $limit: l }],
        meta: [{ $count: "total" }],
      },
    },
  ];

  const agg = await ShirtMeasurement.aggregate(pipeline);
  const facet = agg[0] || { rows: [], meta: [] };
  const total = facet.meta[0]?.total ?? 0;
  const rows = facet.rows || [];
  const measurements = await attachCustomers(rows);

  return {
    measurements,
    pagination: {
      page: p,
      limit: l,
      total,
      totalPages: total === 0 ? 0 : Math.ceil(total / l),
    },
  };
}
