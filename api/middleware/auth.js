const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async(req, res, next) => {
    try {
        // The token comes in the format "Bearer [token]"
        const token = req.header('Authorization').replace('Bearer ', '');
        // const data = jwt.verify(token, process.env.JWT_KEY);
        
        // const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        // if (!user) {
        //   throw new Error();
        // }

        const user = {
            _id: '5e9daadee3e24e3673d09095',
            account_activated: true,
            username: 'fake-user-name',
            email: 'fake@email.com',
            password: '$2a$12$m0V1icT/cktuDtrxpK30TuZODC1X20Vjj0yEFU3qtXY3Q7b1zB0Sq',
            tokens: [ ]
        };

        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        res.status(401).send({ error: 'Forbidden' });
    }

}
module.exports = auth;