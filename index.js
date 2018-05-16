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

export default dashi;
export {button as Button} from './src/button';
export {buttonGroup as ButtonGroup} from './src/button-group';
export {checkbox as Checkbox} from './src/checkbox';
export {dropdown as Dropdown} from './src/dropdown';
export {fileInput as FileInput} from './src/fileinput';
export {icon as Icon} from './src/icon';
export {list as List} from './src/list';
export {layout as Layout} from './src/layout';
export {panel as Panel} from './src/panel';
export {progressBar as ProgressBar} from './src/progress';
export {table as Table} from './src/table';
export {radios as Radios} from './src/radios';