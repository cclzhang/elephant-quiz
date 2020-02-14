const eQuiz = {};

// B = button E = elephant
// variables


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
            params: {
                param1: "random",
            },
            xmlToJSON: false,
            useCache: false
        }
    }).then(function (res) {
        console.log(res);
    });
};







// Dom nodes into variables
// eQuiz.getDom = () => {
//     eQuiz.$header = $("header");
//     eQuiz.$startB = $("button.start");
//     eQuiz.$main = $("main");
//     // 
//     eQuiz.$qScreen = $(".questionScreen");
//     eQuiz.$question = $(".question");
//     eQuiz.$hintToaster = $(".hintToaster");
//     // 
//     eQuiz.$infoCard = $(".infoCard");
//     // 
//     eQuiz.$scoreScreen = $(".scoreScreen");
// };


// when opening page button is clicked
// eQuiz.$startB.on("click", function(){
//     eQuiz.$header.hide();
//     eQuiz.$main.show();
//     eQuiz.$qScreen.show();
//     eQuiz.$hintToaster.show();

//     eQuiz.$question.html(`

//     `);
// });


// eQuiz.qBank = ["What is my sex?", "What species am I?", "What is my name?", "Where am I from?"];

// eQuiz.randomize = (min, max) => {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     Math.floor(Math.random() * (max - min)) + min;
// }

// console.log(qBank[eQuiz.randomize(0, 4)]);

// // q1 = 
// // a = bull, cow
// // q2 = 
// // a = african, asian, hybrid
// // q3 = 
// // a = 3 fake, 1 real
// // q4 = 
// // a = 3 fake 1 real OR a2 = circus, national park, zoo, the wild


// eQuiz initialization
eQuiz.init = () => {
    eQuiz.getE();
    // eQuiz.getDom();
};

$(()=>{
    eQuiz.init();
});