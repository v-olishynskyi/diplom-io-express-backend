"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    family_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    avatar: String,
    gender: {
        type: String,
        enum: ['male', 'female', ''],
    },
    email_verified: { type: Boolean },
    // @ts-ignore
    markers: [{ type: mongoose_2.Types.ObjectId, ref: 'Marker' }],
}, { collection: 'users', timestamps: true });
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
