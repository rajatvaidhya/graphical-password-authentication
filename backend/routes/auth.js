const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const JWT_SEC = "A Holy River flowing in Taured just turned red.";
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

//ROUTE 1: Creating a SIGN-UP endpoint.
router.post(
  "/createuser",
  [
    body("username", "Username must be minimum of 3 characters.").isLength({
      min: 3,
    }), 
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must contain atleast 5 characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      let userName = await User.findOne({ username: req.body.username });

      if (user || userName) {
        return res.status(400).json({ success, error: "Sorry, user already exist." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secPass,
        rgbpattern: req.body.rgbpattern
      });

      //JSON Web Token (Authorization).
      const data = {
          user:{
              id:user.id
          }
      }

      const authtoken = jwt.sign(data, JWT_SEC);

      success=true;
    res.json({success, authtoken:authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);


//ROUTE 2: Creating a LOGIN endpoint.
router.post(
    "/login",
    [
      body("password", "Password cannot be blank.").exists(),
    ],
    async (req, res) => {

    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {username, password, rgbpattern} = req.body;

    try {
        let user = await User.findOne({username});
        if(!user)
        {
            success=false;
            return res.status(400).json({error:"Incorrect Credentials."})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(rgbpattern!==user.rgbpattern)
        {
          success=false;
          return res.status(400).json({success, error:"Incorrect Credentials."})
        }

        if(!passwordCompare)
        {
          success=false;
          return res.status(400).json({success, error:"Incorrect Credentials."})
        }

        const data = {
            user:{
                id:user.id
            }
        }
  
        const authtoken = jwt.sign(data, JWT_SEC);
        success=true;
      res.json({success, authtoken:authtoken});

    } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
    }
});



//ROUTE 3: Get User Details using Auth-Token
router.post("/getuser", fetchuser, async (req, res) => {

    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

module.exports = router;