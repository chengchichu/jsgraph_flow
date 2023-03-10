
// base graph

// rankdir="TB";
// splines=true;
// overlap=false;
// nodesep="0.2";
// ranksep="0.4";
// label="overview";
// labelloc="t";
// fontname="Lato";

var dotSrc = `

digraph {
 
    node [ shape="box", style="rounded", fontname="Lato", margin=0.2 ]
    
    
    feature1 [ label="feature1" id="node_f1" fontcolor="black" color="black" ]
    feature2 [ label="feature2" id="node_f2" fontcolor="black" color="black" ]
    swip1 [ label="swip1" id="node_sp1" fontcolor="#000000" color="black" ]
    swip2 [ label="swip2" id="node_sp2" fontcolor="#000000" color="black" ]
    swip4 [ label="swip4" id="node_sp4" fontcolor="#000000" color="black" ]
    swip3 [ label="swip3" id="node_sp3" fontcolor="black" color="black" ]
    swip5 [ label="swip5" id="node_sp5" fontcolor="#000000" color="black" ]
    hwip1 [ label="hwip1" id="node_hp1" fontcolor="black" color="black" ]
    hwip2 [ label="hwip2" id="node_hp2" fontcolor="#000000" color="black" ]
    
    feature1 -> swip1 [label="f1_to_sp1" id="E_f1sp1"]
    feature2 -> swip1 [label="f2_to_sp1" id="E_f2sp1"]
    feature2 -> swip2 [label="f2_to_sp2" id="E_f2sp2"]
    swip1 -> swip4 [label="sp1_to_sp4" id="E_sp1sp4"]
    swip1 -> swip3 [label="sp1_to_sp3" id="E_sp1sp3"]
    swip4 -> swip5 [label="sp4_to_sp5" id="E_sp4sp5"]
    swip5 -> hwip1 [label="sp5_to_hp1" id="E_sp5hp1"]
    swip2 -> hwip2 [label="sp2_to_hp2" id="E_sp2hp2"]
    swip3 -> hwip1 [label="sp3_to_hp1" id="E_sp3hp1"]
    
     
    
}

`;


// subgraph {rank = same; swip3; swip4}
    
//     subgraph {rank = same; swip1; swip2}

//     subgraph {rank = same; hwip1; hwip2}


















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
// console.log(rDnodes)
return [Dnodes, rDnodes];

};

function arr_find(arr, docline){
    var bool_v = [];
    
    for (k = 0; k < arr.length;k++) {
        bool_v.push(docline.includes(arr[k]))
    };
    var sum = 0
    bool_v.forEach(x => {
    sum += x;
    });
    
    return sum
}


// parsing boundary node
// for (j = 0; j < dotSrcLines.length;j++) {
    
//     node_found.push(node_i[0])      
//     DNODES_found = DNODES_found.concat(node_i[1]);
//     console.log(node_i)
    
// } 

// ???trg node?????????, ??????boundary??????

function find_nodes_return_new_graph(trg, id, bns) {

        // const boundary_node = ["feature1", "feature2", "hwip1", "hwip2"];
        const boundary_node = bns
        // const boundary_node = ["0", "4", "5", "6", "8", "9"];

        var trg_node = [trg];
        
        var whether_bound = trg_node.filter(value => boundary_node.includes(value));
        if (whether_bound.length>0) {
           
        console.log('finding boundary node:'+trg_node[0])   

        } else {

        console.log('finding node init')
        // ?????????
        UNODES_found = [];
        Unode_name = [];
        do { 
            var tmp = [];
            node_found = [];
            for (j = 0; j < trg_node.length;j++) {
                node_i = find_upstr(trg_node[j], dotSrcLines);
                node_found.push(node_i[0])      
                UNODES_found = UNODES_found.concat(node_i[1]);
                console.log(node_i)
                
                if (node_i[0].length>0) {           
                // ?????????????????????undefined  1230
                //var nodename = node_i.forEach(function (mystr) {mystr.replace('->','').trim()} );
                nodename = node_i[0].map(function(mystr){
                    return mystr.replace('->','').trim();    
                });
                } else {
                nodename=[];
                };
            }    
            trg_node = nodename;
            Unode_name = Unode_name.concat(trg_node)
            console.log(trg_node)
            
            var overlap = trg_node.filter(value => boundary_node.includes(value));
            // console.log(overlap.length)
        }
        while (overlap.length==0)
         
// console.log(UNODES_found)
// while ((node_found) || (overlap.length>0)) 
// var boundary_node = ["feature1", "feature2", "hwip1", "hwip2"];
// var trg_node = ["swip3"];
        var trg_node = [trg];
        // ?????????
        DNODES_found = [];
        Dnode_name = [];
        do { 
            var tmp = [];
            node_found = [];
            for (j = 0; j < trg_node.length;j++) {
                node_i = find_downstr(trg_node[j], dotSrcLines);
                node_found.push(node_i[0])      
                DNODES_found = DNODES_found.concat(node_i[1]);
                console.log(node_i)
                
                if (node_i[0].length>0) {           
                // ?????????????????????undefined  1230
                //var nodename = node_i.forEach(function (mystr) {mystr.replace('->','').trim()} );
                nodename = node_i[0].map(function(mystr){
                    return mystr.replace('->','').trim();    
                });
                } else {
                nodename=[];
                };
            }    
            trg_node = nodename;
            Dnode_name = Dnode_name.concat(trg_node)
            console.log(trg_node)
            var overlap = trg_node.filter(value => boundary_node.includes(value));
            // console.log(overlap.length)
        }
        while (overlap.length==0)

        // console.log(DNODES_found)
        const Node_all = UNODES_found.concat(DNODES_found)
        var trg_node = [trg];
        const Node_name_all = Unode_name.concat(Dnode_name).concat(trg_node)
        console.log(Node_all)
        console.log(Node_name_all)
        
        // deleting graph branches 
        for (i = 0; i < dotSrcLines.length;) {
            
            // var z = true
            sum = arr_find(Node_all, dotSrcLines[i])
            // if (sum>0) {
            //     z = false;    
            // };    
            // console.log(dotSrcLines[i])
            // console.log(allz)
            // delete the edge 
            if ((sum==0) && (dotSrcLines[i].includes('->'))) {  
            dotSrcLines.splice(i,1);
            } else {
            i++;
            };
        };
        
        // deleting node
        deleted_node = []
        for (i = 0; i < dotSrcLines.length;) {
            // var z = true
            sum = arr_find(Node_name_all, dotSrcLines[i])
            // if (sum>0) {
            //     z = false;    
            // };    
            // console.log(dotSrcLines[i])
            // console.log(allz)
            // delete the edge
           
            if ((sum==0) && (dotSrcLines[i].includes('node_'))) {  
            
         
            deleted_node.push(dotSrcLines[i].split('[')[0].trim())
            dotSrcLines.splice(i,1);
            
            } else {
            i++;
            };
        }; // delete node

        console.log(deleted_node)
        
        // delete subgraph

        for (i = 0; i < dotSrcLines.length;) {
  
            sum = arr_find(deleted_node, dotSrcLines[i])
            if (sum>0) {  
                dotSrcLines.splice(i,1);
                } else {
                i++;
                };
            
        };    
 
        // change trg color
        for (i = 0; i < dotSrcLines.length; i++) {
  
            if (dotSrcLines[i].includes(id)>0) {  
                var newstr = dotSrcLines[i].split(" color")[0]+` color="yellow" ]`
                dotSrcLines[i] = newstr
                // console.log('hello change')
               };
            
        };  

        
 
        }; // if not boundary node
        
        var new_grpah = dotSrcLines
        return new_grpah 
};



// console.log(dotSrcLines)

// const boundary_node = ["feature1", "feature2", "hwip1", "hwip2"];       
// var whether_bound = ["feature1"].filter(value => boundary_node.includes(value));

// new_graph_ = find_nodes_return_new_graph("hwip1")
// new_graph_ = find_nodes_return_new_graph("hwip1")

// console.log(whether_bound.length)


// d3.select("#graph").graphviz().renderDot(dotSrcLines.join('\n')); 

// main animation loop


function readTextFile(file, callback) {
   var rawFile = new XMLHttpRequest();
   rawFile.overrideMimeType("application/json");
   rawFile.open("GET", file, true);
   rawFile.onreadystatechange = function() {
       if (rawFile.readyState === 4 && rawFile.status == "200") {
           callback(rawFile.responseText);
       }
   }
   rawFile.send(null);
   
}

String.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i += 1) {
        var reg = new RegExp('\\{' + i + '\\}', 'gm');
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
 };


readTextFile("./sample.json", function(text){
   var data = JSON.parse(text);
   console.log(data);
   var node_default = String.format(`    node [ shape="{0}", style="{1}", fontname="{2}", margin="{3}", color="{4}"]`,"box","rounded","Lato","0.2","black")
   
   collected_node = []
   paresed_node = []
   for (const key of Object.keys(data.nodes)) {     
       var node_i = String.format(`    "{0}" [ label="{1}", id="{2}", frontcolor="black", color="black" ]`,key,data.nodes[key].id,"node_"+data.nodes[key].id)
       paresed_node.push(node_i)
       collected_node.push(key)
      //  console.log(node_i)
   };
//    console.log(paresed_node);
   collected_edge = []
   paresed_edge = []
   for (const key of Object.keys(data.links)) {
      var edge_i = String.format(`    {0} [ label="{1}", id="{2}"]`,data.links[key].source+' -> '+ data.links[key].target, data.links[key].source+'to'+ data.links[key].target ,'E_'+data.links[key].source+data.links[key].target)
      paresed_edge.push(edge_i)
      collected_edge.push(data.links[key].source+' -> '+ data.links[key].target)
    //   console.log(edge_i)
   };
//    console.log(paresed_edge);
   D = ["digraph {"].concat(node_default).concat(paresed_node).concat(paresed_edge).concat("}")
   var dotSrc = D.join('\n')
   console.log(dotSrc)
   console.log(collected_node)
   console.log(collected_edge)

//    function addvector(a,b){
//     return a.map((e,i) => e + b[i]);
//    }

   // determine boundary node
   boundary_nodes = [];
   for (var i = 0; i < collected_node.length; i ++) {
          
       upstr = collected_node[i]+' ->'
       downstr = '-> '+collected_node[i]
       be_upstr = collected_edge.map(item => item.includes(upstr))
       be_downstr = collected_edge.map(item => item.includes(downstr))
     
       var be_upstr_ = be_upstr.reduce((a, b) => a + b)
       var be_downstr = be_downstr.reduce((a, b) => a + b)
       if ((be_upstr_== 0) || (be_downstr==0)) {
           boundary_nodes.push(collected_node[i])
       } 
      
    // console.log(boundary_nodes)
    };

   


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
            
                // var color = d3.select(this).style("background-color", "yellow");

                dotElement = title.replace('->',' -> ');
                console.log('Element id="%s" class="%s" title="%s" text="%s" dotElement="%s"', id, class1, title, text, dotElement);
                console.log('Finding and deleting references to %s "%s" from the DOT source', class1, dotElement);
                // console.log('%s',color)

                new_graph_ = find_nodes_return_new_graph(dotElement, id, boundary_nodes);
                // console.log(new_graph_)
                dotSrc = new_graph_.join('\n');
                render();
            });
    }



    render(dotSrc);
});

