const express = require('express');
const router = express.Router();

const controller = require('../controller/authController/auth.controller');
const verifyUser = require('../middleware/verifyUser');
router.get('/', (req, res) => {
    console.log("API is working");
})

router.post("/register",controller.register);
router.post("/login",controller.login);
router.get("/data",verifyUser,(req,res)=>{
    
})


module.exports = router;