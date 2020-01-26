import { Helios } from "helios-client";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals
} from "unique-names-generator";

export const getSDK = async () =>
  await Helios.init({
    endpoint: "http://localhost:9999/proxy",
    token:
      "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJzcmMiOiJtZXJjdXJ5LmhlbGlvcy51aTU1IiwiaWF0IjoxNTc5Nzg5NTMzfQ.AecrjRyvQiW-QNvQscGsX0aaR3Z_xt0lGGZZmqfen64uYzTwJQyvJSj7NWGP_kWNiGU7r7K6q8yJz-ThBkl8VauzAHiaqkngnRIQZWpWLBmq5hZWLSRgY_AzTCDITGM4Ct-xvxxzVODYDn91GVE-EgLBb-Cu01noptuFYCSZ7bGGxcU8"
  });

export function getName(id) {
  let name = localStorage.getItem(id);
  if (!name) {
    name = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals]
    }); // big_red_donkey
    setName(id, name);
  }
  return name;
}

export function setName(id, name) {
  localStorage.setItem(id, name);
}
