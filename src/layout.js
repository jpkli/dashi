if(typeof(define) == 'function') define(function(){return Layout;});

function Layout(arg) {
    'use strict';
    var options = arg || {},
        layoutId = options.id || false,
        className = options.class || "",
        margin = options.margin || 0,
        padding = options.padding || 5,
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
    }




    var setting = {
        rowHeights: [],
        colWidths : [],
    };

    var width = options.width ||  container.clientWidth || window.innerWidth,
        height = options.height || container.clientHeight || window.innerHeight;

    // height *= 0.96; //leave some space for footer
    width -= margin*2;
    height -= margin*2;

    function createColumn(w, h) {
        var col = document.createElement('div');
        col.style.display = 'inline-block';
        // col.style.border = '1px solid #AAA';
        // col.style.padding = padding + 'px';
        col.style.margin = padding + 'px';
        col.style.verticalAlign = "top";
        // col.style.margin = "4px";
        col.style.width = w - padding*2+ 'px';
        col.style.height = h - padding*2+ 'px';
        return col;
    }

    var cells = [],
        elements = {};

    function createLayout(width, height) {

        var layout = document.createElement('div');

        if(layoutId)
            layout.setAttribute('id', layoutId);

        if(typeof className == 'string')
            layout.className = className;

        container.style.overflow = 'hidden';
        layout.style.height = height + "px";
        layout.style.width = width + "px";
        layout.style.margin = margin + 'px';
        // layout.style.overflow = 'hidden';
        // layout.style.padding = '0';

        cells = [];
        elements = {};

        var defaultRowHeight = height / rows.length;


        rows.forEach(function(rs, ri){
            var row = document.createElement('div'),
                defaultRowHeight = height / (rows.length - ri),
                rowWidth = width,
                rowHeight = rs.height || defaultRowHeight;
            height -= rowHeight;
            cells[ri] = [];
            if(rs.hasOwnProperty('id')) {
                row.setAttribute('id', rs.id);
                elements[rs.id] = row;
            }

            if(rowHeight<1) rowHeight *= height;

            row.style.height = rowHeight + "px";
            divRows.push(row);
            setting.rowHeights.push(rowHeight);
            // rowHeight -= padding * 2;
            if(rs.hasOwnProperty('cols')) {
                var defaultColWidth = width / rs.cols.length;
                rs.cols.forEach(function(cs, ci){
                    var colWidth;
                    if(cs.hasOwnProperty('width')){
                        if(cs.width>1) {
                            colWidth = cs.width;
                            rowWidth -= colWidth + padding*2;
                        } else {
                            colWidth = cs.width * rowWidth;
                        }
                    } else {
                        colWidth = defaultColWidth;
                    }
                    // colWidth -= padding * 2;

                    var col = createColumn(colWidth, rowHeight);
                    row.appendChild(col);
                    cells[ri][ci] = col;
                    if(cs.hasOwnProperty('id')) {
                        col.setAttribute('id', cs.id);
                        elements[cs.id] = col;
                    } else {
                        elements['cell-row'+ri+'-col'+ci] = col;
                    }
                })
            } else {
                cells[ri] = row;
            }
            layout.appendChild(row);
        })

        if(cols.length) {
            var defaultColWidth = width / cols.length,
                rowWidth = width;
            cols.forEach(function(cs, ci){
                var colWidth;
                cells[ci] = [];
                if(cs.hasOwnProperty('width')){
                    if(cs.width>1) {
                        colWidth = cs.width;
                        rowWidth -= colWidth;
                    } else {
                        colWidth = cs.width * rowWidth;
                    }
                } else {
                    colWidth = defaultColWidth;
                }

                var col = createColumn(colWidth, height),
                    colsInThisRow;

                if(cs.id) col.setAttribute('id', cs.id);
                setting.colWidths.push(colWidth);

                if(!cs.hasOwnProperty('rows'))
                    colsInThisRow = [cs];
                else
                    colsInThisRow = cs.rows;

                var defaultRowHeight = height / colsInThisRow.length;
                colsInThisRow.forEach(function(rs, ri){
                    var rowHeight = rs.height*height || defaultRowHeight,
                        row = document.createElement('div');
                    if(colsInThisRow.length == 1)
                        rowHeight -= padding;

                    if(rs.height > 1) {
                        rowHeight = rs.height;
                        height -= rowHeight;
                    }

                    row.style.width = colWidth - padding*2 + 'px';
                    row.style.height = rowHeight - padding*2 + 'px';

                    // row.style.border = '1px solid #222';
                    row.style.marginTop = ri * padding*2 - 2 + 'px';
                    col.appendChild(row);
                    cells[ci][ri] = row;
                    if(rs.hasOwnProperty('id')) {
                        row.setAttribute('id', rs.id);
                        elements[rs.id] = row;
                    } else {
                        elements['cell-row'+ri+'-col'+ci] = row;
                    }

                })
                divCols.push(col);
                layout.appendChild(col);
            })
        }
        return layout;
    }

    var layout = createLayout(width, height);

    Object.keys(elements).forEach(function(k){
        elements[k].append = elements[k].appendChild;
    })

    layout.cell = function(id, cid) {
        if(typeof id === 'number')
            if(typeof cid === 'number' && typeof cells[id][cid] != 'undefined')
                return cells[id][cid];
            else
                return cells[id];
        else
            return elements[id];
    }

    layout.hide = function(cid) {
        var cid = cid || 0;

        if(divCols.length) {
            divCols.forEach(function(col, ci){
                var newWidth = col.clientWidth + divCols[cid].clientWidth * col.clientWidth / (width-divCols[cid].clientWidth) + padding*2;
                if(ci != cid) {
                    col.style.width =  newWidth + 'px';
                    cells[ci].forEach(function(c){
                        c.style.width = newWidth + 'px';
                        if(typeof c.firstElementChild.resize == 'function') c.firstElementChild.resize();
                    })
                }
            })
            divCols[cid].style.display = 'none';
        }

        if(divRows.length) {
            divRows.forEach(function(col, ci){
                var newHeight = col.clientHeight + divRows[cid].clientHeight / (divRows.length-1) + padding*2/(divRows.length-1);
                if(ci != cid) col.style.height =  newHeight + 'px';
                cells[ci].forEach(function(c){
                    c.style.height = newHeight + 'px';
                    if(typeof c.firstElementChild.resize == 'function') c.firstElementChild.resize();
                })
            })
            divRows[cid].style.display = 'none';
        }
    }

    layout.show = function(cid) {
        var cid = cid || 0;
        divCols[cid].style.display = 'inline-block';

        if(divCols.length) {
            divCols.forEach(function(col, ci){
                var newWidth = setting.colWidths[ci] - padding*2;

                if(ci != cid) {
                    col.style.width =  newWidth + 'px';
                    cells[ci].forEach(function(c){
                        c.style.width = newWidth + 'px';
                        if(typeof c.firstElementChild.resize == 'function') c.firstElementChild.resize();
                    })
                }
            })

        }
    }

    layout.get = layout.grid = layout.cell;
    container.appendChild(layout);
    // container.onresize = function() {
    //     var newLayout = createLayout(container.clientWidth, container.clientHeight);
    //     layout.replaceWith(newLayout);
    // }
    return layout;
};
