let runningTotal=0;
//buffer holds what is on the screen
let buffer="0";
//holds previous operators
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value)
{
let dot=1
    if(isNaN(value) && value !=="."  )
    {
        //this is not a number
        handleSymbol(value);
    }else 
    {
        //this is a number
       
        handleNumber(value);
    
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol)
{
    console.log("handle symbol",buffer);
    // if(symbol === "C")
    // {
    //     buffer = "0";
    //     runningTotal = 0;
    // }

    switch (symbol)
    {
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;

        case "=":
            if(previousOperator === null)
            {
                // need yu two numbers to do math
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator=null;
            buffer=runningTotal;
            runningTotal=0;
            break;
        case "←":
            if(buffer.length === 1)
            {
                buffer = "0";
            }else
            {
                buffer=buffer.substring(0 ,buffer.length - 1);
            }
            break;
            
        case "+":
        case "-":
        case "×":
        case "÷": 

            handleMath(symbol);
            break;
    }
   
    
}

function handleMath(symbol)
{
    if(buffer === "0")
    {
        //do nothing
        return;
    }
    const intBuffer = parseFloat(buffer);

    if(runningTotal === 0)
    {
        runningTotal=intBuffer;
    }else
    {
        flushOperation(intBuffer);
    }

    previousOperator= symbol;
    buffer="0";

    console.log("handle math",symbol);
    
}

function flushOperation(intBuffer)
{
    if(previousOperator === "+")
    {
        runningTotal= runningTotal + intBuffer;
    
    }else if (previousOperator === "-")
    {
        runningTotal= runningTotal - intBuffer;
    }else if (previousOperator === "×")
    {
        runningTotal= runningTotal * intBuffer;
    } else if(previousOperator==="÷"){
        runningTotal= runningTotal / intBuffer;
    }
    //  else if(previousOperator==="."){
    //     runningTotal= runningTotal + intBuffer;
    // }
    
    console.log("running total",runningTotal);
    screen.innerText = buffer;

}

function handleNumber(numberString)
{
    if (buffer === "0")
    {
        buffer = numberString;
    }else
    {
        if (numberString ==="."){
            buffer = buffer + numberString;  
            return;
        }
        buffer = buffer + numberString;
    }

}

function init()
{
    document.querySelector(".calc-buttons")
    .addEventListener("click", function(event)
    {
       
        buttonClick(event.target.innerText);
    })
}

//call init
init();
