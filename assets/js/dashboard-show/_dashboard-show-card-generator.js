export default class CardGenerator{
    constructor() {

        this.containerCrads = document.getElementById('dashboard-show-container-cards');
        this.selectCollection = document.getElementsByClassName('select');
        this.selectType = document.getElementById('select-type');
        this.selectColor = document.getElementById('select-color');
        this.selectEdiction = document.getElementById('select-ediction');
        this.selectRarity = document.getElementById('select-rarity');

        this.arrayType = [], this.arrayColor = [], this.arrayEdiction = [], this.arrayRarity = [];

    }

    createCards = (json) => {
        this.containerCrads.innerHTML = '';
        json.forEach(element => {

            this.divContainer = document.createElement('DIV');
            this.divContainerImg = document.createElement('DIV');
            this.divContainerText = document.createElement('DIV');
            this.imgCard = document.createElement('IMG');
            this.divName = document.createElement('DIV');
            this.divEdiction = document.createElement('DIV');
            this.divExit = document.createElement('DIV');
            this.spanName = document.createElement('SPAN');
            this.spanEdiction = document.createElement('SPAN');
            this.spanExit = document.createElement('SPAN');
            this.updateForm = document.createElement('FORM');
            this.deleteForm = document.createElement('FORM');
            this.groupFormPrice = document.createElement('DIV');
            this.groupFormQuantita = document.createElement('DIV');
            this.groupFormVendere = document.createElement('DIV');
            this.labelPrice = document.createElement('LABEL');
            this.labelQuantita = document.createElement('LABEL');
            this.labelVendere = document.createElement('LABEL');
            this.inputPrice = document.createElement('INPUT');
            this.inputQuantita = document.createElement('INPUT');
            this.inputVendere = document.createElement('INPUT');
            this.inputIdHidden = document.createElement('INPUT');
            this.inputIdHidden2 = document.createElement('INPUT');
            this.btnContainer = document.createElement('DIV');
            this.btnAggiorna = document.createElement('BUTTON');
            this.btnCancella = document.createElement('BUTTON');

            this.divContainer.classList.add('dashboard-show-container-cards-container');
            this.divContainerImg.classList.add('dashboard-show-container-cards-container-img');
            this.divContainerText.classList.add('dashboard-show-container-cards-container-text');
            this.divContainerText.classList.add('hidden');
            this.groupFormPrice.classList.add('form-group');
            this.groupFormQuantita.classList.add('form-group');
            this.groupFormVendere.classList.add('form-group');
            this.updateForm.setAttribute('id', `update-form-${element._id}`);
            this.deleteForm.setAttribute('id', `delete-form-${element._id}`);
            this.updateForm.setAttribute('action', '/api/card/update?_method=PUT');
            this.deleteForm.setAttribute('action', '/api/card/delete?_method=DELETE');
            this.updateForm.setAttribute('method', 'POST');
            this.deleteForm.setAttribute('method', 'POST');
            this.deleteForm.classList.add('hidden');

            this.imgCard.setAttribute('src', element.image);

            this.btnAggiorna.appendChild(document.createTextNode('AGGIORNA'));
            this.btnCancella.appendChild(document.createTextNode('ELIMINA'));
            this.btnContainer.appendChild(this.btnAggiorna);
            this.btnContainer.appendChild(this.btnCancella);

            this.spanExit.setAttribute('id', 'exit-button');
            this.spanExit.appendChild(document.createTextNode('X'));
            this.divExit.appendChild(this.spanExit);

            this.spanName.appendChild(document.createTextNode('Nome: '));
            this.divName.appendChild(this.spanName);
            this.divName.appendChild(document.createTextNode(element.name));

            this.spanEdiction.appendChild(document.createTextNode('Edizione: '));
            this.divEdiction.appendChild(this.spanEdiction);
            this.divEdiction.appendChild(document.createTextNode(element.edizione));

            this.labelPrice.setAttribute('for', 'prezzo');
            this.labelQuantita.setAttribute('for', 'quantita');
            this.labelVendere.setAttribute('for', 'daVendere');
            this.labelPrice.appendChild(document.createTextNode('Prezzo '));
            this.labelQuantita.appendChild(document.createTextNode('Quantità '));
            this.labelVendere.appendChild(document.createTextNode('In vendita '));

            this.inputPrice.setAttribute('name', 'prezzo');
            this.inputQuantita.setAttribute('name', 'quantita');
            this.inputVendere.setAttribute('name', 'daVendere');
            this.inputIdHidden.setAttribute('name', 'id');
            this.inputIdHidden2.setAttribute('name', 'id');
            this.inputPrice.setAttribute('type', 'number');
            this.inputPrice.setAttribute('step', '0.01');
            this.inputQuantita.setAttribute('type', 'number');
            this.inputVendere.setAttribute('type', 'number');
            this.inputIdHidden.setAttribute('type', 'hidden');
            this.inputIdHidden2.setAttribute('type', 'hidden');
            this.inputPrice.setAttribute('value', element.prezzo);
            this.inputQuantita.setAttribute('value', element.quantita);
            this.inputVendere.setAttribute('value', element.daVendere);
            this.inputIdHidden.setAttribute('value', element._id);
            this.inputIdHidden2.setAttribute('value', element._id);
            
            this.groupFormPrice.appendChild(this.labelPrice);
            this.groupFormPrice.appendChild(this.inputPrice);
            this.groupFormQuantita.appendChild(this.labelQuantita);
            this.groupFormQuantita.appendChild(this.inputQuantita);
            this.groupFormVendere.appendChild(this.labelVendere);
            this.groupFormVendere.appendChild(this.inputVendere);

            this.divContainerImg.appendChild(this.imgCard);
            this.divContainerText.appendChild(this.divExit);
            this.divContainerText.appendChild(this.divName);
            this.divContainerText.appendChild(this.divEdiction);
            this.divContainerText.appendChild(this.updateForm);
            this.divContainerText.appendChild(this.deleteForm);
            this.divContainerText.appendChild(this.btnContainer);

            this.updateForm.appendChild(this.groupFormPrice);
            this.updateForm.appendChild(this.groupFormQuantita);
            this.updateForm.appendChild(this.groupFormVendere);
            this.updateForm.appendChild(this.inputIdHidden);
            this.deleteForm.appendChild(this.inputIdHidden2);

            this.divContainer.appendChild(this.divContainerImg);
            this.divContainer.appendChild(this.divContainerText);

            this.containerCrads.appendChild(this.divContainer);

        });
    }

    generateOptionsReference = (json) => {
        json.forEach(carta => {
            carta.tipi.forEach(tipo => {
                if (!this.arrayType.includes(tipo)) this.arrayType.push(tipo);
            })
            carta.colori.forEach(colore => {
                if (colore === 'undefined') colore = 'Colorless';
                if (!this.arrayColor.includes(colore)) this.arrayColor.push(colore);
            });
            if (!this.arrayEdiction.includes(carta.edizione)) this.arrayEdiction.push(carta.edizione);
            if (!this.arrayRarity.includes(carta.rarita)) this.arrayRarity.push(carta.rarita);
        });
    };

    generateOption = () => {
        this.createOpt(this.arrayType, this.selectType);
        this.createOpt(this.arrayColor, this.selectColor);
        this.createOpt(this.arrayEdiction, this.selectEdiction);
        this.createOpt(this.arrayRarity, this.selectRarity);
    }

    createOpt = (array, select) => {
        array.forEach(element => {
            this.opt = document.createElement('OPTION');
            this.opt.innerText = element;
            select.appendChild(this.opt);
        });
    }
}