import express from "express"
import morgan from "morgan"

import { checkAndSolveNext } from "./solvers/checkAndSolve"
import checkAndSolve from "./solvers/checkAndSolve"

const app = express()

app.use(morgan("dev")) // log incoming reqs

// Provide API instructions
app.get("/api", (req, res) => {
    res.end("insert API instructions here")
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

const samplePuzzleList = [
    {
        name: "testing",
        gridString: "testing"
    }
]

app.get("/api/sample/:sampleName", (req, res) => {
    const sample = samplePuzzleList.find(x => x.name === req.params.sampleName)
    if (sample) {
        const solution = checkAndSolve(sample.gridString)
        res.json(solution)
    } else {
        res.json({
            error: "no such sample found"
        })
    }
})

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