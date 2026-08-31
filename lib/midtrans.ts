import { createHash } from "crypto";

const IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === "true";
const SNAP_BASE = IS_PRODUCTION
  ? "https://app.midtrans.com"
  : "https://app.sandbox.midtrans.com";
const API_BASE = IS_PRODUCTION
  ? "https://api.midtrans.com"
  : "https://api.sandbox.midtrans.com";

function authHeader(): string {
  const key = process.env.MIDTRANS_SERVER_KEY ?? "";
  return `Basic ${Buffer.from(`${key}:`).toString("base64")}`;
}

export interface SnapParams {
  orderId: string;
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  itemName: string;
  itemId?: string;
}

export interface SnapTokenResult {
  token: string;
  redirectUrl: string;
}

export async function createSnapToken(params: SnapParams): Promise<SnapTokenResult> {
  const res = await fetch(`${SNAP_BASE}/snap/v1/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: params.orderId,
        gross_amount: Math.round(params.amount),
      },
      customer_details: {
        first_name: params.firstName,
        last_name: params.lastName ?? "",
        email: params.email,
        phone: params.phone ?? "",
      },
      item_details: [
        {
          id: params.itemId ?? params.orderId,
          price: Math.round(params.amount),
          quantity: 1,
          name: params.itemName.slice(0, 50),
        },
      ],
      callbacks: {
        finish: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/dashboard/payment`,
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    const msgs: string[] = data.error_messages ?? [data.message ?? "Midtrans error"];
    throw new Error(msgs.join("; "));
  }

  return { token: data.token as string, redirectUrl: data.redirect_url as string };
}

export function verifyWebhookSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  incomingKey: string,
): boolean {
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? "";
  const expected = createHash("sha512")
    .update(orderId + statusCode + grossAmount + serverKey)
    .digest("hex");
  return expected === incomingKey;
}

export async function getMidtransStatus(orderId: string) {
  const res = await fetch(`${API_BASE}/v2/${orderId}/status`, {
    headers: { Authorization: authHeader() },
  });
  if (!res.ok) return null;
  return res.json();
}
