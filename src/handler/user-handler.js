const express = require('express');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
require('dotenv').config();

const userHandler = express.Router();

userHandler.get('/users', async (req, res) => {
  try {
    const users = await admin.firestore().collection('users').get();
    const userList = [];
    users.forEach((user) => {
      userList.push({
        idUser: user.id,
        name: user.data().name,
        image: user.data().image,
        username: user.data().username,
        email: user.data().email,
        password: user.data().password,
        address: user.data().address,
        hobbies: user.data().hobbies,
        job: user.data().job,
        skill: user.data().skill,
      });
    });
    res.status(200).json(userList);
  } catch (error) {
    console.error('Kesalahan mengambil user:', error);
    res.status(500).json({ error: 'Kesalahan Server Internal' });
  }
});

userHandler.get('/profiles' , async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Token tidak tersedia' });
        }

        const accessToken = authorizationHeader.replace('Bearer ', '');
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        constuserId = decodedToken.userId;

        constuserDoc = await admin.firestore().collection('users').doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User tidak ditemukan' });
        }

        constuser =userDoc.data();

        res.status(200).json(user);
    } catch (error) {
        console.error('Kesalahan mendapatkan data pengguna:', error);
        res.status(500).json({ error: 'Kesalahan Server Internal' });
    }
});

userHandler.put('/profiles' , async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Token tidak tersedia' });
        }

        const accessToken = authorizationHeader.replace('Bearer ', '');
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        constuserId = decodedToken.userId;

        const { name, address, hobbies, job, skill } = req.body;

        constuserDoc = await admin.firestore().collection('users').doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User tidak ditemukan' });
        }

        await admin.firestore().collection('users').doc(userId).update({
            name,
            address,
            hobbies,
            job,
            skill
        });

        res.status(200).json({ message: 'Profil berhasil diperbarui' });
    } catch (error) {
        console.error('Kesalahan memperbarui profil pengguna:', error);
        res.status(500).json({ error: 'Kesalahan Server Internal' });
    }
});

userHandler.delete('/profiles' , async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Token tidak tersedia' });
        }

        const accessToken = authorizationHeader.replace('Bearer ', '');
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        constuserId = decodedToken.userId;

        constuserDoc = await admin.firestore().collection('users').doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User tidak ditemukan' });
        }

        await admin.firestore().collection('users').doc(userId).delete();

        await admin.auth().deleteUser(userId);

        res.status(200).json({ message: 'User berhasil dihapus' });
    } catch (error) {
        console.error('Kesalahan menghapus pengguna:', error);
        res.status(500).json({ error: 'Kesalahan Server Internal' });
    }
});

module.exports =userHandler;
