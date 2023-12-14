//wait for the DOMContent to load before launching the function
window.addEventListener('DOMContentLoaded', init);

//all keys
const opts = ['*', '/', '+', '-', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.'];

//special keys
const spec = ['*', '/', '+', '-'];



function init(){
    document.title = "Calculadora em JS";
    console.log('ready');

    //vars to use as switches to watch out for special characters
    let dec = false;
    let eva = false;
    
    //creation of the base elements
    const container = document.createElement('div');
    container.classList.add('container');
    container.style.maxWidth = '600px';
    container.style.margin = 'auto';
    document.body.appendChild(container);
    
    const output = document.createElement('input');
    output.setAttribute('type', 'text');
    output.classList.add('output');
    output.style.width = '100%';
    output.style.lineHeight = '50px';
    output.style.fontSize = '3em';
    output.style.textAlign = 'right';
    container.appendChild(output);

    const main = document.createElement('div');
    main.classList.add('main');
    main.style.width = '100%';
    container.appendChild(main);

    //creation of the buttons
    opts.forEach(function(val){
        btnMaker(val, addOutput);
    })

    //special function buttons
    btnMaker('=', evalOutput);
    btnMaker('C', clrOutput);

    //function to help show errors that may occur by changing color
    function cOutput(v){
        output.style.border = v + ' 1px solid';
        output.style.color = v;
    }

    //calculation
    function evalOutput(){
        console.log('=');
        cOutput('black');

        //making sure there is a value to calculate
        if(output.value===""){
            cOutput('red');

        }else if(eva){
            cOutput('red');
        }
        else{
            //calculation using eval (calculates using a string)
            output.value = eval(output.value);
        }
        dec = output.value.includes('.');
    }

    function clrOutput(){
        cOutput('black');
        output.value = "";
    }

    //construction of the buttons
    function btnMaker(txt, myFunction){
        let btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.style.width = '23%';
        btn.style.lineHeight = '50px';
        btn.style.margin = '1%';
        btn.style.fontSize = '2em';
        btn.val = txt;
        btn.textContent = txt;
        btn.addEventListener('click', myFunction);
        main.appendChild(btn);
    }

    //adding the output content
    function addOutput(e){
        cOutput('black');
        let char = e.target.val;
        
        //tracking of the special characters
        if(char == '.'){
            if(dec){
                char = '';
                cOutput('red');
            }else{
                dec = true;
            }
        }

        eva = spec.includes(char);
        if(eva){
            dec=false;
        }else{}
        output.value += char;
    
    }

}



