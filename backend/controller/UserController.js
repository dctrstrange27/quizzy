
const user = require('../models/user')
const LoginUser = require('../models/user')
const Subject = require('../models/Subject')

const login = async (req, res) => {
    const { email_address, password } = req.body
    if (!(email_address && password)) {
        return res.status(403).json({ error_message: "Payload Missing, Please provide all required information 💨" })
    }
    const doesExist = await LoginUser.findOne({ email_address })
    if (!doesExist) {
        return res.status(404).json({ error_message: "Opps Sorry ! User doesn't Exist 😓" })
    }
    return res.status(200).json({ userData: doesExist })
}

const createGoogleAccount = async (req, res) => {
    const { email_address, name, picture} = req.body
    const doesExist = await LoginUser.findOne({ email_address:email_address })
    if (doesExist) {
        return res.status(200).json({ userData: doesExist })
    }
    else {
        try {
            const newUser = await LoginUser.create({
                email_address: email_address,
                name: name,
                profile_picture: picture,
             
            })
            return res.status(200).json({ userData: newUser })
        } catch (error) {
            console.log(error)
        }
    }
}

const addSubject = async (req, res) => {
    const {subj, question } = req.body
    try {
        if (!req.body) {
            res.status(400)
            throw new Error('please add a text field')
        }
        const subject = await Subject.findOne({subjectCode:subj})
        if (subject) {
            return res.status(400).json({ messge: "Subject Already Exist!" })
        }
        const newSubject = await Subject.create({
            subjectCode: `${subj}`,
            questions: question,
        })
        res.status(200).json(newSubject)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login,
    createGoogleAccount,
    addSubject
}
