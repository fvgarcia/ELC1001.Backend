module.exports = (app) => {
    const garment = require('../controllers/garment.controller');
    const auth = require('../middleware/auth');

    app.get('/api/v1/garment', auth, garment.getAll);
    app.get('/api/v1/garment/:garmentId', auth, garment.getById);
    app.post('/api/v1/garment/create', auth, garment.create);
}