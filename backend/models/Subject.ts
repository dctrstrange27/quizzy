const mong = require('mongoose')
import mongoose,{Schema,Document} from 'mongoose'

interface Subject extends Document {
  subjectCode:String,
  accessCount:Number;
  addedBy:string;
  picture:string;
  usersAccessedList:string[]
  questions:string[]
}

const SubjectSchema: Schema<Subject> = new Schema({
   subjectCode: {
      type: String,
      required: [true, "Please add a subject"],
   },
   accessCount: {
      type: Number,
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
});

const SubjectModel = mongoose.model<Subject>("Subject", SubjectSchema)

export default SubjectModel


// const subject = mong.Schema({
//     subjectCode:{
//         type:String,
//         required:[true,"Please add a subject"]
//     },
//     accessCount:{
//       type:Number,
//     },
//      addedBy:{
//       type:String,
//       required:true,
//     },
//     picture:{
//       type:String,
//       required:true,
//     },
//      usersAccessedList:{
//         type:[],
//         default:[],
//     },
//     questions:{
//         type:[],
//         default:[],
//     }
//   },{
//     timestamps:true
//   }
// )
// module.exports = mong.model('subject',subject)

