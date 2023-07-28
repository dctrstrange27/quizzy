
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
const getUsers = async(req,res)=>{
    const getUsers = await LoginUser.find({})
    return res.status(200).json(getUsers)
}

// const getSubject=async(req,res)=>{
//     const itemID = req.body
//     const question = await Subject.findById({itemID})
//     if(question){
//         return res.status(200).json(question)
//     }
//     return res.status(500).json("didn't found the item!")
// }

const getSubject=async(req,res)=>{
    const getSubject = await Subject.find({})
   return res.status(200).json(getSubject)
}

const getQuestion=async(req,res)=>{
    const {id,itemID} = req.body
    try {
        const getOneSubj = await Subject.findOne({_id:id})
        if(getOneSubj){
            return res.status(200).json(getOneSubj)          
        }
        return res.status(200).json("question not found!")
    } catch (error) {
        console.log(error)       
    }
}

const addSubject = async (req, res) => {
    const {subjectCode,questions,accessCount,addedBy,picture} = req.body
    try {
        if (!req.body) {
            res.status(400)
            throw new Error('please add a text field')
        }
        const subject = await Subject.findOne({subjectCode:subjectCode})
        if (subject) {
            return res.status(400).json({ messge: "Subject Already Exist!" })
        }
        await Subject.create({
            subjectCode: `${subjectCode}`,
            questions: questions,
            accessCount:accessCount,
            addedBy:addedBy,
            picture:picture
        })
        const getSubject = await Subject.find({})
       return res.status(200).json(getSubject)

    } catch (error) {
        console.log(error)
    }
}

const deleteSubj= async(req,res)=>{
    const {_id} = req.body
    try {
        const subj = await Subject.findByIdAndDelete({_id})    
       return res.json({"deleted Successfully": subj})
    } catch (error) {
        console.log(error)
    }
}

const checkAccessList = async(req,res)=>{
    const {_id,email} = req.body
     try {
        const subject = await Subject.findOne({_id})
    if(subject){
        const hasUser = await subject.usersAccessedList.includes(email)
        if(hasUser){
        return res.json(subject)
        }else{
            const updatedSubject = await Subject.findOneAndUpdate(
                { _id },
                { $push: { usersAccessedList: email } },
                { new: true } // Return the updated document
              )
              res.json(updatedSubject)
            return res.json("users added")
        }
    }else{
        return res.json("Subject doesn't Exist")
    }
   } catch (error) {
    console.log(error)
   }
}

module.exports = {
    getUsers,
    login,
    createGoogleAccount,
    addSubject,
    getSubject,
    getQuestion,
    checkAccessList,
    deleteSubj,
}
