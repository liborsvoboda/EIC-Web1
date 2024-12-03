document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
        fetch('cy-style.json', { mode: 'no-cors' })
            .then(function (res) {
                return res.json()
            }),
        fetch('data.json', { mode: 'no-cors' })
            .then(function (res) {
                return res.json()
            })
    ])
    .then(function (dataArray) {
        var cy = window.cy = cytoscape({
            container: document.getElementById('cy'),
    
            layout: {
                name: 'concentric',
                concentric: function (n) { return n.id() === 'j' ? 200 : 0; },
                levelWidth: function (nodes) { return 100; },
                minNodeSpacing: 100
            },
    
            // layout: {
            //   name: 'cose',
            //   idealEdgeLength: 100,
            //   nodeOverlap: 20,
            //   refresh: 20,
            //   fit: true,
            //   padding: 30,
            //   randomize: false,
            //   componentSpacing: 100,
            //   nodeRepulsion: 400000,
            //   edgeElasticity: 100,
            //   nestingFactor: 5,
            //   gravity: 80,
            //   numIter: 1000,
            //   initialTemp: 200,
            //   coolingFactor: 0.95,
            //   minTemp: 1.0
            // },
    
            style: dataArray[0],
    
            elements: dataArray[1]
    
        });
    
        var eh = cy.edgehandles({
            snap: false
        });
    
        document.querySelector('#draw-on').addEventListener('click', function () {
            eh.enableDrawMode();
        });
    
        document.querySelector('#draw-off').addEventListener('click', function () {
            eh.disableDrawMode();
        });
    
        document.querySelector('#start').addEventListener('click', function () {
            eh.start(cy.$('node:selected'));
        });
    
        // var collection = cy.collection();
        cy.nodes().on('click', function (e) {
            var clickedNode = e.target;
            // collection = collection.union(clickedNode);
            // console.log(collection[0].data());
            console.log(clickedNode.data());
        });


        var node_I = cy.getElementById('I');
        var node_iii = cy.getElementById('iii');
        var edge_I_iii = cy.getElementById('I_iii');

        var makeTippy = function(ele, text){
            var ref = ele.popperRef();

            // Since tippy constructor requires DOM element/elements, create a placeholder
            var dummyDomEle = document.createElement('div');

            var tip = tippy( dummyDomEle, {
                getReferenceClientRect: ref.getBoundingClientRect,
                trigger: 'manual', // mandatory
                // dom element inside the tippy:
                content: function(){ // function can be better for performance
                    var div = document.createElement('div');

                    div.innerHTML = text;

                    return div;
                },
                // your own preferences:
                arrow: true,
                placement: 'bottom',
                hideOnClick: false,
                sticky: "reference",

                // if interactive:
                interactive: true,
                appendTo: document.body // or append dummyDomEle to document.body
            } );

            return tip;
        };

        makeTippy(node_I, 'foo').show();
        makeTippy(node_iii, 'bar').show();
        makeTippy(edge_I_iii, 'baz').show();
    });    
});