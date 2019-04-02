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
        this.corps = `<nav class="navbar navbar-light">
		<span class="navbar-brand mb-0 h1">Apex session</span>
	</nav>
		<!-- Button trigger modal -->
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
		Ajouter une partie
	  </button>
	  
	  <!-- Modal -->
	  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
		  <div class="modal-content">
			<div class="modal-header">
			  <h5 class="modal-title" id="exampleModalLabel">Entrez les statistiques de la partie</h5>
			  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			  </button>
			</div>
			<div class="modal-body">
					<form class="addPartie">
							<div class="form-group">
							  <label for="exampleInputEmail1">kill</label>
							  <input name="kill" type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="">
							</div>
							<div class="form-group">
								<label for="exampleInputPassword1">Position</label>
								<input name="position" type="number" class="form-control" id="exampleInputPassword1" placeholder="">
							</div>
							<div class="form-group">
								<label for="exampleInputPassword1">Degats</label>
								<input name="degat" type="number" class="form-control" id="exampleInputPassword1" placeholder="">
							</div>
							<button type="submit" class="btn btn-primary">Créer</button>
						  </form>
			</div>
		  </div>
		</div>
	  </div>
	<div class="chartKill container">

	</div>
	<div class="chartDegat container">

	</div>
	<div class="chartPosition container">

    </div>`;
        this.submit = this.submit.bind(this);
    }

    render() {
        $('body').html(this.corps);
        const chartKill = new Generator('Kill', 'chartKill', this.dataKill, '255,0,0');
        const chartDegat = new Generator('Degats', 'chartDegat', this.dataDegat, '0,255,0')
        const chartPosition = new Generator('Position', 'chartPosition', this.dataPosition, '0,0,255')
        $('.chartKill').html(chartKill.generate());
        $('.chartDegat').html(chartDegat.generate());
        $('.chartPosition').html(chartPosition.generate());
        console.log(this.dataDegat);
    }

    mount(container) {
        console.log("mounted");
        const form = document.querySelector('.addPartie');
        console.log(form);
        if(!form) {
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
            if(!value) {
                errors.push(`Le champ ${fieldName} ne peut etre vide`);
            }
            values[fieldName] = value;
        });
        console.log('jarrive ici')
        if(errors.length) {
            alert(errors.join('\n'));
        }else{
            const form = document.querySelector('addPartie');
            console.log('ici aussi');
            console.log(values);
            this.dataDegat.push(values.degat);
            this.dataKill.push(values.kill);
            this.dataPosition.push(values.position);
            this.render();
            this.mount();
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