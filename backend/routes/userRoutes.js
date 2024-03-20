const express=require('express')
const {registerUser, authUser,getAllUsers,deleteUser,updateUser, findByID}= require("../controllers/userControllers")

const router= express.Router()
router.post("/register",registerUser)
router.post("/login",authUser)

router.get("/:id",findByID)
router.get("/getAllUsers",getAllUsers)
router.delete('/:id', deleteUser);
router.put('/:id',updateUser)
// router.route('/').post(registerUser)
// router.route('/register').get(registerUser)
// router.post('/login',authUser)


// router.delete("deleteUser",)
module.exports=router;