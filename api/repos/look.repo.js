const Look = require('../models/look.model');

exports.getAll = async (ownerId) => {

    const looks = await Look.find({ owner: ownerId })
        .sort({ createdAt: -1 })
        .populate(['clothe_torso', 'clothe_leg', 'clothe_feet']);

    return looks;

}

exports.getById = async (lookId, ownerId) => {

    const look = await Look.find({ _id: lookId, owner: ownerId})
        .populate(['clothe_torso', 'clothe_leg', 'clothe_feet']);

    return look;
}

exports.create = async (look) => {

    const created = await Look.create(look);

    return created;

}