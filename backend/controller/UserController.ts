import { Request, Response } from 'express';
import User from '../models/user';
import Subject from '../models/Subject';

const login = async (req: Request, res: Response): Promise<Response> => {
    const { email_address, password } = req.body;
    if (!(email_address && password)) {
        return res.status(403).json({ error_message: "Payload Missing, Please provide all required information 💨" });
    }
    try {
        const doesExist = await User.findOne({ email_address });
        if (!doesExist) {
            return res.status(404).json({ error_message: "Opps Sorry ! User doesn't Exist 😓" });
        }
        return res.status(200).json({ userData: doesExist });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
};

const createGoogleAccount = async (req: Request, res: Response): Promise<Response> => {
    const { email_address, name, picture } = req.body;
    try {
        const doesExist = await User.findOne({ email_address });
        if (doesExist) {
            return res.status(200).json({ userData: doesExist });
        } else {
            const newUser = await User.create({
                email_address,
                name,
                profile_picture: picture
            });
            return res.status(200).json({ userData: newUser });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
};

const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const getUsers = await User.find({});
        return res.status(200).json(getUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
};

const getSubject = async (req: Request, res: Response): Promise<Response> => {
    try {
        const getSubject = await Subject.find({});
        return res.status(200).json(getSubject);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
};

const getQuestion = async (req: Request, res: Response): Promise<Response> => {
    const { id, itemID } = req.body;
    try {
        const getOneSubj = await Subject.findOne({ _id: id });
        if (getOneSubj) {
            return res.status(200).json(getOneSubj);
        }
        return res.status(404).json("Question not found!");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
};

const addSubject = async (req: Request, res: Response): Promise<Response> => {
    const { subjectCode, questions, accessCount, addedBy, picture } = req.body;
    try {
        if (!req.body) {
            res.status(400);
            throw new Error('Please add a text field');
        }
        const subject = await Subject.findOne({ subjectCode });
        if (subject) {
            return res.status(400).json({ message: "Subject Already Exists!" });
        }
        await Subject.create({
            subjectCode,
            questions,
            accessCount,
            addedBy,
            picture
        });
        const getSubject = await Subject.find({});
        return res.status(200).json(getSubject);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
};

const deleteSubj = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.body;
    try {
        const subj = await Subject.findByIdAndDelete(_id);
        return res.json({ "deleted Successfully": subj });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
};

const checkAccessList = async (req: Request, res: Response): Promise<Response> => {
    const { _id, email } = req.body;
    try {
        const subject = await Subject.findOne({ _id });
        if (!subject) {
            return res.status(404).json("Subject doesn't Exist");
        }
        const hasUser = subject.usersAccessedList.includes(email);
        if (hasUser) {
            return res.json(subject);
        } else {
            const updatedSubject = await Subject.findOneAndUpdate(
                { _id },
                { $push: { usersAccessedList: email } },
                { new: true }
            );
            return res.json(updatedSubject);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
};

export {
    getUsers,
    login,
    createGoogleAccount,
    addSubject,
    getSubject,
    getQuestion,
    checkAccessList,
    deleteSubj,
};
