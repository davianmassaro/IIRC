export interface SnapResult {
  order_id: string;
  transaction_status: string;
  payment_type?: string;
  gross_amount?: string;
  fraud_status?: string;
  [key: string]: unknown;
}

export interface SnapPayOptions {
  onSuccess?: (result: SnapResult) => void;
  onPending?: (result: SnapResult) => void;
  onError?: (result: SnapResult) => void;
  onClose?: () => void;
  language?: "id" | "en";
  skipOrderSummary?: boolean;
}

export interface MidtransNotificationPayload {
  transaction_time: string;
  transaction_status: string;
  transaction_id: string;
  status_code: string;
  signature_key: string;
  payment_type: string;
  order_id: string;
  gross_amount: string;
  fraud_status?: string;
  currency: string;
  merchant_id?: string;
  va_numbers?: Array<{ va_number: string; bank: string }>;
  store?: string;
  acquirer?: string;
  issuer?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    snap: {
      pay(token: string, options?: SnapPayOptions): void;
      hide(): void;
    };
  }
}
