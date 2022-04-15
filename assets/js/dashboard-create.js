const card = document.getElementById('card'),
    search = document.getElementById('search-cards'),
    cardName = document.getElementById('card-name'),
    chooseCard = document.getElementById('choose'),
    imageChooseCard = document.getElementById('image-choose-card'),
    hiddenForm = document.getElementById('hidden-form'),
    btnSaveCard = document.getElementById('save-card'),
    inputNumberCard = document.getElementById('input-number-card'),
    inputPriceCard = document.getElementById('input-price-card'),
    errorMessageNumber = document.getElementById('error-mex-number'),
    errorMessagePrice = document.getElementById('error-mex-price'),
    errorMessageDuplicate = document.getElementById('error-message-duplicate');

let img, div, divText, divInfoName, divInfoEdizione, divInfoDescription, divInfoColors, divInfoTypes, divInfoRarity,
    inputCardImage, inputQuantità, inputCardName, inputCardEdizione, inputCardText, inputPrice, inputCardColor, inputCardType, inputCardRarity,
    inputCardInVendita, inputCardDaVendere,
    nameCard, imageCard, edizioneCard, descrizioneCard, colorsCard, typesCard, rarityCard,
    hiddenFormChild;

//EVENTO DI RICERCA CARTA
search.addEventListener('click', (e) => {
    card.innerHTML = '';
    const nomeCarta = cardName.value;
    cardName.value = '';
    errorMessageNumber.classList.add('hidden');
    errorMessagePrice.classList.add('hidden');
    errorMessageDuplicate.classList.add('hidden');
    //visualizzo container cards
    if (!chooseCard.classList.contains('hidden')){
        chooseCard.classList.add('hidden');
    }
    //chiamata API
    fetch(`https://api.magicthegathering.io/v1/cards?name=${nomeCarta}`)
    .then(risp => {
        return risp.text()
    }).then(risp => {
        const dati = JSON.parse(risp),
        cards = dati.cards;
        //creo gli elementi DOM con le carte richieste
        createCards(cards);
    })
})

// EVENTO AL CLICK SULLA CARTA
card.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
        //prendo i parametri delle carte e li salvo in variabili
        imageCard = e.target.src;
        nameCard = e.target.nextElementSibling.childNodes[0].textContent;
        edizioneCard = e.target.nextElementSibling.childNodes[1].textContent;
        descrizioneCard = e.target.nextElementSibling.childNodes[2].textContent;
        colorsCard = e.target.nextElementSibling.childNodes[3].textContent;
        typesCard = e.target.nextElementSibling.childNodes[4].textContent;
        rarityCard = e.target.nextElementSibling.childNodes[5].textContent;
        // console.log(e.target.nextElementSibling.childNodes[3]);
        //visualizzo in DOM
        imageChooseCard.setAttribute('src', e.target.src)
        chooseCard.classList.remove('hidden');
        chooseCard.classList.add('flex');
    }
})

//EVENTO PER SUBMIT FORM AL DB
btnSaveCard.addEventListener('click', (e) => {

    let quantitaCarta = inputNumberCard.value;
    let prezzoCarta = inputPriceCard.value;

    inputNumberCard.value = '';
    inputPriceCard.value = '';

    hiddenFormChild = document.querySelectorAll('#hidden-form > input');
    
    if (hiddenFormChild.length > 1) {
        destroyHiddenForm(hiddenFormChild)
    }
            
            errorMessageNumber.classList.add('hidden');
            errorMessagePrice.classList.add('hidden');

            
            if (quantitaCarta === '' || quantitaCarta <= 0) {
                errorMessageNumber.classList.remove('hidden');
            } else if (prezzoCarta === '' || prezzoCarta <= 0) {
                errorMessagePrice.classList.remove('hidden');
            } else {
                createHiddenForm(quantitaCarta, prezzoCarta);
                // console.log(hiddenForm);
                
//  
                hiddenForm.submit();
                // alert('Carta aggiunta correttamente!!!');
            }
            
    
            
        })

//FUNZIONE PER CREARE ELEMENTI DOM CON LE CARTE RICHIESTE
const createCards = (array) => {
    array.forEach(element => {
        if (element.imageUrl !== undefined) {
            div = document.createElement('DIV');
            divText = document.createElement('DIV');
            divInfoName = document.createElement('DIV');
            divInfoEdizione = document.createElement('DIV');
            divInfoDescription = document.createElement('DIV');
            divInfoColors = document.createElement('DIV');
            divInfoTypes = document.createElement('DIV');
            divInfoRarity = document.createElement('DIV');
            img = document.createElement('IMG');
            img.setAttribute('src', element.imageUrl);
            div.classList.add('container-card', 'col-3', 'col-lg-4', 'col-md-6', 'col-xs-12');
            divText.classList.add('card-info');

            divInfoName.appendChild(document.createTextNode(element.name));
            divInfoEdizione.appendChild(document.createTextNode(element.setName));
            divInfoDescription.appendChild(document.createTextNode(element.text));
            divInfoColors.appendChild(document.createTextNode(element.colors));
            divInfoTypes.appendChild(document.createTextNode(element.types));
            divInfoRarity.appendChild(document.createTextNode(element.rarity));

            divText.appendChild(divInfoName);
            divText.appendChild(divInfoEdizione);
            divText.appendChild(divInfoDescription);
            divText.appendChild(divInfoColors);
            divText.appendChild(divInfoTypes);
            divText.appendChild(divInfoRarity);

            div.appendChild(img);
            div.appendChild(divText);
            card.appendChild(div);
        }
    });
}

//FUNZIONE PER AGGIUNGERE I VARI INPUT AL FORM CON I VALORI RECUPERATI DALLE RICHIESTE
const createHiddenForm = (quantitaCarta, prezzoCarta) => {
    inputCardImage = document.createElement('INPUT');
    inputQuantità = document.createElement('INPUT');
    inputCardName = document.createElement('INPUT');
    inputCardEdizione = document.createElement('INPUT');
    inputCardText = document.createElement('INPUT');
    inputPrice = document.createElement('INPUT');
    inputCardColor = document.createElement('INPUT');
    inputCardType = document.createElement('INPUT');
    inputCardRarity = document.createElement('INPUT');
    inputCardInVendita = document.createElement('INPUT');
    inputCardDaVendere = document.createElement('INPUT');

    inputCardImage.setAttribute('type', 'text');
    inputQuantità.setAttribute('type', 'number');
    inputCardName.setAttribute('type', 'text');
    inputCardEdizione.setAttribute('type', 'text');
    inputCardText.setAttribute('type', 'text');
    inputPrice.setAttribute('type', 'number');
    inputPrice.setAttribute('step', '0.01');
    inputCardColor.setAttribute('type', 'string');
    inputCardType.setAttribute('type', 'string');
    inputCardRarity.setAttribute('type', 'string');
    inputCardInVendita.setAttribute('type', 'string');
    inputCardDaVendere.setAttribute('type', 'number');

    inputCardImage.setAttribute('name', 'image');
    inputQuantità.setAttribute('name', 'quantita');
    inputCardName.setAttribute('name', 'name');
    inputCardEdizione.setAttribute('name', 'edizione');
    inputCardText.setAttribute('name', 'descrizione');
    inputPrice.setAttribute('name', 'prezzo');
    inputCardColor.setAttribute('name', 'color');
    inputCardType.setAttribute('name', 'tipo');
    inputCardRarity.setAttribute('name', 'rarita');
    inputCardInVendita.setAttribute('name', 'vendita');
    inputCardDaVendere.setAttribute('name', 'daVendere');

    inputCardImage.setAttribute('value', imageCard);
    inputQuantità.setAttribute('value', quantitaCarta);
    inputCardName.setAttribute('value', nameCard);
    inputCardEdizione.setAttribute('value', edizioneCard);
    inputCardText.setAttribute('value', descrizioneCard);
    inputPrice.setAttribute('value', prezzoCarta);
    inputCardColor.setAttribute('value', colorsCard);
    inputCardType.setAttribute('value', typesCard);
    inputCardRarity.setAttribute('value', rarityCard);
    inputCardInVendita.setAttribute('value', 'false');
    inputCardDaVendere.setAttribute('value', 0);

    hiddenForm.appendChild(inputCardImage);
    hiddenForm.appendChild(inputQuantità);
    hiddenForm.appendChild(inputCardName);
    hiddenForm.appendChild(inputCardEdizione);
    hiddenForm.appendChild(inputCardText);
    hiddenForm.appendChild(inputPrice);
    hiddenForm.appendChild(inputCardColor);
    hiddenForm.appendChild(inputCardType);
    hiddenForm.appendChild(inputCardRarity);
    hiddenForm.appendChild(inputCardInVendita);
    hiddenForm.appendChild(inputCardDaVendere);

    hiddenFormChild = document.querySelectorAll('#hidden-form > input');
}

const destroyHiddenForm = (array) => {
    array.forEach(element => {
        if (element.name !== 'username') element.remove();
    });
}
