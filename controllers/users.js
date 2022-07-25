const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncLib = require('async');

module.exports = {
    register: (req, res) => {
        console.log('hello register');

        let email = req.body.email;
        let password = req.body.password;
        let prenom = req.body.prenom;
        let age = req.body.age;
        let nom = req.body.nom;

        if (email == null || password == null || prenom == null || nom == null) {
            return res.status(400).json({ error: "missing datas" });
        }

        models.users.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then((userFound) => {
                if (!userFound) {
                    let data = {
                        email: email,
                        password: password,
                        nom: nom,
                        age: age,
                        prenom: prenom,
                        role: false

                    };
                    let newUser = models.users.create(data);

                } else {
                    return res.status(400).json({ error: "user exsist" });
                }
            })
            .then((newUser) => {
                return res.status(201).json({ success: "user created" });
            })

    },
    allUsers: (req, res) => {
        let attributes = ["id", "email", "password", "nom", "prenom", "age", "role"];
        models.users.findAll({
            attributes: attributes
        }).then((users) => {
            res.status(200).json(users)
        })

    },
    findById: (req, res) => {
        let id = req.params.id;
        let attributes = ["id", "email", "password", "nom", "prenom", "age", "role"];

        models.users.findOne({
            attributes: attributes,
            where: { id: id }
        }).then((users) => {
            res.status(200).json(users)
        })

    },
    update: (req, res) => {
        let id = req.params.id;
        let attributes = ["id", "email", "password", "nom", "prenom", "age", "role"];

        asyncLib.waterfall([
            (done) => {
                models.users.findOne({
                    attributes: attributes,
                    where: { id: id }
                }).then((userFound) => {
                    done(null, userFound);
                }).catch((err) => {
                    return res.status(500).json({ error: "user not found" + err })
                })
            },
            (userFound, done) => {
                if (userFound) {
                    let data = {
                        email: email ? req.body.email : userFound.email,
                        password: password ? req.body.password : userFound.password,
                        nom: nom ? req.body.nom : userFound.nom,
                        age: age ? req.body.age : userFound.age,
                        prenom: prenom ? req.body.prenom : userFound.prenom,
                        role: false
                    };
                    console.log('-------thomas', data);

                    console.log('hello---------------', data);
                    userFound.update(data).then((userFound) => {
                        console.log('tatat');
                        done(userFound);
                        //return res.status(200).json('profile updated succesly')
                    }).catch((error) => {
                        console.log('toto');
                        return res.status(400).json({ error: "user not updated" + error });
                    });
                }
            }
        ])

    }
};

// exports.register = (req, res) => {
//     console.log('hello register');

// }
