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
exports.MarkerController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const constants_1 = require("../shared/constants");
const UserModel_1 = __importDefault(require("../models/user/UserModel"));
const MarkerModel_1 = __importDefault(require("../models/marker/MarkerModel"));
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
exports.MarkerController = {
    all: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const markers = yield MarkerModel_1.default.find().populate('owner');
        return res.json({
            status: 'success',
            data: { markers },
        });
    }),
    allWithPagination: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const markers = yield MarkerModel_1.default.find().populate('owner');
        let page = 1;
        const per_page = 10;
        const pages = Math.ceil(markers.length / per_page);
        const total = markers.length;
        if (typeof ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page) === 'string' &&
            Number.parseInt((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.page)) {
            page = Number.parseInt(req.query.page);
        }
        const markersFromPage = markers.slice((page - 1) * per_page, page * per_page);
        const pager = {
            count: markersFromPage.length,
            total,
            per_page,
            page,
            pages,
        };
        return res.json({
            status: 'success',
            data: { markers: markersFromPage },
            meta: {
                pager,
            },
        });
    }),
    find: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(BAD_REQUEST).json({
                    error: constants_1.paramMissingError,
                });
            }
            const marker = yield MarkerModel_1.default.findById(id).populate('owner');
            if (!marker) {
                return res.status(404).json({
                    status: constants_1.ResponseStatus.FAILED,
                    error: {
                        code: 404,
                        message: 'Marker not found',
                    },
                });
            }
            return res.status(OK).json({ marker });
        }
        catch (error) {
            res.status(500).json({
                status: constants_1.ResponseStatus.FAILED,
                error,
            });
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { latitude, longitude, name, description, owner } = req.body;
            if (!latitude || !longitude || !name || owner) {
                return res.status(BAD_REQUEST).json({
                    error: constants_1.paramMissingError,
                });
            }
            const marker = new MarkerModel_1.default({
                latitude,
                longitude,
                name,
                description,
                owner,
            });
            const result = yield marker.save();
            yield UserModel_1.default.findByIdAndUpdate(owner, {
                $push: { markers: result.id },
            });
            return res.status(CREATED).send({ status: 'success', data: result });
        }
        catch (error) {
            return res.status(500).json({ status: constants_1.ResponseStatus.FAILED, error });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { latitude, longitude, name, description, owner } = req.body;
            if (!id) {
                return res.status(BAD_REQUEST).json({
                    error: constants_1.paramMissingError,
                });
            }
            const marker = yield MarkerModel_1.default.findByIdAndUpdate(id, {
                $set: {
                    latitude,
                    longitude,
                    name,
                    description,
                    owner,
                },
            });
            if (!marker) {
                return res.status(404).json({
                    // status: ResponseStatus.FAILED,
                    error: {
                        code: 404,
                        message: 'Marker not found',
                    },
                });
            }
            return res.status(OK).json({ status: 'success' });
        }
        catch (error) {
            res.status(500).json({
                // status: ResponseStatus.FAILED,
                code: 500,
                error,
            });
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
            const remove = yield MarkerModel_1.default.findByIdAndRemove(id).populate('owner');
            if (!remove) {
                return res.status(404).json({
                    // status: ResponseStatus.FAILED,
                    error: {
                        code: 404,
                        message: 'Marker not found',
                    },
                });
            }
            return res.status(200).json({ status: 'success', data: { remove } });
        }
        catch (error) {
            res.status(500).json({
                // status: ResponseStatus.FAILED,
                code: 500,
                error,
            });
        }
    }),
};
