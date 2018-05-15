var root = typeof self == 'object' && self.self === self && self ||
           typeof global == 'object' && global.global === global && global ||
           this;

import 'semantic-ui-css/semantic.css';

import $ from 'jquery';
import 'semantic-ui-site';
import 'semantic-ui-form';

import transition from 'semantic-ui-transition';
$.fn.transition = transition;
root.$ = $;

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
export {button as Button} from './src/button';
export {buttonGroup as ButtonGroup} from './src/button';
export {checkbox as Checkbox} from './src/button';
export {dropdown as Dropdown} from './src/button';
export {fileInput as FileInput} from './src/button';
export {icon as Icon} from './src/button';
export {list as List} from './src/button';
export {layout as Layout} from './src/button';
export {panel as Panel} from './src/button';
export {progressBar as ProgressBar} from './src/button';
export {table as Table} from './src/button';
export {radios as Radios} from './src/button';


root.dashi = dashi;