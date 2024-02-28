const base_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".btn");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

//countries select options
for (let select of dropdowns) {
  for (country in countryList) {
    // console.log(`${country} ${countryList[country]}`);
    let newOptions = document.createElement("option");
    newOptions.innerHTML = country;
    newOptions.value = country;
    if (select.name == "from" && country == "USD") {
      newOptions.selected = true;
    } else if (select.name == "to" && country == "INR") {
      newOptions.selected = true;
    }
    select.append(newOptions);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

//flag change function
let updateFlag = (e) => {
  let currCode = e.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = e.parentElement.querySelector("img");
  img.src = newSrc;
};

//for default window
window.addEventListener("load", () => {
  exchangeUpdateRate();
});

//onClick of button
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  exchangeUpdateRate();
});

//rate exchange func
const exchangeUpdateRate = async () => {
  let amt = document.querySelector(".amount input");
  let amount = amt.value;
  if (amount == "" || amount <= 0) {
    amount = 1;
    amt.value = "1";
  }
  const url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  rate = amount * rate;
  msg.innerHTML = `${amount} ${fromCurr.value} = ${rate} ${toCurr.value}`;
};
