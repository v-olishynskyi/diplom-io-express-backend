"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const http_status_codes_1 = require("http-status-codes");
const UserModel_1 = __importDefault(require("../models/user/UserModel"));
const constants_1 = require("../shared/constants");
const http_errors_1 = __importDefault(require("http-errors"));
const { BAD_REQUEST, OK } = http_status_codes_1.StatusCodes;
exports.authController = {
    signIn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(BAD_REQUEST).json({
                    error: constants_1.paramMissingError,
                });
            }
            const user = yield UserModel_1.default.findOne({
                email: String(email).toLowerCase(),
            }).populate('markers');
            if (!user) {
                const error = new http_errors_1.default.NotFound('User not found');
                return res.status(400).json({
                    status: constants_1.ResponseStatus.FAILED,
                    error,
                });
            }
            return res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ status: constants_1.ResponseStatus.SUCCESS, data: { user } });
        }
        catch (error) {
            res.status(400).json({ status: constants_1.ResponseStatus.FAILED, error });
        }
    }),
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, username, name, family_name, email_verified } = req.body;
            if (!email || !username || !name || !family_name || !email_verified) {
                return res.status(BAD_REQUEST).json({
                    error: constants_1.paramMissingError,
                });
            }
            const user = new UserModel_1.default({
                email: String(email).toLowerCase(),
                name,
                username,
                family_name,
                email_verified,
            });
            const result = yield user.save();
            if (!result) {
                const error = (0, http_errors_1.default)(500, 'Register failed');
                return res.status(500).json({
                    status: constants_1.ResponseStatus.FAILED,
                    error: {
                        code: 500,
                        message: 'Register failed',
                        trace: this,
                    },
                });
            }
            return res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ status: constants_1.ResponseStatus.SUCCESS, data: result });
        }
        catch (error) {
            return res.status(400).json({ error });
        }
    }),
    signOut: (req, res) => {
        return res.status(http_status_codes_1.StatusCodes.OK).end();
    },
};
