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
exports.userControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const constants_1 = require("../shared/constants");
const UserModel_1 = __importDefault(require("../models/user/UserModel"));
const { BAD_REQUEST, OK } = http_status_codes_1.default;
exports.userControllers = {
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield UserModel_1.default.find().populate('markers');
            return res.status(OK).json({ users });
        }
        catch (error) {
            res.status(500).json({ status: constants_1.ResponseStatus.FAILED, error });
        }
    }),
    getUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(BAD_REQUEST).json({
                    error: constants_1.paramMissingError,
                });
            }
            const user = yield UserModel_1.default.findById(id).populate('markers');
            if (!user) {
                return res.status(400).json({
                    status: constants_1.ResponseStatus.FAILED,
                    error: {
                        code: 400,
                        message: 'User not found',
                    },
                });
            }
            return res.status(OK).json({ user });
        }
        catch (error) {
            res.status(500).json({ status: constants_1.ResponseStatus.FAILED, error });
        }
    }),
    getUserByEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.params;
            if (!email) {
                return res.status(BAD_REQUEST).json({
                    error: constants_1.paramMissingError,
                });
            }
            const user = yield UserModel_1.default.findOne({
                email: String(email).toLowerCase(),
            }).populate('markers');
            if (!user) {
                return res.status(400).json({
                    status: constants_1.ResponseStatus.FAILED,
                    error: {
                        code: 400,
                        message: 'User not found',
                    },
                });
            }
            return res
                .status(OK)
                .json({ status: constants_1.ResponseStatus.SUCCESS, data: { user } });
        }
        catch (error) {
            res.status(500).json({ status: constants_1.ResponseStatus.FAILED, error });
        }
    }),
    getUserByUsername: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username } = req.params;
            if (!username) {
                return res.status(BAD_REQUEST).json({
                    error: constants_1.paramMissingError,
                });
            }
            const user = yield UserModel_1.default.findOne({
                username: String(username),
            }).populate('markers');
            if (!user) {
                return res.status(400).json({
                    status: constants_1.ResponseStatus.FAILED,
                    error: {
                        code: 400,
                        message: 'User not found',
                    },
                });
            }
            return res
                .status(OK)
                .json({ status: constants_1.ResponseStatus.SUCCESS, data: { user } });
        }
        catch (error) {
            res.status(500).json({ status: constants_1.ResponseStatus.FAILED, error });
        }
    }),
    // getOneUserByFilter: async (req: Request, res: Response) => {
    //   try {
    //     const { filter } = req.query;
    //     if (!filter) {
    //       return res.status(BAD_REQUEST).json({
    //         error: paramMissingError,
    //       });
    //     }
    //     const user = await UserModel.find(filter).populate('markers');
    //     if (!user) {
    //       return res.status(400).json({
    //         status: ResponseStatus.FAILED,
    //         error: {
    //           code: 400,
    //           message: 'User not found',
    //         },
    //       });
    //     }
    //     return res.status(OK).json({ user });
    //   } catch (error) {
    //     res.status(500).json({ status: ResponseStatus.FAILED, error });
    //   }
    // },
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req.body;
            if (!user) {
                return res.status(BAD_REQUEST).json({
                    error: constants_1.paramMissingError,
                });
            }
            const newUser = yield UserModel_1.default.findByIdAndUpdate(user.id, { $set: user }, { new: true, populate: 'markers' });
            return res
                .status(OK)
                .json({ status: constants_1.ResponseStatus.SUCCESS, data: { user: newUser } });
        }
        catch (error) {
            return res.status(500).json({ status: constants_1.ResponseStatus.FAILED, error });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(BAD_REQUEST).json({
                    error: constants_1.paramMissingError,
                });
            }
            const remove = yield UserModel_1.default.findByIdAndRemove(id).populate('owner');
            if (!remove) {
                return res.status(404).json({
                    status: constants_1.ResponseStatus.FAILED,
                    error: {
                        code: 400,
                        message: 'User not found',
                    },
                });
            }
            return res
                .status(200)
                .json({ status: constants_1.ResponseStatus.SUCCESS, data: { remove } });
        }
        catch (error) {
            res.status(500).json({
                status: constants_1.ResponseStatus.FAILED,
                error,
            });
        }
    }),
};
