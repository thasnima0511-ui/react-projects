import mongoose from "mongoose";

const loginSchema=new mongoose.Schema({


    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}


});
const Login =mongoose.model("Login",loginSchema);

const adminSchema = new mongoose.Schema({


 
    name: { type: String, required: true },
    rollno: { type: String, required: true, unique: true },

    // age: { type: Number, required: true },
    section:{type:String,required:true},
    // phone: [{ type: String}],
        // class: { type: String, required: true, unique: true },
            // class_teacher: { type: String, required: true, unique: true },
                // gender: { type: String, required: true, unique: true },



    term1: {
      Malayalam: { type: Number },
      English: { type: Number },
      Science: { type: Number},
      Maths: { type: Number }
    },
        term2: {
      Malayalam: { type: Number },
      English: { type: Number },
      Science: { type: Number},
      Maths: { type: Number }
    },
        term3: {
      Malayalam: { type: Number },
      English: { type: Number },
      Science: { type: Number},
      Maths: { type: Number }
    },
    
 totalMarks: Number,
  status: String
}, { timestamps: true });

const Admin = mongoose.model("Admin",adminSchema);


export { Login, Admin };


