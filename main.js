const BASE_URL = "http://api.weatherapi.com/v1";

const part1 = "YWRmYTlkNjljZj";
const part2 = "M2NDUwODkwMTE";
const part3 = "5MzEwODI1MTUwMw ==";

const API_KEY = atob(part1 + part2 + part3);

function updateTime() {
  const now = new Date();
  const weekday = now.toLocaleDateString("en-GB", { weekday: "long" });
  const date = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  $("#current-date").text(`${weekday}, ${date}`);
}
setInterval(updateTime, 1000);
updateTime();

$(".search-button").on("click", getWeather);
$(".search-input").on("keypress", function (event) {
  if (event.which == 13) getWeather();
});

function getWeather() {
  const city = $(".search-input").val().trim();
  if (city === "") return;

  const END_POINT = "/current.json";
  const url = `${BASE_URL}${END_POINT}?key=${API_KEY}&q=${city}`;

  $.getJSON(url, function (data) {
    $(".location").html(`${data.location.name},`);
    $(".country").html(data.location.country);
    $(".temperature").html(
      `<strong>Temperature:</strong> ${data.current.temp_c} °C`
    );
    $(".wind").html(
      `<strong>Wind Speed:</strong> ${data.current.wind_kph} km/h`
    );
    $(".humidity").html(`<strong>Humidity:</strong> ${data.current.humidity}%`);
    $(".condition").html(data.current.condition.text);
    $(".weather-icon").attr("src", data.current.condition.icon);
    $("#local-time").html(data.location.localtime);

    $(".weather-card").hide().removeClass("d-none").fadeIn(500);
  }).fail(function () {
    alert("Error fetching data! Check the city name.");
  });
}
