const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const { transcode } = require("buffer");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: "shelbyltdx5@gmail.com",
        pass: "cakjmihgkfnxtvbd",
    },
});

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello");
})
app.post("/api", (req, res) => {
    console.log(req.body);
    const { name, email, message } = req.body;
    console.log(name, email, message);
    try {


        const mailOptions = {
            from: "shelbyltdx5@gmail.com",
            to: 'nsubhash2003@gmail.com',
            subject: "Sender Information",
            text: `Sender Deatils \n Name: ${name} ,Email : ${email} \n Message: ${message} \n . Have a Nice Day`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send("Error sending email");
            } else {
                console.log("Email sent: " + info.response);
                res.status(200).send("Email sent successfully");
            }
        });
    }
    catch (err) {
        console.log(err, "error");
        res.status(500).send("Error sending email")
    }
})
app.listen(process.env.PORT || 4000, () => {
    console.log("server started");
})