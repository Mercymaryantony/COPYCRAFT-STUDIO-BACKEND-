const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const { usermodel } = require("./models/user")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://mercy1112:mercy1112@cluster0.8x8j3ya.mongodb.net/copyCraftDB?retryWrites=true&w=majority&appName=Cluster0")

const generatePassword = async (password) => {
    const salt = await bcrypt.genSalt(4)
    return bcrypt.hash(password, salt)
}




app.post("/signup", async (req, res) => {

    let input = req.body

    let hashedPassword = await generatePassword(input.password)
    console.log(hashedPassword)
    input.password = hashedPassword

    let users = new usermodel(input)
    users.save
    res.json({ "status": "success" })

})

app.listen(8080, () => {

    console.log("Server started")

})