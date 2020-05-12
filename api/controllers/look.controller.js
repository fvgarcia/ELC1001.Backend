const lookRepo = require('../repos/look.repo');

// Dica: você pode usar req.user para acessar informações do usuário que está fazendo a request.

exports.getAll = async (req, res) => {
    try {

        const { _id } = req.user;
        
        const looks = await lookRepo.getAll(_id);

        return res.status(200).send(looks);
        
    }
    catch(err) {
        console.error(err, err.message, err.stack);

        return res.status(500).send({
            message: "Error retrieving looks"
        });
    }
};

exports.getById = async (req, res) => {
    try {

        const { _id } = req.user;
        
        const { lookId } = req.params;

        const look = await lookRepo.getById(lookId, _id);

        return res.status(200).send(look);

    }
    catch(err) {
        console.error(err, err.message, err.stack);

        if(err.kind === 'ObjectId') {
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
    
        const look = await lookRepo.create(req.body);

        return res.status(201).send(look);

    }
    catch(err) {
        console.error(err, err.message, err.stack);

        return res.status(500).send({
            message: err || "An error occured when creating the look."
        });
    }
};