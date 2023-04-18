const mong = require('mongoose')

const subject = mong.Schema({
    subjectCode:{
        type:String,
        required:[true,"Please add a subject"]
    },
    accessCount:{
      type:Number,
    },
     addedBy:{
      type:String,
      required:true,
    },
    picture:{
      type:String,
      required:true,
    },
     usersAccessedList:{
        type:[],
        default:[],
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

