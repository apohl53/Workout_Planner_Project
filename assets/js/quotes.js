var quote = $(".quotes");
var muscle = "triceps";
var category = "fitness";
$.ajax({
  method: "GET",
  url: "https://api.api-ninjas.com/v1/quotes?category=" + category,
  headers: { "X-Api-Key": "Hq8NzbFCpDxaeVKmzTs+MQ==nRvwP2tuQHCEWYUO" },
  contentType: "application/json",
  success: function (results) {
    quote.append("<h1>" + results[0].quote + "</h1>");
  },
});
