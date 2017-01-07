if(typeof loadUIComponents == 'function')
    loadUIComponents(['checkbox']);

if(typeof define == 'function') {
    define(['./ui'], function(ui){
        ui(['checkbox']);
        return Button;
    });
}

function Checkbox(arg) {
    var checkbox = document.createElement('div'),
        options = arg || {},
        container = options.container || document.body,
        name = options.name || options.variable || "",
        callback = options.onchange ||  function() {},
        text = options.text || options.label || null,
        type = options.type,
        types = options.types || [];

    if(type) types.push(type);
    var input = document.createElement('input'),
        label = document.createElement('label');

    checkbox.className = 'ui checkbox ' + types.join(' ');
    label.innerHTML = text;
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', name);
    input.onchange = callback;

    checkbox.append(label);
    checkbox.append(input);

    if(container) container.appendChild(checkbox);

    var jquery = window.jQuery || jQuery || $;
    if(typeof jquery !== 'undefined') {
        jquery('.ui.checkbox').checkbox();
    }

    Object.defineProperty(wrapper, 'onchange', {
        set: function(f) { callback = f; }
    })


    return checkbox;
}
