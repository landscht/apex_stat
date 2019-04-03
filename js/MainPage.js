import $ from 'jquery';
import Generator from './Generator';

export default class MainPage {

    corps;
    dataKill;
    dataDegat;
    dataPosition;

    constructor() {
        this.dataDegat = [];
        this.dataKill = [];
        this.dataPosition = [];
        this.corps = `
        <nav class="navbar">
		    <span class="navbar-brand mb-0 h1">Apex session</span>
	    </nav>

        <div class="container">
            <button class="btn btn-outline-success boutonAdd">
		        Ajouter une partie
            </button>
            <button class="btn btn-outline-danger boutonRemove">
                Annuler partie
            </button>
            <div class="containerForm">
            <form class="form-inline addPartie">
                <div class="form-group mb-2">
                <input type="number" class="form-control-plaintext" id="staticEmail2" name="kill" placeholder="kill">
                </div>
                <div class="form-group mb-2">
                <input type="number" class="form-control-plaintext" id="staticEmail2" name="degat" placeholder="degat">
                </div>
                <div class="form-group mb-2">
                <input type="number" class="form-control-plaintext" id="staticEmail2" name="position" placeholder="position">
                </div>
                <button type="submit" class="btn btn-outline-primary mb-2">Créer</button>
            </form>
          </div>
            <div class="containerChart">
                <div class="chartKill">

                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Total</th>
                            <th scope="col">Maximum</th>
                            <th scope="col">Moyenne</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="tableKill">

                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="containerChart">
                <div class="chartDegat">

                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Total</th>
                            <th scope="col">Maximum</th>
                            <th scope="col">Moyenne</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="tableDegat">

                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="containerChart">
                <div class="chartPosition">

                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Total</th>
                            <th scope="col">Maximum</th>
                            <th scope="col">Moyenne</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="tablePosition">

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
        this.submit = this.submit.bind(this);
    }

    generateStat(data, type) {
        if(data.length) {
            let max = 0;
            console.log(type);
            if (type === 'kill' || type === 'degat') { max = -1; }
            if (type === 'position') { max = 21; }
            let total = 0;
            let repet = 0;
            data.forEach((don) => {
                let donnee = parseInt(don, 10);
                total = total + donnee;
                repet++;
                if (type === 'kill' || type === 'degat') {
                    if (max < donnee) {
                        max = donnee;
                    }
                }
                if (type === 'position') {
                    if (max > donnee) {
                        max = donnee;
                    }
                }
            })
            console.log((total / repet));
            return `<td>${total}</td><td>${max}</td><td>${(total / repet)}</td>`;
        }else{
            return `<td>0</td><td>0</td><td>0</td>`
        }
    }

    render() {
        $('body').html(this.corps);
        document.querySelector('.containerForm').style.display = 'none';
        $('.boutonAdd').click((data) => {
            console.log("clique");
            document.querySelector('.containerForm').style.display = 'block';
        })
        $('.boutonRemove').click((data) => {
            this.dataDegat.pop();
            this.dataKill.pop();
            this.dataPosition.pop();
            this.render();
            this.mount();
        })
        const chartKill = new Generator('Kill', 'chartKill', this.dataKill, '255,0,0');
        const chartDegat = new Generator('Degats', 'chartDegat', this.dataDegat, '0,255,0')
        const chartPosition = new Generator('Position', 'chartPosition', this.dataPosition, '0,0,255')
        $('.chartKill').html(chartKill.generate());
        $('.chartDegat').html(chartDegat.generate());
        $('.chartPosition').html(chartPosition.generate());
        document.documentElement.style.overflow = '';
        console.log(this.dataDegat);
        $('.tableKill').html(this.generateStat(this.dataKill, 'kill'));
        $('.tableDegat').html(this.generateStat(this.dataDegat, 'degat'));
        $('.tablePosition').html(this.generateStat(this.dataPosition, 'position'));
    }

    mount(container) {
        console.log("mounted");
        const form = document.querySelector('.addPartie');
        console.log(form);
        if (!form) {
            return;
        }
        form.addEventListener('submit', this.submit);
    }

    submit(event) {
        console.log("submit");
        event.preventDefault();

        const fieldNames = [
            'kill',
            'position',
            'degat'
        ];
        const values = {};
        const errors = [];

        fieldNames.forEach((fieldName) => {
            const value = this.getFieldValue(fieldName);
            if (!value) {
                errors.push(`Le champ ${fieldName} ne peut etre vide`);
            }
            values[fieldName] = value;
        });
        console.log('jarrive ici')
        if (errors.length) {
            alert(errors.join('\n'));
        } else {
            const form = document.querySelector('addPartie');
            console.log('ici aussi');
            console.log(values);
            this.dataDegat.push(values.degat);
            this.dataKill.push(values.kill);
            this.dataPosition.push(values.position);
            this.render();
            this.mount();
            document.documentElement.style.overflow = '';
        }
    }

    getFieldValue(fieldName) {
        // on récupère une référence vers le champ qui a comme attribut `name` la valeur fieldName (nom, base, prix_petite, etc.)
        const field = document.querySelector(`[name=${fieldName}]`);
        if (field instanceof HTMLInputElement) {
            // s'il s'agit d'un <input> on utilise la propriété `value`
            // et on retourne la chaine de caractère saisie
            return field.value != '' ? field.value : null;
        } else if (field instanceof HTMLSelectElement) {
            // s'il s'agit d'un <select> on utilise la propriété `selectedOptions`
            const values = [];
            for (let i = 0; i < field.selectedOptions.length; i++) {
                values.push(field.selectedOptions[i].value);
            }
            // et on retourne un tableau avec les valeurs sélectionnées
            return values.length ? values : null;
        }
        return null;
    }


}