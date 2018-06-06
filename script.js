var buttons = document.getElementsByTagName("li");
var previous = '';
var current = 0;
var operator = '';

for (i=0; i<buttons.length; i++) {
    buttons[i].onmousedown=function(e) {
        e.target.classList.add("clicked");
        if (e.target.classList.contains("num")) {
            if (operator=="=") {operator=""; previous=''; current=0;}
            var test = String(current);
            if (current==0) {
                if (e.target.innerHTML==".") {
                    if (!test.includes(".")) {
                        current="0" + e.target.innerHTML;
                    }
                } else {
                    if (!test.includes(".")) {
                        current=e.target.innerHTML
                    } else {
                        current+=e.target.innerHTML;                       
                    }
                }
            } else {
                if (e.target.innerHTML==".") {
                    if (!test.includes(".")) {
                        current+=e.target.innerHTML;                       
                    }
                } else {
                    current+=e.target.innerHTML;                     
                }
            }
        }
        if (e.target.innerHTML=="c") {clear();}
        if (e.target.innerHTML=="ce") {clearCurrent();}
        if (e.target.classList.contains("bk")) {backspace();}
        if (e.target.innerHTML=="+") {setOperator('+');}
        if (e.target.innerHTML=="-") {setOperator('-');}
        if (e.target.classList.contains("times")) {setOperator('&times;');}
        if (e.target.classList.contains("divide")) {setOperator('&divide;');}
        if (e.target.classList.contains("power")) {setOperator('<sup>y</sup>');}
        if (e.target.classList.contains("root")) {setOperator('&Sqrt;');}
        if (e.target.innerHTML=="=" && operator!='') {calculate();}   
    }
    buttons[i].onmouseup=function(e) {
        e.target.classList.remove("clicked");
        if (e.target.innerHTML!="=") {setDisplay();}
    }
}

function setOperator(x) {
    previous=current;
    current='';
    operator=x;
}

function calculate() {
    if (operator!='=') {
    if (operator=='+') {var equals = parseFloat(previous)+parseFloat(current);}
    if (operator=='-') {var equals = parseFloat(previous)-parseFloat(current);}
    if (operator=='&times;') {var equals = parseFloat(previous)*parseFloat(current);}
    if (operator=='<sup>y</sup>') {var equals = Math.pow(parseFloat(previous), parseFloat(current));}
    if (operator=='&Sqrt;') {var equals = Math.pow(parseFloat(previous), 1/parseFloat(current));}
    previous=current;
    current = equals;
    operator='=';
    document.getElementById("display").innerHTML = equals;
    }
}

function setDisplay() {
    document.getElementById("display").innerHTML = previous + " " + operator + " " + current;
}

function backspace() {
    if (operator!=='=') {
    current= current.slice(0, current.length-1);
    if (current=='') {current=0;}
    setDisplay();
    } else {
        previous='';
        operator='';
        current= current.slice(0, current.length-1);
        setDisplay();    
    }
}

function clearCurrent() {
    if (operator=='' || operator=='=') {operator=''; previous='';}
    current = 0;
    setDisplay();
}

function clear() {
    previous = '';
    operator = '';
    current = 0;
    setDisplay();
}