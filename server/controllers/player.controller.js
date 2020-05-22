const { Player } = require('../models/player.model');
module.exports.createPlayer = (request,response) =>{
    const { playerName, preferredPosition } = request.body;
    Player.create({playerName, preferredPosition})
        .then(player => response.json(player))
        .catch(err => response.status(400).json(err));
}
module.exports.getAllPlayers = (request, response) => {
    Player.find({})
        .then(players => response.json(players))
        .catch(err => response.json(err))
}
module.exports.showSinglePlayer = (request, response) => {
    Player.findOne({_id: request.params.id})
        .then(player => response.json(player))
        .catch(err => response.json(err))
}
module.exports.updatePlayer = (request,response) => {
    Player.findOneAndUpdate({_id:request.params.id}, request.body, { runValidators: true, new: true})
        .then(updatedPlayer => response.json(updatedPlayer))
        .catch(err => response.status(400).json(err))
}
module.exports.deletePlayer = (request, response) => {
    Player.deleteOne({_id: request.params.id})
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}