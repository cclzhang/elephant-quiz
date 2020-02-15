// doc ready
$(()=>{
    eQuiz.init();
});

const eQuiz = {};

// eQuiz initialization
eQuiz.init = () => {
    eQuiz.getE();
    eQuiz.getDom();
    eQuiz.setGlobal();
    eQuiz.listenUp();
};


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
    }).then(function (res) {
        eQuiz.gatherE(res);
        eQuiz.gatherFakeAns(res);
    });
};

eQuiz.gatherE = function(data) {
    const arrayOfE = [];
    data.forEach(function(elephant) {
        //process complete data only into array
        if (elephant.image !== "https://elephant-api.herokuapp.com/pictures/missing.jpg" && elephant.name !== undefined && elephant.species !== "Unavailable" && elephant.sex !== "Unavailable") {
            arrayOfE.push({name: elephant.name, affiliation: elephant.affiliation, species: elephant.species, sex: elephant.sex, image: elephant.image, note: elephant.note});
        }
    });
    //randomly select 5 elephants for 5 questions
    eQuiz.fiveOfE = [];
    for (let i = 0; i < 5; i++) {
        eQuiz.fiveOfE.push(eQuiz.randomize(arrayOfE));
        //future error handling to address: this could result in the same elephant for multiple questions which is okay as long as the questions are not the same. we need to either: 1. implement a check for assigning diff questions if there's a repeated elephant in this array OR 2. remove this possibility of the same elephant repeated in the first place
    }
}

eQuiz.gatherFakeAns = function(data) {
    //gather names
    data.forEach(function(elephant) {
        //checks to make sure there's info in the data set
        if (typeof elephant.name === 'string') {
            eQuiz.fakeNames = [];
            eQuiz.fakeNames.push(elephant.name);
        }
    });
    //gather locations
    data.forEach(function(elephant) {
        //checks to make sure there's info in the data set
        if (typeof elephant.affiliation === 'string') {
            eQuiz.fakeLocations = [];
            eQuiz.fakeLocations.push(elephant.affiliation);
        }
    });
}

// Dom nodes into variables
eQuiz.getDom = () => {
    eQuiz.$header = $("header");
    eQuiz.$startB = $(".start");
    eQuiz.$main = $("main");
    // 
    eQuiz.$qScreen = $(".questionScreen");
    eQuiz.$question = $(".question");
    eQuiz.$hintToaster = $(".hintToaster");
    // 
    eQuiz.$infoCard = $(".infoCard");
    // 
    eQuiz.$scoreScreen = $(".scoreScreen");
};

//set global variables
eQuiz.setGlobal = function() {
    //variable to work through the fiveOfE array properly when assigning answers
    eQuiz.qNum = 0;
    //variable to assign answer set for the current question
    eQuiz.ansArray = [];
}

//set up event listeners
eQuiz.listenUp = function() {
    eQuiz.$startB.one('click', eQuiz.startQuiz);
}

//start the quiz
eQuiz.startQuiz = function() {
    //show/hide screens
    eQuiz.$header.hide();
    eQuiz.$main.show();
    eQuiz.$qScreen.show();
    eQuiz.$hintToaster.show();
    //set question & answers
    eQuiz.setQ();
    eQuiz.setA();
    //load question
    const htmlToAdd = `
    
    `;
    eQuiz.$question.html(htmlToAdd);
    //load hint
}

eQuiz.nextQ = function() {
    eQuiz.qNum++;
    //if statement to check if quiz is over
}

eQuiz.qBank = ["What is my sex?", "What species am I?", "What is my name?", "Where am I from?"];

eQuiz.setQ = function() {
    eQuiz.currentQ = eQuiz.randomize(eQuiz.qBank);
};

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

eQuiz.getSex = function() {
    //grab correct elephant name
    eQuiz.ansArray.push(eQuiz.fiveOfE[eQuiz.qNum].name);
    //grab 3 incorrect elephant names
    for (let i = 0; i < 4; i++) {
        eQuiz.ansArray.push(eQuiz.randomize(eQuiz.fakeNames));
        //future error handling: we need to make sure no doubles with an includes check maybe?
    }
    console.log(eQuiz.ansArray);
}

eQuiz.getSpecies = function() {

}

eQuiz.getNames = function() {

}

eQuiz.getLocations = function() {

}

eQuiz.randomize = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

// // q1 = 
// // a = bull, cow
// // q2 = 
// // a = african, asian, hybrid
// // q3 = 
// // a = 3 fake, 1 real
// // q4 = 
// // a = 3 fake 1 real OR a2 = circus, national park, zoo, the wild


