//Access HTML elements through their respective ID attribute
let questionTitle = document.getElementById('question');
let button = document.getElementById('question-btn');
let container = document.getElementById("container");

//Verify if the user input is valid
function verifyInput(){
    //Gets value of user input
    let question = questionTitle.value;

    //Evaluate if user input is null or blank
    if(question === "" || question === null){
        document.getElementById("loader").style.display = "none";
        alert("Input cannot be blank.");
        throw Error("ERROR");
    }

    //Evaluate if last character is a question mark
    if(question.charAt(question.length-1)!=='?')
    {
        document.getElementById("loader").style.display = "none";
        alert("Input must be a question.");
        throw Error("ERROR");
    }
}

//Event is triggered when user clicks the 'Submit' button
button.addEventListener("click", function(){
    //Show loading animation while waiting for response
    document.getElementById("loader").style.display = "block";

    //call verifyInput function to check if the user has entered a question when event has been triggered
    verifyInput();

    //Encode URI by replacing URL reserved characters with their UTF-8 encoding
    let question = encodeURIComponent(questionTitle.value);
    let uri = "https://8ball.delegator.com/magic/JSON/" + question;
    fetch(uri)
      .then(response => 
        response.json()
    )
      .then(json => {
        //Create new paragraph elements to display the data received from API
        var question = json.magic.question;
        var answer = json.magic.answer;

        var quesLabel = document.createElement('p');
        quesLabel.setAttribute('id', 'questionLabel');
        quesLabel.innerText = question;
        container.appendChild(quesLabel);
        var ansParagraph = document.createElement('p');
        ansParagraph.setAttribute('id', 'answer')
        ansParagraph.innerText = answer;
        container.appendChild(ansParagraph);

        //Hide loading symbol when response has been received
        document.getElementById("loader").style.display = "none";
      }).catch(error=>{
          console.log(error);
      });

      //Clear all values displayed to be replaced with new input on user click
      questionTitle.value = "";
      questionLabel.remove();
      answer.remove();
})