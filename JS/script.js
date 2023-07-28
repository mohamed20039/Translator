const selectTag = document.querySelectorAll("select");
let translate = document.querySelector(".btn-translate");
let fromText = document.querySelector(".from-text");
let toText = document.querySelector(".to-text");
let exchange = document.querySelector(".exchange");

selectTag.forEach((tag, id) => {
  // console.log(tag);

  for (const country_code in countries) {
    let selected;
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "so-SO") {
      selected = "selected";
    }
    let option = `<option value=${country_code} ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

exchange.addEventListener("click", () => {
  let tempText = fromText.value;
  let tempLang = selectTag[0].value;
  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = tempText;
  selectTag[1].value = tempLang;
});

translate.addEventListener("click", () => {
  let text = fromText.value;

  const translateFrom = selectTag[0].value;
  const translateTo = selectTag[1].value;

  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
    });
});
