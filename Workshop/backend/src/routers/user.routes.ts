import express from 'express'
import { UserController } from '../controllers/user.controller';


const userRouter= express.Router();

userRouter.route('/login').post(
    (req,res)=> new UserController().login(req, res)
)
userRouter.route('/register').post(
    (req,res)=> new UserController().register(req, res)
)
userRouter.route('/novaLozinka').post(
    (req,res)=> new UserController().novaLozinka(req, res)
)
userRouter.route('/promenaLozinke').post(
    (req,res)=> new UserController().promenaLozinke(req, res)
)
userRouter.route('/dodajSliku').post(
    (req,res)=> new UserController().dodajSliku(req, res)
)
userRouter.route('/dohvatiKorisnika').post(
    (req,res)=> new UserController().dohvatiKorisnika(req, res)
)
userRouter.route('/azuriraj').post(
    (req,res)=> new UserController().azuriraj(req, res)
)
userRouter.route('/dohvatiSveKorisnike').post(
    (req,res)=> new UserController().dohvatiSveKorisnike(req, res)
)
userRouter.route('/azurirajKorisnika').post(
    (req,res)=> new UserController().azurirajKorisnika(req, res)
)
userRouter.route('/obrisiKorisnika').post(
    (req,res)=> new UserController().obrisiKorisnika(req, res)
)
userRouter.route('/posaljiMejl').post(
    (req,res)=> new UserController().posaljiMejl(req, res)
)
export default userRouter;