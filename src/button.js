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
        fontSize = options.fontSize || options.size || null,
        background = options.background || null,
        fileInput = options.fileInput || false,
        types = options.types || [];

    if(type) types.push(type);
    button.className = 'ui button ' + types.join(' ');
    button.onclick = callback;
    button.style.textAlign = 'center';
    button.style.verticalAlign = 'top';

    if(icon) {
        var i = document.createElement('i');
        i.className = icon + ' icon';
        i.style.marginRight = "10px";
        button.className += ' icon';
        button.appendChild(i);
    }

    if(fileInput) {
        var input = document.createElement('input'),
            inputName = fileInput.name || 'files[]';

        input.setAttribute('type', 'file');
        input.setAttribute('multiple', '');
        if(fileInput.hasOwnProperty('id')){
            input.setAttribute('id', fileInput.id);
        }
        input.style.display = 'none';
        if(typeof fileInput.onchange === 'function') {
            input.addEventListener('change', function(evt) {
                fileInput.onchange(evt.target.files);
                return false;
            }, false);
        }

        button.appendChild(input);
        button.onclick = function(evt) {
            input.click();
            return false;
        }

        button.fileInput = input;
    }

    if(text !== null) button.innerHTML += text;
    if(fontSize !== null) button.style.fontSize = fontSize;
    if(title) button.title = title;
    if(container) container.appendChild(button);

    return button;
}
