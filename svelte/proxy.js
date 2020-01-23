const httpProxy = require("http-proxy");

httpProxy
  .createServer({
    target: {
      protocol: "https:",
      host: "helios-stage-helios-ci.channels.ocs.oc-test.com",
      port: 443
    },
    changeOrigin: true
  })
  .listen(9999);
