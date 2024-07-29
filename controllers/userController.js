const User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    console.log("user controller  entered ")
    const { fname, lname, email, password, type, mobile } = req.body;
    console.log(req.body)

    try {
        const existingAdmin = await User.findOne({ type: 'admin' });

        if (type === 'admin' && existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists. Cannot register another admin.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        console.log(hashedPassword)
        const newUser = new User({ fname, lname, email, password:hashedPassword, type, mobile });

        await newUser.save();

        if (type === 'admin') {
            sendAdminNotification(email);
        }

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const sendAdminNotification = (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'G.S. Dada!',
            pass: 'hqkp qcxb jxyu fff'
        }
    });

    const mailOptions = {
        from: `${email}`,
        to: 'g.s.dadanoor@gmail.com',
        subject: 'Admin Registration Attempt',
        text: `An attempt was made to register as an admin with the email: ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
        console.log("usernot found")
      }
      console.log("user found")
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("comparing the password "+ "enteredpassword " +password + " storedpassword " +user.password)
  
      if (!isMatch) {

          console.log("password miss  match")
        return res.status(401).json({ message: 'Invalid  credentials' });

      }
  
      res.status(200).json({ 
   status: 'success', message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };