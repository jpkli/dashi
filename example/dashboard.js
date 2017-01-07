if(typeof define == 'function') {
    define(['../src/layout', '../src/panel', '../src/icon', '../src/button'], function(Layout, Panel, Icon, Button){
        return DashBoard;
    });
} else {
    DashBoard();
}

function DashBoard() {
    var layout = Layout({
        // default: container = document.body or specificy the container as below
        // container: "testdiv",
        margin: 10,
        rows: [
            {
                id: "topRow",
                height: 0.5
            },
            {
                id: "bottomRow",
                height: 0.5, // 50% height of the container
                cols: [
                    {width: 0.3}, // 30% width of the row (100% width)
                    {width: 0.7} // 70% width
                ]
            },

        ]
    });

    var subLayout = Layout({
        container: layout.cell('topRow'),
        cols: [
            {width: 0.3},
            {width: 0.35},
            {width: 0.35}
        ]
    });

    var panels = {};

    panels.cluster = new Panel({
        container: layout.cell(1, 0), //row=0, col=0
        id: "panel-cluster",
        title: "Cluster",
        header: {height: 0.09, style: {backgroundColor: '#F4F4F4'}}
    })

    panels.detail = new Panel({
        container: layout.cell(1, 1), //row=0, col=1
        id: "panel-detail",
        title: "Detail",
        header: {height: 0.09, style: {backgroundColor: '#F4F4F4'}}
    })
    //
    panels.table = new Panel({
        container: subLayout.cell(0, 0),
        title: "Table",
        id: "panel-table",
        padding: 30,
        header: {height: 0.09, style: {backgroundColor: '#F4F4F4'}}
    })

    panels.overview = new Panel({
        container: subLayout.cell(1, 0),
        id: "panel-overview",
        title: "Overview",
        padding: 30,
        header: {height: 0.09, style: {backgroundColor: '#F4F4F4'}}
    })

    panels.info = new Panel({
        container: subLayout.cell(2, 0),
        id: "panel-info",
        title: "Information",
        header: {height: 0.09, style: {backgroundColor: '#F4F4F4'}}
    })


    var toggleTabble = true;
    var buttonToggleTable = new Icon({
        type: 'database',
        onclick: function() {
            if(toggleTabble) subLayout.hide(0); //hide first column
            else subLayout.show(0); //show first column
            toggleTabble = !toggleTabble;
        }
    });

    panels.overview.header.append(buttonToggleTable);

    Object.keys(panels).forEach(function(p){

        panels[p].header.append(new Icon({
            type: 'refresh',
            onclick: function() {
                //code here for refreshing this panel
            }
        }))

        panels[p].header.append(new Icon({
            type: 'maximize',
            onclick: function() {panels[p].toggleFullScreen()}
        }))
    })

    panels.cluster.showLoading();
    panels.cluster.hideLoading();


    panels.table.append(new Button({
        label: 'Start',
        types: ['massive', 'primary']
    }));

    var buttonSizes = ['huge', 'big', 'large', 'mediumn', 'small', 'tiny', 'mini'];
    buttonSizes.forEach(function(size){
        var p = document.createElement('p');
        p.appendChild(new Button({label: size, type: size}))
        panels.overview.append(p);
    })
};
