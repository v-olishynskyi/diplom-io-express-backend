"use strict";
// Put shared constants here
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStatus = exports.paramMissingError = void 0;
exports.paramMissingError = 'One or more of the required parameters was missing.';
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["SUCCESS"] = "success";
    ResponseStatus["FAILED"] = "failed";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
