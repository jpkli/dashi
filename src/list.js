if(typeof loadUIComponents == 'function')
    loadUIComponents(['list']);

if(typeof define == 'function') {
    define(['./ui'], function(ui){
        ui(['list']);
        return List;
    });
}

function List(arg) {
    var list= document.createElement('div'),
        options = arg || {},
        container = options.container || document.body,
        type = options.type,
        types = options.types || [];

    if(type) types.push(type);
    if(container) container.appendChild(list);
    list.className = 'ui list ' + types.join(' ');
    var items = [];

    list.append = function(li) {
        var item = document.createElement('div'),
            content = document.createElement('div');
        item.className = 'item';
        content.className = 'content';
        if(li.hasOwnProperty('icon')) {
            var icon = document.createElement('i');
            icon.className = li.icon + ' icon';
            item.appendChild(icon);
        }

        if(li.hasOwnProperty('img')) {
            var img = document.createElement('img');
            img.className ='ui avatar iamge';
            img.src = li.img;
            item.appendChild(img);
        }

        if(li.hasOwnProperty('header')) {
            var header = document.createElement('div');
            header.innerHTML = li.header;
            content.appendChild(header);
        }

        if(li.hasOwnProperty('text')) {
            // var text = document.createElement('div');
            content.innerHTML += li.text;
            // content.appendChild(text);
        }
        item.appendChild(content);
        items.push(item);
        list.appendChild(item);
        return list;
    }

    list.get = function(i) {
        return items[i];
    }

    list.remove = function(i) {
        list.removeChild(items[i]);
        return list;
    }

    return list;
}
