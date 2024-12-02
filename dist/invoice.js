"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const _1 = require(".");
const axiosInstance = axios_1.default.create({
    timeout: 20000, // 20 seconds
});
const CREATE_DEEP_LINK = async (body) => {
    var _a, _b, _c, _d, _e;
    try {
        const res = await axiosInstance.post(`${_1.default.host}/jump/v1/third-party/payment/deeplink`, {
            successUrl: body.successUrl || body.callback,
            failureUrl: body.successUrl || body.callback,
            orderId: body.orderId,
            merchantId: _1.default.merchant_id || body.merchantId,
            amount: body.amount,
            notes: body.notes,
            appSchemaIos: body.appSchemaIos || undefined,
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
        const res = await axiosInstance.post(`${_1.default.host}/jump/v1/spose/payment/request`, {
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
const CREATE_PHONE_NUMBER = async (body) => {
    var _a, _b, _c;
    try {
        const res = await axiosInstance.post(`${_1.default.host}/jump/v1/third-party/payment/request`, {
            successUrl: body.successUrl || body.callback,
            failureUrl: body.successUrl || body.callback,
            orderId: body.orderId,
            merchantId: _1.default.merchant_id || body.merchantId,
            amount: body.amount,
            notes: body.notes,
            phoneNo: body.phoneNo,
            countryCode: body.countryCode || "+976",
            authorization: `Basic ${_1.default.token}`,
            tokiWebSuccessUrl: body.successUrl || body.callback,
            tokiWebFailureUrl: body.successUrl || body.callback,
        }, {
            headers: {
                Authorization: `Basic ${_1.default.token}`,
            },
        });
        if (res.data.statusCode == 200) {
            return {
                success: true,
                message: "success",
                data: null,
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
        console.log("FAILED", (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        return {
            success: false,
            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "error",
        };
    }
};
const TRANS_REQUEST_ID = async (transRequestId, token) => {
    var _a, _b, _c;
    try {
        const res = await axiosInstance.get(`${_1.default.host}/jump/v1/shoppy/transaction-status?transRequestId=${transRequestId}`, {
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json",
                authorization: "bearer " + token,
                im_api_key: "shoppy123",
            },
        });
        if (res.data.statusCode == 200) {
            return {
                success: true,
                message: "success",
                data: null,
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
        console.log("FAILED", (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        return {
            success: false,
            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "error",
        };
    }
};
const REQUEST_ID = async (requestId) => {
    var _a, _b, _c;
    try {
        const res = await axiosInstance.get(`${_1.default.host}/jump/v1/spose/payment/status?requestId=${requestId}`, {
            headers: {
                Authorization: `Basic ${_1.default.token.spose_token}`,
                api_key: "spos_pay",
                "Content-Type": "application/json",
            },
        });
        console.log(res.data);
        if (res.data.statusCode == 200) {
            if (res.data.data.status == "COMPLETED") {
                return {
                    success: true,
                    message: "success",
                    data: res.data.data,
                };
            }
            return {
                success: false,
                message: res.data.message,
                data: res.data.data,
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
        console.log("FAILED", (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        return {
            success: false,
            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "error",
        };
    }
};
exports.default = {
    CREATE: {
        QR: CREATE_QR_CODE,
        DEEP_LINK: CREATE_DEEP_LINK,
        SEND_INVOCIE: CREATE_PHONE_NUMBER,
    },
    CHECK: {
        TRANS_REQUEST_ID,
        REQUEST_ID,
    },
};
