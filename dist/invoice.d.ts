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
type resPhoneT = {
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
        SEND_INVOCIE: (body: resPhoneT) => Promise<{
            success: boolean;
            message: string;
            data?: {
                deeplink: string;
                requestId: string;
            };
        }>;
    };
    CHECK: {
        TRANS_REQUEST_ID: (transRequestId: string, token: string) => Promise<{
            success: boolean;
            message: string;
            data?: null;
        }>;
        REQUEST_ID: (requestId: string) => Promise<{
            success: boolean;
            message: string;
            data?: any;
        }>;
    };
};
export default _default;
