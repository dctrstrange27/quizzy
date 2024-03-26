"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
const port = process.env.PORT || 6000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsOptions));
(0, db_1.default)();
app.use('/api', user_1.default);
try {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
catch (error) {
    console.log(error);
}
