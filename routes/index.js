const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'rsalmon.feedback@gmail.com',
         pass: process.env.GMAIL_PASSWORD
     }
 });

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Feedback' });
});

router.post('/feedback', (req, res) => {
  const mailOptions = {
    from: 'rsalmon.feedback@gmail.com', // sender address
    to: 'thealfreds90@gmail.com', // list of receivers
    subject: 'Feedback', // Subject line
    html: `<p>${req.body.firstname || 'Anonymous'}:</p> <p>${req.body.subject}</p>`
  };

  console.log(mailOptions);

  transporter.sendMail(mailOptions, function (err, info) {
    if(err) {
      console.log(err)
      return res.render('error', {error: err, message: err.message});
    }
    
    return res.render('thaanks');
 });
})

module.exports = router;
