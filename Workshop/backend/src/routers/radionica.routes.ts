import express from 'express'
import { RadionicaController } from '../controllers/radionica.controller';
import { UserController } from '../controllers/user.controller';


const radionicaRouter= express.Router();

radionicaRouter.route('/sve').get(
    (req,res)=> new RadionicaController().sveRadionice(req, res)
)
radionicaRouter.route('/pretrazi').post(
    (req,res)=> new RadionicaController().pretrazi(req, res)
)
radionicaRouter.route('/moje').post(
    (req,res)=> new RadionicaController().mojeRadionice(req, res)
)
radionicaRouter.route('/lajkovi').post(
    (req,res)=> new RadionicaController().lajkovi(req, res)
)
radionicaRouter.route('/obrisiLajk').post(
    (req,res)=> new RadionicaController().obrisiLajk(req, res)
)
radionicaRouter.route('/azurirajKomentar').post(
    (req,res)=> new RadionicaController().azurirajKomentar(req, res)
)
radionicaRouter.route('/obrisiKomentar').post(
    (req,res)=> new RadionicaController().obrisiKomentar(req, res)
)
radionicaRouter.route('/poruke').post(
    (req,res)=> new RadionicaController().poruke(req, res)
)
radionicaRouter.route('/posaljiPoruku').post(
    (req,res)=> new RadionicaController().posaljiPoruku(req, res)
)
radionicaRouter.route('/obrisiPrijavu').post(
    (req,res)=> new RadionicaController().obrisiPrijavu(req, res)
)
radionicaRouter.route('/svePrijave').post(
    (req,res)=> new RadionicaController().svePrijave(req, res)
)
radionicaRouter.route('/dodajLajk').post(
    (req,res)=> new RadionicaController().dodajLajk(req, res)
)
radionicaRouter.route('/sviLajkovi').post(
    (req,res)=> new RadionicaController().sviLajkovi(req, res)
)
radionicaRouter.route('/dodajKomentar').post(
    (req,res)=> new RadionicaController().dodajKomentar(req, res)
)
radionicaRouter.route('/dodajRadionicu').post(
    (req,res)=> new RadionicaController().dodajRadionicu(req, res)
)
radionicaRouter.route('/prihvatiRadionicu').post(
    (req,res)=> new RadionicaController().prihvatiRadionicu(req, res)
)
radionicaRouter.route('/obrisiRadionicu').post(
    (req,res)=> new RadionicaController().obrisiRadionicu(req, res)
)
radionicaRouter.route('/azurirajRadionicu').post(
    (req,res)=> new RadionicaController().azurirajRadionicu(req, res)
)
radionicaRouter.route('/sveKoordinate').post(
    (req,res)=> new RadionicaController().sveKoordinate(req, res)
)

radionicaRouter.route('/svaObavestenja').post(
    (req,res)=> new RadionicaController().svaObavestenja(req, res)
)

radionicaRouter.route('/obrisiObavestene').post(
    (req,res)=> new RadionicaController().obrisiObavestene(req, res)
)
radionicaRouter.route('/sacuvajZaObavestenje').post(
    (req,res)=> new RadionicaController().sacuvajZaObavestenje(req, res)
)
radionicaRouter.route('/prijaviMe').post(
    (req,res)=> new RadionicaController().prijaviMe(req, res)
)
radionicaRouter.route('/posaljiZaOtkazivanje').post(
    (req,res)=> new RadionicaController().posaljiZaOtkazivanje(req, res)
)
radionicaRouter.route('/svePrijaveIDRad').post(
    (req,res)=> new RadionicaController().svePrijaveIDRad(req, res)
)
radionicaRouter.route('/prihvatiPrijavu').post(
    (req,res)=> new RadionicaController().prihvatiPrijavu(req, res)
)
radionicaRouter.route('/poruke1').post( //za organizatora poruke
    (req,res)=> new RadionicaController().poruke1(req, res)
)
radionicaRouter.route('/svePrijave1').post( //za organizatora poruke
    (req,res)=> new RadionicaController().svePrijave1(req, res)
)
export default radionicaRouter;