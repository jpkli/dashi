var root = typeof self == 'object' && self.self === self && self ||
           typeof global == 'object' && global.global === global && global ||
           this;

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

root.dashi = dashi;

// export default dashi;
export {default as Button} from './src/button';
export {default as ButtonGroup} from './src/button-group';
export {default as Checkbox} from './src/checkbox';
export {default as Dropdown} from './src/dropdown';
export {default as FileInput} from './src/fileinput';
export {default as Icon} from './src/icon';
export {default as List} from './src/list';
export {default as Layout} from './src/layout';
export {default as Panel} from './src/panel';
export {default as ProgressBar} from './src/progress';
export {default as Table} from './src/table';
export {default as Radios} from './src/radios';