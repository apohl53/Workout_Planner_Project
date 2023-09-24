// var promisedAPI = fetch('https://api-ninjas.com/v1/exercises?muscle=&apikey=').then(function (data) {
//   var resultQuote = data.json();
//   console.log(resultQuote);
// })


// var userChoice = 


var userChoice = null;
var upper = $('.upperBody')
var lower = $('.lowerBody')
var core = $('.core')
// var storedUserChoice = localStorage.getItem('userChoice');

function openModal() {
  var modal = document.getElementById('myModal');
  modal.style.display = 'block';
};

function closeModal() {
  var modal = document.getElementById('myModal');
  modal.style.display = 'none';
};

function radioButton() {
  var userInput = document.querySelector('input[name="part"]:checked');

  var val = userInput.value;



  if (val === "lowerBody") {
    var randLower = Math.floor(Math.random() * (lowerBodyLength - 1) + 1);
    var lowerString = exerciseOptions[0].bodyParts[randLower];
    localStorage.setItem('userChoice', lowerString);

    getStorage();
    closeModal();
  }

  if (val === "core") {
    var midString = exerciseOptions[1].bodyParts
    localStorage.setItem('userChoice', midString);
    getStorage();
    closeModal();
  }

  if (val === "upperBody") {
    var randUpper = Math.floor(Math.random() * (upperBodyLength - 1) + 1);
    var upperString = exerciseOptions[2].bodyParts[randUpper];
    localStorage.setItem('userChoice', upperString);
    getStorage();
    closeModal();
  }



  if (val == '') {
    alert('Let us know what body section you want to work on!');
    return;
  }

};



var btn = $('.showMeBTN')
btn.on('click', radioButton)


var exerciseOptions = [
  {
    bodySection: 'lowerBody',
    bodyParts: ['abductors', 'adductors', 'calves', 'glutes', 'hamstrings', 'quadriceps']
  },
  {
    bodySection: 'core',
    bodyParts: ['abdominals']
  },
  {
    bodySection: 'upperBody',
    bodyParts: ['biceps', 'chest', 'forearms', 'lats', 'lower_back', 'middle_back', 'neck', 'traps', 'triceps']
  }
]

var userExercises =
{
  prevLower: [],
  prevCore: [],
  prevUpper: []

}



var nxtcount = 0;
var lowerBodyLength = exerciseOptions[0].bodyParts.length;
var coreLength = exerciseOptions[1].bodyParts.length;
var upperBodyLength = exerciseOptions[2].bodyParts.length;

var randLower = Math.floor(Math.random() * (lowerBodyLength - 1) + 1);

var randUpper = Math.floor(Math.random() * (upperBodyLength - 1) + 1);


var lowerString = exerciseOptions[0].bodyParts[randLower];

var upperString = exerciseOptions[2].bodyParts[randUpper];

var test = $('#secondSection')
var test2 = $('#firstSection')

function getStorage() {
  var getLocal = localStorage.getItem('userChoice')

  apiCall(getLocal);

}


function getObject() {
  // var obj = JSON.parse(localStorage.getItem('object')) || [];
  // var obj3 = JSON.parse(localStorage.getItem('UpperBody')) || [];
  var obj3 = JSON.parse(localStorage.getItem('UpperBody')) || [];
  var obj2 = JSON.parse(localStorage.getItem('LowerBody')) || [];
  var obj4 = JSON.parse(localStorage.getItem('Core')) || [];
  // console.log(obj.upperBody)
  console.log(obj3)
  console.log(obj2)
  console.log(obj4)
  for (var x = 0; x < obj3.length; x++) {
    upper.append('<p>' + obj3[x] + '</p>')
  }
  for (var x = 0; x < obj2.length; x++) {
    lower.append('<p>' + obj2[x] + '</p>')
  }
  for (var x = 0; x < obj4.length; x++) {
    core.append('<p>' + obj4[x] + '</p>')
  }


}

function gtfnction(e) {
  var txt = $(e.target).text();
  console.log(txt)
  nwapicall(txt)
}



function apiCall(getLocal) {
  // below is the API connection
  var muscle = getLocal;
  nxtcount += 1;
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
    headers: { 'X-Api-Key': 'Hq8NzbFCpDxaeVKmzTs+MQ==nRvwP2tuQHCEWYUO' },
    contentType: 'application/json',
    success: function (result) {

      var count = Math.floor(Math.random() * 10);
      secondSection.innerHTML = "";
      test.append('<p class = "testing">' + result[count].name +
        '<br>' + result[count].type +
        '<br>' + result[count].muscle +
        '<br>' + result[count].equipment +
        '<br>' + result[count].difficulty + '</p>')
      if (muscle == 'abductors' || muscle == 'adductors' || muscle == 'calves' || muscle == 'glutes' || muscle == 'hamstrings' || muscle == 'quadriceps') {

        userExercises.prevLower.push(result[count].name);
        localStorage.setItem('LowerBody', JSON.stringify(userExercises.prevLower));


      }
      else if (muscle == 'biceps' || muscle == 'chest' || muscle == 'forearms' || muscle == 'lats' || muscle == 'lower_back' || muscle == 'middle_back' || muscle == 'neck' || muscle == 'traps' || muscle == 'triceps') {
        userExercises.prevUpper.push(result[count].name);
        localStorage.setItem('UpperBody', JSON.stringify(userExercises.prevUpper));


      }
      else {
        userExercises.prevCore.push(result[count].name);
        localStorage.setItem('Core', JSON.stringify(userExercises.prevCore));


      }

      var tweb = $('.testing');
      tweb.append('<p>' + result[count].instructions + '</p>')


      localStorage.setItem('object', JSON.stringify(userExercises));
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
}
function nwapicall(txt) {

  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/exercises?name=' + txt,
    headers: { 'X-Api-Key': 'Hq8NzbFCpDxaeVKmzTs+MQ==nRvwP2tuQHCEWYUO' },
    contentType: 'application/json',
    success: function (result) {


      secondSection.innerHTML = "";
      test.append('<p class = "testing">' + result.name +
        '<br>' + result.type +
        '<br>' + result.muscle +
        '<br>' + result.equipment +
        '<br>' + result.difficulty + '</p>')
      var tweb = $('.testing');
      tweb.append('<p>' + result.instructions + '</p>')

    }
  })
}




getObject();

var getStartedBTN = document.getElementById('getStartedBTN');
getStartedBTN.addEventListener('click', openModal);

var closeGetStarted = document.getElementById('closeX')
closeGetStarted.addEventListener('click', closeModal);

upper.on('click', gtfnction)
core.on('click', gtfnction)
lower.on('click', gtfnction)








