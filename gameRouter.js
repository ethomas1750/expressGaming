const express = require('express')
const router = express.Router()
const uuidv4 = require("uuid").v4

let games = [
    {
        id: "adowb1b3bb",
        game: "League of Legends",
        description: "League of Legends is a team-based game with over 140 champions to make epic plays with."
    },
    {
        id: "kd7b9ks2nda",
        game: "PlayerUnknown's Battlegrounds",
        description: "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback."
    }
    ]


router.get("/get-all-games", (req, res)=>{
    res.json(games)
})
router.get("/get-game-by-id/:id", (req, res)=>{
    const {id} = req.params
    const foundID = games.find(item => item.id === id)
    if(foundID){
        res.json(foundID)

    }else{
        res.json({message: "The game with the id does not exist, please check id"})
    } 
})
router.post("/create-new-game", (req, res)=>{
    const {game, description} = req.body
    const newGame = {
        id: uuidv4(),
        game,
        description
    }
    if(game === undefined || description === undefined){
        res.json({message: "cannot leave text area blank"})
    }if(newGame.game === game){
        res.json({message: "Game already exists, cannot add game"})
    }
    else{
        games.push(newGame)
        res.json(games)
    }
})
router.put("/update-game/:id", (req, res)=>{
    const {id} = req.params
    const {game, description} = req.body
    const updatedGame = games.find(item  => item.id === id)
    if(!updatedGame){
        res.json({message: "game not found, cannot update"})
    }else{
        if(game || description){
            if(game){
                updatedGame.game = game
            }
            if(description){
                updatedGame.description = description
            }
            res.json({games})
        }
    }
})
router.delete("/delete-game/:id", (req, res)=>{
    const {id} = req.params
    const foundGame = games.filter(item => item.id !== id)
    if(foundGame.length === games.length){
        res.json({message: "game not found, cannot delete"})
    }else{
        games = foundGame
        res.json({games})
    }
    // res.json({message: `${foundGame.length === games.length}`})
    // res.json(foundGame)

})



module.exports = router
