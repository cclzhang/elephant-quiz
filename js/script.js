const eQuiz = {};

// doc ready
$(()=>{
    console.log('doc ready');
    eQuiz.init();
});

// eQuiz initialization
eQuiz.init = () => {
    console.log('init fired');
    eQuiz.getE();
    eQuiz.getDom();
    eQuiz.setGlobal();
    eQuiz.listenUp();
};

//set global variables
eQuiz.setGlobal = function() {
    //variable to work through the shuffledE array properly when assigning answers
    eQuiz.qNum = 0;
    //variable to assign answer set for the current question
    eQuiz.ansArray = [];
    eQuiz.randIndex = 0;
    //score counter
    eQuiz.score = 0;
    //in order for score to process correctly on start
    eQuiz.correctAns = "";
}

// Dom nodes into variables
eQuiz.getDom = () => {
    eQuiz.$header = $("header");
    eQuiz.$startB = $(".start");
    eQuiz.$main = $("main");
    // 
    eQuiz.$qScreen = $(".questionScreen");
    eQuiz.$questionForm = $("form");
    eQuiz.$hintToaster = $(".hintToaster");
    eQuiz.$getHint = $(".hintOnClick");
    // 
    eQuiz.$infoCard = $(".infoCard");
    // 
    eQuiz.$scoreScreen = $(".scoreScreen");
};


//set up event listeners
eQuiz.listenUp = function() {
    eQuiz.$startB.on('click', eQuiz.startQuiz);
    eQuiz.$questionForm.on('submit', eQuiz.submitAns);
    eQuiz.$getHint.on('click', eQuiz.toggleHint);
}

eQuiz.submitAns = function(e) {
    e.preventDefault();
    swal({
        icon: `${eQuiz.shuffledE[eQuiz.qNum].image}`,
        iconHtml: 'hi?',
        title: `${eQuiz.shuffledE[eQuiz.qNum].name}`,
        text: `${eQuiz.shuffledE[eQuiz.qNum].note}`,
    }).then(eQuiz.nextQ);
}

eQuiz.toggleHint = function() {
    if (eQuiz.$hintToaster.css("display") === "block") {
        eQuiz.$hintToaster.hide();
    } else {
        eQuiz.$hintToaster.show();
    }
    console.log('whats up');
}

// E = elephant
// use ajax to get the API
eQuiz.getE = () => {
    $.ajax({
        // const elephantUrl = `https://elephant-api.herokuapp.com/`;
        // const allElephants = "elephants";
        // const randomE = "random";
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: "https://elephant-api.herokuapp.com/elephants",
            xmlToJSON: false,
            useCache: false
        }
    }).then(function (data) {
        console.log('firing api');
        eQuiz.gatherE(data);
    });
};

eQuiz.shuffle = function (tempArray, originalArray) {
    // copy original array into the hat
    let hat = [...originalArray];
    let totalNumberOfDraws = originalArray.length
    for (i = 0; i < totalNumberOfDraws; i++) {
        // Each time, pick random item in hat
        this.randIndex = Math.floor(Math.random() * hat.length);
        // add item to tempArray
        tempArray.push(hat[this.randIndex]);
        // remove item from hat
        hat.splice(this.randIndex, 1);
    }// repeat
}


eQuiz.randomize = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

eQuiz.gatherE = function(data) {
    console.log('gathering elephants together');
    eQuiz.arrayOfE = [];
    data.forEach(function(elephant) {
        //process complete data only into array
        if (elephant.image !== "https://elephant-api.herokuapp.com/pictures/missing.jpg" && elephant.name !== undefined && elephant.species !== "Unavailable" && elephant.sex !== "Unavailable") {
            eQuiz.arrayOfE.push({name: elephant.name, affiliation: elephant.affiliation, species: elephant.species, sex: elephant.sex, image: elephant.image, note: elephant.note, wikilink: elephant.wikilink});
        }
    });
    //randomize array of elephants
    console.log('shuffling elephants');
    eQuiz.shuffledE = [];
    eQuiz.shuffle(eQuiz.shuffledE, eQuiz.arrayOfE);
    // $('#loading').hide();
}


//start the quiz
eQuiz.startQuiz = function() {
    console.log('quiz has been fired');
    //show/hide screens
    eQuiz.$header.hide();
    eQuiz.$main.show();
    eQuiz.$qScreen.show();
    //set question & answers
    eQuiz.nextQ();
    //load question
    eQuiz.ansHtmlToAdd();
    eQuiz.compileHtmlDom();
}

//////////////////////////////////////////////////////////////// DONEEEEE
// question section
eQuiz.qBank = ["What is my sex?", "What species am I?", "What is my name?", "Where am I from?"];

eQuiz.setQ = function() {
    console.log('question being set');
    eQuiz.currentQ = eQuiz.randomize(eQuiz.qBank);
    console.log('question set: ' + eQuiz.currentQ);
};

eQuiz.nextQ = function() {
    console.log('nextQ fired');
    console.log(eQuiz.qNum);
    //if statement to check if quiz is over or is beginning
    if (eQuiz.qNum === 5) {
        console.log('firing end quiz');
        if ($("input[name='answer']:checked").val() === eQuiz.correctAns) {
            eQuiz.score++;
        }
        eQuiz.endQuiz();
    } else {
        console.log('score ' + eQuiz.score)
        //validate answer of q
        if ($("input[name='answer']:checked").val() === eQuiz.correctAns) {
            eQuiz.score++;
        }
        console.log('score ' + eQuiz.score);
        eQuiz.quizInit();
    }
}
/////////////////////////////////////////////////////////////////

eQuiz.quizInit = function() {
    eQuiz.ansArray = [];
    eQuiz.setQ();
    eQuiz.setA();
    eQuiz.qNum++;
    //load question
    eQuiz.ansHtmlToAdd();
    eQuiz.compileHtmlDom();
}

// answer section
eQuiz.setA = function() {
    if (eQuiz.currentQ === "What is my sex?") {
        eQuiz.getSex();
        eQuiz.hintText = `My name is ${eQuiz.shuffledE[eQuiz.qNum].name}!`;
    } else if (eQuiz.currentQ === "What species am I?") {
        eQuiz.getSpecies();
        eQuiz.hintText = `I'm from ${eQuiz.shuffledE[eQuiz.qNum].affiliation}!`;
    } else if (eQuiz.currentQ === "What is my name?") {
        eQuiz.getNames();
        eQuiz.hintText = `I'm a ${(eQuiz.shuffledE[eQuiz.qNum].sex).toLowerCase()}!`;
    } else if (eQuiz.currentQ === "Where am I from?") {
        eQuiz.getLocations();
        eQuiz.hintText = `I'm an ${eQuiz.shuffledE[eQuiz.qNum].species} elephant!`;
    }
}

//////////////////////////////////////////////////////////////
// set answer array if question was what is my sex?
eQuiz.getSex = function() {
    eQuiz.ansArray = ["Female", "Male"];
    eQuiz.correctAns = eQuiz.shuffledE[eQuiz.qNum].sex;
}
// set species array if question was what is my species?
eQuiz.getSpecies = function() {
    eQuiz.ansArray = ["Asian", "African", "Hybrid"];
    eQuiz.correctAns = eQuiz.shuffledE[eQuiz.qNum].species;
}

eQuiz.gatherNameList = function() {
    eQuiz.namesList = [];
    //gather names
    eQuiz.shuffledE.forEach(function(elephant) {
        //checks to make sure there's info in the data set
        // if (typeof elephant.name === 'string') {
            eQuiz.namesList.push(elephant.name);
        // }
    });
    //gather locations

}

eQuiz.gatherLocationList = function () {
    eQuiz.locationList = [];
    eQuiz.shuffledE.forEach(function (elephant) {
        //checks to make sure there's info in the data set
        // if (typeof elephant.affiliation === 'string') {
        eQuiz.locationList.push(elephant.affiliation);
        // }
    });
}
/////////////////////////////

eQuiz.getNames = function() {
    eQuiz.gatherNameList();
    eQuiz.namesAns = [];
    // shuffle namesList and put it into namesAns
// console.log("original ans array", eQuiz.ansArray);
    eQuiz.shuffle(eQuiz.namesAns, eQuiz.namesList);
// console.log("namesList", eQuiz.namesList);
// console.log("namesAns", eQuiz.namesAns);
// console.log("right answer", eQuiz.shuffledE[eQuiz.qNum].name);
    // filter: so namesAnswer will include all names without the correct name
    eQuiz.namesAns = eQuiz.namesAns.filter(function(item){
        return item !== eQuiz.shuffledE[eQuiz.qNum].name
    });
// console.log("filtered namesAns", eQuiz.namesAns);
    // slice out the first 3 random names from namesAns
    eQuiz.namesAns = eQuiz.namesAns.slice(0, 3);
// console.log("sliced namesAns", eQuiz.namesAns);
    //grab correct elephant name and put into namesAns
    eQuiz.namesAns.push(eQuiz.shuffledE[eQuiz.qNum].name);
// console.log("namesAns with right and wrong ans", eQuiz.namesAns);
    // shuffle namesAns and put it into ansArray
    eQuiz.shuffle(eQuiz.ansArray, eQuiz.namesAns);
    // variable for the right answer to use later
// console.log("shuffled answers", eQuiz.ansArray);
    eQuiz.correctAns = eQuiz.shuffledE[eQuiz.qNum].name;
}

eQuiz.getLocations = function() {
    eQuiz.gatherLocationList();
    eQuiz.locationAns = [];
// console.log("original ans array", eQuiz.ansArray);
    eQuiz.shuffle(eQuiz.locationAns, eQuiz.locationList);
// console.log("locationList", eQuiz.locationList);
// console.log("locationAns", eQuiz.locationAns);
// console.log("right answer", eQuiz.shuffledE[eQuiz.qNum].affiliation);
    eQuiz.locationAns = eQuiz.locationAns.filter(function (item) {
        return item !== eQuiz.shuffledE[eQuiz.qNum].affiliation;
    });
// console.log("filtered locationAns", eQuiz.locationAns);
    eQuiz.locationAns = eQuiz.locationAns.slice(0, 3);
// console.log("sliced locationAns", eQuiz.locationAns);
    eQuiz.locationAns.push(eQuiz.shuffledE[eQuiz.qNum].affiliation);
// console.log("locationAns with right and wrong ans", eQuiz.locationAns);
    eQuiz.shuffle(eQuiz.ansArray, eQuiz.locationAns);
// console.log("shuffled answers", eQuiz.ansArray);
    eQuiz.correctAns = eQuiz.shuffledE[eQuiz.qNum].affiliation;
}



eQuiz.ansHtmlToAdd = function() {
    eQuiz.ansHtml = '';
    eQuiz.ansArray.forEach(function(item) {
        eQuiz.ansHtml += `<input type="radio" name="answer" id="${item}" value="${item}">
            <label for="${item}">${item}</label>`;
    });
}

//html section
eQuiz.compileHtmlDom = function() {
    const formToAdd = `
        <div class="headerContainer">
            <h3>${eQuiz.currentQ}</h3>
        </div>
        <div class="questionLayout">
            <div class="questionImage">
                <img src="${eQuiz.shuffledE[eQuiz.qNum].image}" alt="">
            </div>
            <div class="answerLayout">
                ${eQuiz.ansHtml}
            </div>
        </div>
        <div class="buttonContainer">
            <button type="submit" class="next">Next</button>
        </div>
    `;
    //put on DOM
    eQuiz.$questionForm.html(formToAdd);
    eQuiz.$hintToaster.text(eQuiz.hintText);
}

eQuiz.endQuiz = function() {
    if(eQuiz.score === 0) {
        eQuiz.message = "You should probably go visit the zoo next weekend.";
    } else if (eQuiz.score < 5) {
        eQuiz.message = "Life isn't perfect. Try harder next time.";
    } else if (eQuiz.score === 5) {
        eQuiz.message = "You're an elephant whisperer!";
    } else {
        eQuiz.message = "Sorry you broke our score system";
    }
    console.log(eQuiz.score);
    eQuiz.$qScreen.hide();
    const htmlToAdd = `
        <h3>Congratulations! Your score was:</h3>
        <p>${eQuiz.score}/5</p>
        <p>${eQuiz.message}</p>
        <a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=I%20just%20took%20the%20elephant%20quiz%20and%20I%20got%20${eQuiz.score / 5 * 100}%25.%20Test%20your%20elephant%20knowledge%20here:%20https://cecile-stephanie.github.io/elephantQuiz/" data-size="large"><i class="fab fa-twitter"></i> Tweet</a>
    `;
    eQuiz.$scoreScreen.show().html(htmlToAdd);
}