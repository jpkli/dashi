(function DashBoard() {
    var layout = new dashi.layout({
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

    var subLayout = new dashi.layout({
        container: layout.cell('topRow'), //select cell in layout by id
        cols: [
            {width: 0.3},
            {width: 0.35},
            {width: 0.35}
        ]
    });

    var panels = {};

    panels.cluster = new dashi.panel({
        container: layout.cell(1, 0), //row=1, col=0
        id: "panel-cluster",
        title: "Cluster",
        angularJS: {  //insert angularJS stuff to the panel
            'ng-controller': 'clusterController',
            'view': 'cluster-view',
            'id': 'clusterContainer'
        },
        header: {height: 0.1, style: {backgroundColor: '#F4F4F4'}}
    })

    panels.cluster.append('<div class="cluster-svg" id="cluster-svg"></div>');

    panels.detail = new dashi.panel({
        container: layout.cell(1, 1), //row=1, col=1
        id: "panel-detail",
        title: "Detail",
        header: {height: 0.1, style: {backgroundColor: '#F4F4F4'}}
    })
    //
    panels.table = new dashi.panel({
        container: subLayout.cell(0, 0),
        title: "Table",
        id: "panel-table",
        padding: 30,
        header: {height: 0.1, style: {backgroundColor: '#F4F4F4'}}
    })

    panels.overview = new dashi.panel({
        container: subLayout.cell(1, 0),
        id: "panel-overview",
        title: "Overview",
        padding: 30,
        header: {height: 0.1, style: {backgroundColor: '#F4F4F4'}}
    })

    panels.info = new dashi.panel({
        container: subLayout.cell(2, 0),
        id: "panel-info",
        title: "Information",
        header: {height: 0.1, style: {backgroundColor: '#F4F4F4'}}
    });


    var toggleTabble = true;
    var buttonToggleTable = new dashi.icon({
        type: 'database',
        onclick: function() {
            if(toggleTabble) subLayout.hide(0); //hide first column
            else subLayout.show(0); //show first column
            toggleTabble = !toggleTabble;
        }
    });



    panels.overview.header.append(buttonToggleTable);

    panels.info.header.append(new dashi.button({
        label: 'Button in the header',
        types: ['teal'],
        size: '0.6em'
    }));

    Object.keys(panels).forEach(function(p){

        panels[p].header.append(new dashi.icon({
            type: 'refresh',
            onclick: function() {
                //code here for refreshing this panel
            }
        }))

        panels[p].header.append(new dashi.icon({
            type: 'maximize',
            onclick: function() {panels[p].toggleFullScreen()}
        }))
    })

    panels.cluster.showLoading(); //this will show an indicator for loading in the panel

    panels.detail.showLoading();
    panels.detail.hideLoading(); //this will hide the indicator for loading


    panels.table.append(new dashi.button({
        label: 'Start',
        types: ['massive', 'primary']
    }));


    var buttonSizes = ['huge', 'big', 'large', 'mediumn', 'small', 'tiny', 'mini'];
    buttonSizes.forEach(function(size){
        var p = document.createElement('p');
        p.appendChild(new dashi.button({label: size, type: size}));
        panels.overview.append(p);
    })

    var fileUploadButton = new dashi.button({
        label: 'Upload Files',
        types: ['primary'],
        fileInput: {id: 'testFileUpload', onchange: function(files) { console.log(files);}},
    });

    panels.info.append(fileUploadButton);

    var progressBar = new dashi.progressBar({
        percentage: 80,
        types: ['indicating']
    });
    panels.detail.append(progressBar);

}())
