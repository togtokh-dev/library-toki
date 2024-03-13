import axios from "axios";
import TOKIPAY from "./";

const TOKEN = async (
  host: "prod" | "staging",
  body: {
    username: string;
    password: string;
    third_party_token?: string;
    spose_token?: string;
    merchant_id?: string;
  }
): Promise<{
  success: boolean;
  message: string;
}> => {
  TOKIPAY.host = TOKIPAY.hosts[host];
  try {
    TOKIPAY.token.spose_token = body.spose_token;
    TOKIPAY.token.third_party_token = body.third_party_token;
    TOKIPAY.merchant_id = body.merchant_id;
  } catch (error) {
    return {
      success: false,
      message: "error",
    };
  }
};
export default { TOKEN };
