/*!
 * Calcular temps de lectura de un text.
 * (c) 2022 Sammy
 */

'use strict';

class TempsLectura {
    constructor() {
        this._locale='ca';

        this._paraules_x_minut=200.0;
        this._sanitize=true;
        this._text=null;
        this._node=null;
        this._id=null;
    }

    // Seters / Geters
    set locale(valor) {this._locale=valor;}
    get locale() {return this._locale;}

    set paraules_x_minut(valor) {this._paraules_x_minut=valor;}
    get paraules_x_minut() {return this._paraules_x_minut;}

    set sanitize(valor) {this._sanitize=valor;}
    get sanitize() {return this._sanitize;}

    set text(valor) {
        this._text=valor;
        this._node=null;
        this._id=null;
    }
    get text() {return this._text;}

    set node(valor) {
        this._text=null;
        this._node=valor;
        this._id=null;
    }
    get node() {return this._node;}

    set id(valor) {
        this._text=null;
        this._node=null;
        this._id=valor;
    }
    get id() {return this._id;}

    // Metodes publics
    calcular_temps() {
        let _text='',
            _text_temps='', _text_paraules='',
            _paraules, _minuts, _segons;
        let _tmp;

        if (this._id) {
            _text='';
            _tmp=document.getElementById(this.id);
            if (_tmp) {
                if (this._sanitize) _text=_tmp.innerText;
                else _text=_tmp.innerHTML;
            }
        } else if (this._node) {
            if (this._sanitize) _text=this._node.innerText;
            else _text=this._node.innerHTML;
        } else _text=this._text || '';

        _paraules=_text.split(' ').length;
        _tmp=_paraules/this.paraules_x_minut;
        _minuts=Math.floor(_tmp);
        _segons=(_tmp-_minuts)*60.0;

        if (_segons>=30) _minuts++
        switch (this._locale.toLowerCase()) {
            case 'ca', 'ca-es': _text_temps=(_minuts===1)?'minut':'minuts';
                _text_paraules=(_paraules===1)?'paraula':'paraules';
                break;
            case 'es', 'es-es': _text_temps=(_minuts===1)?'minuto':'minutos';
                _text_paraules=(_paraules===1)?'palabra':'palabras';
                break;
            case 'en', 'en-gb', 'en-us': _text_temps=(_minuts===1)?'minute':'minutes';
                _text_paraules=(_paraules===1)?'word':'words';
                break;
            }
        return {'temps': _minuts, 'text_temps': _text_temps, 'paraules': _paraules, 'text_paraules': _text_paraules};
    }

    formata_temps_lectura() {
        let _temps_calculat=this.calcular_temps();

        return ''+_temps_calculat.temps+' '+_temps_calculat.text_temps+' ('+_temps_calculat.paraules+' '+_temps_calculat.text_paraules+')';
    }
    // Funcions privades
}
