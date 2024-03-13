import TOKIPAY from "../src/index";
import { invoice } from "../src/index";
TOKIPAY.auth
  .TOKEN("staging", {
    username: "",
    password: "",
    merchant_id: "63355157543e6b7d9e7ba95b",
    third_party_token: "---",
    spose_token: "",
  })
  .then(async (r) => {
    const res = await TOKIPAY.invoice.CREATE.QR({
      callback: "http://www.google.com",
      orderId: "25772338780",
      amount: 4,
      notes: "dpp",
    });
    console.log(res);
    // const res = await TOKIPAY.invoice.CREATE.DEEP_LINK({
    //   callback: "http://www.google.com",
    //   orderId: "25772338780",
    //   amount: 4,
    //   notes: "dpp",
    // });
    // console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
