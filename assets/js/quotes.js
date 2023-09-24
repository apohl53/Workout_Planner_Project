var quote = $(".quotes");
var muscle = "triceps";
var category = "fitness";
<<<<<<< HEAD

=======
// $.ajax({
//   method: "GET",
//   url: "https://api.api-ninjas.com/v1/exercises?muscle=" + muscle,
//   headers: { "X-Api-Key": "bQQv3qWq5kHalNjh19VAPQ==OdFpPSD3HrbB6vz5" },
//   contentType: "application/json",
//   success: function (result) {
//     console.log(result[0]);
//     var count = Math.floor(Math.random() * 10);
//     console.log(count);
//     quote.append("<p>" + result[count].name + "</p>");
//     quote.append("<h2>" + result[count].difficulty + "</h2>");
//     quote.append("<p>" + result[count].instructions + "</p>");
//   },
// });
>>>>>>> caf39fd4a561cb649adc5130cb55bce2d89d081a
$.ajax({
  method: "GET",
  url: "https://api.api-ninjas.com/v1/quotes?category=" + category,
  headers: { "X-Api-Key": "bQQv3qWq5kHalNjh19VAPQ==OdFpPSD3HrbB6vz5" },
  contentType: "application/json",
  success: function (results) {

    quote.append("<h1>" + results[0].quote + "</h1>");
  },
});
