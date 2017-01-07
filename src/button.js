if(typeof loadUIComponents == 'function')
    loadUIComponents(['button', 'icon']);

if(typeof define == 'function') {
    define(['./ui'], function(ui){
        ui(['button']);
        return Button;
    });
}

function Button(arg) {
    var button = document.createElement('div'),
        options = arg || {},
        container = options.container || document.body,
        callback = options.onclick || function() {},
        text = options.text || options.label || null,
        icon = options.icon || false,
        title = options.title || false,
        type = options.type,
        types = options.types || [];

    if(type) types.push(type);
    button.className = 'ui button ' + types.join(' ');
    button.onclick = callback;
    button.style.textAlign = 'center';

    if(icon) {
        var i = document.createElement('i');
        i.className = icon + ' icon';
        i.style.marginRight = "10px";
        button.className += ' icon';
        button.appendChild(i);
    }
    if(text !== null) button.innerHTML += text;
    if(title) button.title = title;
    if(container) container.appendChild(button);

    return button;
}
