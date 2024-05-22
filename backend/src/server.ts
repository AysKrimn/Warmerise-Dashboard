import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose"
import 'dotenv/config'

const server = express()

// apis
import authAPI from "./API/auth"
import statAPI from "./API/stats"


server.use(express.json())

server.use(cors({

        credentials: true
}))

server.use(compression())
server.use(cookieParser())

http.createServer(server)

const port = 8080
const endpoint = `http://localhost:${port}/`
const DB_URI = process.env["DB_URI"]

server.listen(port, () => {

    console.log("alive at", endpoint)
})





mongoose.Promise = Promise
mongoose.connect(DB_URI)
mongoose.connection.on("error", (error: Error) => {

    console.log("ERR:", error)
})



// APIS
const base_api_endpoint = "/api/v1"

server.use(base_api_endpoint, authAPI)
server.use(base_api_endpoint, statAPI)