import express from "express"
import checkAndSolve from "../solvers/checkAndSolve"
import {
    basicPuzzleGridString,
    hiddenTripleGridString,
    hiddenQuadGridString,
    XWingGridString1,
    swordfishGridString1,
    jellyfishGridString1,
    xChainGridString
} from "../gridSamplesForTesting"

const sampleList = [
    {
        name: "basic-puzzle",
        gridString: basicPuzzleGridString
    },
    {
        name: "hidden-triple",
        gridString: hiddenTripleGridString
    },
    {
        name: "hidden-quad",
        gridString: hiddenQuadGridString
    },
    {
        name: "x-wing",
        gridString: XWingGridString1
    },
    {
        name: "swordfish",
        gridString: swordfishGridString1
    },
    {
        name: "jellyfish",
        gridString: jellyfishGridString1
    },
    {
        name: "x-chain",
        gridString: xChainGridString
    }
]

const app = express.Router()
sampleList.forEach(sample => {
    app.get("/" + sample.name, (req, res) => {
        const solution = checkAndSolve(sample.gridString)
        res.json(solution)
    })
})

export default app