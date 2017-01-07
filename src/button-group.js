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
        types = options.types || [];

    if(type) types.push(type);
    button.className = 'ui buttons ' + types.join(' ');

    function addButtons(buttons) {
        buttons.forEach(function(b) {
            buttonGroup.appendChild(b);
        });
    }

    if(container) container.appendChild(button);

    buttonGroup.add = function(buttons) {
        if(Array.isArray(buttons)) buttons = [buttons];
        addButtons(buttons);
    }
    buttonGroup.append = buttonGroup.add;
}
