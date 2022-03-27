/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
//API KEY
const key = ",&appid=b5a8887e9cbcc4fe8a42b225c1d7b5b7&units=metric";
//Base URL
const webURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
//calling elements from html
const dateh = document.getElementById("date");
const temph = document.getElementById("temp");
const contenth = document.getElementById("content");
// Event Listener
document.getElementById("generate").addEventListener("click", clicked);

function clicked() {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(webURL, zip, key).then(function (data) {
    postData("/alldata", {
      date: newDate,
      temperature: data.main.temp,
      zip: zip,
      feelings: feelings,
    }).then(updateUI());
  });
}
//Get Function

const getWeather = async (webURL, zip, key) => {
  const res = await fetch(webURL + zip + key);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
// Post function

const postData = async (url = "", data) => {
  const res = await fetch(url, {
    method: "post",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const nData = await res.json();
    console.log(nData);
    return nData;
  } catch (error) {
    console.log("error", error);
  }
};
//update the UI
async function updateUI() {
  const req = await fetch("/all");
  try {
    const projectData = await req.json();
    dateh.innerHTML = `${projectData.date}`;
    temph.innerHTML = `${projectData.temperature}°C`;
    contenth.innerHTML = `${projectData.feelings}`;
  } catch (error) {
    console.log(`error: ${error}`);
  }
}
