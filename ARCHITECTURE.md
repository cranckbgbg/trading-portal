# ARCHITECTURE.md — xrent.bg

> **Как** е построена системата. Свързани: [SPEC.md](./SPEC.md), [ROADMAP.md](./ROADMAP.md), [CLAUDE.md](./CLAUDE.md).

---

## 1. Технологичен обзор

| Слой | Технология |
|---|---|
| Frontend / SSR | Next.js 14 (App Router), React 18, TypeScript |
| Стилизация | Tailwind CSS + UI компоненти (`components/`) |
| Auth | NextAuth v4 (Credentials, JWT сесии, роли) |
| База данни | PostgreSQL |
| ORM / миграции | Prisma |
| Плащания | Stripe (Checkout/PaymentIntent + Webhooks) |
| Валидация | Zod |
| Хеширане | bcrypt |
| Файлове | Private storage (S3-съвместим / провайдър) |
| Имейли | Транзакционен mail провайдър (SMTP/API) |

---

## 2. Структура на папките

```
xrent.bg/
├─ app/
│  ├─ (public)/                 # Публичен сайт (без login)
│  │  ├─ page.tsx               # Начало + бързо търсене (F-01)
│  │  ├─ cars/
│  │  │  ├─ page.tsx            # Каталог + филтри (F-02)
│  │  │  └─ [carId]/page.tsx    # Детайлна страница (F-03)
│  │  ├─ search/page.tsx        # Резултати по дата/час/локация (F-04)
│  │  └─ legal/                 # Условия, GDPR политика
│  │
│  ├─ (auth)/
│  │  ├─ login/page.tsx
│  │  ├─ register/page.tsx      # + GDPR съгласие (B-08)
│  │  └─ reset/page.tsx
│  │
│  ├─ (customer)/               # Изисква роля CUSTOMER
│  │  ├─ account/page.tsx       # Профил (F-07)
│  │  ├─ documents/page.tsx     # Качване книжка/лк (F-15)
│  │  ├─ reservations/          # Списък/детайл резервации
│  │  └─ checkout/[id]/page.tsx # Плащане (F-12)
│  │
│  ├─ (admin)/                  # Изисква роля ADMIN
│  │  ├─ dashboard/page.tsx
│  │  ├─ cars/                  # CRUD + блокиране (F-17, B-04)
│  │  ├─ reservations/          # Управление (F-18)
│  │  ├─ customers/             # Клиенти + книжки (F-19, F-16)
│  │  ├─ payments/              # Плащания/депозити (F-20)
│  │  └─ logs/page.tsx          # Audit (F-21)
│  │
│  └─ api/                      # Route handlers (виж §5)
│     ├─ auth/[...nextauth]/route.ts
│     ├─ cars/...
│     ├─ availability/route.ts
│     ├─ reservations/...
│     ├─ payments/...
│     ├─ webhooks/stripe/route.ts
│     ├─ documents/...
│     └─ admin/...
│
├─ components/                  # Преизползваеми UI компоненти
├─ lib/
│  ├─ db.ts                     # Един Prisma client инстанс
│  ├─ auth.ts                   # NextAuth конфигурация
│  ├─ stripe.ts                 # Stripe client + helpers
│  ├─ mail.ts                   # Имейл изпращане
│  ├─ storage.ts                # Private file storage
│  ├─ rbac.ts                   # Проверки на роля/собственост
│  ├─ validation/               # Zod схеми
│  └─ services/                 # Бизнес логика (не в компоненти/routes)
│     ├─ availability.ts        # Overlap проверка (B-01)
│     ├─ reservation.ts
│     ├─ pricing.ts             # Сървърно ценообразуване (B-10)
│     ├─ payment.ts
│     ├─ deposit.ts
│     ├─ license.ts             # Проверка на книжка (B-03)
│     └─ audit.ts               # Единен audit log (B-07)
│
├─ prisma/
│  ├─ schema.prisma
│  ├─ migrations/
│  └─ seed.ts
│
├─ middleware.ts                # Защита на маршрути по роля
├─ types/
└─ .env.example
```

> Групите `(public)`, `(customer)`, `(admin)` са route groups на Next.js — позволяват отделен layout и защита per група.

---

## 3. Модел на данни (Prisma — концептуален)

> Финалните полета се фиксират в Phase 1. Това е целевата структура.

### Основни модели

- **User** — `id, email, passwordHash, name, phone, role (ADMIN|CUSTOMER), emailVerified, blocked, createdAt`.
- **Account / Session / VerificationToken** — NextAuth таблици.
- **Consent** — `id, userId, type, policyVersion, acceptedAt` (B-08).
- **Location** — `id, name, address, city, active` (взимане/връщане).
- **Car** — `id, brand, model, year, category, fuel, transmission, seats, doors, dailyRate, depositAmount, mileageLimit, locationId, status (AVAILABLE|MAINTENANCE|RESERVED_PERSONAL|RETIRED), active`.
- **CarImage** — `id, carId, url, sortOrder`.
- **CarBlock** — `id, carId, startAt, endAt, reason (MAINTENANCE|PERSONAL), createdBy` (B-04).
- **AddOn** — `id, name, description, priceType (PER_DAY|FLAT), price, active`.
- **Reservation** — `id, userId, carId, pickupLocationId, returnLocationId, startAt, endAt, status (PENDING|CONFIRMED|ACTIVE|COMPLETED|CANCELLED|REJECTED), priceTotal, depositAmount, currency, createdAt`.
- **ReservationAddOn** — `id, reservationId, addOnId, quantity, priceSnapshot`.
- **Payment** — `id, reservationId, type (RENTAL|DEPOSIT|REFUND), status (PENDING|SUCCEEDED|FAILED|REFUNDED), amount, currency, stripePaymentIntentId, stripeSessionId, createdAt` (B-06).
- **Deposit** — `id, reservationId, amount, status (HELD|CAPTURED|RELEASED|PARTIAL), stripeRef, note` (F-11).
- **Document** — `id, userId, type (LICENSE_FRONT|LICENSE_BACK|ID), storageKey, status (PENDING|APPROVED|REJECTED), rejectReason` (F-15).
- **DriverLicense** — `id, userId, number, country, categories, expiresAt, status (PENDING|APPROVED|REJECTED), verifiedBy` (B-03).
- **AuditLog** — `id, actorId, actorRole, action, entityType, entityId, before (json), after (json), createdAt` (B-07).
- **WebhookEvent** — `id, stripeEventId (unique), type, processedAt` — за идемпотентност (B-05).

### Ключови индекси / ограничения
- `Reservation`: индекс по `(carId, startAt, endAt)` и по `status` — за бързи overlap заявки.
- `WebhookEvent.stripeEventId` — **unique** (идемпотентност).
- `Payment.stripePaymentIntentId` — unique.
- FK с подходящи `onDelete` правила; soft-delete (`active`) за коли вместо твърдо триене.

---

## 4. Защита от двойна резервация (B-01) — ключово

Многослойна защита:

1. **UI слой:** наличността се проверява при търсене и преди checkout (UX, не сигурност).
2. **Service слой (`availability.ts`):** автомобил е зает за `[start, end)`, ако съществува:
   - `Reservation` със `status ∈ {PENDING, CONFIRMED, ACTIVE}` и застъпване, **или**
   - `CarBlock` със застъпване (B-04).
   - Условие за застъпване: `existing.startAt < new.endAt AND existing.endAt > new.startAt`.
3. **DB слой (гаранция):** създаването на резервация се прави в **транзакция** с едно от:
   - PostgreSQL **exclusion constraint** върху `(carId, tstzrange(startAt, endAt))` с `&&` (предпочитано, абсолютна гаранция), **или**
   - `SERIALIZABLE` транзакция с повторна overlap проверка преди insert.

> Само DB слоят гарантира при паралелни заявки. Изборът (exclusion constraint vs serializable) се фиксира в Phase 3 според възможностите на хостинга.

---

## 5. API Routes (App Router handlers)

> Всички защитени routes минават през `rbac.ts`. Всички входове — Zod. Бизнес логиката е в `lib/services`.

### Публични
- `GET /api/cars` — списък/филтри/пагинация.
- `GET /api/cars/:id` — детайл.
- `POST /api/availability` — налични коли за период/локация (F-04).

### Auth
- `/api/auth/[...nextauth]` — NextAuth (login/logout/session).
- `POST /api/auth/register` — регистрация + Consent (B-08).
- `POST /api/auth/reset` / `POST /api/auth/reset/confirm`.

### Клиент (роля CUSTOMER)
- `POST /api/reservations` — създаване (транзакция + overlap, B-01; сървърна цена, B-10).
- `GET /api/reservations` — само мои (B-09).
- `POST /api/reservations/:id/cancel` — отказ на `PENDING`.
- `POST /api/payments/checkout` — създава Stripe session/intent за резервация.
- `POST /api/documents` — качване в private storage (F-15).

### Webhooks
- `POST /api/webhooks/stripe` — проверка на подпис (B-05), идемпотентност чрез `WebhookEvent`, обновяване на `Payment`/`Deposit`/`Reservation` (B-02, B-06).

### Админ (роля ADMIN)
- `POST/PUT/DELETE /api/admin/cars` — CRUD + снимки/тарифи.
- `POST /api/admin/cars/:id/block` — блокиране за период (B-04).
- `GET /api/admin/reservations` + `POST /api/admin/reservations/:id/status` — ръчно потвърждение/отказ (B-02).
- `GET /api/admin/customers` + одобрение на документи/книжка (F-16, B-03).
- `POST /api/admin/payments/:id/refund`, `POST /api/admin/deposits/:id/(capture|release)`.
- `GET /api/admin/logs` — audit (F-21).

Всеки мутиращ admin/клиент route → запис през `audit.ts` (B-07).

---

## 6. Автентикация и авторизация

- **NextAuth v4**, Credentials provider; пароли с bcrypt.
- **JWT сесия** носи `userId` и `role`.
- **`middleware.ts`** пази route групите:
  - `(customer)/*` → изисква валидна сесия.
  - `(admin)/*` → изисква `role === ADMIN`.
- **`lib/rbac.ts`**: helper-и `requireUser()`, `requireAdmin()`, `requireOwnership(resource)` за API handler-ите (B-09).
- Неоторизиран достъп → `401`; грешна роля или чужд ресурс → `403/404`.

---

## 7. Плащания (Stripe) — поток

```
Клиент → POST /api/payments/checkout
      → създава Payment(PENDING) в БД (B-06)
      → създава Stripe Checkout Session / PaymentIntent (наем + депозит)
      → редирект към Stripe

Stripe → POST /api/webhooks/stripe
      → verify подпис (B-05) → ако невалиден: 400, без ефект
      → проверка WebhookEvent (идемпотентност); ако вече обработено → 200 no-op
      → checkout.session.completed / payment_intent.succeeded:
           Payment → SUCCEEDED
           Deposit → HELD (ако е authorization)
           Reservation → CONFIRMED (B-02), ако книжката е валидна (B-03)
           AuditLog + имейл (F-22)
      → payment_intent.payment_failed: Payment → FAILED, имейл
      → charge.refunded: Payment(REFUND), AuditLog
```

- Депозит: authorization при checkout → `capture` (при щета) или `release` (чисто връщане) от админ.
- Никога не потвърждаваме резервация от клиентския редирект — **само** от webhook (или ръчно админ).

---

## 8. Имейл известия

- `lib/mail.ts` + BG шаблони.
- Тригери: verify, reset, reservation confirmed, payment failed, reservation rejected, deposit captured/released (F-22).
- Изпращането е странично; неуспех на мейл не блокира бизнес транзакцията (логва се грешка).

---

## 9. Файлове и документи

- `lib/storage.ts` → private storage (S3-съвместим). Записва се само `storageKey` в БД.
- Достъп до файл само през сървърен endpoint с RBAC + signed URL с кратък живот.
- Без публични URL към лични документи (GDPR).

---

## 10. GDPR

- `Consent` запис при регистрация/резервация (тип + версия на политика + timestamp) (B-08).
- Право на достъп/изтриване: админ/клиент flow в Phase 7.
- Минимизация: пазим само нужните данни; документите — защитени; PII не влиза в логове.

---

## 11. Конфигурация (env)

> Поддържай `.env.example` синхронизиран. Примерни групи:

- **DB:** `DATABASE_URL`
- **NextAuth:** `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- **Stripe:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Mail:** `MAIL_HOST`/`MAIL_API_KEY`, `MAIL_FROM`
- **Storage:** `STORAGE_BUCKET`, `STORAGE_KEY`, `STORAGE_SECRET`, `STORAGE_ENDPOINT`
- **App:** `APP_URL`, `NODE_ENV`

---

## 12. Среди и деплой

- **Local:** Postgres + Stripe CLI (за webhook forwarding), test ключове.
- **Production:** managed Postgres, реален Stripe webhook endpoint, миграции през `prisma migrate deploy`. Подробности в `PRODUCTION_SETUP.md`.
- Миграциите никога не се прескачат; backup преди миграция в продукция.
