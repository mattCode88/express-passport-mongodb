import CardGenerator from './partials/_dashboard-show-card-generator.js';

export default class DashboardShow extends CardGenerator{
    constructor() {
        super();
      
        this.btnSearch = document.getElementById('btn-search');

        fetch(`http://localhost:3000/api/card/show?name=${document.getElementById('user-name-id').textContent}`)
        .then(risp => {
            return risp.text()
        }).then(risp => {

            const dati = JSON.parse(risp);

            this.generateOptionsReference(dati);

            this.generateOption();

            this.createCards(dati);

            this.btnSearch.addEventListener('click', () => {
                
                let arraySelect = Array.from(this.selectCollection),
                    controlOptionsAll = 0,
                    objOption = {};
                    
                arraySelect.forEach(element => {
            
                    if (element.value !== 'All') {
                        controlOptionsAll += 1;
                        let opzione = element.name;
                        let valore = element.value;
                        objOption[opzione] = valore;
                    } 
                
                });

                if (controlOptionsAll === 0) { 

                    this.createCards(dati);
               
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

                            if (prop === 'daVendere' && objOption[prop] === 'yes' && element[prop] > 0) {

                                element.count += 1;

                            }

                            if (prop === 'daVendere' && objOption[prop] === 'no' && element[prop] === 0) {

                                element.count += 1;

                            }

                            
                            if (element[prop] === objOption[prop]) {

                                element.count += 1;

                            } 

                        }

                        if (element.count === numberProp) newDati.push(element);
                    
                    });

                    this.createCards(newDati);  
                     
                }

            })

            this.eventClick();
            
        })

    }

    eventClick = () => {

        this.containerCrads.addEventListener('click', e => {

            if (e.target.tagName === 'IMG') {
                
                document.querySelectorAll('.dashboard-show-container-cards-container-text').forEach(element => {
                    if (!element.classList.contains('hidden')) {
                        element.classList.add('hidden');
                        element.parentNode.firstChild.classList.remove('hidden');
                    }
                });

                e.target.parentElement.classList.add('hidden');
                e.target.parentNode.nextElementSibling.classList.remove('hidden');

            }

            if (e.target.textContent === 'X') {

                e.target.parentNode.parentNode.classList.add('hidden');
                e.target.parentNode.parentNode.parentNode.firstChild.classList.remove('hidden');

            }

            if (e.target.textContent === 'AGGIORNA') {

                let form = document.getElementById(`update-form-${e.target.parentNode.parentElement.childNodes[3][3].value}`);
                form.submit();

            }

            if (e.target.textContent === 'ELIMINA') {

                let form = document.getElementById(`delete-form-${e.target.parentNode.parentElement.childNodes[3][3].value}`);
                form.submit();

            }
              
        })

    }

}