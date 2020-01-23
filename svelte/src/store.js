import { Helios } from "helios-client";

export const getSDK = async () =>
  await Helios.init({
    endpoint: "http://localhost:9999/proxy",
    token: ""
  });
