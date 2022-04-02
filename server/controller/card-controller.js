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

exports.find = async (req, res) => {

    const userRequest = req.query.name;
    const cards = await CardCollection.find({ username: userRequest });

    res.send(cards);

}