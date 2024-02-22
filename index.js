import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express()


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySql123##",
    database: "e-commerce",    
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("Kinda the best")
})

app.get("/items", (req, res) => {
    const q = "SELECT * FROM items"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })    
})

app.post("/items", (req, res) => {
    const q = "INSERT INTO items (`title`, `description`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
    ]
    db.query(q,[values], (err,data) => {
        if(err) return res.json(err)
        return res.json("added")
    })    
})


app.delete("/items/:id", (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM items WHERE id = ?"
    
    db.query(q,[itemId], (err,data) => {
        if(err) return res.json(err)
        return res.json("Delete successfully")
    })    
})

app.put("/items/:id", (req, res) => {
    const itemId = req.params.id
    const q = "UPDATE items SET `title`=?, `description`=?, `cover`=? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
    ]
    db.query(q,[...values, itemId], (err,data) => {
        if(err) return res.json(err)
        return res.json("Updated successfully")
    })    
})


app.listen(8800, () => {
    console.log("Listening")
})