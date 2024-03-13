declare const _default: {
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
export default _default;
