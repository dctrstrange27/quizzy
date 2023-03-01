const mong = require('mongoose')

const subject = mong.Schema({
    subjectCode:{
        type:String,
        required:[true,"Please add a subject"]
    },
    questions:{
        type:[],
        default:[],
    }
  },{
    timestamps:true
  }
)
module.exports = mong.model('subject',subject)

