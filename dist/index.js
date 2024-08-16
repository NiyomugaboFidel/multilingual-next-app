"use strict";

var _app = _interopRequireDefault(require("./app"));
require("dotenv/config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import { connection } from "./app";

var PORT = process.env.PORT || 6000;
// listenng on port (browser)
_app["default"].listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});