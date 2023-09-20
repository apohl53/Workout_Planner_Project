// var promisedAPI = fetch('https://api-ninjas.com/v1/exercises?muscle=&apikey=').then(function (data) {
//   var resultQuote = data.json();
//   console.log(resultQuote);
// })


// var userChoice = 


//   var muscle = 'biceps'
//   $.ajax({
//     method: 'GET',
//     url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
//     headers: { 'X-Api-Key': 'Hq8NzbFCpDxaeVKmzTs+MQ==nRvwP2tuQHCEWYUO' },
//     contentType: 'application/json',
//     success: function (result) {
//       console.log(result);
//     },
//     error: function ajaxError(jqXHR) {
//       console.error('Error: ', jqXHR.responseText);
//     }
//   });

// }



var userChoice = null;

var storedUserChoice = localStorage.getItem('userChoice');

function openModal() {
  var modal = document.getElementById('myModal');
  modal.style.display = 'block';
}

function closeModal() {
  var modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

function saveUserChoice() {
  var userInput = document.getElementById('userInput').value;
  userChoice = userInput;
  localStorage.setItem('userChoice', userChoice);
  closeModal();

}


