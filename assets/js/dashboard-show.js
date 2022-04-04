const containerCrads = document.getElementById('dashboard-show-container-cards'),
    selectCollection = document.getElementsByClassName('select'),
    selectType = document.getElementById('select-type'),
    selectColor = document.getElementById('select-color'),
    selectEdiction = document.getElementById('select-ediction'),
    selectRarity = document.getElementById('select-rarity'),
    btnSearch = document.getElementById('btn-search')
;
let divCard, imgCard,
    optType, optColor, optEdiction, optRarity, optToSell, opt,
    arrayType = [], arrayColor = [], arrayEdiction = [], arrayRarity = [];

fetch(`http://localhost:3000/api/card/show?name=${document.getElementById('user-name-id').textContent}`)
    .then(risp => {
        return risp.text()
    }).then(risp => {

        const dati = JSON.parse(risp);

        generateOptionsReference(dati);

        generateOption();

        createCards(dati);

        btnSearch.addEventListener('click', () => {
            
            let arraySelect = Array.from(selectCollection),
                controlOptionsAll = 0,
                objOption = {}
                ;
            
            arraySelect.forEach(element => {
        
                if (element.value !== 'All') {
                    controlOptionsAll += 1;
                    let opzione = element.name;
                    let valore = element.value;
                    objOption[opzione] = valore;
                } 
             
            });

            if (controlOptionsAll === 0) { 

                createCards(dati);

            } else {

                let newDati = [],
                    numberProp = 0;

                dati.forEach(element => {

                    element.count = 0;
                    numberProp = 0;

                    for (let prop in objOption) {

                        numberProp += 1;

                        if (prop === 'tipi' && element[prop].includes(objOption[prop])) {
                            
                            element.count += 1;
                            
                        }
                        
                        if (prop === 'colori' && element[prop].includes(objOption[prop])) {
    
                            element.count += 1;
                                 
                        }
                        
                        if (element[prop] === objOption[prop]) {

                            element.count += 1;

                        }

                    }

                    if (element.count === numberProp) newDati.push(element);
                
                });

                createCards(newDati);    

            }
        })

    })

//genero le card
const createCards = (json) => {
    containerCrads.innerHTML = '';
    json.forEach(element => {
            divCard = document.createElement('DIV');
            imgCard = document.createElement('IMG');
            divCard.classList.add('dashboard-show-container-cards-card');
            imgCard.setAttribute('src', element.image);
            divCard.appendChild(imgCard);
            containerCrads.appendChild(divCard);
        });
}

//qui genero le referenze da inserire nelle option dei filtri
const generateOptionsReference = (json) => {
    json.forEach(carta => {
        carta.tipi.forEach(tipo => {
            if (!arrayType.includes(tipo)) arrayType.push(tipo);
        })
        carta.colori.forEach(colore => {
            if (colore === 'undefined') colore = 'Colorless';
            if (!arrayColor.includes(colore)) arrayColor.push(colore);
        });
        if (!arrayEdiction.includes(carta.edizione)) arrayEdiction.push(carta.edizione);
        if (!arrayRarity.includes(carta.rarita)) arrayRarity.push(carta.rarita);
    });
};

//qui genero le option da inserire nella select
const generateOption = () => {
    createOpt(arrayType, selectType);
    createOpt(arrayColor, selectColor);
    createOpt(arrayEdiction, selectEdiction);
    createOpt(arrayRarity, selectRarity);
}

const createOpt = (array, select) => {
    array.forEach(element => {
        opt = document.createElement('OPTION');
        opt.innerText = element;
        select.appendChild(opt);
    });
}