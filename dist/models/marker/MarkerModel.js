"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const markerSchema = new mongoose_2.Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    // @ts-ignore
    owner: {
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
    },
}, { collection: 'markers', timestamps: true });
const MarkerModel = (0, mongoose_1.model)('Marker', markerSchema);
exports.default = MarkerModel;
