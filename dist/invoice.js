"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const _1 = require(".");
const CREATE_DEEP_LINK = async (body) => {
    var _a, _b, _c, _d, _e;
    try {
        const res = await axios_1.default.post(`${_1.default.host}/jump/v1/third-party/payment/deeplink`, {
            successUrl: body.successUrl || body.callback,
            failureUrl: body.successUrl || body.callback,
            orderId: body.orderId,
            merchantId: _1.default.merchant_id || body.merchantId,
            amount: body.amount,
            notes: body.notes,
            appSchemaIos: body.appSchemaIos || "skype://",
            authorization: `Basic ${_1.default.token}`,
            tokiWebSuccessUrl: body.successUrl || body.callback,
            tokiWebFailureUrl: body.successUrl || body.callback,
        }, {
            headers: {
                Authorization: `Basic ${_1.default.token.third_party_token}`,
                api_key: "third_party_pay",
                "Content-Type": "application/json",
            },
        });
        if (res.data.statusCode == 200 && ((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.deeplink)) {
            console.log(res.data.data);
            return {
                success: true,
                message: "success",
                data: {
                    deeplink: res.data.data.deeplink,
                },
            };
        }
        else {
            return {
                success: false,
                message: res.data.message || "",
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data);
        return {
            success: false,
            message: ((_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message) || "error",
        };
    }
};
const CREATE_QR_CODE = async (body) => {
    var _a, _b, _c, _d, _e;
    try {
        const res = await axios_1.default.post(`${_1.default.host}/jump/v1/spose/payment/request`, {
            successUrl: body.successUrl || body.callback,
            failureUrl: body.successUrl || body.callback,
            orderId: body.orderId,
            merchantId: _1.default.merchant_id || body.merchantId,
            amount: body.amount,
            notes: body.notes,
            authorization: `Basic ${_1.default.token.spose_token}`,
        }, {
            headers: {
                Authorization: `Basic ${_1.default.token.spose_token}`,
                api_key: "spos_pay",
                "Content-Type": "application/json",
            },
        });
        if (res.data.statusCode == 200 && ((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.requestId)) {
            console.log(res.data.data);
            return {
                success: true,
                message: "success",
                data: {
                    qr: `/SPOS/${res.data.data.requestId}`,
                },
            };
        }
        else {
            return {
                success: false,
                message: res.data.message || "",
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data);
        return {
            success: false,
            message: ((_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message) || "error",
        };
    }
};
const CALLBACK = async (body) => {
    var _a, _b, _c, _d, _e;
    try {
        const res = await axios_1.default.post(`${_1.default.host}/jump/v1/third-party/payment/deeplink`, {
            successUrl: body.successUrl || body.callback,
            failureUrl: body.successUrl || body.callback,
            orderId: body.orderId,
            merchantId: _1.default.merchant_id || body.merchantId,
            amount: body.amount,
            notes: body.notes,
            appSchemaIos: body.appSchemaIos || "skype://",
            authorization: `Basic ${_1.default.token}`,
            tokiWebSuccessUrl: body.successUrl || body.callback,
            tokiWebFailureUrl: body.successUrl || body.callback,
        }, {
            headers: {
                Authorization: `Basic ${_1.default.token}`,
            },
        });
        if (res.data.statusCode == 200 && ((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.deeplink)) {
            return {
                success: true,
                message: "success",
                data: {
                    deeplink: res.data.data.deeplink,
                    requestId: res.data.data.requestId,
                },
            };
        }
        else {
            return {
                success: false,
                message: res.data.message || "",
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data);
        return {
            success: false,
            message: ((_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message) || "error",
        };
    }
};
exports.default = { CREATE: { QR: CREATE_QR_CODE, DEEP_LINK: CREATE_DEEP_LINK } };
