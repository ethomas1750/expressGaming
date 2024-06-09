const express = require('express')
const logger = require('morgan')
const app = express()
const gameRouter = require('./routes/game/gameRouter')
const indexRouter = require('./routes/index/indexRouter')

app.use(logger('dev'))
app.use(express.json())
app.use("/", indexRouter)
app.use("/api/game", gameRouter)
app.listen(3000, ()=>{
    console.log("Server started on port 3000")
}) 

module.exports = app
