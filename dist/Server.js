"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
require("express-async-errors");
const Logger_1 = __importDefault(require("./shared/Logger"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const marker_router_1 = __importDefault(require("./routes/marker.router"));
const app = (0, express_1.default)();
const { BAD_REQUEST } = http_status_codes_1.default;
/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// Security
if (process.env.NODE_ENV === 'production') {
    app.use((0, helmet_1.default)());
}
// Add APIs
app.use('/api/', user_router_1.default);
app.use('/api/auth', auth_router_1.default);
app.use('/api/', marker_router_1.default);
// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    Logger_1.default.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});
// Export express instance
exports.default = app;
