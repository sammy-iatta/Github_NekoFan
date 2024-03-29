/**
 * Calcular temps de lectura de un text.
 * (c) 2024 Sammy
 *
 * @class TempsLectura
 * @classdesc Clase genèrica
 *
 * @param {Object} options - Opcions d'inicialització de la clase
 * @param {String} options.locale - Idioma de sortida del text composat amb el temps
 * @param {Number} options.paraules_x_minut - Quantes paraules per minut pot llegir una persona
 * @param {String} options.clase - HTML Class a aplicar a la imatge de sortida
 * @param {String} options.imatge - Imatge a mostrar
 * @param {Boolean} options.sanitize - Netejar de tags html el text o no
 * @param {String} options.text - Text a processar. Aquesta opció anula Node i ID
 * @param {Object} options.node - Nodus html a processar. Aquesta opció anula Text i ID
 * @param {String} options.id - ID del nodus html a processar. Aquesta opció anula Text i Node
 * 
 */

'use strict';

class TempsLectura {
    _params={
        'locale': 'ca',
        'paraules_x_minut': 200.0,
        'clase': 'nf-reading-time',
        'imatge': 'data:image/svg+xml,%3Csvg fill=\'%23A0A0A0\' xmlns=\'http://www.w3.org/2000/svg\'  width=\'20px\' height=\'20px\' viewBox=\'0 0 88.965 88.966\'%3E%3Cpolygon points=\'66.436,56.656 61.639,56.656 61.639,72.438 75.096,72.438 75.096,67.641 66.436,67.641\'/%3E%3Cpath d=\'M65.049,46.49v-3.342V23.541c0,0,0.008-6.385,0-6.465l-3.746-7.59l3.324-6.32c0.354-0.67,0.33-1.475-0.062-2.121 C64.174,0.397,63.471,0,62.715,0H5.301C4.11,0,3.143,0.967,3.143,2.16l0.052,80.307h10.369V16.841H7.461V4.32h51.68l-2.186,4.15 c-0.328,0.625-0.332,1.369-0.007,1.998l3.295,6.373h-42.43v65.625h7.915h6.818h14.526h2.236c3.865,4,9.273,6.5,15.264,6.5 c11.719,0,21.25-9.532,21.25-21.25C85.825,56.158,76.547,46.746,65.049,46.49z M64.575,81.966c-7.857,0-14.25-6.394-14.25-14.25 s6.393-14.25,14.25-14.25s14.25,6.394,14.25,14.25S72.432,81.966,64.575,81.966z\'/%3E%3C/svg%3E',
        'sanitize': true,
        'text': null,
        'node': null,
        'id': null
    };
    _locales={
      'ca':    {'m': ['minut','minuts'],   'p': ['paraula','paraules']},
      'ca-es': {'m': ['minut','minuts'],   'p': ['paraula','paraules']},
      'es':    {'m': ['minuto','minutos'], 'p': ['palabra','palabras']},
      'es-es': {'m': ['minuto','minutos'], 'p': ['palabra','palabras']},
      'en':    {'m': ['minute','minutes'], 'p': ['word','words']},
      'en-gb': {'m': ['minute','minutes'], 'p': ['word','words']},
      'en-us': {'m': ['minute','minutes'], 'p': ['word','words']}
    };
    constructor(options) {
        Object.assign(this._params, options);
    }

    // Seters / Geters
    set locale(valor) {this._params.locale=valor;}
    get locale() {return this._params.locale;}

    set paraules_x_minut(valor) {this._params.paraules_x_minut=valor;}
    get paraules_x_minut() {return this._params.paraules_x_minut;}

    set sanitize(valor) {this._params.sanitize=valor;}
    get sanitize() {return this._params.sanitize;}

    set img(valor) {this._params.imatge=valor;}
    get img() {return this._params.imatge;}

    set text(valor) {
        this._params.text=valor;
        this._params.node=null;
        this._params.id=null;
    }
    get text() {return this._params.text;}

    set node(valor) {
        this._params.text=null;
        this._params.node=valor;
        this._params.id=null;
    }
    get node() {return this._params.node;}

    set id(valor) {
        this._params.text=null;
        this._params.node=null;
        this._params.id=valor;
    }
    get id() {return this._params.id;}

    // Metodes publics
    calcular_temps() {
        let _text='',
            _text_temps='', _text_paraules='',
            _paraules=0, _minuts=0, _segons=0;
        let _tmp;

        if (this._params.id) {
            _text='';
            _tmp=document.getElementById(this._params.id);
            if (_tmp) {
                if (this._params.sanitize) _text=_tmp.innerText;
                else _text=_tmp.innerHTML;
            }
        } else if (this._params.node) {
            if (this._params.sanitize) _text=this._params.node.innerText;
            else _text=this._params.node.innerHTML;
        } else _text=this._params.text || '';

        if (_text && _text.length) {
            _paraules=_text.split(' ').length;
            _tmp=_paraules/this._params.paraules_x_minut;
            _minuts=Math.floor(_tmp);
            _segons=(_tmp-_minuts)*60.0;
            if (_segons>=30) _minuts++;
        }

        _text_temps=(_minuts===1)?this._locales[this._params.locale]['m'][0]:this._locales[this._params.locale]['m'][1];
        _text_paraules=(_paraules===1)?this._locales[this._params.locale]['p'][0]:this._locales[this._params.locale]['p'][1];

        return {'imatge': this._composa_imatge(), 'temps': _minuts, 'text_temps': _text_temps, 'paraules': _paraules, 'text_paraules': _text_paraules};
    }

    formata_temps_lectura() {
        let _temps_calculat=this.calcular_temps();

        return _temps_calculat.imatge+_temps_calculat.temps+' '+_temps_calculat.text_temps+' ('+_temps_calculat.paraules+' '+_temps_calculat.text_paraules+')';
    }
    // Funcions privades
    _composa_imatge() {
        return ((this._params.imatge)?('\x3cimg src="'+this._params.imatge+'" class="'+this._params.clase+'"/\x3e'):'');
    }
}
