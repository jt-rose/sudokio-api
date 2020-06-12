import express from "express"
import morgan from "morgan"

const app = express()

app.use(morgan("dev")) // log incoming reqs

// Provide API instructions
app.get("/api", (req, res) => {
    res.end("insert API instructions here")
})
/*
const sudokuGrid = "sudokuGrid"

// provide data on next recommended move
app.get(`/api/solve-next/:${sudokuGrid}`, (req, res) => {

})

// provide data on all remaining steps
app.get(`/api/solve-all/:${sudokuGrid}`, (req, res) => {
    
})

// provide data on recommended next strategy
app.get(`/api/strategy-next/:${sudokuGrid}`, (req, res) => {
    
})

// provide date on all remaining strategies needed
app.get(`/api/strategy-all/:${sudokuGrid}`, (req, res) => {
    
})

// provide full data on puzzle, same as 'solve-all' route
app.get(`/api/:${sudokuGrid}`, (req, res) => {
    
})
*/
// 404 - reject
app.use((req, res) => {
    res.status(404).end("404! No page found.")
})

app.listen(3000, () => console.log("Listening on Port 3000"))