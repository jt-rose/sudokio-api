import express from "express"
import morgan from "morgan"
import path from "path"

import { checkAndSolveNext } from "./solvers/checkAndSolve"
import checkAndSolve from "./solvers/checkAndSolve"
import sampleRoute from "./routes/sample"

const app = express()

app.use(morgan("dev")) // log incoming reqs


// Provide API instructions
app.get("/api", (req, res) => {
    res.sendFile(__dirname + "/public" + "/api.html")
})

const sudokuGrid = "sudokuGrid"

// provide data on next recommended move
app.get(`/api/solve-next/:${sudokuGrid}`, (req, res) => {
    const solution = checkAndSolveNext(req.params.sudokuGrid)
    res.json(solution)
})

// provide data on next recommended strategy
app.get(`/api/strategy-next/:${sudokuGrid}`, (req, res) => {
    const solution = checkAndSolveNext(req.params.sudokuGrid)
    if (solution.valid) {
        res.json(solution.strategiesUsed)
    } else {
        res.json(solution)
    }
})

// provide data on all remaining steps
app.get(`/api/solve-all/:${sudokuGrid}`, (req, res) => {
    const solution = checkAndSolve(req.params.sudokuGrid)
    res.json(solution)
})

// provide date on all remaining strategies needed
app.get(`/api/strategy-all/:${sudokuGrid}`, (req, res) => {
    const solution = checkAndSolve(req.params.sudokuGrid)
    if (solution.valid) {
        res.json(solution.strategiesUsed)
    } else {
        res.json(solution)
    }
})

// run sudoku solvers on sample puzzles
app.use("/api/sample", sampleRoute)

// provide full data on puzzle, same as 'solve-all' route
app.get(`/api/:${sudokuGrid}`, (req, res) => {
    const solution = checkAndSolve(req.params.sudokuGrid)
    res.json(solution)
})

// 404 - reject
app.use((req, res) => {
    res.status(404).end("404! No page found.")
})

app.listen(3000, () => console.log("Listening on Port 3000"))