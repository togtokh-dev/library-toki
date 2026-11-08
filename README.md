# TokiPay

TokiPay payment-gateway client for Node.js and TypeScript — authenticate, create QR and deeplink invoices, send invoices by phone, and check payment status.

## Install

```bash
npm i @togtokh.dev/tokipay
```

## Features

- Token authentication against the `staging` or `prod` host.
- Create a QR-code invoice.
- Create a deeplink invoice (with optional iOS app schema and Toki web redirect URLs).
- Send an invoice to a phone number.
- Check payment status by transaction request id or by request id.

## Quick start

```ts
import TOKIPAY from "@togtokh.dev/tokipay";

async function main() {
  // Authenticate. The first argument selects the host: "prod" | "staging".
  const auth = await TOKIPAY.auth.TOKEN("staging", {
    username: "YOUR_USERNAME",
    password: "YOUR_PASSWORD",
    merchant_id: "YOUR_MERCHANT_ID",
    third_party_token: "YOUR_THIRD_PARTY_TOKEN",
    spose_token: "YOUR_SPOSE_TOKEN",
  });

  if (!auth.success) {
    console.error(auth.message);
    return;
  }

  // Create a QR invoice.
  const invoice = await TOKIPAY.invoice.CREATE.QR({
    callback: "https://example.com/tokipay/callback",
    orderId: "25772338780",
    amount: 4,
    notes: "Order #25772338780",
  });

  console.log(invoice.data?.qr);

  // Check status by request id.
  const status = await TOKIPAY.invoice.CHECK.REQUEST_ID("YOUR_REQUEST_ID");
  console.log(status.message, status.data);
}

main();
```

## API

### Config (default export)

The default export carries both the namespaces and mutable config state:

- `TOKIPAY.token: { third_party_token: string; spose_token: string }`
- `TOKIPAY.merchant_id: string`
- `TOKIPAY.hosts: { staging: string; prod: string }` — `staging` is `https://staging-apps.toki.mn`, `prod` is `https://app.toki.mn`.
- `TOKIPAY.host: string` — set from `hosts` when `auth.TOKEN` runs.

### auth

```ts
TOKIPAY.auth.TOKEN(
  host: "prod" | "staging",
  body: {
    username: string;
    password: string;
    third_party_token?: string;
    spose_token?: string;
    merchant_id?: string;
  }
): Promise<{ success: boolean; message: string }>
```

### invoice.CREATE

```ts
TOKIPAY.invoice.CREATE.QR(body: {
  callback: string;
  successUrl?: string;
  failureUrl?: string;
  orderId: string;
  merchantId?: string;
  amount: number;
  notes: string;
}): Promise<{ success: boolean; message: string; data?: { qr: string } }>
```

```ts
TOKIPAY.invoice.CREATE.DEEP_LINK(body: {
  callback: string;
  successUrl?: string;
  failureUrl?: string;
  orderId: string;
  merchantId?: string;
  amount: number;
  notes: string;
  appSchemaIos?: string;
  tokiWebSuccessUrl?: string;
  tokiWebFailureUrl?: string;
}): Promise<{ success: boolean; message: string; data?: { deeplink: string } }>
```

```ts
// Note: the method name is spelled SEND_INVOCIE in the library.
TOKIPAY.invoice.CREATE.SEND_INVOCIE(body: {
  callback: string;
  successUrl?: string;
  failureUrl?: string;
  orderId: string;
  merchantId?: string;
  amount: number;
  notes: string;
  phoneNo: number;
  countryCode?: string;
  tokiWebSuccessUrl?: string;
  tokiWebFailureUrl?: string;
}): Promise<{ success: boolean; message: string; data?: { deeplink: string; requestId: string } }>
```

### invoice.CHECK

```ts
TOKIPAY.invoice.CHECK.TRANS_REQUEST_ID(
  transRequestId: string,
  token: string
): Promise<{ success: boolean; message: string; data?: null }>
```

```ts
TOKIPAY.invoice.CHECK.REQUEST_ID(
  requestId: string
): Promise<{ success: boolean; message: string; data?: any }>
```

## Response

Every method resolves to a promise of:

```ts
{
  success: boolean;
  message: string;
  data?: ...; // present on some methods, as shown per method above
}
```

| Method | `data` |
| --- | --- |
| `auth.TOKEN` | — |
| `invoice.CREATE.QR` | `{ qr: string }` |
| `invoice.CREATE.DEEP_LINK` | `{ deeplink: string }` |
| `invoice.CREATE.SEND_INVOCIE` | `{ deeplink: string; requestId: string }` |
| `invoice.CHECK.TRANS_REQUEST_ID` | `null` |
| `invoice.CHECK.REQUEST_ID` | `any` |

## License

ISC
