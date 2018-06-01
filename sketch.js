
let pn;
let cw=600; // canvas width
let ch=600; // canvas height
let tr=250; // table radius
let tpx=cw/2; // table position x
let tpy=ch/2; //table position y
let pr=25; //  people's radius
let  peoples= [];
let pnslider;
let complexity;
// precalculated factorials 0 to 25 to increase rendering speed, just fact[yourNumber]
let fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000,
  6402373705728000, 121645100408832000, 2432902008176640000, 51090942171709440000, 1124000727777607680000, 25852016738884976640000, 620448401733239439360000,
  15511210043330985984000000, 403291461126605635584000000, 10888869450418352160768000000, 304888344611713860501504000000, 8841761993739701954543616000000,
  265252859812191058636308480000000];

function setup() {
  createCanvas(2*cw, ch);
  pnslider = createSlider(1,25,5);
  pnslider.position(cw + 50,50);
  //noLoop();
}

function draw() {
  clear();
  peoples=[];
  pn=pnslider.value();
  complexity= pn*pn - pn;

  console.log("pn value in draw : " + pn);
  // draw table
  ellipse(cw/2, ch/2, 2*tr);

  // determinate pepoles angle position from table's center
  var angle = (2*PI)/pn;

  function drawPeople(angle) {
    var lx= tr*sin(angle);
    var ly= tr*cos(angle);
    ellipse((tpx + lx),( tpy + ly), pr);
    return [(tpx + lx),(tpy + ly)];
    }

  function drawRelations(peoples) {
    // draw relations between someone and all other peoples
    for (var i = 0; i < peoples.length; i++) {
      for (var j = 0; j < peoples.length; j++) {
        console.log('*');
        line(peoples[i][0],peoples[i][1],peoples[j][0],peoples[j][1]);
        }
      }
    }

    function totalSocInts(groupSize){
      // math formula :  http://www.intuitor.com/statistics/SmallGroups.html
      var totalInts=0;
      for (var i = 2; i <= groupSize; i++){
        totalInts+= fact[groupSize]/ (fact[i] * fact[groupSize-i] )
      }
      return totalInts;
    }

    function drawComplexityGraph() {
      // plot x and y axis
      refx=cw;
      refy=ch-10;
     
    
      line(refx, refy, 2*cw-10,ch-10);
      line(refx, refy,cw, 10);
      // plot complexity in relation to people number
      step=50;
      for (var i=0; i<pn;i++) {
        //point(refx + i*step ,refy - (i*i - i));
        //point(refx + i*step ,refy - totalSocInts(i));
        ellipse(refx + i*step ,refy - totalSocInts(i),10);

      }
    }

    function fact2(num)
    // calculate factorial number but long for big numbers => see precalculated fact list
    {
        var rval=1;
        for (var i = 2; i <= num; i++)
            rval = rval * i;
        return rval;
    }

    // draw peoples
    for(i=0;i<=pn;i++){
      angle=i * radians(360 / pn);
      someone=drawPeople(angle);
      peoples.push(someone);
    }
    // draw relations
    drawRelations(peoples);
    // draw text infos
    
    let total=totalSocInts(pn);

    text("Number of peoples : " + pn,cw + 50,100);
    text("Number of social interactions : " + total,cw + 50,120);
    
    // axes labels
    push();
    translate(cw-10,200);
    rotate(-PI/2);
    text("Number of social interactions", 0, 0);
    pop();
    push();
    translate(cw + 400,580);
    text("Number of participants", 0, 0);
    pop();


    // draw complexity graph
    drawComplexityGraph()
}