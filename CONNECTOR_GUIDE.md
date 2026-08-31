# IIRC Frontend Connector to PHP Backend

Backend local yang dipakai:

```txt
http://127.0.0.1/iirc-api
```

File konektor utama:

```txt
lib/iirc-api.ts
```

Environment yang harus ada di `.env.local`:

```env
IIRC_API_BASE_URL="http://127.0.0.1/iirc-api"
NEXT_PUBLIC_IIRC_API_BASE_URL="http://127.0.0.1/iirc-api"
```

## Admin Login

Halaman login memakai NextAuth Credentials, tetapi validasinya sudah diarahkan ke backend PHP:

```txt
POST /admin/login
```

Token dari backend disimpan di session sebagai:

```txt
session.user.apiToken
```

Role backend akan dinormalisasi:

```txt
super_admin -> SUPER_ADMIN
event_admin -> ADMIN
finance_admin -> FINANCE_ADMIN
```

## Proxy API Next.js

Disediakan proxy generic:

```txt
/api/iirc/[...path]
```

Contoh:

```txt
/api/iirc/events
/api/iirc/admin/dashboard
/api/iirc/admin/events
```

Untuk endpoint admin, proxy otomatis mengambil token dari session admin.

## Endpoint yang sudah disiapkan

Public:

```txt
GET  /events
POST /register
POST /payment/create
POST /payment/simulate-paid
GET  /registration/{registration_code}
GET  /payment/status/{registration_code}
POST /feedback
GET  /certificate/{registration_code}
```

Admin:

```txt
POST   /admin/login
GET    /admin/me
GET    /admin/dashboard
GET    /admin/events
POST   /admin/events
GET    /admin/events/{id}
PUT    /admin/events/{id}
DELETE /admin/events/{id}
GET    /admin/registrations
GET    /admin/participants
GET    /admin/payments
POST   /admin/attendance/generate
POST   /admin/attendance/scan
GET    /admin/feedbacks
POST   /admin/certificate/generate
GET    /admin/certificates
```

## File yang sudah diubah

```txt
lib/iirc-api.ts
lib/auth.ts
types/index.ts
app/api/iirc/[...path]/route.ts
app/api/admin/events/route.ts
app/api/admin/events/[id]/route.ts
app/admin/layout.tsx
app/admin/events/page.tsx
app/admin/events/[id]/edit/page.tsx
app/(public)/events/page.tsx
app/(public)/events/[slug]/page.tsx
components/events/RegisterButton.tsx
.env.local
.env.example
```

## Cara testing local

1. Jalankan XAMPP Apache dan MySQL.
2. Pastikan backend PHP aktif di `http://127.0.0.1/iirc-api`.
3. Jalankan frontend Next.js.
4. Login admin pakai akun backend:

```txt
admin@iirc.com
123456
```

5. Buka:

```txt
/admin
/events
```

6. Test flow public:

```txt
Events -> Detail Event -> Daftar Program -> Simulasikan Pembayaran
```

## Catatan

- Participant tidak login.
- Login hanya untuk admin.
- Payment masih simulation karena backend lokal belum memakai payment gateway real.
- QR scan, feedback, dan certificate tetap memakai API backend PHP.
