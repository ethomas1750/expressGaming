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

router.get('/get-all-games',(req,res)=>{
    res.json(games)
})

router.get('/get-game-by-id/:id',(req,res)=>{
    const {id} = req.params
    const foundId = games.find(item => item.id === id)
    if(foundId){
        res.json(foundId)
    } else {
        res.json({message: "The game with the id does not exist, please check id"})
    }
})

router.post("/create-new-game",(req,res)=>{
    const {game} = req.body
    const {description} = req.body
    const newGame = {
        id:uuidv4(),
        game,
        description
    }
    if(!newGame.game||!newGame.description){
        res.json({message:"cannot leave text area blank"})
    } else {
        const newGameName = newGame.game
        const isThereAlreadyThatGame = games.find(item => item.game === newGameName)
        if(isThereAlreadyThatGame){
            res.json({message:'Game already exists, cannot add game'})
        }else{
            games.push(newGame)
            res.json({games})
        }
    }
})

router.put('/update-game/:id',(req,res)=>{
    const {id} = req.params
    const {game,description}= req.body
    const doesItExist = games.find(item => item.id === id)
    if(!doesItExist){
        res.json({message:"game not found, cannot update"})
    } else {
        if(game||description){
            if(game){
                doesItExist.game = game
            }
            if(description){
                doesItExist.description = description
            }
            res.json({games})
        } else {
            res.json({message:"no need to update"})
        }
    }
})
router.delete('/delete-game/:id',(req,res)=>{
    const {id}= req.params
    const gameToDelete = games.find(item => item.id === id)
    if(!gameToDelete){
        res.json({message:"game not found, cannot delete"})
    } else {
        games = games.filter(item => item.id !== id)
        res.json({games:games,
        message:'game deleted'})
    }
})

router.get('/get-game-by-name/:name',(req,res)=>{
    const {name}= req.params
    const searchGame = games.find(item => item.game === name)
    if(!searchGame){
        res.json({message: 'The game you are looking for does not exist'})
    } else {
        res.json(searchGame)
    }
})


module.exports = router
