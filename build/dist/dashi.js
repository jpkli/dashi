/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = Button;
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
        value = options.value || null,
        types = options.types || [];

    if(type) types.push(type);
    types.push('ui button');
    button.className = types.join(' ');
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

    if(value !== null) {
        button.setAttribute('value', value);
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
                // fileInput.onchange(evt.target.files);
                fileInput.onchange(evt);
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

    button.showLoading = function() {
        if((' ' + button.className + ' ').indexOf(' loading ') === -1)
            button.className += ' loading';
    }

    button.hideLoading = function() {
        button.className = button.className.replace(/\bloading\b/, '');
    }

    button.toggleLoading = function() {
        if((' ' + button.className + ' ').indexOf(' loading ') === -1)
            button.className += ' loading';
        else
            button.hideLoading();
    }


    return button;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = ButtonGroup;
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

    if(types.indexOf('dropdown')!==-1) {
        var dropdown = document.createElement('div'),
            icon = document.createElement('div'),
            menu = document.createElement('div');

        dropdown.className = 'ui floating dropdown icon button';
        icon.className = 'dropdown icon';
        menu.className = 'menu';

        dropdown.appendChild(icon);
        dropdown.appendChild(menu);
        buttonGroup.appendChild(dropdown);

        buttonGroup.menu.append = function(items) {
            items.forEach(function(item){
                var label = item.label || item.name || '',
                    callback = item.onclick || function(){};
                var itemDiv = document.createElement('div'),
                    ic = document.createElement('i'),
                    text = document.createTextNode(label);
                ic.className = item.icon + ' icon';
                itemDiv.appendChild(ic);
                itemDiv.appendChild(text);
                itemDiv.onclick = callback.call(this, arg);
                itemDiv.className = 'item';
                menu.appendChild(itemDiv);
            })
        }
    }

    return buttonGroup;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = Checkbox;
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
    checkbox.style.margin = '10px';
    label.innerHTML = text;
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', name);
    input.onchange = callback;

    checkbox.appendChild(label);
    checkbox.appendChild(input);

    if(container) container.appendChild(checkbox);

    var jquery = window.jQuery || window.$;
    if(typeof jquery == 'function') {
        jquery(checkbox).checkbox();
    }

    Object.defineProperty(checkbox, 'onchange', {
        set: function(f) { callback = f; }
    })

    return checkbox;
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Dropdown;
function Dropdown(arg) {
    var dropdown = document.createElement('div'),
        wrapper = document.createElement('div');
        options = arg || {},
        container = options.container || null,
        type = options.type,
        id = options.id || false,
        label = options.label,
        items = options.items || options.menu || [],
        types = options.types || [];

    if(type) types.push(type);
    if(id) dropdown.setAttribute('id', id);
    dropdown.className = 'ui buttons ' + types.join(' ');

    if(container) container.appendChild(dropdown);
    var icon = document.createElement('div'),
        menu = document.createElement('div');

    dropdown.className = 'ui compact menu';
    wrapper.className = 'ui simple dropdown item'

    icon.className = 'dropdown icon';
    menu.className = 'menu';

    wrapper.appendChild(document.createTextNode(label));
    wrapper.appendChild(icon);
    wrapper.appendChild(menu);
    dropdown.appendChild(wrapper);

    dropdown.append = function(items) {
        if(!Array.isArray) items = [items];
        items.forEach(function(item){
            var label = item.label || item.name || '',
                callback = item.onclick || function(){};
            var itemDiv = document.createElement('div'),
                ic = document.createElement('i'),
                text = document.createTextNode(label);
            ic.className = item.icon + ' icon';
            itemDiv.appendChild(ic);
            itemDiv.appendChild(text);
            itemDiv.onclick = callback.bind(this, arg);
            itemDiv.className = 'item';
            menu.appendChild(itemDiv);
        })
    }
    dropdown.menu = function(items) {
        dropdown.append(items);
    }

    dropdown.menu(items);

    return dropdown;
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = FileInput;
function FileInput(arg) {
    var button;
    if(typeof arguments[0] === 'function') {
        button = arguments[0](arg);
    } else {
        button = Button(arg);
    }

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
    if(text !== null) button.innerHTML += text;
    if(fontSize !== null) button.style.fontSize = fontSize;
    if(title) button.title = title;
    if(container) container.appendChild(button);

    return button;
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Icon;
function Icon(arg) {
    var icon = document.createElement('i'),
        options = arg || {},
        callback = options.onclick ||false,
        type = options.type,
        types = options.types || [],
        title = options.title || options.type || false;

    if(type) types.push(type);
    if(title) icon.title = title;
    icon.className = 'ui icon ' + types.join(' ');
    if(callback) {
         icon.onclick = callback;
         icon.className += ' link';
    }
    icon.change = function(i) {
        icon.className = icon.className.replace(type, d);
    };
    return icon;
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = List;
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

    let setSelected = (itemId, selected) => {
        if (selected == items[itemId]._selected) {
            return;
        }
        if (selected) {
            items[itemId]._selected = true;
            items[itemId].className += ' selected';
            if(items[itemId].hasOwnProperty('icon'))
                items[itemId].icon.className +=
                        ' ' + selectedColor + ' ' + selectedIcon;
            return;
        }
        items[itemId]._selected = false;
        items[itemId].className =
                items[itemId].className.replace('selected', '');
        if(items[itemId].hasOwnProperty('icon'))
            items[itemId].icon.className =
                    items[itemId].icon.className.replace(
                        selectedColor + ' ' + selectedIcon, '');
    };

    list.onselect = options.onselect || function() {};
    var onSelect = function(itemId) {
        if (types.indexOf('single') !== -1) {
            // single selection only
            list.clearSelected();
            setSelected(itemId, true);
        } else {
            // multiple selection
            setSelected(itemId, !items[itemId]._selected);
        }
        list.onselect.call(items[itemId], itemId);
    };

    list.append = function(li) {
        var item = document.createElement('div'),
            content = document.createElement('div');
        item.className = 'item';
        content.className = 'content';

        if(li.hasOwnProperty('icon')) {
            var icon = document.createElement('i');
            icon.className = li.icon + ' icon';
            item.appendChild(icon);
            item.icon = icon;
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
        items.push(item);
        list.appendChild(item);

        if(types.indexOf('selection') !== -1){
            item.onclick = onSelect.bind(this, itemId);
        }

        return list;
    };

    list.setSelectedItemIds = ids => {
        list.clearSelected();
        ids.forEach(id => {
            setSelected(id, true);
        });
    };

    list.clearSelected = () => {
        items.forEach((item, id) => {
            setSelected(id, false);
        });
    };

    list.getSelectedItemIds = function() {
        return items
            .map((d, i) => d._selected === true ? i : -1)
            .filter(id => id >= 0);
    };

    list.get = function(i) {
        return items[i];
    };

    list.select = function(i) {
        onSelect(i);
    };

    list.clear = function() {
        items = [];
        list.innerHTML = '';
    };

    list.remove = function(i) {
        list.removeChild(items[i]);
        return list;
    };

    return list;
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Layout;
function Layout(arg) {
    'use strict';
    var options = arg || {},
        layoutId = options.id || false,
        className = options.class || "",
        margin = options.margin || 0,
        spacing = options.spacing || 5,
        padding = options.padding || 0,
        rows = options.rows || [],
        cols = options.cols || [],
        divRows = [],
        divCols = [],
        container = options.container || document.body;

    if(typeof container == 'string')
        container = document.getElementById(container);

    if(container == document.body ) {
        container.style.height = window.innerHeight + 'px';
        container.style.padding = 0;
        container.style.margin = 0;
        container.style.overflow = 'hidden';
    }

    var setting = {
        rowHeights: [],
        colWidths : [],
    };

    var width = options.width ||  container.clientWidth || window.innerWidth,
        height = options.height || container.clientHeight|| window.innerHeight;

    width -= margin*2;
    height -= margin*2;

    var divs = {},
        cells = [];


    function createRow(w, h) {
        var row = document.createElement('div');
        row.style.width = w + 'px';
        row.style.height = h + 'px';
        row.className = 'davi-row';
        row.style.overflow = 'hidden';
        return row;
    }

    function createColumn(w, h) {
        var col = document.createElement('div');
        col.style.display = 'inline-block';
        col.className = 'davi-col';
        col.style.verticalAlign = "top";
        col.style.width = w + 'px';
        col.style.height = h + 'px';
        col.style.overflow = 'hidden';
        return col;
    }

    function createColumns(spec, container, w, h) {
      var columns = [],
          widthTotal = w,
          widthRemaining = widthTotal;

      spec.forEach(function(cs, i){
          var colWidth = (cs.width > 1) ? cs.width : cs.width * widthTotal;
          columns[i] = createColumn(colWidth, h);
          widthRemaining -= colWidth;
          if(cs.id !== undefined) {
              columns[i].setAttribute('id', cs.id)
              divs[cs.id] = columns[i];
          }
          container.appendChild(columns[i]);
          if(cs.rows) columns[i] = createRows(cs.rows, columns[i], w, h);

      });

      return columns;
    }

    function createRows(spec, container, w, h) {
        var rows = [],
            rowWidth = w,
            heightTotal = h,
            heightRemaining = heightTotal;

        spec.forEach(function(rs, i){
            var rowHeight = (rs.height > 1) ? rs.height : rs.height * heightTotal;
            rows[i] = createRow(rowWidth, rowHeight);
            heightRemaining -= rowHeight;
            if(rs.id !== undefined) {
                rows[i].setAttribute('id', rs.id)
                divs[rs.id] = rows[i];
            }
            container.appendChild(rows[i]);
            if(rs.cols) rows[i] = createColumns(rs.cols, rows[i], rowWidth, rowHeight);

        });

        return rows;
    }

    function createLayout(width, height) {

        var layout = document.createElement('div');

        if(layoutId)
            layout.setAttribute('id', layoutId);

        if(typeof className == 'string')
            layout.className = className;

        // container.style.overflow = 'hidden';
        layout.style.height = height + "px";
        layout.style.width = width + "px";

        layout.style.margin = margin + 'px';
        layout.className = 'davi-layout';
        // layout.style.overflow = 'hidden';
        // layout.style.padding = '0';


        return layout;
    }

    var layout = createLayout(width, height);

    if(rows.length) cells = createRows(rows, layout, width, height);
    if(cols.length) cells = createColumns(cols, layout, width, height);

    Object.keys(divs).forEach(function(k){
        divs[k].append = divs[k].appendChild;
    })

    layout.cell = function(id, cid) {
        if(typeof id === 'number')
            if(typeof cid === 'number' && typeof cells[id][cid] != 'undefined')
                return cells[id][cid];
            else
                return cells[id];
        else
            return divs[id];
    }


    layout.get = layout.cell;
    container.appendChild(layout);
    // container.onresize = function() {
    //     var newLayout = createLayout(container.clientWidth, container.clientHeight);
    //     layout.replaceWith(newLayout);
    // }
    return layout;
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Panel;
function Panel(arg) {
    'use strict';
    var panel,
        option = arg || {},
        container = option.container || document.body,
        header = option.header || null,
        title = option.title || "",
        margin = option.margin || 5,
        style = option.style || {},
        padding = option.padding || 0,
        types = option.types || [],
        classNames = 'panel ui segment',
        angularJS = option.AngularJS || option.angularJS || false,
        headerHeight;

    if (container) {
        container = (typeof(container) == "string") ? document.getElementById(container) : container;
    }

    if (option.id) {
        panel = document.getElementById(option.id);
        if (panel === null) {
            panel = document.createElement("div");
            panel.setAttribute('id', option.id);
            container.appendChild(panel);
        }
    } else {
        panel = document.createElement("div");
        container.appendChild(panel);
    }

    var fullScreen = false,
        width = option.width || container.clientWidth,
        height = option.height || container.clientHeight;

    width -= margin * 2;
    height -= margin * 2;

    panel.className = "ui";
    panel.style.margin = margin + 'px';

    panel.style.width = width + "px";
    panel.style.height = height + "px";
    // panel.style.boxSizing = 'border-box';

    if (header) {
        headerHeight = option.header.height || 0.08 * height;
        if (headerHeight < 1) headerHeight *= height;
        panel.header = document.createElement('div');
        panel.header.className = "ui top attached block header primary";
        panel.header.style.backgroundColor = "#FFFFFF";
        panel.header.style.height = headerHeight + "px";
        panel.header.style.width = width + "px";
        panel.header.style.fontSize = headerHeight * 0.36 + 'px';

        if (option.header.hasOwnProperty('style')) {
            Object.keys(option.header.style).forEach(function(s) {
                panel.header.style[s] = option.header.style[s];
            });
        }
        panel.header.style.padding = 0;
        panel.header.style.paddingLeft = panel.header.style.fontSize;

        var panelTitle = document.createElement('span');
        panelTitle.innerHTML = title;
        panelTitle.style.float = 'left';
        panelTitle.style.marginTop = (headerHeight * 0.25) + 'px';

        panel.header.appendChild(panelTitle);
        panel.appendChild(panel.header);
        Object.defineProperty(panel, "title", {
            get: function() {
                return title;
            },
            set: function(title) {
                panelTitle.innerHTML = title;
            }
        });
        classNames += ' bottom attached';

        if (Array.isArray(option.header.controls)) {
            option.header.controls.forEach(function(ctrl) {
                panel.header.appendChild(ctrl);
            })
        }

        var controls = document.createElement('div');
        controls.style.float = 'right';
        controls.style.marginTop = (headerHeight * 0.25) + 'px';
        controls.style.marginRight = panel.header.style.fontSize;
        panel.header.appendChild(controls)


        panel.header.append = function(elem) {
            if (typeof elem == 'string')
                controls.innerHTML += elem;
            else
                controls.appendChild(elem);
            return panel;
        };

    } else {
        headerHeight = 0;
    }

    panel.body = document.createElement("div");
    panel.body.className = classNames + ' panel-body ' + types.join(' ');
    panel.body.style.width = width + "px";
    panel.body.style.height = height - headerHeight + "px";
    panel.body.style.padding = padding + 'px';
    if (option.hasOwnProperty('style')) {

        Object.keys(option.style).forEach(function(s) {
            panel.body.style[s] = option.style[s];
        });
    }

    panel.appendChild(panel.body);

    if(option.id)
        panel.body.setAttribute('id', option.id+"-body");
    panel.innerWidth = width - padding * 2;
    panel.innerHeight = height - headerHeight - padding * 2;

    if (angularJS && angularJS.hasOwnProperty('ng-controller')) {
        panel.setAttribute('ng-controller', angularJS['ng-controller']);
        panel.body.setAttribute(angularJS['view'], '');
        panel.body.setAttribute('id', angularJS['id'])
    }

    panel.showLoading = function() {
        if((' ' + panel.body.className + ' ').indexOf(' loading ') === -1)
            panel.body.className += ' loading';
    };

    panel.hideLoading = function() {
        panel.body.className = panel.body.className.replace(/\bloading\b/, '');
    };

    panel.toggleLoading = function() {
        if((' ' + panel.body.className + ' ').indexOf(' loading ') === -1)
            panel.body.className += ' loading';
        else
            panel.hideLoading();
    };

    panel.append = function(child) {
        if (typeof child == 'string')
            panel.body.innerHTML += child;
        else
            panel.body.appendChild(child);
        return panel;
    };

    panel.clear = function() {
        panel.body.innerHTML = "";
    };

    panel.update = function(domArray) {
        panel.clear();
        panel.body.appendChild(domArray);
    };


    panel.toggleFullScreen = function() {
        if (!fullScreen) {
            panel.style.position = 'fixed';
            panel.style.top = '1px';
            panel.style.left = '1px';
            panel.style.zIndex = 9999;
            panel.resize(document.body.clientWidth, document.body.clientHeight);
        } else {
            panel.style.position = 'relative';
            panel.style.zIndex = 0;
            panel.resize(container.clientWidth - margin * 2, container.clientHeight - margin * 2);
        }

        fullScreen = !fullScreen;

    }

    panel.resize = function(w, h) {
        if (typeof w == 'undefined' || typeof h == 'undefined') {
            width = container.clientWidth;
            height = container.clientHeight;
        } else {
            width = w;
            height = h;
        }

        panel.style.width = width + "px";
        panel.style.height = height + "px";
        panel.body.style.width = width + "px";
        panel.body.style.height = height - headerHeight + "px";
        if (header) {
            panel.header.style.height = headerHeight + "px";
            panel.header.style.width = width + "px";
        }
    }


    return panel;
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Progress;
function Progress(arg) {
    var div = document.createElement('div'),
        bar = document.createElement('div'),
        progress = document.createElement('div'),
        label = document.createElement('div'),
        options = arg || {},
        container = options.container || null,
        percent = options.percentage || 0,
        type = options.type,
        text = options.text || '',
        types = options.types || [];

    if(type) types.push(type);
    div.className = 'ui progress ' + types.join(' ');

    progress.className = 'progress';
    bar.className = 'bar';
    label.className = 'label';


    label.innerHTML = text;
    bar.appendChild(progress);
    div.appendChild(bar);
    div.appendChild(label);
    if(container) container.appendChild(div);

    var jquery = window.jQuery || window.$;

    Object.defineProperty(div, 'percent', {
        set: function(f) {
            percent = f;
            setPercentage(percent);
            return div;
        }
    });

    function setPercentage() {
        if(typeof jquery == 'function') {
            jquery(div).progress({percent: percent});
        }
    }

    setPercentage(percent);

    div.hide = function() {
        div.style.display = 'none';
    };

    div.show = function() {
        div.style.display = 'block';
    };

    div.label = function(text) {
        label.innerHTML = text;
    };

    return div;
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Radios;
function Radios(arg) {
    var radios = document.createElement('div'),
        options = arg || {},
        container = options.container || document.body,
        data = options.data || [],
        name = options.name || options.variable || "",
        field = options.field || 'inline',
        callback = options.onchange || function() {},
        text = options.text || options.label || null,
        icon = options.icon || false,
        title = options.title || false,
        type = options.type,
        checked = options.checked || null,
        types = options.types || [];

    var choice = null;

    if(type) types.push(type);
    var wrapper = document.createElement('div'),
        label = document.createElement('label');

    wrapper.className = 'ui form';
    radios.className = field + ' fields';
    label.innerHTML = text;
    radios.appendChild(label);

    data.forEach(function(d){
        var box = document.createElement('div'),
            field = document.createElement('div'),
            label = document.createElement('label'),
            input = document.createElement('input');

        field.className = 'field';
        box.className = 'ui radio checkbox';
        label.innerHTML = d;
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'test');
        input.setAttribute('value', d);
        input.setAttribute('tabindex', '0');
        if(checked == d) input.setAttribute('checked', 'checked');
        input.className = 'hidden';
        input.onchange = function() {
             callback(this.value);
        };

        box.appendChild(label);
        box.appendChild(input);
        field.appendChild(box)
        radios.appendChild(field);
    });

    wrapper.appendChild(radios);

    if(container) container.appendChild(wrapper);

    var jquery = window.jQuery || jQuery || $;
    if(typeof jquery !== 'undefined') {
        jquery('.ui.radio.checkbox').checkbox();
    }

    Object.defineProperty(wrapper, 'onchange', {
        set: function(f) { callback = f; return radios; }
    });

    return wrapper;
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Table;
function Table(arg) {
    var table = document.createElement('table'),
        options = arg || {},
        container = options.container || document.body,
        rows = options.rows || false,
        columns = options.columns || options.cols || false,
        type = options.type,
        width = options.width || container.clientWidth * 0.9,
        types = options.types || [];

    if(type) types.push(type);
    if(container) container.appendChild(table);
    table.className = 'ui table ' + types.join(' ');
    table.style.margin = '5px auto';
    table.style.width = width + 'px';
    var tableHead = document.createElement('thead'),
        tableBody = document.createElement('tbody'),
        tr = document.createElement('tr');
    tableHead.appendChild(tr);
    if(columns) {
        columns.forEach(function(col){
            var c = document.createElement('th');
            c.innerHTML = col;
            tr.appendChild(c);
        });
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);

    table.addRow = function(_row) {
        var row = (Array.isArray(_row)) ? _row : [_row];

        var tr = document.createElement('tr');
        row.forEach(function(col){
            var td = document.createElement('td');
            if(col instanceof HTMLElement)
                td.appendChild(col);
            else
                td.innerHTML = col;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
        return tr;
    }

    table.updateCell = function(row, col, html) {
        var tr = tableBody.childNodes[row];
        var td = tr.childNodes[col];
        td.innerHTML = html;
        return td;
    }

    if (options.hasOwnProperty('style')) {
        Object.keys(options.style).forEach(function(s) {
            table.style[s] = options.style[s];
        });
    }

    table.tbody = tableBody;

    return table;
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_button__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_button_group__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_checkbox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_dropdown__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_fileinput_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_icon__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_list__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_layout__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_panel__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_progress__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_radios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_table__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return __WEBPACK_IMPORTED_MODULE_0__src_button__["button"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonGroup", function() { return __WEBPACK_IMPORTED_MODULE_1__src_button_group__["buttonGroup"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Checkbox", function() { return __WEBPACK_IMPORTED_MODULE_2__src_checkbox__["checkbox"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Dropdown", function() { return __WEBPACK_IMPORTED_MODULE_3__src_dropdown__["dropdown"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_fileinput__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FileInput", function() { return __WEBPACK_IMPORTED_MODULE_12__src_fileinput__["fileInput"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return __WEBPACK_IMPORTED_MODULE_5__src_icon__["icon"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return __WEBPACK_IMPORTED_MODULE_6__src_list__["list"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return __WEBPACK_IMPORTED_MODULE_7__src_layout__["layout"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Panel", function() { return __WEBPACK_IMPORTED_MODULE_8__src_panel__["panel"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressBar", function() { return __WEBPACK_IMPORTED_MODULE_9__src_progress__["progressBar"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return __WEBPACK_IMPORTED_MODULE_11__src_table__["table"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Radios", function() { return __WEBPACK_IMPORTED_MODULE_10__src_radios__["radios"]; });
var root = typeof self == 'object' && self.self === self && self ||
           typeof global == 'object' && global.global === global && global ||
           this;














let dashi = {
    button: __WEBPACK_IMPORTED_MODULE_0__src_button__["b" /* default */],
    buttonGroup: __WEBPACK_IMPORTED_MODULE_1__src_button_group__["b" /* default */],
    checkbox: __WEBPACK_IMPORTED_MODULE_2__src_checkbox__["b" /* default */],
    dropdown: __WEBPACK_IMPORTED_MODULE_3__src_dropdown__["a" /* default */],  
    fileInput: __WEBPACK_IMPORTED_MODULE_4__src_fileinput_js__["a" /* default */],
    icon: __WEBPACK_IMPORTED_MODULE_5__src_icon__["a" /* default */],  
    list: __WEBPACK_IMPORTED_MODULE_6__src_list__["a" /* default */],       
    layout: __WEBPACK_IMPORTED_MODULE_7__src_layout__["a" /* default */],
    panel: __WEBPACK_IMPORTED_MODULE_8__src_panel__["a" /* default */], 
    progressBar: __WEBPACK_IMPORTED_MODULE_9__src_progress__["a" /* default */],
    radios: __WEBPACK_IMPORTED_MODULE_10__src_radios__["a" /* default */],
    table: __WEBPACK_IMPORTED_MODULE_11__src_table__["a" /* default */] 
};

root.dashi = dashi;

/* harmony default export */ __webpack_exports__["default"] = (dashi);












/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(13)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
//# sourceMappingURL=dashi.js.map