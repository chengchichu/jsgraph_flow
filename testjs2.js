
// base graph

var dotSrc = `

digraph {
    rankdir="TB";
    splines=true;
    overlap=false;
    nodesep="0.2";
    ranksep="0.4";
    label="overview";
    labelloc="t";
    fontname="Lato";
    node [ shape="box", style="rounded", fontname="Lato", margin=0.2, color="black"]
    
    
    feature1 [ label="feature1" id="f1" fontcolor="blue" color="blue" ]
    feature2 [ label="feature2" id="f2" fontcolor="blue" color="blue" ]
    swip1 [ label="swip1" id="sp1" fontcolor="#000000" color="blue" ]
    swip2 [ label="swip2" id="sp2" fontcolor="#000000" ]
    swip4 [ label="swip4" id="sp4" fontcolor="#000000" ]
    swip3 [ label="swip3" id="sp3" fontcolor="red" color="red" ]
    swip5 [ label="swip5" id="sp5" fontcolor="#000000" ]
    hwip1 [ label="hwip1" id="hp1" fontcolor="green" color="green" ]
    hwip2 [ label="hwip2" id="hp2" fontcolor="#000000" ]
    
    feature1 -> swip1 [label="f1_to_sp1" id="E_f1sp1"]
    feature2 -> swip1 [label="f2_to_sp1" id="E_f2sp1"]
    feature2 -> swip2 [label="f2_to_sp2" id="E_f2sp2"]
    swip1 -> swip4 [label="sp1_to_sp4" id="E_sp1sp4"]
    swip1 -> swip3 [label="sp1_to_sp3" id="E_sp1sp3"]
    swip4 -> swip5 [label="sp4_to_sp5" id="E_sp4sp5"]
    swip5 -> hwip1 [label="sp5_to_hp1" id="E_sp5hp1"]
    swip2 -> hwip2 [label="sp2_to_hp2" id="E_sp2hp2"]
    swip3 -> hwip1 [label="sp3_to_hp1" id="E_sp3hp1"]
    
    subgraph { 
        rank = same; swip3; swip4
    } 
    
        subgraph { 
        rank = same; swip1; swip2
    } 
    
    subgraph { 
        rank = same; hwip1; hwip2
    } 
    
}

`;

// console.log('DOT source =', dotSrc);
var dotSrcLines = dotSrc.split('\n');

// function for searching node 
function find_upstr(trg, dotSrcLines) {
    let Unodes = [];
    let rUnodes = [];
    for (i = 0; i < dotSrcLines.length;i++) {
        //console.log('Str line %d: %s', i, dotSrcLines[i].split('[')[0]);
        if (dotSrcLines[i].indexOf('-> '.concat(trg))>0) {
        x = dotSrcLines[i].split(trg)[0];
        // console.log('upstream: %s', x)
        Unodes.push(x)
        
        y = x.concat(trg)
        rUnodes.push(y)

        }
    }
    return [Unodes, rUnodes];
};

//
function find_downstr(trg, dotSrcLines) {
let Dnodes = [];
let rDnodes = [];
for (i = 0; i < dotSrcLines.length;i++) {
    //console.log('Str line %d: %s', i, dotSrcLines[i].split('[')[0]);
    if (dotSrcLines[i].indexOf(trg.concat(' ->'))>0) {
    x = dotSrcLines[i].split(trg)[1].split('[')[0];
    // console.log('upstream: %s', x)
    Dnodes.push(x)
    
    y = trg.concat(x)
    rDnodes.push(y)

    }
}   
console.log(rDnodes)
return [Dnodes, rDnodes];

};


// 從trg node開始找, 碰到boundary結束

function find_nodes_return_new_graph(trg){

        const boundary_node = ["feature1", "feature2", "hwip1", "hwip2"];

        var trg_node = [trg];
        
       

        console.log('finding node init')
        // 找上游
        UNODES_found = [];
        do { 
            var tmp = [];
            node_found = [];
            for (j = 0; j < trg_node.length;j++) {
                node_i = find_upstr(trg_node[j], dotSrcLines);
                node_found.push(node_i[0])      
                UNODES_found = UNODES_found.concat(node_i[1]);
                console.log(node_i)
                
                if (node_i[0].length>0) {           
                // 這行回傳的時候undefined  1230
                //var nodename = node_i.forEach(function (mystr) {mystr.replace('->','').trim()} );
                nodename = node_i[0].map(function(mystr){
                    return mystr.replace('->','').trim();    
                });
                } else {
                nodename=[];
                };
            }    
            trg_node = nodename;
            console.log(trg_node)
            var overlap = trg_node.filter(value => boundary_node.includes(value));
            console.log(overlap.length)
        }
        while (overlap.length==0)

// console.log(UNODES_found)
// while ((node_found) || (overlap.length>0)) 
// var boundary_node = ["feature1", "feature2", "hwip1", "hwip2"];
// var trg_node = ["swip3"];
        var trg_node = [trg];
        // 找下游
        DNODES_found = [];
        do { 
            var tmp = [];
            node_found = [];
            for (j = 0; j < trg_node.length;j++) {
                node_i = find_downstr(trg_node[j], dotSrcLines);
                node_found.push(node_i[0])      
                DNODES_found = DNODES_found.concat(node_i[1]);
                console.log(node_i)
                
                if (node_i[0].length>0) {           
                // 這行回傳的時候undefined  1230
                //var nodename = node_i.forEach(function (mystr) {mystr.replace('->','').trim()} );
                nodename = node_i[0].map(function(mystr){
                    return mystr.replace('->','').trim();    
                });
                } else {
                nodename=[];
                };
            }    
            trg_node = nodename;
            console.log(trg_node)
            var overlap = trg_node.filter(value => boundary_node.includes(value));
            console.log(overlap.length)
        }
        while (overlap.length==0)

        // console.log(DNODES_found)
        const Node_all = UNODES_found.concat(DNODES_found)
        console.log(Node_all)
        
        // searching all nodes, and forming new graph
        for (i = 0; i < dotSrcLines.length;) {
            var bool_v = [];
            var z = true
            for (k = 0; k < Node_all.length;k++) {
                bool_v.push(dotSrcLines[i].includes(Node_all[k]))
            };
            var sum = 0
            bool_v.forEach(x => {
            sum += x;
            });
            if (sum>0) {
                z = false;    
            };    
            // console.log(dotSrcLines[i])
            // console.log(allz)
            if ((z==true) && (dotSrcLines[i].includes('->'))) {  
            dotSrcLines.splice(i,1);
            } else {
            i++;
            };
        };
        
        var new_grpah = dotSrcLines
        return new_grpah
 
};
// console.log(dotSrcLines)

// new_graph_ = find_nodes_return_new_graph("swip3")

// console.log(ans)

// d3.select("#graph").graphviz().renderDot(dotSrcLines.join('\n')); 

// main animation loop
var graphviz = d3.select("#graph").graphviz();

function render() {
    console.log('DOT source =', dotSrc);
    dotSrcLines = dotSrc.split('\n');

    graphviz
        .transition(function() {
            return d3.transition()
                .delay(100)
                .duration(1000);
        })
        .renderDot(dotSrc)
        .on("end", interactive);
}

function interactive() {

    nodes = d3.selectAll('.node,.edge');
    nodes
        .on("click", function () {
            var title = d3.select(this).selectAll('title').text().trim();
            var text = d3.select(this).selectAll('text').text();
            var id = d3.select(this).attr('id');
            var class1 = d3.select(this).attr('class');
            dotElement = title.replace('->',' -> ');
            console.log('Element id="%s" class="%s" title="%s" text="%s" dotElement="%s"', id, class1, title, text, dotElement);
            console.log('Finding and deleting references to %s "%s" from the DOT source', class1, dotElement);
            
            new_graph_ = find_nodes_return_new_graph(dotElement);
            dotSrc = new_graph_.join('\n');
            render();
        });
}

render(dotSrc);