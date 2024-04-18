import User from '../models/user';
import e, * as express from 'express';
import { now } from 'mongoose';
import novaLozinka from '../models/novaLozinka';
import { MessageClient } from "cloudmailin"
import Lajk from '../models/lajk';
import Poruka from '../models/poruka';
import Prijave from '../models/prijave';
import Radionica from '../models/radionica';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export class UserController{
    login= (req: express.Request, res: express.Response)=>{
        let korisnickoIme= req.body.korisnickoIme;
        let lozinka= req.body.lozinka;
        
        User.findOne({'korisnickoIme': korisnickoIme, 'lozinka': lozinka}, (err,user)=>{
            if(user)  res.json(user);
            else{
                User.findOne({'korisnickoIme': korisnickoIme}, (err,user)=>{
                    if(user){
                        novaLozinka.findOne({'email': user.email, 'lozinka': lozinka}, (err,x)=>{
                            if(x){
                                let prvi=x.datum.getTime();
                                let drugi=now().getTime();
                                drugi=drugi-prvi
                                drugi=(drugi/1000)/60
                                if(drugi>30){
                                    x.remove()
                                    res.json({'poruka': '-1'})
                                }else{
                                    if(x){
                                        res.json(user)
                                    }
                                }
                            }else{
                                res.json({'poruka': 'Podaci nisu ispravni!'})
                            }

                           
                        })
                    }
                })
            }
        })
        
    }
    loginAdmin=(req: express.Request, res: express.Response)=>{
        let korisnickoIme= req.body.korisnickoIme;
        let lozinka= req.body.lozinka;
        User.findOne({'korisnickoIme': korisnickoIme, 'lozinka': lozinka}, (err,user)=>{
            if(user)  res.json(user);
            else res.json(null)
            })
    }
    register=(req: express.Request, res: express.Response)=>{
        User.findOne({'korisnickoIme': req.body.korisnickoIme}, (err,user)=>{
            if(user) res.json({'poruka': '2'})
            else{
                User.findOne({'email': req.body.email}, (err,user)=>{
                    if(user) res.json({'poruka': '2'});
                    else{
                        let user= new User({ime: req.body.ime,
                            prezime: req.body.prezime,
                            korisnickoIme: req.body.korisnickoIme,
                            lozinka: req.body.lozinka,
                            telefon: req.body.telefon,
                            email: req.body.email,
                            nazivOrganizacije: req.body.nazivOrganizacije,
                            drzava: req.body.drzava,
                            grad: req.body.grad,
                            postanskiBroj: req.body.postanskiBroj,
                            ulica: req.body.ulica,
                            broj: req.body.broj,
                            maticniBrojOrganizacije: req.body.maticniBrojOrganizacije,
                            tip: req.body.tip,
                            status: "cekanje",
                            slika: req.body.slika
                        })
                        user.save().then(user=>{
                            res.status(200).json({'poruka': '1'});
                        }).catch(err=> {res.status(400).json({'poruka': '0'})})
                    }
                })
        
            }
        })

    }
    novaLozinka=async (req: express.Request, res: express.Response)=>{
        let nova=new novaLozinka({
            email: req.body.email,
            lozinka: req.body.novaLozinka,
            datum: now()})
        novaLozinka.findOne({"email": req.body.email}, (err,n)=>{
            if(n){
                n.remove()
            }
            nova.save();
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
            subject: 'Lozinka',
            text:  req.body.novaLozinka
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
            res.json({'poruka' : '1'}) //
        })
        
    }

    posaljiMejl=async (req: express.Request, res: express.Response)=>{

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
        subject: 'Obaestenje',
        text:  "Imate slobodno mesto na radionici: "+req.body.idRad
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
        
    }
    promenaLozinke=(req: express.Request, res: express.Response)=>{
        let korisnickoIme=req.body.korisnickoIme;
        let staraLozinka=req.body.staraLozinka;
        let nova=req.body.novaLozinka;
        User.findOne({'korisnickoIme': korisnickoIme, 'lozinka': staraLozinka}, (err,user)=>{
            if(user){
                User.collection.updateOne({"korisnickoIme": korisnickoIme},{$set:{"lozinka": nova}})
                res.json({'poruka': 'Uspesno ste promenili lozinku!'});
                }
            else{
                User.findOne({'korisnickoIme': korisnickoIme}, (err,user)=>{
                    if(user){
                        novaLozinka.findOne({'email': user.email, 'lozinka': staraLozinka}, (err,x)=>{
                            if(err){
                                res.json({'poruka': 'Podaci nisu ispravni!'})
                            }else if(x){
                            let prvi=x.datum.getTime();
                            let drugi=now().getTime();
                            drugi=drugi-prvi
                            drugi=(drugi/1000)/60
                            if(drugi>30){
                                x.remove()
                                res.json({'poruka': 'Privremena lozinka je istekla!'})
                            }else{
                                x.remove()
                                //user.remove();
                                User.collection.updateOne({"korisnickoIme": korisnickoIme},{$set:
                                    {"lozinka": nova}
                                    })
                                    res.json({'poruka': 'Uspesno ste promenili lozinku!'})
                            }
                            }else{
                                res.json({'poruka': 'Podaci nisu ispravni!'})
                            }
                            
                        })
                    }else{
                        res.json({'poruka': 'Podaci nisu ispravni!'})

                    }
                })
            }
        })
    }
    dodajSliku=(req: express.Request, res: express.Response)=>{}
    dohvatiKorisnika=(req: express.Request, res: express.Response)=>{
        let korisnickoIme= req.body.korisnickoIme;
        User.findOne({'korisnickoIme': korisnickoIme}, (err,user)=>{
            if(user)  res.json(user);
        })
    }
    dohvatiSveKorisnike=(req: express.Request, res: express.Response)=>{
        User.find({}, (err,user)=>{
            if(user)  res.json(user);
        })
    }
    azuriraj=(req: express.Request, res: express.Response)=>{
        let korisnickoIme= req.body.korisnickoIme;
        User.findOne({'korisnickoIme': korisnickoIme}, (err,user)=>{

            /*
             Radionica.updateMany({ "komentari.korisnickoIme": korisnickoIme },
                { $set: { "komentari.$.slika": req.body.novo } }, (err,data)=>{
                    
                }
                )
            Lajk.updateMany({"korisnickoIme": korisnickoIme}, {$set: {'korisnickoIme': req.body.novo}}, (data)=>{

            })
            Lajk.updateMany({"korisnickoIme1": korisnickoIme}, {$set: {'korisnickoIme': req.body.novo}}, (data)=>{

            })
            
            */
            if(user){
                if(req.body.tip=="ime"){
                    user.remove()
                    let user1= new User({ime: req.body.novo,
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
                        tip:user.tip,
                        status: user.status,
                        slika: user.slika
                    })
                    user1.save();
                    res.json({'poruka':'Uspesno ste promenili ime!'})
                }
                if(req.body.tip=="prezime"){
                    user.remove()
                    let user1= new User({ime: user.ime,
                        prezime: req.body.novo,
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
                        tip:user.tip,
                        status: user.status,
                        slika: user.slika
                    })
                    user1.save();
                    res.json({'poruka':'Uspesno ste promenili prezime!'})
                }
                if(req.body.tip=="telefon"){
                    user.remove()
                    let user1= new User({ime: user.ime,
                        prezime:user.prezime,
                        korisnickoIme:user.korisnickoIme,
                        lozinka: user.lozinka,
                        telefon: req.body.novo,
                        email: user.email,
                        nazivOrganizacije:user.nazivOrganizacije,
                        drzava: user.drzava,
                        grad: user.grad,
                        postanskiBroj: user.postanskiBroj,
                        ulica:user.ulica,
                        broj: user.broj,
                        maticniBrojOrganizacije:user.maticniBrojOrganizacije,
                        tip:user.tip,
                        status: user.status,
                        slika: user.slika
                    })
                    user1.save();
                    res.json({'poruka':'Uspesno ste promenili telefon!'})
                }
                if(req.body.tip=="email"){
                    User.findOne({'email': req.body.novo}, (err,email)=>{
                        if(email){
                            res.json({'poruka':'Korisnik sa zadatim emailom vec postoji!'})
                        }else{
                            user.remove()
                            let user1= new User({ime: user.ime,
                                prezime:user.prezime,
                                korisnickoIme:user.korisnickoIme,
                                lozinka: user.lozinka,
                                telefon: user.telefon,
                                email: req.body.novo,
                                nazivOrganizacije:user.nazivOrganizacije,
                                drzava: user.drzava,
                                grad: user.grad,
                                postanskiBroj: user.postanskiBroj,
                                ulica:user.ulica,
                                broj: user.broj,
                                maticniBrojOrganizacije:user.maticniBrojOrganizacije,
                                tip:user.tip,
                                status: user.status,
                                slika: user.slika
                            })
                            user1.save();
                            res.json({'poruka':'Uspesno ste promenili email!'})
                        }
                    })
                    
                }
                if(req.body.tip=="korisnickoIme"){
                    User.findOne({'korisnickoIme': req.body.novo}, (err,kIme)=>{
                        if(kIme){
                            res.json({'poruka':'Korisnik sa zadatim korisnickim imenom vec postoji!'})
                        }else{
                            Poruka.updateMany({ "poruke.from": korisnickoIme },
                { $set: { "poruke.$.from": req.body.novo } }, (err,data)=>{
                    
                })
            Lajk.updateMany({"korisnickoIme": korisnickoIme}, {$set: {'korisnickoIme': req.body.novo}}, (data)=>{

            })
            Poruka.updateMany({"korisnickoIme1": korisnickoIme}, {$set: {'korisnickoIme1': req.body.novo}}, (data)=>{

            })
            Poruka.updateMany({"korisnickoIme2": korisnickoIme}, {$set: {'korisnickoIme2': req.body.novo}}, (data)=>{

            })
            Prijave.updateMany({"korisnickoIme": korisnickoIme}, {$set: {'korisnickoIme': req.body.novo}}, (data)=>{

            })
            Radionica.updateMany({"organizator": korisnickoIme}, {$set: {'organizator': req.body.novo}}, (data)=>{

            })
            Radionica.updateMany({ "komentari.korisnickoIme": korisnickoIme },
                        { $set: { "komentari.$.korisnickoIme": req.body.novo } }, (err,data)=>{
                            } )
                            user.remove()
                            let user1= new User({ime: user.ime,
                                prezime:user.prezime,
                                korisnickoIme:req.body.novo,
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
                                tip:user.tip,
                                status: user.status,
                                slika: user.slika
                            })
                            user1.save();
                            res.json({'poruka':'Uspesno ste promenili korisnicko ime!'})
                        }
                    })
                    
                }
                if(req.body.tip=="status"){
                    user.remove()
                    let user1= new User({ime: user.ime,
                        prezime:user.prezime,
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
                        tip:user.tip,
                        status:req.body.novo,
                        slika: user.slika
                    })
                    user1.save();
                    res.json({'poruka':'Uspesno ste promenili status!'})
                }
                if(req.body.tip=="slika"){
                    Radionica.updateMany({ "komentari.korisnickoIme": korisnickoIme },
                        { $set: { "komentari.$.slika": req.body.novo } }, (err,data)=>{
                            
                        }
                     )
                    Poruka.updateMany({"korisnickoIme1": korisnickoIme}, {$set: {'slika1': req.body.novo}}, (data)=>{

                    })
                    Poruka.updateMany({"korisnickoIme2": korisnickoIme}, {$set: {'slika2': req.body.novo}}, (data)=>{

                    })
                    user.remove()
                    let user1= new User({ime: user.ime,
                        prezime:user.prezime,
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
                        tip:user.tip,
                        status: user.status,
                        slika: req.body.novo
                    })
                    user1.save();
                    res.json({'poruka':'Uspesno ste promenili sliku!'})
                }

                if(req.body.tip=="lozinka"){
                    if(user.lozinka==req.body.staraLozinka){
                        user.remove()
                        let user1= new User({ime: user.ime,
                            prezime:user.prezime,
                            korisnickoIme:user.korisnickoIme,
                            lozinka: req.body.novo,
                            telefon: user.telefon,
                            email: user.email,
                            nazivOrganizacije:user.nazivOrganizacije,
                            drzava: user.drzava,
                            grad: user.grad,
                            postanskiBroj: user.postanskiBroj,
                            ulica:user.ulica,
                            broj: user.broj,
                            maticniBrojOrganizacije:user.maticniBrojOrganizacije,
                            tip:user.tip,
                            status: user.status,
                            slika: user.slika
                        })
                        user1.save();
                        res.json({'poruka':'Uspesno ste promenili lozinku!'})
                    }else{
                        res.json({'poruka':'Niste uneli dobru lozinku!'})
                    }
                   
                }
            }else{
                res.json({'poruka':'GRESKA- proverite podatke!'})
            }
        })
    }
    obrisiKorisnika=(req: express.Request, res: express.Response)=>{
        /*Lajk.deleteOne({'korisnickoIme': req.body.korisnickoIme}, (err,resp)=>{
            Poruka.deleteMany({'korisnickoIme': req.body.korisnickoIme}, (err,resp)=>{
                Prijave.deleteMany({'korisnickoIme': req.body.korisnickoIme}, (err,resp)=>{
                    Radionica.deleteMany({'korisnickoIme': req.body.korisnickoIme}, (err,resp)=>{

                    })
                })
            })
        })*/


        User.deleteOne({'korisnickoIme': req.body.korisnickoIme}, (err,resp)=>{
            /**da li treba da se deletuje iz ostalih kolona? */
            if(resp)  {
                res.json({'poruka':"Uspesno ste obrisali korisnika!"})}
            else res.json({'poruka': "Greska prilikom brisanja korisnika!"})    
            
        })
    }
    azurirajKorisnika=(req: express.Request, res: express.Response)=>{
        let parametar=req.body.parametar
        let novo=req.body.novaVrednost
        switch(parametar){
            case "ime":
                User.updateOne({'korisnickoIme': req.body.korisnickoIme}, {$set: { "ime": novo}}, (err,resp)=>{
                    if(resp)  {
                        res.json({'poruka':"Uspesno ste azurirali korisnika!"})}
                    else res.json({'poruka': "Greska prilikom azuriranja korisnika!"})
                        
                    
                })
                break;
            case "prezime":
                User.updateOne({'korisnickoIme': req.body.korisnickoIme}, {$set: { "prezime": novo}}, (err,resp)=>{
                    if(resp)  {
                        res.json({'poruka':"Uspesno ste azurirali korisnika!"})}
                    else res.json({'poruka': "Greska prilikom azuriranja korisnika!"})
                        
                    
                })
                break;
            case "korisnickoIme":
                User.updateOne({'korisnickoIme': req.body.korisnickoIme}, {$set: { "korsinickoIme": novo}}, (err,resp)=>{
                    if(resp)  {
                        res.json({'poruka':"Uspesno ste azurirali korisnika!"})}
                    else res.json({'poruka': "Greska prilikom azuriranja korisnika!"})
                    /*izmeniti i u ostalim tabelama! */
                    
                })
                break;
            case "telefon":
                User.updateOne({'korisnickoIme': req.body.korisnickoIme}, {$set: { "telefon": novo}}, (err,resp)=>{
                    if(resp)  {
                        res.json({'poruka':"Uspesno ste azurirali korisnika!"})}
                    else res.json({'poruka': "Greska prilikom azuriranja korisnika!"})
                        
                    
                })
                break;
            case "email":
                User.updateOne({'korisnickoIme': req.body.korisnickoIme}, {$set: { "email": novo}}, (err,resp)=>{
                    if(resp)  {
                        res.json({'poruka':"Uspesno ste azurirali korisnika!"})}
                    else res.json({'poruka': "Greska prilikom azuriranja korisnika!"})
                        
                    
                })
                break;
            case "nazivOrganizacije":
                User.updateOne({'korisnickoIme': req.body.korisnickoIme}, {$set: { "nazivOrganizacije": novo}}, (err,resp)=>{
                    if(resp)  {
                        res.json({'poruka':"Uspesno ste azurirali korisnika!"})}
                    else res.json({'poruka': "Greska prilikom azuriranja korisnika!"})
                        
                    
                })
                break;
            case "drzava":
                User.updateOne({'korisnickoIme': req.body.korisnickoIme}, {$set: { "drzava": novo}}, (err,resp)=>{
                    if(resp)  {
                        res.json({'poruka':"Uspesno ste azurirali korisnika!"})}
                    else res.json({'poruka': "Greska prilikom azuriranja korisnika!"})
                        
                    
                })
                break;
            case "grad":
                User.updateOne({'korisnickoIme': req.body.korisnickoIme}, {$set: { "grad": novo}}, (err,resp)=>{
                    if(resp)  {
                        res.json({'poruka':"Uspesno ste azurirali korisnika!"})}
                    else res.json({'poruka': "Greska prilikom azuriranja korisnika!"})
                        
                    
                })
                break;
            case "postanskiBroj":
                User.updateOne({'korisnickoIme': req.body.korisnickoIme}, {$set: { "postanskiBroj": novo}}, (err,resp)=>{
                    if(resp)  {
                        res.json({'poruka':"Uspesno ste azurirali korisnika!"})}
                    else res.json({'poruka': "Greska prilikom azuriranja korisnika!"})
                        
                    
                })
                break;
            case "ulica":
                User.updateOne({'korisnickoIme': req.body.korisnickoIme}, {$set: { "broj": novo}}, (err,resp)=>{
                    if(resp)  {
                        res.json({'poruka':"Uspesno ste azurirali korisnika!"})}
                    else res.json({'poruka': "Greska prilikom azuriranja korisnika!"})
                        
                    
                })
                break;
            case "broj":
                User.updateOne({'korisnickoIme': req.body.korisnickoIme}, {$set: { "status": novo}}, (err,resp)=>{
                    if(resp)  {
                        res.json({'poruka':"Uspesno ste azurirali korisnika!"})}
                    else res.json({'poruka': "Greska prilikom azuriranja korisnika!"})
                        
                    
                })
                break;
            case "status":
        
            }
    }
   

    
}