const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const { usermodel } = require("./models/user")
const { printmodel } = require("./models/print")
const { bindmodel } = require("./models/bind")
const { adminmodel } = require("./models/admin")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://gloria2001:gloria2001@cluster0.ipg35w1.mongodb.net/copyCraftDB?retryWrites=true&w=majority&appName=Cluster0")

const generatePassword = async (password) => {
    const salt = await bcrypt.genSalt(4)
    return bcrypt.hash(password, salt)
}



//api for sign Up user
app.post("/signup", async (req, res) => {

    let input = req.body

    let hashedPassword = await generatePassword(input.password)
    console.log(hashedPassword)
    input.password = hashedPassword

    let users = new usermodel(input)
    users.save()
    res.json({ "status": "success" })

})




//api for sign In
app.post("/login", (req, res) => {

    let input = req.body
    usermodel.find({ "email": req.body.email }).then(
        (response) => {
            if (response.length > 0) {
                let dbPassword = response[0].password
                console.log(dbPassword)
                bcrypt.compare(input.password, dbPassword, (error, isMatch) => {
                    if (isMatch) {
                        jwt.sign({ email: input.email }, "copycraft-app", { expiresIn: "1d" },
                            (error, token) => {
                                if (error) {
                                    res.json({ "status": "unable to create token" })
                                } else {
                                    res.json({ "status": "success", "userid": response[0]._id, "token": token })
                                }
                            })
                    } else {
                        res.json({ "status": "incorrect password" })
                    }
                })
            }
            else {
                res.json({ "status": "user not found" })
            }
        }
    )
})


//api for add print details
app.post("/addprint", (req, res) => {

    let input = req.body
    let prints = new printmodel(input)
    prints.save()
    res.json({ "status": "added" })

})

//api for add bind details
app.post("/addbind", (req, res) => {
    let input = req.body
    let binds = new bindmodel(input)
    binds.save()
    res.json({"status":"added"})
})


//api for student view print
app.post("/studentviewpirnt", (req, res) => {

    printmodel.find().then(

        (data) => {
            res.json(data)
        }
    ).catch(
        (error) => {
            res.json(error)
        }
    )

})

//api for student view for bind
app.post("/studentviewbind",(req,res)=>{
    bindmodel.find().then(
        (data)=>{
            res.json(data)
        }
    ).catch(
        (error)=>{
            res.json(error)
        }
    )
})



//print search for student
app.post("/studentPrintSearch",(req,res)=>{

    let input = req.body
    printmodel.find(input).then(

        (data)=>{
            res.json(data)
        }

    ).catch(
        (error)=>{
            res.send("error")
        }
    )

})




//bind search for student
app.post("/studentBindSearch",(req,res)=>{

    let input = req.body
    bindmodel.find(input).then(

        (data)=>{
            res.json(data)
        }

    ).catch(
        (error)=>{
            res.send("error")
        }
    )

})

//api for delete print of student by admin
app.post("/deletePrint", (req, res) => {

    let input = req.body
    printmodel.findByIdAndDelete(input._id).then(

        (response) => {
            res.json({"status":"deleted"})
         }

    ).catch(
        (error)=>{
            res.send("error")
        }
    )
})


//api for delete BIND of student by admin
app.post("/deleteBind", (req, res) => {

    let input = req.body
    bindmodel.findByIdAndDelete(input._id).then(

        (response) => {
            res.json({"status":"deleted"})
         }

    ).catch(
        (error)=>{
            res.send("error")
        }
    )




})


//api for sign Up admin
app.post("/adminsignup", async (req, res) => {

    let input = req.body

    let hashedPassword = await generatePassword(input.password)
    console.log(hashedPassword)
    input.password = hashedPassword

    let admins = new adminmodel(input)
    admins.save()
    res.json({ "status": "success" })

})



//api for sign In for Admin

app.post("/adminlogin", (req, res) => {

    let input = req.body
    adminmodel.find({ "email": req.body.email }).then(
        (response) => {
            if (response.length > 0) {
                let dbPassword = response[0].password
                console.log(dbPassword)
                bcrypt.compare(input.password, dbPassword, (error, isMatch) => {
                    if (isMatch) {
                        jwt.sign({ email: input.email }, "copycraft-app", { expiresIn: "1d" },
                            (error, token) => {
                                if (error) {
                                    res.json({ "status": "unable to create token" })
                                } else {
                                    res.json({ "status": "success", "userid": response[0]._id, "token": token })
                                }
                            })
                    } else {
                        res.json({ "status": "incorrect password" })
                    }
                })
            }
            else {
                res.json({ "status": "user not found" })
            }
        }
    )
})









app.listen(8080, () => {

    console.log("Server started")

})