const eQuiz = {};

// doc ready
$(()=>{
    eQuiz.init();
});

// eQuiz initialization
eQuiz.init = () => {
    eQuiz.getE();
    eQuiz.getDom();
    eQuiz.setGlobal();
    eQuiz.listenUp();

};

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
        eQuiz.gatherE(data);
        eQuiz.gatherFakeAns(data);
    });
};

eQuiz.gatherE = function(data) {
    eQuiz.arrayOfE = [];
    data.forEach(function(elephant) {
        //process complete data only into array
        if (elephant.image !== "https://elephant-api.herokuapp.com/pictures/missing.jpg" && elephant.name !== undefined && elephant.species !== "Unavailable" && elephant.sex !== "Unavailable") {
            eQuiz.arrayOfE.push({name: elephant.name, affiliation: elephant.affiliation, species: elephant.species, sex: elephant.sex, image: elephant.image, note: elephant.note});
        }
    });
    //randomly select 5 elephants for 5 questions
    eQuiz.shuffledE = [];
    eQuiz.shuffle(eQuiz.shuffledE, eQuiz.arrayOfE);
}



eQuiz.gatherFakeAns = function(data) {
    //gather names
    data.forEach(function(elephant) {
        //checks to make sure there's info in the data set
        if (typeof elephant.name === 'string') {
            eQuiz.fakeNames = [];
            eQuiz.fakeNames.push(elephant.name);
        }
        // add an if statement if fake answer = real answer, do not push
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
    eQuiz.$questionForm = $(".question");
    eQuiz.$hintToaster = $(".hintToaster");
    // 
    eQuiz.$infoCard = $(".infoCard");
    // 
    eQuiz.$scoreScreen = $(".scoreScreen");
};

//set global variables
eQuiz.setGlobal = function() {
    //variable to work through the shuffledE array properly when assigning answers
    eQuiz.qNum = 0;
    //variable to assign answer set for the current question
    eQuiz.ansArray = ["baby", "toddler"];
    eQuiz.randIndex = 0;
}

//set up event listeners
eQuiz.listenUp = function() {
    eQuiz.$startB.on('click', eQuiz.startQuiz);
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
    // const radioHtml = "";
    

    eQuiz.ansArray.forEach(function (item) {
        eQuiz.$questionForm.html(`
            <input type="radio" name="" id="">
            <label for="">${item}</label>
        `);
    });
    console.log("hi");
    const answerHtml = `

    `;
    const htmlToAdd = `

    `;
    eQuiz.$questionForm.html(htmlToAdd);
    //load hint
}

eQuiz.nextQ = function() {
    eQuiz.qNum++;
    eQuiz.setQ();
    eQuiz.setA();
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
    // set 2, validate chosen answer
    console.log("sex")
}

eQuiz.getSpecies = function() {
    // set 3, validate chosen answer
    console.log("getSpecies")
}

eQuiz.getNames = function() {
    //grab correct elephant name
    eQuiz.ansArray.push(eQuiz.shuffledE[eQuiz.qNum].name);

    // grab 3 incorrect elephant names
    for (let i = 0; i < 4; i++) {
        eQuiz.ansArray.push(eQuiz.randomize(eQuiz.fakeNames));
        //future error handling: we need to make sure no doubles with an includes check maybe?
    }



    console.log(eQuiz.ansArray);
    
}

eQuiz.getLocations = function() {
    console.log("location");
}



eQuiz.shuffle = function (tempArray, originalArray) {
    while (tempArray.length < originalArray.length) {
        this.randIndex = Math.floor(Math.random() * originalArray.length);
        if (tempArray.includes(originalArray[this.randIndex]) === false) {
            tempArray.push(originalArray[this.randIndex]);
        }
    }
}

// original array = all elephants from API
// new array = 5 chosen random elephants that don't repeat
// generate a random number

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


