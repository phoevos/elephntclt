module.exports = (app) => {
    const {createUser, getUser, modUser, postDataset} = require('../controllers/adminController');
    const { admin } = require('../middleware/admin');
    const { auth } = require('../middleware/auth');
    const multer = require('multer')
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './wena')
        },
        filename: function (req, file, cb) {
            cb(null, "indlovu")
        }
      })
      
    let upload = multer({ storage: storage })
      
    app.post('/energy/api/Admin/users', [auth, admin], createUser)
    app.get('/energy/api/Admin/users/:UsernameF', [auth, admin], getUser)
    app.put('/energy/api/Admin/users/:UsernameF', [auth, admin], modUser)
    app.post('/energy/api/Admin/:DatasetF', [auth, admin, upload.single('file')], postDataset)
}