const mongoose = require('mongoose');
const PlayerSchema = new mongoose.Schema({
    playerName: { 
        type: String,
        required: [true, "Player's name is required."],
        minlength: [2, "Player's name must be at least 2 characters long"]
    },
    preferredPosition: { type: String },
    game1: {
        type: String,
        default: "Undecided"
    },
    game2: {
        type: String,
        default: "Undecided"
    },
    game3: {
        type: String,
        default: "Undecided"
    }
}, { timestamps: true });
module.exports.Player = mongoose.model('Player', PlayerSchema);