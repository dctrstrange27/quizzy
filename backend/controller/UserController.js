
const LoginUser = require('../models/user')

const login = async(req,res)=>{
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
  const { email_address, customer_name, picture, verified } = req.body
  const doesExist = await LoginUser.findOne({ email_address })

  if (doesExist) {
      return res.status(200).json({ userData: doesExist })
  }
  else {
      try {
          const newUser = await LoginUser.create({
              email_address: email_address,
              customer_name: customer_name, 
              profile_picture: picture,
              verified: verified,
          })
          return res.status(200).json({ userData: newUser })
      } catch (error) {
          console.log(error)
      }
  }
}
module.exports = {
    login,
    createGoogleAccount

}
