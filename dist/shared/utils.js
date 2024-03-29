"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
function wait(ms) {
    return new Promise((resolve, _) => {
        setTimeout(resolve, ms);
    });
}
exports.wait = wait;
