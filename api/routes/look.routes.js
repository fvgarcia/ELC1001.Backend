module.exports = (app) => {
    const look = require('../controllers/look.controller');
    const auth = require('../middleware/auth');

    app.get('/api/v1/look', auth, look.getAll);
    app.get('/api/v1/look/:lookId', auth, look.getById);
    app.post('/api/v1/look/create', auth, look.create);
}