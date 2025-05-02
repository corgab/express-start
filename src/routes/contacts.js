import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../utils/prisma.js';

const router = Router();

function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).send({ msg: 'ID non valido' });
  }
  req.id = id;
  next();
}

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.send(users);
  } catch (err) {
    res
      .status(500)
      .send({ msg: 'Errore durante il recupero utenti', error: err.message });
  }
});

router.get('/:id', validateId, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.id,
      },
    });

    if (!user) return res.status(404).send({ msg: 'Utente non trovato' });

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({
      msg: 'Errore durante il recupero degli utenti',
      error: err.message,
    });
  }
});

router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Il nome è obbligatorio')
      .isLength({ min: 2 })
      .withMessage('Il nome deve avere almeno 2 caratteri'),
    body('email')
      .notEmpty()
      .withMessage('L’email è obbligatoria')
      .isEmail()
      .withMessage('Email non valida')
      .normalizeEmail(),
    body('number')
      .notEmpty()
      .withMessage('Il numero è obbligatorio')
      .isMobilePhone('it-IT')
      .withMessage('Numero non valido'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).send(errors.array());

    const { name, number, email } = req.body;

    try {
      const user = await prisma.user.create({
        data: { name, number, email },
      });

      res.status(201).send(user);
    } catch (err) {
      res.status(500).send({ msg: 'Errore nel server', error: err.meta.cause });
    }
  }
);

router.put(
  '/:id',
  validateId,
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Il nome è obbligatorio')
      .isLength({ min: 2 })
      .withMessage('Il nome deve avere almeno 2 caratteri'),
    body('email')
      .notEmpty()
      .withMessage('L’email è obbligatoria')
      .isEmail()
      .withMessage('Email non valida')
      .normalizeEmail(),
    body('number')
      .notEmpty()
      .withMessage('Il numero è obbligatorio')
      .isMobilePhone('it-IT')
      .withMessage('Numero non valido'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send(errors.array());

    const { name, number, email } = req.body;

    try {
      const newUser = await prisma.user.update({
        where: {
          id: req.id,
        },
        data: { name, number, email },
      });

      res
        .status(200)
        .send({ msg: 'Utente modificato con successo', data: newUser });
    } catch (err) {
      res.send({ msg: err.meta.cause });
    }
  }
);

router.delete('/:id', validateId, async (req, res) => {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: req.id,
      },
    });

    res
      .status(200)
      .send({ msg: 'Utente eliminato con successo', data: deleteUser });
  } catch (err) {
    res.send({ msg: err.meta.cause });
  }
});

export default router;
