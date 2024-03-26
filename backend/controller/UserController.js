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
exports.deleteSubj = exports.checkAccessList = exports.getQuestion = exports.getSubject = exports.addSubject = exports.createGoogleAccount = exports.login = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const Subject_1 = __importDefault(require("../models/Subject"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email_address, password } = req.body;
    if (!(email_address && password)) {
        return res.status(403).json({ error_message: "Payload Missing, Please provide all required information 💨" });
    }
    try {
        const doesExist = yield user_1.default.findOne({ email_address });
        if (!doesExist) {
            return res.status(404).json({ error_message: "Opps Sorry ! User doesn't Exist 😓" });
        }
        return res.status(200).json({ userData: doesExist });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
});
exports.login = login;
const createGoogleAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email_address, name, picture } = req.body;
    try {
        const doesExist = yield user_1.default.findOne({ email_address });
        if (doesExist) {
            return res.status(200).json({ userData: doesExist });
        }
        else {
            const newUser = yield user_1.default.create({
                email_address,
                name,
                profile_picture: picture
            });
            return res.status(200).json({ userData: newUser });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
});
exports.createGoogleAccount = createGoogleAccount;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUsers = yield user_1.default.find({});
        return res.status(200).json(getUsers);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
});
exports.getUsers = getUsers;
const getSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSubject = yield Subject_1.default.find({});
        return res.status(200).json(getSubject);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
});
exports.getSubject = getSubject;
const getQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, itemID } = req.body;
    try {
        const getOneSubj = yield Subject_1.default.findOne({ _id: id });
        if (getOneSubj) {
            return res.status(200).json(getOneSubj);
        }
        return res.status(404).json("Question not found!");
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
});
exports.getQuestion = getQuestion;
const addSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectCode, questions, accessCount, addedBy, picture } = req.body;
    try {
        if (!req.body) {
            res.status(400);
            throw new Error('Please add a text field');
        }
        const subject = yield Subject_1.default.findOne({ subjectCode });
        if (subject) {
            return res.status(400).json({ message: "Subject Already Exists!" });
        }
        yield Subject_1.default.create({
            subjectCode,
            questions,
            accessCount,
            addedBy,
            picture
        });
        const getSubject = yield Subject_1.default.find({});
        return res.status(200).json(getSubject);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
});
exports.addSubject = addSubject;
const deleteSubj = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    try {
        const subj = yield Subject_1.default.findByIdAndDelete(_id);
        return res.json({ "deleted Successfully": subj });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
});
exports.deleteSubj = deleteSubj;
const checkAccessList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, email } = req.body;
    try {
        const subject = yield Subject_1.default.findOne({ _id });
        if (!subject) {
            return res.status(404).json("Subject doesn't Exist");
        }
        const hasUser = subject.usersAccessedList.includes(email);
        if (hasUser) {
            return res.json(subject);
        }
        else {
            const updatedSubject = yield Subject_1.default.findOneAndUpdate({ _id }, { $push: { usersAccessedList: email } }, { new: true });
            return res.json(updatedSubject);
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
});
exports.checkAccessList = checkAccessList;
