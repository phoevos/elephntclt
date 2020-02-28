module.exports = (app) => {
    const {createUser, getUser, modUser, postDataset} = require('../controllers/adminController');
    const { admin } = require('../middleware/admin');
    const { auth } = require('../middleware/auth');

    app.post('/energy/api/Admin/users', [auth, admin], createUser)
    app.get('/energy/api/Admin/users/:UsernameF', [auth, admin], getUser)
    app.put('/energy/api/Admin/users/:UsernameF', [auth, admin], modUser)
    app.post('/energy/api/Admin/:DatasetF', [auth, admin], postDataset)
}