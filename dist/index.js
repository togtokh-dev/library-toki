"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoice = void 0;
const auth_1 = require("./auth");
const invoice_1 = require("./invoice");
let merchant_id = "";
const token = {
    third_party_token: "",
    spose_token: "",
};
let host = "";
let hosts = {
    staging: "https://staging-apps.toki.mn",
    prod: " https://app.toki.mn",
};
exports.default = { token, merchant_id, hosts, host, auth: auth_1.default, invoice: invoice_1.default };
var invoice_2 = require("./invoice");
Object.defineProperty(exports, "invoice", { enumerable: true, get: function () { return invoice_2.default; } });
