module.exports = (app) => {
    const {createUser, getUser, modUser, postDataset} = require('../controllers/adminController');
    const { adminAuth } = require('../middleware/adminAuth');

    app.post('/energy/api/Admin/users', adminAuth, createUser)
    app.get('/energy/api/Admin/users/:UsernameF', adminAuth, getUser)
    app.put('/energy/api/Admin/users/:UsernameF', adminAuth, modUser)
    app.post('/energy/api/Admin/:DatasetF', adminAuth, postDataset)
}