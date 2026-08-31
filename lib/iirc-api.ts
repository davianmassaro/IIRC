import type { Event } from "@/types";
import { featuredEvents } from "@/data/events";


export type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};


export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "FINANCE_ADMIN";


export type AdminLoginData = {
  token: string;
  expires_at: string;
  user: {
    id: string | number;
    name: string;
    email: string;
    role: string;
  };
};


export type RegistrationData = {
  registration_id: string | number;
  registration_code: string;
  status?: string;
  registration_status?: string;
  event?: {
    id: string | number;
    title: string;
    price: string | number;
  };
  participant?: {
    id: string | number;
    name: string;
    email: string;
  };
};


export type PaymentData = {
  payment_id: string | number;
  transaction_id: string;
  payment_status: string;
  amount: string | number;
  payment_method: string;
  registration_code: string;
  event_title: string;
  participant_name: string;
};


export type DashboardSummary = {
  total_events: number | string;
  total_participants: number | string;
  total_registrations: number | string;
  confirmed_registrations: number | string;
  pending_payment_registrations: number | string;
  paid_payments: number | string;
  total_revenue: number | string;
  present_attendance: number | string;
  total_feedbacks: number | string;
  total_certificates: number | string;
  attendance_rate_percentage: number | string;
};


export type BackendEvent = {
  id: string | number;
  title: string;
  description?: string | null;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  price?: string | number | null;
  quota?: string | number | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by_name?: string | null;
  total_registrations?: string | number | null;
  confirmed_registrations?: string | number | null;
  total_revenue?: string | number | null;
};


export type ParticipantData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  position: string;
  is_active: number;
  created_at: string;
};


const DEFAULT_API_BASE_URL = "http://127.0.0.1/iirc-api";


export function getApiBaseUrl() {
  return (
    process.env.IIRC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_IIRC_API_BASE_URL ||
    DEFAULT_API_BASE_URL
  ).replace(/\/$/, "");
}


function buildUrl(path: string) {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return `${getApiBaseUrl()}${normalizedPath}`;
}


export function normalizeAdminRole(
  role?: string | null
): AdminRole {

  const normalized = String(role ?? "").toLowerCase();

  if (normalized === "super_admin")
    return "SUPER_ADMIN";

  if (normalized === "finance_admin")
    return "FINANCE_ADMIN";

  return "ADMIN";
}


export async function iircRequest<T>(
  path: string,
  options: RequestInit & {
    token?: string;
    fallback?: T;
  } = {}
): Promise<T> {

  const {
    token,
    fallback,
    headers,
    ...init
  } = options;


  try {

    const res = await fetch(
      buildUrl(path),
      {
        ...init,
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token
            ? {
              Authorization:
                `Bearer ${token}`
            }
            : {}),
          ...(headers ?? {})
        }
      }
    );


    const json =
      await res.json() as ApiResponse<T>;


    if (!res.ok || json.status === false) {
      throw new Error(
        json.message ||
        `Request failed ${res.status}`
      );
    }


    return json.data;


  } catch (error) {

    if (fallback !== undefined)
      return fallback;


    throw error;

  }

}



export function mapBackendEvent(
  event: BackendEvent
): Event {

  const id = String(event.id);

  const startDate =
    event.start_date ??
    new Date().toISOString();

  const endDate =
    event.end_date ??
    startDate;


  return {

    id,

    slug: id,

    title: event.title,

    description:
      event.description ??
      "Detail program akan diperbarui oleh admin IIRC.",

    shortDesc:
      event.description
        ? String(event.description).slice(0, 160)
        : undefined,


    category: "Public Program",

    type: "public",

    status:
      String(event.status ?? "open")
        .toUpperCase(),


    thumbnail: undefined,


    startDate,

    endDate,


    venue: event.location ?? undefined,

    venueAddress: event.location ?? undefined,


    isOnline: false,


    quota: Number(event.quota ?? 0),


    registeredCount:
      Number(
        event.total_registrations ??
        event.confirmed_registrations ??
        0
      ),


    price: Number(event.price ?? 0),


    tags: [
      "IIRC",
      "Training"
    ],


    isFeatured:
      event.status === "open" ||
      event.status === "published"

  };

}



export async function adminLogin(
  email: string,
  password: string
) {

  return iircRequest<AdminLoginData>(
    "/admin/login",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    }
  );

}



export async function getPublicEvents() {
  const data =
    await iircRequest<BackendEvent[]>(
      "/events",
      {
        fallback: []
      }
    );

  if (!data || data.length === 0) {
    return featuredEvents;
  }

  return data.map(mapBackendEvent);
}



export async function registerParticipant(payload: any) {

  return iircRequest(
    "/register",
    {
      method: "POST",
      body: JSON.stringify(payload)
    }
  );

}



export async function createPayment(
  registration_code: string,
  payment_method = "Virtual Account"
) {

  return iircRequest<PaymentData>(
    "/payment/create",
    {
      method: "POST",
      body: JSON.stringify({
        registration_code,
        payment_method
      })
    }
  );

}



export async function adminGet<T>(
  path: string,
  token: string
) {

  return iircRequest<T>(
    path,
    {
      token
    }
  );

}



export async function adminPost<T>(
  path: string,
  token: string,
  body: any
) {

  return iircRequest<T>(
    path,
    {
      token,
      method: "POST",
      body: JSON.stringify(body)
    }
  );

}



export async function adminPut<T>(
  path: string,
  token: string,
  body: any
) {

  return iircRequest<T>(
    path,
    {
      token,
      method: "PUT",
      body: JSON.stringify(body)
    }
  );

}



export async function adminDelete<T>(
  path: string,
  token: string
) {

  return iircRequest<T>(
    path,
    {
      token,
      method: "DELETE"
    }
  );

}



export async function getAdminDashboard(
  token: string
) {

  return adminGet<DashboardSummary>(
    "/admin/dashboard",
    token
  );

}



export async function getAdminRegistrations(
  token: string
) {

  return adminGet<any[]>(
    "/admin/registrations",
    token
  );

}



export async function getAdminParticipants(
  token: string
) {

  return adminGet<ParticipantData[]>(
    "/admin/participants",
    token
  );

}



export async function getAdminPayments(
  token: string
) {

  return adminGet<any[]>(
    "/admin/payments",
    token
  );

}



export async function getAdminEvents(
  token: string
) {

  return adminGet<BackendEvent[]>(
    "/admin/events",
    token
  );

}



export async function getAdminEventDetail(
  eventId: string | number,
  token: string
) {

  return adminGet<BackendEvent>(
    `/admin/events/${eventId}`,
    token
  );

}



export async function getAdminGallery(
  token: string
) {

  return adminGet<any[]>(
    "/admin/gallery",
    token
  );

}



export async function getAdminVideos(
  token: string
) {

  return adminGet<any[]>(
    "/admin/videos",
    token
  );

}



export async function getAdminMagazine(
  token: string
) {

  return adminGet<any[]>(
    "/admin/magazines",
    token
  );

}



export async function getAdminCertificates(
  token: string
) {

  return adminGet<any[]>(
    "/admin/certificates",
    token
  );

}



export async function getAdminAttendance(
  token: string
) {

  return adminGet<any[]>(
    "/admin/attendance",
    token
  );

}



export async function getAttendanceDetail(
  registrationCode: string,
  token: string
) {

  return adminGet<any>(
    `/admin/attendance/${registrationCode}`,
    token
  );

}



export async function getAdminReports(
  token: string
) {

  return adminGet<any[]>(
    "/admin/reports",
    token
  );

}

export type AdminUserData = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  position: string | null;
  role_id: number;
  role_name: string | null;
  is_active: number;
  created_at: string;
};


export async function getAdminUsers(
  token: string
) {

  return adminGet<AdminUserData[]>(
    "/admin/users",
    token
  );

}


export async function createAdminUser(
  token: string,
  body: any
) {

  return adminPost<any>(
    "/admin/users/create",
    token,
    body
  );

}


export async function updateAdminUser(
  token: string,
  id: number,
  body: any
) {

  return adminPut<any>(
    `/admin/users/update?id=${id}`,
    token,
    body
  );

}


export async function deleteAdminUser(
  token: string,
  id: number
) {

  return adminDelete<any>(
    `/admin/users/delete?id=${id}`,
    token
  );


}