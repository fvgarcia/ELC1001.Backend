const Look = require('../models/look.model');

// Dica: você pode usar req.user para acessar informações do usuário que está fazendo a request.

exports.getAll = async (req, res) => {
    try {
        const {skip = 0, limit = 20} = req.query;

        if (limit > 50) {
            return res.status(400).send({message: "BAD_REQUEST: Limit shoud not be bigger than 50"})
        }

        const looks = await Look
            .find({owner: req.user})
            .sort({createdAt: -1})
            .populate(['clothe_torso', 'clothe_leg', 'clothe_feet'])
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        const amountOfLooks = await Look.countDocuments({owner: req.user});

        res.status(200).send({
            totalAmount: amountOfLooks,
            retrievedAmount: looks.length,
            data: looks
        });
    } catch (err) {
        console.error(err, err.message, err.stack);

        return res.status(500).send({
            message: "Error retrieving looks"
        });
    }
};

exports.getById = async (req, res) => {
    try {
        const {lookId} = req.params;

        const look = await Look.findById(lookId)
            .populate(['clothe_torso', 'clothe_leg', 'clothe_feet']);

        // Verifica se o Look existe
        if (!look) {
            return res.status(404).send({
                message: "Look not found with id " + lookId
            });
        }

        // Verifica se o Look pertence ao usuário
        if (look.owner != req.user._id) {
            return res.status(403).send({
                message: "You can't access this Look " + lookId
            });
        }

        res.status(200).send(look);

    } catch (err) {
        console.error(err, err.message, err.stack);

        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Look not found with id " + req.params.lookId
            });
        }

        return res.status(500).send({
            message: "Error retrieving look with id " + req.params.lookId
        });
    }
};

exports.create = async (req, res) => {
    try {
        const look = new Look(req.body);
        look.owner = req.user;

        await look.save();
        res.status(201).send(look);
    } catch (err) {
        console.error(err, err.message, err.stack);

        if (err.name == 'ValidationError') {
            res.status(400).send({
                message: err.message
            });
        } else {
            res.status(500).send({
                message: err || "An error occured when creating the look."
            });
        }
    }
};