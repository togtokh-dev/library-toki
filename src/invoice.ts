import axios from "axios";
import TOKIPAY from ".";
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
const CREATE_DEEP_LINK = async (
  body: resDeeplinkT
): Promise<{
  success: boolean;
  message: string;
  data?: {
    deeplink: string;
  };
}> => {
  try {
    const res = await axios.post(
      `${TOKIPAY.host}/jump/v1/third-party/payment/deeplink`,
      {
        successUrl: body.successUrl || body.callback,
        failureUrl: body.successUrl || body.callback,
        orderId: body.orderId,
        merchantId: TOKIPAY.merchant_id || body.merchantId,
        amount: body.amount,
        notes: body.notes,
        appSchemaIos: body.appSchemaIos || undefined,
        authorization: `Basic ${TOKIPAY.token}`,
        tokiWebSuccessUrl: body.successUrl || body.callback,
        tokiWebFailureUrl: body.successUrl || body.callback,
      },
      {
        headers: {
          Authorization: `Basic ${TOKIPAY.token.third_party_token}`,
          api_key: "third_party_pay",
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.statusCode == 200 && res.data?.data?.deeplink) {
      console.log(res.data.data);
      return {
        success: true,
        message: "success",
        data: {
          deeplink: res.data.data.deeplink,
        },
      };
    } else {
      return {
        success: false,
        message: res.data.message || "",
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};

const CREATE_QR_CODE = async (
  body: resQrT
): Promise<{
  success: boolean;
  message: string;
  data?: {
    qr: string;
  };
}> => {
  try {
    const res = await axios.post(
      `${TOKIPAY.host}/jump/v1/spose/payment/request`,
      {
        successUrl: body.successUrl || body.callback,
        failureUrl: body.successUrl || body.callback,
        orderId: body.orderId,
        merchantId: TOKIPAY.merchant_id || body.merchantId,
        amount: body.amount,
        notes: body.notes,
        authorization: `Basic ${TOKIPAY.token.spose_token}`,
      },
      {
        headers: {
          Authorization: `Basic ${TOKIPAY.token.spose_token}`,
          api_key: "spos_pay",
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.statusCode == 200 && res.data?.data?.requestId) {
      console.log(res.data.data);
      return {
        success: true,
        message: "success",
        data: {
          qr: `/SPOS/${res.data.data.requestId}`,
        },
      };
    } else {
      return {
        success: false,
        message: res.data.message || "",
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};

const CREATE_PHONE_NUMBER = async (
  body: resPhoneT
): Promise<{
  success: boolean;
  message: string;
  data?: {
    deeplink: string;
    requestId: string;
  };
}> => {
  try {
    const res = await axios.post(
      `${TOKIPAY.host}/jump/v1/third-party/payment/request`,
      {
        successUrl: body.successUrl || body.callback,
        failureUrl: body.successUrl || body.callback,
        orderId: body.orderId,
        merchantId: TOKIPAY.merchant_id || body.merchantId,
        amount: body.amount,
        notes: body.notes,
        phoneNo: body.phoneNo,
        countryCode: body.countryCode || "+976",
        authorization: `Basic ${TOKIPAY.token}`,
        tokiWebSuccessUrl: body.successUrl || body.callback,
        tokiWebFailureUrl: body.successUrl || body.callback,
      },
      {
        headers: {
          Authorization: `Basic ${TOKIPAY.token}`,
        },
      }
    );
    if (res.data.statusCode == 200) {
      return {
        success: true,
        message: "success",
        data: null,
      };
    } else {
      return {
        success: false,
        message: res.data.message || "",
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};
const TRANS_REQUEST_ID = async (
  transRequestId: string,
  token: string
): Promise<{
  success: boolean;
  message: string;
  data?: null;
}> => {
  try {
    const res = await axios.get(
      `${TOKIPAY.host}/jump/v1/shoppy/transaction-status?transRequestId=${transRequestId}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
          authorization: "bearer " + token,
          im_api_key: "shoppy123",
        },
      }
    );
    if (res.data.statusCode == 200) {
      return {
        success: true,
        message: "success",
        data: null,
      };
    } else {
      return {
        success: false,
        message: res.data.message || "",
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};
const REQUEST_ID = async (
  requestId: string
): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> => {
  try {
    const res = await axios.get(
      `${TOKIPAY.host}/jump/v1/spose/payment/status?requestId=${requestId}`,
      {
        headers: {
          Authorization: `Basic ${TOKIPAY.token.spose_token}`,
          api_key: "spos_pay",
          "Content-Type": "application/json",
        },
      }
    );
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
    } else {
      return {
        success: false,
        message: res.data.message || "",
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};
export default {
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
