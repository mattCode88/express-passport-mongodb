import CardGenerator from './partials/_dashboard-show-card-generator.js';

export default class DashboardShow extends CardGenerator{
    constructor() {
        super();
      
        this.btnSearch = document.getElementById('btn-search');
        this.advancedSearch = document.getElementById('filter-show');
        this.containerFilters = document.getElementById('dashboard-show-filter');
        this.nameSearch = document.getElementById('name-search');

        fetch(`http://localhost:3000/api/card/show?name=${document.getElementById('user-name-id').textContent}`)
        .then(risp => {
            return risp.text()
        }).then(risp => {

            const dati = JSON.parse(risp);

            this.generateOptionsReference(dati);

            this.generateOption();

            this.createCards(dati);

            this.expandSearch();

            this.eventClick();

            this.nameSearch.addEventListener('keypress', e => {
                if (e.key === 'Enter') {

                    let newDati = [],
                        insertName = e.target.value.toLowerCase();
                    
                    e.target.value = '';

                    dati.forEach(element => {

                        if (element.name.toLowerCase() === insertName) {
                            newDati.push(element);
                            this.createCards(newDati);
                        }

                        if (element.name.toLowerCase().indexOf(insertName) !== -1) {
                            newDati.push(element);
                            this.createCards(newDati);
                        }
                    })

                }
            })

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
            
        })

    }

    expandSearch = () => {
        this.advancedSearch.addEventListener('click', e => {
  
            this.containerFilters.classList.contains('hidden') ? this.containerFilters.classList.remove('hidden') :
                this.containerFilters.classList.add('hidden');
            
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

                let height = e.target.parentElement.clientHeight;

                e.target.parentElement.classList.add('hidden');

                e.target.parentNode.nextElementSibling.style.minHeight = height + 'px';

                e.target.parentNode.nextElementSibling.classList.remove('hidden');

            }

            if (e.target.textContent === 'X') {

                e.target.parentNode.parentNode.parentNode.classList.add('hidden');
                e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.remove('hidden');

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