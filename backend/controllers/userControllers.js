const Users=require("../model/userRegistrationModel")
const asyncHandler= require("express-async-handler")

const generateToken= require("../config/generateToken")



// const registerUser= async(req,res)=>{

//     const data= await Users.findOne({userName:req.body.userName})

//     if(data){
//         res.json({
//             msg:"User already exists",
//             success:false
//         })
//     }else{
//         const data= await Users.create(req.body)
//         if(data){
//             res.json({
//                 msg:"Register Success",
//                 success: true,
//             })
//         }
//     }
// }

const registerUser= asyncHandler(async(req,res)=>{
    const {userName, password}= req.body;
// console.log(data)

if(!userName || !password){
    res.status(400)
    throw new Error("Please enter all the fields")
}
const userExists= await Users.findOne({userName})
if(userExists){
    res.status(400)
    throw new Error("User already exists")
}
const user= await Users.create({
    userName,
    password


})
if(user){
    res.status(201).json({
        _id: user._id,
        userName: user.userName,
        password:user.password,
        token:generateToken(user._id),
    })
}else{
    res.status(400);
    throw new Error("Failed to create the user")
}
})

const authUser= asyncHandler(async(req,res)=>{
    const {userName,password}=req.body
    const user= await Users.findOne({userName})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            userName: user.userName,
            password:user.password,
            token:generateToken(user._id),
        })
    }else{
        res.status(401);
        throw new Error("Invalid ID")
    }

})



const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await Users.find(); // Fetch all users from the database
    res.status(200).json(users); // Send the users as a JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" }); // Send an error response if something goes wrong
  }
});



// const deleteUser = asyncHandler(async (req, res) => {
//   try {
//     const userId = req.params.id; // Extract the user id from request parameters

//     // Check if the user exists
//     const user = await Users.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Delete the user
//     await Users.findByIdAndDelete(userId);
    
//     // Send a success response
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ message: "Error deleting user" }); // Send an error response if something goes wrong
//   }
// });

// const deleteUser = asyncHandler(async (req, res) => {
//     try {
//        // const { deleteUser } = req.params.id; // Extract user ID from request body
  
//         // Attempt to find the user by ID
//         const user = await Users.findByIdAndDelete(req.params.id);
//               res.status(200).json({user,message:"Suyccesssfuly"});

//              console.log(user)
             
        
// // console.log(userId)
// //         // If no user is found with the given ID, return 404
// //         if (!user) {
// //             return res.status(404).json({ success: false, message: 'User not found' });
// //         }

//         // If the user was found, delete it
//         // await Users.findByIdAndDelete(userId);

//         // Return success response
   
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

async function deleteUser(req,res){
    try {
        console.log(req.params.id, 'User not found');
        const deleteById = await Users.findByIdAndDelete(req.params.id)
        res.status(201).json(deleteById)
        
    } catch (error) {
        res.status(401).json(error)
    }
}



async function findByID(req,res){
    try {
        console.log(req.params.id, 'User not found');
        const findByid = await Users.findById(req.params.id)
        res.status(201).json(findByid)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

const updateUser = asyncHandler(async (req, res) => {
    try {
        // Extract the new username and the current username from the request body
        const id = req.params.id;

        // Find the user by their current username
        const updateUser = await Users.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(201).json({ success: true, message: 'User not found', updateUser });

      
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports={
    registerUser, 
    authUser,
    getAllUsers,
    deleteUser,
    updateUser,
    findByID

} 


