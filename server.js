const cli = require("next/dist/cli/next-start");
const port = process.env.PORT || 3000;
cli.nextStart(["-p", port]);
