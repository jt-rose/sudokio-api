import express from "express"
import morgan from "morgan"

const app = express()

app.use(morgan("dev")) // log incoming reqs

app.get("/api", (req, res) => {
    res.end("insert API instructions here")
})

app.listen(3000, () => console.log("Listening on Port 3000"))