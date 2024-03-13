declare const _default: {
    token: {
        third_party_token: string;
        spose_token: string;
    };
    merchant_id: string;
    hosts: {
        staging: string;
        prod: string;
    };
    host: string;
    auth: {
        TOKEN: (host: "prod" | "staging", body: {
            username: string;
            password: string;
            third_party_token?: string;
            spose_token?: string;
            merchant_id?: string;
        }) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    invoice: {
        CREATE: {
            QR: (body: {
                callback: string;
                successUrl?: string;
                failureUrl?: string;
                orderId: string;
                merchantId?: string;
                amount: number;
                notes: string;
            }) => Promise<{
                success: boolean;
                message: string;
                data?: {
                    qr: string;
                };
            }>;
            DEEP_LINK: (body: {
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
            }) => Promise<{
                success: boolean;
                message: string;
                data?: {
                    deeplink: string;
                };
            }>;
        };
    };
};
export default _default;
export { default as invoice } from "./invoice";
