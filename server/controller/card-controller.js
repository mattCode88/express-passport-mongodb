const CardCollection = require('../model/Card');

exports.create = async (req, res) => {

    const duplicatedCard = await CardCollection.findOne({ username: req.body.username, name: req.body.name, edizione: req.body.edizione });

    if (duplicatedCard !== null) {
        req.flash('status-card', `Hai già in vendita questa carta...aggiungine altre dalla sezione 'Le mie carte'...`);
        res.redirect('/auth/dashboard/create');
        return
    }

    req.flash('status-card', `Carta aggiunta correttamente alla tua collezione!'`);

    const colors = req.body.color.split(',');

    const mappedColors = colors.map(a => a === 'undefined' ? 'Colorless' : a);

    const tipologie = req.body.tipo.split(',');

    const card = new CardCollection({
        username: req.body.username,
        image: req.body.image,
        quantita: req.body.quantita,
        name: req.body.name,
        edizione: req.body.edizione,
        descrizione: req.body.descrizione,
        prezzo: req.body.prezzo,
        colori: mappedColors,
        tipi: tipologie,
        rarita: req.body.rarita,
        inVendita: req.body.vendita,
        daVendere: req.body.daVendere
    });

    card
        .save(card)
        .then(data => { res.redirect('/auth/dashboard/create') })
        .catch(err => { res.status(500).send({ message: err.message || 'Error to create operation' }) });
    
}

exports.find = async (req, res) => {

    const userRequest = req.query.name;
    const cards = await CardCollection.find({ username: userRequest });

    res.send(cards);

}

exports.update = async (req, res) => {

    const card = await CardCollection.findById(req.body.id);

    if (+req.body.prezzo <= 0 || +req.body.quantita <= 0 || +req.body.daVendere < 0) {
        req.flash('status-update', `Inserisci dati possibili!!!`);
        res.redirect('/auth/dashboard/show');
        return
    }

    if (+req.body.daVendere > +req.body.quantita) {
        req.flash('status-update', `Non possiedi ${req.body.daVendere} ${card.name} da vendere!!!`);
        res.redirect('/auth/dashboard/show');
        return
    }

    if (+req.body.daVendere > 0) {
        req.body.inVendita = true;
    } else {
        req.body.inVendita = false;
    }

    CardCollection.findByIdAndUpdate(req.body.id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `La carta con id: ${req.body.id} non è stata trovata!` })
            } else {
                res.redirect('/auth/dashboard/show');
            }
        }).catch(err => {
            res.status(500).send({ message: "Errore nell' aggiornamento delle informazioni!" })
        });    

}

exports.delete = async (req, res) => {
    

    CardCollection.findByIdAndDelete(req.body.id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `La carta con id: ${req.body.id} non è stata trovata!`})
            }else{
                res.redirect('/auth/dashboard/show');
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Errore nell' aggiornamento delle informazioni!" 
            });
        });
}