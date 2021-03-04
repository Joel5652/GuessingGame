const results = document.getElementById('results'); //Variable for html 'results' section

//random number

let randomNumber = Math.floor((Math.random() * 9000) + 1000); //generates random number and assigns to a variable

randomNumber = randomNumber.toString() //converts random number  to string in order to later convert to array

let randomNumberArr = Array.from(randomNumber, Number) //converts random number to an array

//main content

let userInput = {
    input: null,
    name: '',
    highScore: null,
    setHighScore(){
        addHTML(this.highScore)
    }
}

let turnCount = 12; //count for turns

let start;

let end;

document.addEventListener('DOMContentLoaded', () => {  //event listener for the submit button
    
    document.getElementById('submit').addEventListener('click', addUserInput); //when clicked it runs addUserInput function

})

//functions

const addUserInput = (ev) =>{  //addUserInput function / runs when submit is clicked
    
    let correctCount=0; //count for how many digits are correct
    let correctWrongPlace=0; //count for how many digits are correct but in wrong place

    results.innerHTML = ''; //sets results section to blank ready for the results

    ev.preventDefault(); //stops form submitting (prevents page reload, forms in html normally refresh when the submit input is clicked)

    userInput.input = document.getElementById('user-input').value; //stores user input as string

    input = Array.from(userInput.input, Number) //converts user input to array

    let length = (input.length); //finds the length of the input

    if (checkNum(input) == true && length == 4){ //checks if user input meets criteria by checking length and then running checkNum function

        if(turnCount == 12){
            start = Date.now()
            console.log(start)
        }

        if (input.toString() == randomNumberArr.toString()){ //checks if the user got it right by coverting both arrays top strings to check if directly equal
            addHTML('Correct!')
            end = Date.now()
            let final = ((end - start) / 1000)
            addHTML("You took: " + Math.round(final) + " seconds")
            addHTML('Refrshing page...')
            setTimeout(() => {location.reload()},1500); //refreshes page
        }
        else { // if user didnt get all digits right 


            turnCount--; //add a turn 
            if (turnCount == 0){ //checks if over 12 turns
                document.getElementById('submit').disabled = true
                addHTML('You have ran out of turns!'); //if so, ran out of turns
                end = Date.now()
                let final = ((end - start) / 1000)
                addHTML("You took: " + Math.round(final) + " seconds")
                addHTML('The code was: ' + randomNumber); //tells them the code
                addHTML('Refreshing page...');
                setTimeout(() => {location.reload()},5000); //refreshes page

            } else {
                addHTML('You have '+turnCount+' turns left') //states how many turns are left
            }

            let randombackup = Array.from(randomNumber, Number) //creates copy array of randomNumberArr (declared at the start as a global variable) however this doesnt copy 
                                                                //the value of that array, it copies the original random number and converts it from a string to an array

            for(let i = 0;i < 4;i++){ //loops through the input
                
                if(input[i] == randomNumberArr[i]){ //checks if the input number is in the correct place, if not it just states that it is correct
                    
                    correctCount++; //increases if digit in correct place
                    delete input[i] //deletes digit that was correct from userInput and the new copy of the array,
                    randombackup[i] = 'X' //so that they do not appear in the next condition.
                    
                }

            }

            for(let i = 0;i < 4;i++){ //loops through the input
                
                if(randombackup.includes(input[i])){ //checks if the userInput digit appears in the whole array. However we only want it to tell us if its right but in the wrong
                                                         //place, so by deleting the input digits that are correct from the the input array and the randomNumberArr, 
                    correctWrongPlace++;                 //it wont register any digits that have already been labelled correct because as it loops through them values theyre are now different

                }
                  
            }

            //Results

            if(correctCount == 1 && turnCount != 0){ //if count is above 0 then they guessed some digits in the right place
                addHTML('You have guessed '+correctCount+' digit in the right place')
            } else if (correctCount > 1 && turnCount != 0){
                addHTML('You have guessed '+correctCount+' digits in the right place')
            }
            
            if(correctWrongPlace == 1  && turnCount != 0){ //if count is above 0 then they guessed some digits correctly, but in the wrong place
                addHTML('You have guessed '+correctWrongPlace+' digit correct, but not in the right place');
            } else if (correctWrongPlace > 1 && turnCount != 0){
                addHTML('You have guessed '+correctWrongPlace+' digits correct, but not in the right place');
            }

            if (correctCount == 0 && correctWrongPlace == 0  && turnCount != 0){ //Theyve guessed none correct if no conditions were triggered 
                addHTML('You have guessed none correct');
            }
        }
    } 
    else {
        addHTML('Please enter a four digit number'); //else statement for criteria check at the start. If not equal to number or 4 digits.
    }
}

//checks if array is integers

function checkNum(array){
    let notint=0;

    for(number of array){

        

        if(number  >= 0 && number  <= 9){ //checks if digit is a number
  
        }
        else {
            notint++; //increases if the array value is not an integer, 
        }
    }
    if(notint > 0){ //if greater than 0 than its not an integer  due to the count
        return false
    }
    else{
        return true
    }
}



function addHTML(text){ //adds html element to the resutls section
    let h1 = document.createElement("h1");
    results.appendChild(h1);
    const correct = document.createTextNode(text);
    h1.appendChild(correct);
}