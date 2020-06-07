module.exports = (app) => {
    const wardrobe = require('../controllers/wardrobe.controller');
    const auth = require('../middleware/auth');

    app.get('/api/v1/wardrobe', auth, wardrobe.getAll);
    app.get('/api/v1/wardrobe/:wardrobeId', auth, wardrobe.getById);
    app.post('/api/v1/wardrobe/create', auth, wardrobe.create);
    app.post('/api/v1/wardrobe/:wardrobeId/add/:garmentId', auth, wardrobe.addGarment);
}