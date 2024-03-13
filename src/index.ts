import auth from "./auth";
import invoice from "./invoice";
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
export default { token, merchant_id, hosts, host, auth, invoice };

export { default as invoice } from "./invoice";
