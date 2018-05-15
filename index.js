

import './semantic/dist/components/reset.css';
import './semantic/dist/components/site.css';
import './semantic/dist/components/form.css';
import './semantic/dist/components/header.css';
import './semantic/dist/components/segment.css';
import './semantic/dist/components/button.css';
import './semantic/dist/components/dropdown.css';
import './semantic/dist/components/icon.css';
import './semantic/dist/components/menu.css';
import './semantic/dist/components/transition';
import './semantic/dist/components/checkbox.css';
import './semantic/dist/components/progress.css';
import './semantic/dist/components/table.css';
import './semantic/dist/components/list.css';
import './semantic/dist/components/modal.css';

import './semantic/dist/semantic.js';



import button      from './src/button';
import buttonGroup from './src/button-group';
import checkbox    from './src/checkbox';
import dropdown    from './src/dropdown';
import fileInput   from './src/fileinput.js';
import icon        from './src/icon';
import list        from './src/list';
import layout      from './src/layout';
import panel       from './src/panel';
import progressBar from './src/progress';
import radios      from './src/radios';
import table       from './src/table';

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

export default dashi;

var root = typeof self == 'object' && self.self === self && self ||
           typeof global == 'object' && global.global === global && global ||
           this;


root.dashi = dashi;