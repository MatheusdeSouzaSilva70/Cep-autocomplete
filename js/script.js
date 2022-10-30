const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");

const closeButton = document.querySelector("#close-message");

const fadeElement = document.querySelector("#fade");

//validate cep input
cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode); //transform key press in number or letter

    // console.log(e.keyCode);
    // console.log(key);

    //allow only numbers
    if(!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
    }
});

//get address event
cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;

    if(inputValue.length === 8){
        getAddress(inputValue);
    }
});


const getAddress = async (cep) => {
    // console.log(cep);
    toggleLoader();

    cepInput.blur();

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(apiUrl);

    const data = await response.json();
    console.log(data);
    console.log(data.erro)

    if(!addressInput.hasAttribute("disabled")) {
        toggleDisabled();
    }

    if(data.erro === "true") {
        addressForm.reset();
        toggleLoader();
        toggleMessage("CEP inválido, tente novamente.")
        return;
    }

    if(addressInput.value === "" ){
        toggleDisabled();
    }

    // toggleDisabled();

    addressInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    regionInput.value = data.uf;

    toggleLoader();

};


const toggleDisabled = () => {
    if (regionInput.hasAttribute("disabled")) {
      formInputs.forEach((input) => {
        input.removeAttribute("disabled");
      });
    } else {
      formInputs.forEach((input) => {
        input.setAttribute("disabled", "disabled");
      });
    }
  };

//show or hide loader 
const toggleLoader = () => {
    
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

const toggleMessage = (msg) => {
    const messageElement = document.querySelector("#message");

    const messageElementText = document.querySelector("#message p");

    messageElementText.innerText = msg;

    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
};


closeButton.addEventListener("click", () => toggleMessage());

addressForm.addEventListener("submit", (e) => {
    e.preventDefault();
    toggleLoader();

    setTimeout(() => {
        toggleLoader();
        toggleMessage("Endereço salvo com sucesso");
        addressForm.reset();
        toggleDisabled();
    }, 1500)
})