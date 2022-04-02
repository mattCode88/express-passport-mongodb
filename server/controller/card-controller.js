const CardCollection = require('../model/Card');

exports.create = async (req, res) => {

    const duplicatedCard = await CardCollection.findOne({ username: req.body.username, name: req.body.name, edizione: req.body.edizione });

    if (duplicatedCard !== null) {
        req.flash('duplicate-card', `Hai già in vendita questa carta...aggiungine altre dalla sezione 'Le mie carte'`);
        res.redirect('/auth/dashboard/create');
        return
    }

    const colors = req.body.color.split(',');

    const tipologie = req.body.tipo.split(',');

    const card = new CardCollection({
        username: req.body.username,
        image: req.body.image,
        quantita: req.body.quantita,
        name: req.body.name,
        edizione: req.body.edizione,
        descrizione: req.body.descrizione,
        prezzo: req.body.prezzo,
        colori: colors,
        tipi: tipologie,
        rarita: req.body.rarita
    });

    card
        .save(card)
        .then(data => { res.redirect('/auth/dashboard/create') })
        .catch(err => { res.status(500).send({ message: err.message || 'Error to create operation' }) });
    

}