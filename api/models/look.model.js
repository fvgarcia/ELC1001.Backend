const mongoose = require('mongoose');
const validator = require('validator');

const LookSchema = new mongoose.Schema({
    name: String,
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clothe_torso: { type: mongoose.Schema.Types.ObjectId, ref: 'Garment' },
    clothe_leg: { type: mongoose.Schema.Types.ObjectId, ref: 'Garment' },
    clothe_feet: { type: mongoose.Schema.Types.ObjectId, ref: 'Garment' },
    image_url: {
        type: String,
        validate: { 
            validator: value => validator.isURL(value, { protocols: ['http','https'], require_tld: true, require_protocol: false }),
            message: 'Invalid URL.' 
        }
    }
}, {
    timestamps: true
});

const Look = mongoose.model('Look', LookSchema);

module.exports = Look;
