import {Login} from "../models/login.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Admin} from "../models/login.js";

const JWT_SECRET ="143_admin";


export const addUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new Login({ username, password:hashedPassword});

    await newUser.save();

    console.log("New user added to DB:", newUser);

    res.status(201).json({ message: "User saved success", user: newUser });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error Savind Data" });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

   const existingUser = await Login.findOne({ username }); 
   if (!existingUser){
    return res.status(404).json({ message: "Invalid username " });
   }
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token=jwt.sign( 
      { userId: existingUser._id ,username: existingUser.username },
      JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    res.status(200).json({ message: "Token Generated successful",token });
    

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};




export const getStudDetails = async (req, res) => {
  try {
    const user = req.user; 
    res.status(200).json({
      message: `Hi ${user.username}, Welcome`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching details" });
  }
};


export const createStud = async (req, res) => {
  try {
    const studentData  = req.body;

    const newUser = new Admin(studentData);

    await newUser.save();

    console.log("New student added to DB:", newUser);

    res.status(201).json({ message: "Student saved success", user: newUser });
  } catch (error) {
    console.error("Error saving Student:", error);
    res.status(500).json({ message: "Error saving Data" });
  }
};




// export const getStud = async (req, res) => {
//   try {
//     const users = await Admin.find().sort({ createdAt: -1 });

//     const studStatus = users.map(student => {
//       const term1 = student.term1 || {};
//       const isPass =
//         term1.Malayalam >= 35 &&
//         term1.English >= 35 &&
//         term1.Science >= 35 &&
//         term1.Maths >= 35;

//       return {
//         ...student._doc,
//         status: isPass ? "Pass" : "Fail"
//       };
//     });

//     res.status(200).json({
//       message: "Student Details Fetched Success",
//       users: studStatus
//     });

//     console.log("Student details fetched", studStatus);
//   } catch (error) {
//     console.error("Error Fetching Student details:", error);
//     res.status(500).json({ message: "Error getting Data" });
//   }
// };


export const getStud = async (req, res) => {
  try {
    const users = await Admin.find().sort({ createdAt: -1 });

    const studStatus = users.map(student => {
      const terms = ['term1', 'term2', 'term3'];

      let totalMarks = 0;
      let isPass = true;

      for (const term of terms) {
        const termData = student[term] || {};

        const subjects = ['Malayalam', 'English', 'Science', 'Maths'];

        for (const subject of subjects) {
          const score = termData[subject] ?? 0;
          totalMarks += score;

          if (score < 35) {
            isPass = false;
          }
        }
      }

      return {
        ...student._doc,
        section: student.section,
        totalMarks,
        status: isPass ? "Pass" : "Fail"
      };
    });

    res.status(200).json({
      message: "Student Details Fetched Success",
      users: studStatus
    });

    console.log("Student details fetched", studStatus);
  } catch (error) {
    console.error("Error Fetching Student details:", error);
    res.status(500).json({ message: "Error getting Data" });
  }
};


export const patchStud = async (req, res) => {
  try {
    const { rollno } = req.body;

    if (!rollno) {
      return res.status(400).json({
        message: "Roll number of Student is required to update student Details",
      });
    }

const allowedFields = ["name", "section", "term1", "term2", "term3",  "totalMarks","status",];

    const updateData = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }
    console.log("Updating fields:", updateData);

    const updatedUser = await Admin.findOneAndUpdate(
      { rollno: rollno },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Student not found" });
    }

    console.log("Student updated", updatedUser);
    res.status(200).json({ message: "Student updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating Student", error);
    res.status(500).json({ message: "Error updating Student" });
  }
};



export const deleteStud = async(req,res)=>{
  try{

     const  rollno  = req.query.rollno;

    const popUser=await Admin.deleteOne({ rollno: rollno });
    res.status(200).json({message:"Student Deleted Successfully",popUser});
    console.log("Student deleted",rollno);
  }
    catch (error) {
    console.error("Error Deleting Student:", error);
    res.status(500).json({ message: "Error deleting Data" });
  }
};



const calculateTopPerformers = (users, termKey) => {
  return users
    .map(student => {
      const term = student[termKey] || {};
      const total =
        (term.Malayalam || 0) +
        (term.English || 0) +
        (term.Science || 0) +
        (term.Maths || 0);

      return {
        name: student.name,
        rollno: student.rollno,
        total,
              Malayalam: term.Malayalam || 0,
        English: term.English || 0,
        Science: term.Science || 0,
        Maths: term.Maths || 0,
      };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);
};

export const getTopTerm = (termKey) => async (req, res) => {
  console.log(` /Login/top-${termKey} hit`);
  try {
    const users = await Admin.find();
    const top3 = calculateTopPerformers(users, termKey);
    res.status(200).json({ topPerformers: top3 });
  } catch (error) {
    console.error(`Error fetching top performers for ${termKey}:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPassPercentage = async (req, res) => {
  try {
    const students = await Admin.find(); 

    const terms = ['term1', 'term2', 'term3', 'term4'];
    const subjects = ['Malayalam', 'English', 'Science', 'Maths'];

    const result = {};

    for (let term of terms) {
      result[term] = {};
      for (let subject of subjects) {
        let passCount = 0;
        students.forEach(student => {
          const mark = student[term]?.[subject];
          if (mark >= 35) passCount++;
        });
        result[term][subject] = (passCount / students.length) * 100;
      }
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error calculating pass percentage:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getSingleStud = async (req, res) => {
  try {
    const { rollno } = req.params;

    const student = await Admin.findOne({ rollno });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const terms = ['term1', 'term2', 'term3'];
    const subjects = ['Malayalam', 'English', 'Science', 'Maths'];

    let totalMarks = 0;
    let isPass = true;

    for (const term of terms) {
      const termData = student[term] || {};

      for (const subject of subjects) {
        const score = termData[subject] ?? 0;
        totalMarks += score;
        if (score < 35) {
          isPass = false;
        }
      }
    }

    const studentWithMeta = {
      ...student._doc,
      totalMarks,
      status: isPass ? "Pass" : "Fail",
    };

    res.status(200).json({ student: studentWithMeta });
    console.log("Fetched single student", studentWithMeta);
  } catch (error) {
    console.error("Error fetching student", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
