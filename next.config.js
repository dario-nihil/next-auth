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
    mongodb_clustername: "cluster0",
    mongodb_database: "auth-demo-dev",
    NEXTAUTH_SECRET: "X5MwvZ+E5UCekd9E6Z5lFQAN8WUjM5Jdd/nF+/S6DhQ=",
  },
};

const nextConfigProd = {
  reactStrictMode: true,
  env: {
    mongodb_username: "dario",
    mongodb_password: "BNFJu2qjdTQXsTv4",
    mongodb_clustername: "cluster0",
    mongodb_database: "auth-demo",
    NEXTAUTH_SECRET: "X5MwvZ+E5UCekd9E6Z5lFQAN8WUjM5Jdd/nF+/S6DhQ=",
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
