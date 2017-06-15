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
        selectedColor = options.selectedColor || 'black',
        selectedIcon = options.selectedIcon || '',
        types = options.types || [];

    if(type) types.push(type);
    if(container) container.appendChild(list);
    list.className = 'ui list ' + types.join(' ');
    var items = [];

    var onSelect = function() {};

    if(typeof options.onselect == 'function') {
        onSelect = function(itemId) {
            if(!items[itemId]._selected) {
                items[itemId]._selected = true;
                items[itemId].className += ' selected';
                if(items[itemId].hasOwnProperty('icon'))
                    items[itemId].icon.className += ' ' + selectedColor + ' ' + selectedIcon;
                if(types.indexOf('multi-select') === -1) {
                    items.forEach(function(item){ item._selected = false;})
                }
            } else {
                items[itemId]._selected = false;
                items[itemId].className = items[itemId].className.replace('selected', '');
                if(items[itemId].hasOwnProperty('icon'))
                    items[itemId].icon.className = items[itemId].icon.className.replace(selectedColor + ' ' + selectedIcon, '');
            }
            options.onselect.call(items[itemId], itemId)
        }
    }

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
        var itemId = items.length;
        item._selected = false;
        item.icon = icon;
        items.push(item);
        list.appendChild(item);

        if(types.indexOf('selection') !== -1){
            item.onclick = onSelect.bind(this, itemId);
        }

        return list;
    }

    list.getSelectedItemIds = function() {
        return items.filter(function(d){
            return d._selected === true;
        });
    }

    list.get = function(i) {
        return items[i];
    }

    list.select = function(i) {
        onSelect(i);
    }

    list.clear = function() {
        items = [];
        list.innerHTML = '';
    }

    list.remove = function(i) {
        list.removeChild(items[i]);
        return list;
    }

    return list;
}
