if(typeof loadUIComponents == 'function')
    loadUIComponents(['button', 'icon']);

if(typeof define == 'function') {
    define(function(ui){
        return ButtonGroup;
    });
}

function ButtonGroup(arg) {
    var buttonGroup = document.createElement('div'),
        options = arg || {},
        buttons = options.buttons || [],
        container = options.container || null,
        type = options.type,
        id = options.id || false,
        types = options.types || [];

    if(type) types.push(type);
    if(id) buttonGroup.setAttribute('id', id);
    buttonGroup.className = 'ui buttons ' + types.join(' ');
    function addButtons(buttons) {
        buttons.forEach(function(b) {
            buttonGroup.appendChild(b);
        });
    }
    addButtons(buttons);

    if(container) container.appendChild(buttonGroup);

    buttonGroup.add = function(buttons) {
        if(Array.isArray(buttons)) buttons = [buttons];
        addButtons(buttons);
    }
    buttonGroup.append = buttonGroup.add;

    return buttonGroup;
}
