

//  var a = [
//     '    swip1 -> swip3',
//     '    feature1 -> swip1',
//     '    feature2 -> swip1'
//   ]

//  var trg = '    feature1 -> swip1 [label="f1_to_sp1" id="E_f1sp1"]'


//  function i_a(a) {
//     return trg.includes(a)
//  };
 
//  var bool_v = a.map(i_a)
//  var sum = 0

//  bool_v.forEach(x => {
//     sum += x;
// });
// console.log(sum)
// // console.log(trg.includes(a[1]))


// rankdir="TB";
// splines=true;
// overlap=false;
// nodesep="0.2";
// ranksep="0.4";
// label="overview";
// labelloc="t";
// fontname="Lato";


// const person = {
//    isHuman: false,
//    printIntroduction: function() {
//      console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
//    }
//  };
 
// const me = Object.create(person);
 
// me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
// me.isHuman = true; // Inherited properties can be overwritten
 
// me.printIntroduction();

// the basic data object


// Object:
//    var o = {};
//    var o = Object.create(null);
//    o.key = 1;
//    o.key += 10;
//    for(let k in o) o[k]++;
//    var sum = 0;
//    for(let v of Object.values(m)) sum += v;
//    if('key' in o);
//    if(o.hasOwnProperty('key'));
//    delete(o.key);
//    Object.keys(o).length
// Map:
//    var m = new Map();
//    m.set('key', 1);
//    m.set('key', m.get('key') + 10);
//    m.foreach((k, v) => m.set(k, m.get(k) + 1));
//    for(let k of m.keys()) m.set(k, m.get(k) + 1);
//    var sum = 0;
//    for(let v of m.values()) sum += v;
//    if(m.has('key'));
//    m.delete('key');
//    m.size();

// I'll choose map over obj for its preservation of datatype of key


var dotSrc = `

digraph {
    node [ shape="box", style="rounded", fontname="Lato", margin=0.2, color="black"]
    feature1 [ label="feature1" id="f1" fontcolor="blue" color="blue" ]
    swip1 [ label="swip1" id="sp1" fontcolor="#000000" color="blue" ]
    
    feature1 -> swip1 [label="f1_to_sp1" id="E_f1sp1"]
}    
`


// nested obj constructor

var g = {
   "default_property": {
     "shape": "box",
     "style": "rounded", 
     "fontname": "Lato",
     "margin": "0.2",
     "color": "black"
   },
   "node":{
    "feature1": {
       "label":"feature1",
       "id":"f1",
       "fontcolor":"blue",
       "color":"blue"
    },
    "swip1": {
      "label":"swip1",
      "id":"sp1",
      "fontcolor":"#000000",
      "color":"blue"
   }
   }, // edge
   "edge":{
      "feature1_to_swip1": {
         "label":"f1_to_sp1",
         "id":"E_f1sp1"   
   }
   }  // edge
};


String.format = function() {
   var s = arguments[0];
   for (var i = 0; i < arguments.length - 1; i += 1) {
       var reg = new RegExp('\\{' + i + '\\}', 'gm');
       s = s.replace(reg, arguments[i + 1]);
   }
   return s;
};


function parse_graph(g){
   // console.log(d)
   var node_default = String.format(`    node [ shape="{0}", style="{1}", fontname="{2}", margin="{3}", color="{4}"]`,g.default_property.shape,g.default_property.style,g.default_property.fontname,g.default_property.margin,g.default_property.color)

   paresed_node = []
   for (const key of Object.keys(g.node)) {
      //  console.log(g.node[key])
      var node_i = String.format(`    "{0}" [ label="{1}", id="{2}", frontcolor="{3}", color="{4}" ]`,key,g.node[key].label,g.node[key].id,g.node[key].fontcolor,g.node[key].color)
      paresed_node.push(node_i)
   };

   paresed_edge = []
   for (const key of Object.keys(g.edge)) {
      //  console.log(g.node[key])
      var edge_i = String.format(`    {0} [ label="{1}", id="{2}"]`,key.replace('_to_',' -> '),g.edge[key].label,g.edge[key].id)
      paresed_edge.push(edge_i)
   };

   D = ["digraph {"].concat(node_default).concat(paresed_node).concat(paresed_edge).concat("}")

   var dotSrc = D.join('\n')

  

   return dotSrc
};


console.log(parse_graph(g))


// const default_property = new Map();
// default_property.set('shape',"box")
// default_property.set('style',"rounded")
// default_property.set('fontname',"Lato")
// default_property.set('color',"black")
// default_property.set('margin',"0.2")

// for (const [key, value] of default_property.entries()) {
//    console.log(key + ": " + value)
//    }


// var g = new Object();  
// g.default_shape=default_property;  

// for (const key of Object.keys(g)) {
//    console.log(g[key])
//    };

// g.default_style="rounded";  
// g.default_fontname="Lato";  
// g.default_color="black";  
// g.default_margin="0.2";  
// g

// function g(default_propperty,node,edge){  
//    this.default_shape=default_propperty[0];  
//    this.name=name;  
//    this.salary=salary;  
//    }  
//    e=new emp(103,"Vimal Jaiswal",30000); 


// var dotSrc = `

// digraph {
//     node [ shape="box", style="rounded", fontname="Lato", margin=0.2, color="black"]
//     feature1 [ label="feature1" id="f1" fontcolor="blue" color="blue" ]
//     swip1 [ label="swip1" id="sp1" fontcolor="#000000" color="blue" ]
    
//     feature1 -> swip1 [label="f1_to_sp1" id="E_f1sp1"]
// }    
// `


d3.select("#graph").graphviz().renderDot(dotSrc)
   .on("end", interactive)

function interactive() {   
   //  nodes = d3.selectAll('.node,.edge')
   nodes = d3.selectAll('.node')
   console.log(nodes)
}


