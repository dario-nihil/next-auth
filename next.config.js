const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
} = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfigDev = {
  reactStrictMode: true,
  env: {
    mongodb_username: "dario",
    mongodb_password: "BNFJu2qjdTQXsTv4",
    mongodb_cluster: "cluster0",
    mongodb_database: "auth-demo-dev",
  },
};

const nextConfigProd = {
  reactStrictMode: true,
  env: {
    mongodb_username: "dario",
    mongodb_password: "BNFJu2qjdTQXsTv4",
    mongodb_cluster: "cluster0",
    mongodb_database: "auth-demo",
  },
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return nextConfigDev;
  }

  if (phase === PHASE_PRODUCTION_SERVER) {
    return nextConfigProd;
  }
};
