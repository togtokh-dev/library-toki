type resDeeplinkT = {
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
};
type resQrT = {
    callback: string;
    successUrl?: string;
    failureUrl?: string;
    orderId: string;
    merchantId?: string;
    amount: number;
    notes: string;
};
declare const _default: {
    CREATE: {
        QR: (body: resQrT) => Promise<{
            success: boolean;
            message: string;
            data?: {
                qr: string;
            };
        }>;
        DEEP_LINK: (body: resDeeplinkT) => Promise<{
            success: boolean;
            message: string;
            data?: {
                deeplink: string;
            };
        }>;
    };
};
export default _default;
