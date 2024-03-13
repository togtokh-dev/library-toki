"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const TOKEN = async (host, body) => {
    _1.default.host = _1.default.hosts[host];
    try {
        _1.default.token.spose_token = body.spose_token;
        _1.default.token.third_party_token = body.third_party_token;
        _1.default.merchant_id = body.merchant_id;
    }
    catch (error) {
        return {
            success: false,
            message: "error",
        };
    }
};
exports.default = { TOKEN };
