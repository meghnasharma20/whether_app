const whetherForm = document.querySelector("form");
const a = document.querySelector("#address");
const l = document.querySelector("#location");
const temp = document.querySelector("#whetherResult");

whetherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  l.textContent = "Loading...";
  temp.textContent = "";
  console.log(a.value);
  fetch("http://localhost:3000/whether?address=" + a.value).then((res) => {
    res.json().then((result) => {
      if (result.error) {
        l.textContent = result.error;
      } else {
        l.textContent = a.value;
        temp.textContent =
          "your searched location temperature is " + result.data.temperature;
      }
    });
  });
});
