if(!window.installedUI) window.installedUI = [];

function loadUIComponents(components) {
    var uiComponents = (Array.isArray(components)) ? components : [components]
    uiComponents.forEach(function(css){
        if(window.installedUI.indexOf(css) === -1) {
            var sh = document.createElement('link');
            sh.setAttribute('rel', 'stylesheet');
            sh.setAttribute('type', 'text/css');
            sh.setAttribute('href', '../semantic/dist/components/'+css+'.min.css');
            document.head.appendChild(sh);
            window.installedUI.push(css);
        }
    })
}

loadUIComponents(['reset', 'site', 'form']);

function vastui() {
    var deps = {
        panel    : ['segment', 'header'],
        button   : ['button', 'icon'],
        icon     : ['icon'],
        menu     : ['menu', 'transition'],
        dropdown : ['dropdown', 'transition'],
        radios   : ['checkbox'],
        checkbox : ['checkbox']
    };

    return function load(component) {
        if(deps.hasOwnProperty(component)) {
            loadUIComponents(deps[component]);
        }
    }
}

if(typeof(define) == "function") define(vastui);
