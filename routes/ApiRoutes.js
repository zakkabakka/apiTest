const express = require('express');
const userCtrl = require('../controllers/users');

exports.router = (() => {
    const router = express.Router();
    router.route('/user/register').post(userCtrl.register);
    router.route('/users').get(userCtrl.allUsers);
    router.route('/user/:id').get(userCtrl.findById);
    router.route('/user/:id').put(userCtrl.update);

    return router;
})();
