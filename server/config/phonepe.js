import { StandardCheckoutClient, Env } from "@phonepe-pg/pg-sdk-node";

const phonePeClient = StandardCheckoutClient.getInstance(
  process.env.PHONEPE_CLIENT_ID,
  process.env.PHONEPE_CLIENT_SECRET,
  Number(process.env.PHONEPE_CLIENT_VERSION),
  Env.SANDBOX
);

export default phonePeClient;