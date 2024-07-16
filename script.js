const dropList = document.querySelectorAll(".drop-list select"),
      fromCurrency = document.querySelector(".from select"),
      toCurrency = document.querySelector(".to select"),
      getButton = document.querySelector("#get-rate"),
      resetButton = document.querySelector("#reset"),
      amountInput = document.querySelector(".amount input"),
      exchangeRateTxt = document.querySelector(".exchange-rate");

// Populate the drop-down lists with currency codes
for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_code) {
        let selected = (i === 0 && currency_code === "USD") ? "selected" : (i === 1 && currency_code === "NPR") ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
}

getButton.addEventListener("click", e => {
    e.preventDefault(); // Prevent form from submitting
    getExchangeRate();
});

resetButton.addEventListener("click", e => {
    e.preventDefault(); // Prevent form from submitting
    resetForm();
});

function getExchangeRate() {
    let amountVal = amountInput.value;

    // Validate input
    if (isNaN(amountVal) || amountVal <= 0) {
        exchangeRateTxt.innerText = "Please enter a valid amount.";
        return;
    }

    exchangeRateTxt.innerText = "Getting exchange rate...";

    const apiKey = 'fd39f49550749e7af8f8474a';
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;

    fetch(url)
        .then(response => response.json())
        .then(result => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            const totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        })
        .catch(() => {
            exchangeRateTxt.innerText = "Something went wrong";
        });
}

function resetForm() {
    amountInput.value = "1";
    fromCurrency.value = "USD";
    toCurrency.value = "NPR";
    exchangeRateTxt.innerText = "";
}
