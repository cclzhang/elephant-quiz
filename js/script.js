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
}

// Dom nodes into variables
eQuiz.getDom = () => {
    eQuiz.$header = $("header");
    eQuiz.$startB = $(".start");
    eQuiz.$main = $("main");
    // 
    eQuiz.$qScreen = $(".questionScreen");
    eQuiz.$questionForm = $(".question");
    eQuiz.$hintToaster = $(".hintToaster");
    // 
    eQuiz.$infoCard = $(".infoCard");
    // 
    eQuiz.$scoreScreen = $(".scoreScreen");
};


//set up event listeners
eQuiz.listenUp = function() {
    eQuiz.$startB.on('click', eQuiz.startQuiz);
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
        eQuiz.gatherNameLocationList(data);
    });
};

eQuiz.shuffle = function (tempArray, originalArray) {
    while (tempArray.length < originalArray.length) {
        console.log('entering while loop');
        this.randIndex = Math.floor(Math.random() * originalArray.length);
        console.log('randIndex: ' + this.randIndex)
        if (tempArray.includes(originalArray[this.randIndex]) === false) {
            console.log('entering if statement');
            tempArray.push(originalArray[this.randIndex]);
        }
        console.log('exiting if statement');
    }
    console.log('exiting while loop');
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
            eQuiz.arrayOfE.push({name: elephant.name, affiliation: elephant.affiliation, species: elephant.species, sex: elephant.sex, image: elephant.image, note: elephant.note});
        }
    });
    //randomize array of elephants
    console.log('shuffling elephants');
    eQuiz.shuffledE = [];
    eQuiz.shuffle(eQuiz.shuffledE, eQuiz.arrayOfE);
}


//start the quiz
eQuiz.startQuiz = function() {
    console.log('quiz has been fired');
    //show/hide screens
    eQuiz.$header.hide();
    eQuiz.$main.show();
    eQuiz.$qScreen.show();
    eQuiz.$hintToaster.show();
    //set question & answers
    eQuiz.nextQ();
    //load question
    // eQuiz.ansHtmlToAdd();
    // eQuiz.hintHtmlToAdd();
    // eQuiz.compileHtmlDom();
    // eQuiz.ansArray.forEach(function (item) {
    //     eQuiz.$questionForm.html(`
    //     <input type="radio" name="" id="">
    //     <label for="">${item}</label>
    //     `);
    // });


    // eQuiz.$questionForm.html(htmlToAdd);
    //load hint
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
    eQuiz.ansArray = [];
    eQuiz.setQ();
    eQuiz.setA();
    eQuiz.qNum++;
    //if statement to check if quiz is over
}
/////////////////////////////////////////////////////////////////



// answer section
eQuiz.setA = function() {
    if (eQuiz.currentQ === "What is my sex?") {
        eQuiz.getSex();
    } else if (eQuiz.currentQ === "What species am I?") {
        eQuiz.getSpecies();
    } else if (eQuiz.currentQ === "What is my name?") {
        eQuiz.getNames();
    } else if (eQuiz.currentQ === "Where am I from?") {
        eQuiz.getLocations();
    }
}

eQuiz.rightAnswer;
eQuiz.wrongAnswer;

//////////////////////////////////////////////////////////////
// set answer array if question was what is my sex?
eQuiz.getSex = function() {
    eQuiz.ansArray = ["cow", "bull"]
}
// set species array if question was what is my species?
eQuiz.getSpecies = function() {
    console.log("getSpecies")
    eQuiz.ansArray = ["Asian", "African", "Hybrid"]
}


eQuiz.gatherNameLocationList = function(data) {
    eQuiz.namesList = [];
    eQuiz.locationList = [];
    //gather names
    data.forEach(function(elephant) {
        //checks to make sure there's info in the data set
        if (typeof elephant.name === 'string') {
            eQuiz.namesList.push(elephant.name);
        }
    });
    //gather locations
    data.forEach(function(elephant) {
        //checks to make sure there's info in the data set
        if (typeof elephant.affiliation === 'string') {
            eQuiz.locationList.push(elephant.affiliation);
        }
    });
}
/////////////////////////////

eQuiz.getNames = function() {
    eQuiz.ansArray = [];
    let tempNamesList = [];
    eQuiz.shuffle(tempNamesList, eQuiz.namesList);
    // eQuiz.ansArray = tempNamesList.slice(0, 3);
    //grab correct elephant name
    eQuiz.ansArray.push(eQuiz.shuffledE[eQuiz.qNum].name);
    // grab 3 incorrect elephant names
    // for (let i = 0; i < 4; i++) {
    //     eQuiz.ansArray.push(eQuiz.shuffle(eQuiz.namesList));
    //     //future error handling: we need to make sure no doubles with an includes check maybe?
    // }
    // add an if statement if fake answer = real answer, do not push
}

eQuiz.getLocations = function() {
    console.log("location");
}


eQuiz.ansHtmlToAdd = function() {

}
//html section
eQuiz.compileHtmlDom = function() {
    const formToAdd = `
        <h3>${eQuiz.currentQ}</h3>
        <div>
            <img src="${eQuiz.shuffledE[eQuiz.qNum].image}" alt="">
        </div>
    `;
    const hintToAdd = `

    `;
    
    //put on DOM

}

// // q1 = 
// // a = bull, cow
// // q2 = 
// // a = african, asian, hybrid
// // q3 = 
// // a = 3 fake, 1 real
// // q4 = 
// // a = 3 fake 1 real OR a2 = circus, national park, zoo, the wild


    // if (eQuiz.shuffledE[eQuiz.qNum].sex === "Female") {
    //     eQuiz.rightAnswer = "cow";
    // } else {
    //     eQuiz.rightAnswer = "bull";
    // }