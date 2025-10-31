"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbUtils_1 = require("./dbUtils/dbUtils");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', function (req, res, next) {
    res.status(200).json({
        success: true,
        data: "WORKINGGG",
    });
});
app.post('/insert', async function (req, res) {
    try {
        const { id, title } = req.body;
        await (0, dbUtils_1.insertData)(id, title);
        return res.status(200).json({
            success: true,
            data: req.body,
            message: "YAYYY successfully inserted data",
        });
    }
    catch (error) {
        return res.status(200).json({
            success: false,
            data: req.body,
            message: "Something went wrong inside insertData" + error,
        });
    }
});
app.post('/update', async function (req, res) {
    try {
        const { id, title } = req.body;
        await (0, dbUtils_1.updateData)(id, title);
        return res.status(200).json({
            success: true,
            data: req.body,
            message: "YAYYY successfully updated data",
        });
    }
    catch (error) {
        return res.status(200).json({
            success: false,
            data: req.body,
            message: "Something went wrong inside updateData" + error,
        });
    }
});
app.post('/delete', async function (req, res) {
    try {
        const { id } = req.body;
        await (0, dbUtils_1.deleteData)(id);
        return res.status(200).json({
            success: true,
            data: req.body,
            message: "YAYYY successfully deleted data",
        });
    }
    catch (error) {
        return res.status(200).json({
            success: false,
            data: req.body,
            message: "Something went wrong inside deleted data" + error,
        });
    }
});
app.listen(3000);
//# sourceMappingURL=index.js.map