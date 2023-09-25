var userChoice = null;
var upper = $('.upperBody');
var lower = $('.lowerBody');
var core = $('.core');

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
    var randLower = Math.floor(Math.random() * (lowerBodyLength - 1) + 1); // if lowerbody is chosen, get a random number based on length  
    var lowerString = exerciseOptions[0].bodyParts[randLower]; // choose a random body part using number above index
    localStorage.setItem('userChoice', lowerString); // this will set the users choice to local storage using 'userChoice' as key

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


// get the Storage saved in userChoice
function getStorage() {
  var getLocal = localStorage.getItem('userChoice')

  apiCall(getLocal);

}


function getObject() {

  var obj3 = JSON.parse(localStorage.getItem('UpperBody')) || [];
  var obj2 = JSON.parse(localStorage.getItem('LowerBody')) || [];
  var obj4 = JSON.parse(localStorage.getItem('Core')) || [];

  //  this sets tags and get upperbody workouts
  for (var x = 0; x < obj3.length; x++) {
    upper.append('<p id = "upperp' + x + '">' + obj3[x] + '</p>')
  }

  // for lower body
  for (var x = 0; x < obj2.length; x++) {
    lower.append('<p id = "lowerp' + x + '">' + obj2[x] + '</p>')
  }

  // for core
  for (var x = 0; x < obj4.length; x++) {
    core.append('<p id = "corep' + x + '">' + obj4[x] + '</p>')
  }


}


// after user click previous exercise, this will find the text and id and pass it on to new api call to get all the info from the exercise
function gtfnction(e) {
  var txt = $(e.target).text(); // this pull out the text that was clicked on to be able to use in the apiCall

  var trgt = '#' + e.target.id // this will grab the necessary ID to be able to append later into the page

  nwapicall(txt, trgt) //this will call the nwapiCall and use 'txt' and 'trgt' that was collected from the click event
}


// based on users choice, call the API and Append to page to view the workout
function apiCall(getLocal) {
  var muscle = getLocal;
  nxtcount += 1;
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
    headers: { 'X-Api-Key': 'Hq8NzbFCpDxaeVKmzTs+MQ==nRvwP2tuQHCEWYUO' },
    contentType: 'application/json',
    success: function (result) {

      var count = Math.floor(Math.random() * 10); // picks one workout from the 10 the API spits out
      secondSection.innerHTML = ""; // clear what is currently viewing

      // append the data coming from the API
      test.append('<p class = "testing">' + result[count].name +
        '<br>' + result[count].type +
        '<br>' + result[count].muscle +
        '<br>' + result[count].equipment +
        '<br>' + result[count].difficulty + '</p>')

      // below if statements will add the data that was received from API to localStorage to be able to view last workout later when we call it
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

// this api call is to get the data that was clicked on the page (that is under a previous title holder)
function nwapicall(txt, strtrgt) {
  var strtrgt = $(strtrgt)
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/exercises?name=' + txt,
    headers: { 'X-Api-Key': 'Hq8NzbFCpDxaeVKmzTs+MQ==nRvwP2tuQHCEWYUO' },
    contentType: 'application/json',
    success: function (result) {


      secondSection.innerHTML = "";
      strtrgt.append('<p class = "testing">' + result[0].type +
        '<br>' + result[0].muscle +
        '<br>' + result[0].equipment +
        '<br>' + result[0].difficulty + '</p>')
      var tweb = $('.testing');
      strtrgt.append('<p>' + result[0].instructions + '</p>')

    }
  })
}



// once the page loads, logic starts here
getObject();


// event listener inside Modal
var getStartedBTN = document.getElementById('getStartedBTN');
getStartedBTN.addEventListener('click', openModal);


// option to close out the modal page
var closeGetStarted = document.getElementById('closeX')
closeGetStarted.addEventListener('click', closeModal);



upper.on('click', gtfnction)
core.on('click', gtfnction)
lower.on('click', gtfnction)








