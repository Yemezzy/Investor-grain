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
exports.authenticateAdmin = void 0;
const UserModels_1 = __importDefault(require("../models/User/UserModels"));
const access_secret = process.env.USER_ACCESS_TOKEN_SECRET;
const authenticateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userInDB = yield UserModels_1.default.findOne({ username: user });
        userInDB.role = 'admin';
        if (userInDB.role !== 'admin') {
            return res.status(403).json({ message: "you are not authorized here" });
        }
        req.isAdmin = true;
        next();
    }
    catch (error) {
        return res.status(500).json('internal server error');
    }
});
exports.authenticateAdmin = authenticateAdmin;
