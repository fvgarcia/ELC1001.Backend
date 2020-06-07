module.exports = (app) => {
    const user = require('../controllers/user.controller');
    const auth = require('../middleware/auth');

    app.post('/api/v1/user/register', user.create);
    app.post('/api/v1/user/login', user.login);

    // Auth required
    app.get('/api/v1/user/me', auth, user.getInfo);
}