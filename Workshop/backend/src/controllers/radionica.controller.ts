import User from '../models/user';
import e, * as express from 'express';
import mongoose, { now } from 'mongoose';
import novaLozinka from '../models/novaLozinka';
import { MessageClient } from "cloudmailin"
import Radionica from '../models/radionica';
import Poruka from '../models/poruka'
import prisustvo from '../models/prisustvo';
import { isAnyArrayBuffer } from 'util/types';
import lajk from '../models/lajk';
import Lajk from '../models/lajk';
import { ObjectID } from 'bson';
import { json } from 'stream/consumers';
import prijave from '../models/prijave';
import Koordinate from '../models/koordinate';
import Obavesti from '../models/obavesti';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export class RadionicaController{
    
    sveRadionice=(req: express.Request, res: express.Response)=>{
        Radionica.find({}, (err, radionice)=>{
            if(err) console.log(err);
            else res.json(radionice)
           
        })
       

    }
    pretrazi=(req: express.Request, res: express.Response)=>{
        let n=req.body.naziv
        let m=req.body.mesto
        Radionica.find({'naziv': {$regex: req.body.naziv}, 'mesto':{$regex: req.body.mesto}}, (err, radionice)=>{
            if(err) console.log(err);
            else res.json(radionice)
            
        })
       

    }

    mojeRadionice=(req: express.Request, res: express.Response)=>{
        prijave.find({'korisnickoIme': req.body.korisnickoIme}, (err, prijave)=>{
            res.json(prijave);
        })
    }
    lajkovi=(req: express.Request, res: express.Response)=>{
        lajk.find({ 'korisnickoIme': req.body.korisnickoIme }, (err, data) => {
            res.json(data);
        });
    }
    sviLajkovi=(req: express.Request, res: express.Response)=>{
        lajk.find({}, (err, data) => {
            res.json(data);
        });
    }
    dodajLajk=(req: express.Request, res: express.Response)=>{
        lajk.find({ 'idRad': req.body.idRad, 'korisnickoIme': req.body.korisnickoIme }, (err, data) => {
            if(data.length==0){
                res.json("OK")
                let noviLajk= new Lajk({
                    korisnickoIme: req.body.korisnickoIme,
                    idRad:  req.body.idRad
                })
                noviLajk.save();
                Radionica.updateOne({ 'id': req.body.idRad }, {$inc: {'brojLajkova': 1}}, (err, data) => {
                    
                });
            }
        });
       
    }
    obrisiLajk=(req: express.Request, res: express.Response)=>{
        lajk.deleteOne({ 'korisnickoIme': req.body.korisnickoIme, 'idRad': req.body.idRad }, (err, data) => {

           Radionica.updateOne({ 'id': req.body.idRad }, {$inc: {'brojLajkova': -1}}, (err, data) => {
                    
                });
          
        });
       
    }
    obrisiKomentar=(req: express.Request, res: express.Response)=>{
        Radionica.findOne({ 'id': req.body.idRad }, (err, data) => {
            if(data){
                data.remove();
                let nasao=true;
                for (let i = 0; i < data.komentari.length; i++) {
                    if(data.komentari[i].tekst==req.body.komentar && nasao){
                        data.komentari.splice(i,1)
                        nasao=false;
                    }
                  }
                
                //console.log(data);
                const data1=new Radionica({
                    id: data.id,
                    mesto: data.mesto,
                    datum: data.datum,
                    slika: data.slika,
                    naziv: data.naziv,
                    opis: data.opis,
                    brojLajkova: data.brojLajkova,
                    komentari: data.komentari,
                })
                //console.log(data1)
                data1.save();
            }
        });
    }
    azurirajKomentar=(req: express.Request, res: express.Response)=>{
        Radionica.findOne({ 'id': req.body.idRad }, (err, data) => {
            if(data){
                data.remove();
                let nasao=true;
                for (let i = 0; i < data.komentari.length; i++) {
                    if(data.komentari[i].tekst==req.body.komentar && nasao){
                        data.komentari[i].tekst=req.body.noviKomentar
                        nasao=false;
                    }
                  }
                
                console.log(data);
                const data1=new Radionica({
                
                    id: data.id,
                    mesto: data.mesto,
                    datum: data.datum,
                    slika: data.slika,
                    naziv: data.naziv,
                    opis: data.opis,
                    brojLajkova: data.brojLajkova,
                    komentari: data.komentari,
                })
                //console.log(data1)
                data1.save();
            }
        });
    }

    poruke=(req: express.Request, res: express.Response)=>{
        Poruka.find({ 'korisnickoIme1': req.body.korisnickoIme }, (err, data) => {
            if(data){
                //log.console(data);
                res.json(data);
            }
        })
    }
    poruke1=(req: express.Request, res: express.Response)=>{
        Poruka.find({ 'idRad': req.body.idRad }, (err, data) => {
            if(data){
                //log.console(data);
                res.json(data);
            }
        })
    }

    posaljiPoruku=(req: express.Request, res: express.Response)=>{
        let korisnickoIme= req.body.korisnickoIme;
        Poruka.findOne({'idRad': req.body.idRad, "korisnickoIme1": korisnickoIme}, (err,data)=>{
            res.json("OK")
            if(data){
                data.remove();
                data.poruke.push(req.body.novaPoruka);
                const data1=new Poruka({
                    poruke:data.poruke,
                    korisnickoIme1: data.korisnickoIme1,
                    korisnickoIme2: data.korisnickoIme2,
                    slika1: data.slika1,
                    slika2: data.slika2,
                    idRad: data.idRad,
                    naziv: data.naziv
                })
                data1.save();
            }else{
                User.findOne({"korisnickoIme": req.body.korisnickoIme}, (err, kor1)=>{
                    let slika1=kor1.slika;
                    let koriscnikoIme1= req.body.korisnickoIme
                    Radionica.findOne({"id": req.body.idRad}, (err,radionica)=>{
                        if(radionica){
                            //console.log(radionica);
                            let naziv=radionica.naziv
                            User.findOne({"korisnickoIme": radionica.organizator}, (err,kor2)=>{
                                let slika2=kor2.slika                                
                                let koriscnikoIme2= radionica.organizator
                                let poruke= new Array();
                                poruke.push(req.body.novaPoruka)
                                const poruka=new Poruka({
                                    poruke: poruke,
                                    korisnickoIme1: koriscnikoIme1,
                                    korisnickoIme2: koriscnikoIme2,
                                    slika1: slika1,
                                    slika2: slika2,
                                    idRad: req.body.idRad,
                                    naziv: naziv
                                })
                                
                                //console.log(poruka);
                                poruka.save()
                                //res.json({'poruka': 'ok', "orgainzator": koriscnikoIme2});
                            })
                        }
                    })
                })
               

            }
        })
    }
    
    obrisiPrijavu=(req: express.Request, res: express.Response)=>{
        prijave.deleteOne({"korisnickoIme": req.body.korisnickoIme, "idRad": req.body.idRad}, (err,data)=>{
            Radionica.updateOne({"id": req.body.idRad}, {$inc: {'slobodnaMesta': 1}}, (err,data)=>{
                res.json({'poruka': "Uspesno ste obrisali prijavu!"})
            })
           
        })
        
    }
    svePrijave1=(req: express.Request, res: express.Response)=>{
        prijave.find({}, (err,data)=>{
            res.json(data)
        })
    }
    svePrijave=(req: express.Request, res: express.Response)=>{
        prijave.find({"korisnickoIme": req.body.korisnickoIme}, (err,data)=>{
            res.json(data)
        })
    }
    svePrijaveIDRad=(req: express.Request, res: express.Response)=>{
        prijave.find({"idRad": req.body.idRad}, (err,data)=>{
            res.json(data)
        })
    }
    svaObavestenja=(req: express.Request, res: express.Response)=>{
        Obavesti.find({"idRad": req.body.idRad}, (err,data)=>{
            res.json(data)
        })
    }
    obrisiObavestene=(req: express.Request, res: express.Response)=>{
        Obavesti.deleteMany({"idRad": req.body.idRad}, (err,data)=>{
            res.json(data)
        })
    }
    sacuvajZaObavestenje=(req: express.Request, res: express.Response)=>{
        let obavetenje= new Obavesti({
            email: req.body.email,
            idRad: req.body.idRad
        })
        obavetenje.save();
    }
    prijaviMe=(req: express.Request, res: express.Response)=>{
       
        Radionica.updateOne({"id": req.body.idRad}, {$inc: { 'slobodnaMesta': -1}}, (err,data)=>{
            let prijava= new prijave({
                korisnickoIme: req.body.korisnickoIme,
                idRad: req.body.idRad,
                datum: req.body.datum,
                status: 0
            })
            prijava.save();
        })
    }

    dodajKomentar=(req: express.Request, res: express.Response)=>{
       const komentar={
        "tekst": req.body.tekst,
        "korisnickoIme": req.body.korisnickoIme,
        "datum": req.body.datum,
        "slika": req.body.slika
       }
       Radionica.updateOne({ 'id': req.body.idRad }, {$push: {'komentari': komentar}}, (err, data) => {
            res.json("OK");
       });
    }
    dodajRadionicu=(req: express.Request, res: express.Response)=>{
        
        let radionica= new Radionica({
            id: req.body.idRad,
            naziv: req.body.naziv,
            mesto: req.body.mesto,
            datum: req.body.datum,
            duziOpis: req.body.duziOpis,
            opis: req.body.opis,
            komentari: req.body.komentari,
            slika: req.body.slika,
            galerija: req.body.galerija,
            brojLajkova: 0,
            organizator: req.body.organizator,
            status: req.body.status,
            slobodnaMesta: req.body.slobodnaMesta
        })
        radionica.save();
        res.json({'poruka': "Uspesno ste dodali radionicu"})
        
        //novaRadionica.save()
    }

    prihvatiRadionicu=(req: express.Request, res: express.Response)=>{
        User.findOne({"korisnickoIme": req.body.korisnickoIme},(err,user)=>{
            user.remove()
                    let user1= new User({ime:user.ime,
                        prezime: user.prezime,
                        korisnickoIme:user.korisnickoIme,
                        lozinka: user.lozinka,
                        telefon: user.telefon,
                        email: user.email,
                        nazivOrganizacije:user.nazivOrganizacije,
                        drzava: user.drzava,
                        grad: user.grad,
                        postanskiBroj: user.postanskiBroj,
                        ulica:user.ulica,
                        broj: user.broj,
                        maticniBrojOrganizacije:user.maticniBrojOrganizacije,
                        tip:2,
                        status: user.status,
                        slika: user.slika
                    })
                    //console.log(user1);
                    
                    user1.save();
        })
        Radionica.updateOne({"id": req.body.idRad}, {$set: {"status": 1}}, (err,user)=>{
            
        })
       
    }
    obrisiRadionicu=(req: express.Request, res: express.Response)=>{
        Radionica.deleteOne({"id": req.body.idRad}, (err,user)=>{
            /**I iz stalih tabela */
        })

       
    }
    azurirajRadionicu=(req: express.Request, res: express.Response)=>{
        let parametar = req.body.parametar;
        Radionica.findOne({"id": req.body.idRad}, (resp, rad) => {
            if(rad){
                Radionica.updateOne({"id": req.body.idRad}, {$set: {[parametar]: req.body.novaVrednost}}, (resp) => {
                    res.json("Uspesno ste promenili "+parametar+"!")
                });
            }else{
                res.json("Radionica sa ID "+req.body.idRad+" ne postoji!")
            }
        });
       

       
    }
    sveKoordinate=(req: express.Request, res: express.Response)=>{
    
        Koordinate.find({}, (err, koordinate)=>{
            if(err) console.log(err);
            else res.json(koordinate)
           
        })

       
    }
    posaljiZaOtkazivanje(req: express.Request, res: express.Response){
        Radionica.updateOne({"id": req.body.idRad}, {$set: {"status": 0}}, (err,user)=>{
            
        })
        Radionica.updateOne({"id": req.body.idRad}, {$set: {"naziv": "Otkazana"}}, (err,user)=>{
            
        })
        prijave.deleteMany({"idRad": req.body.idRad}, ()=>{

        })
        var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: "krivokapicnemanja00@outlook.com",
                pass: 'Piaprojekat2022!'
            }
            });
            var mailOptions = {
            from: "krivokapicnemanja00@outlook.com",
            to: req.body.email,
            subject: 'Oktazivanje radionice',
            text: "Radionica "+req.body.idRad+". je otkazana"
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
    }

    prihvatiPrijavu=(req: express.Request, res: express.Response)=>{
        prijave.collection.updateOne({"idRad": req.body.idRad, "korisnickoIme": req.body.koriscnikoIme},{$set: {"status": 1}}, ()=>{
        })
        Radionica.updateOne({"id": req.body.idRad}, {$inc: {"slobodnaMesta": -1}}, (err,user)=>{
            
        })
    }

    
}