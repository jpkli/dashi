var root = typeof self == 'object' && self.self === self && self ||
           typeof global == 'object' && global.global === global && global ||
           this;
           
import $ from 'jquery';
import 'semantic-ui-site';
import 'semantic-ui-form';

import semanticTransition from 'semantic-ui-transition';
import semanticCheckbox from 'semantic-ui-checkbox';
import semanticProgress from 'semantic-ui-progress';

$.fn.transition = semanticTransition;
$.fn.checkbox = semanticCheckbox;
$.fn.progress = semanticProgress;

root.$ = $;

import button      from '../src/button';
import buttonGroup from '../src/button-group';
import checkbox    from '../src/checkbox';
import dropdown    from '../src/dropdown';
import fileInput   from '../src/fileinput.js';
import icon        from '../src/icon';
import list        from '../src/list';
import layout      from '../src/layout';
import panel       from '../src/panel';
import progressBar from '../src/progress';
import radios      from '../src/radios';
import table       from '../src/table';

let dashi = {
    button,
    buttonGroup,
    checkbox,
    dropdown,  
    fileInput,
    icon,  
    list,       
    layout,
    panel, 
    progressBar,
    radios,
    table 
};

root.dashi = dashi;

