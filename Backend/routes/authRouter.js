// const express = require('express');
// const passport = require('passport');

// const AuthService = require('../services/authServices');

// const router = express.Router();
// const service = new AuthService();

// router.post('/login',
//   passport.authenticate('local', { session: false }),
//   async (req, res, next) => {
//     try {
//       const user = req.user;
//       res.json(service.signToken(user));
//     } catch (error) {
//       next(error);
//   }
// });

// router.post('/recovery',
//   async (req, res, next) => {
//     try {
//       const { email } = req.body;
//       const rta = await service.sendRecovery(email);
//       res.json(rta);
//     } catch (error) {
//       next(error);
//   }
// });

// router.post('/change-password' ,
//   async (res, next) => {
//     try {
//       const { token , newPassword } = req.body;
//       const rta = await service.changePassword(token, newPassword);
//       res.json(rta);
//     } catch (error) {
//       next(error);
//   }
// });


// module.exports = router;

// login con clerk momentaneo minetras la app escala
const express = require('express');
const { requireAuth } = require('@clerk/express');

const router = express.Router();
router.use(express.json());

router.post('/login', requireAuth(), async (req, res, next) => {
  try {
    const { address, phone } = req.body;
    const { userId } = req.auth;

    // Aquí puedes guardar datos personalizados del usuario
    const newProfile = await db.UserProfile.create({
      userId,
      address,
      phone
    });

    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
