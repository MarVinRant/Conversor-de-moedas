const convertButton = document.querySelector('.convert-button');
const currencySelectFrom = document.querySelector('.currency-select-from');
const currencySelectTo = document.querySelector('.currency-select-to');

// Dicionário com todas as informações das moedas (tendo o Real como base = 1)
const currencies = {
    real: { rate: 1, name: 'Real', locale: 'pt-BR', currency: 'BRL', img: './assets/brasil.png' },
    dolar: { rate: 5.2, name: 'Dólar Americano', locale: 'en-US', currency: 'USD', img: './assets/dolar.png' },
    euro: { rate: 6.2, name: 'Euro', locale: 'de-DE', currency: 'EUR', img: './assets/euro.png' },
    libra: { rate: 6.4, name: 'Libra', locale: 'en-GB', currency: 'GBP', img: './assets/libra.png' },
    bitcoin: { rate: 340000.0, name: 'Bitcoin', locale: 'en-US', currency: 'BTC', img: './assets/bitcoin.png' }
};

function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector('.input-currency').value);
    const currencyValueToConvert = document.querySelector('.currency-value-to-convert');
    const currencyValueConverted = document.querySelector('.currency-value');

    // Se o input estiver vazio ou não for número, define como 0
    const valueToConvert = isNaN(inputCurrencyValue) ? 0 : inputCurrencyValue;

    // Pegamos os objetos com as informações das moedas selecionadas
    const fromCurrency = currencies[currencySelectFrom.value];
    const toCurrency = currencies[currencySelectTo.value];

    // LÓGICA DE CONVERSÃO: 
    // 1. Transforma o valor de origem em Reais
    const valueInReal = valueToConvert * fromCurrency.rate;
    // 2. Divide o valor em Reais pela cotação da moeda de destino
    const finalConvertedValue = valueInReal / toCurrency.rate;

    // Formata o valor de ORIGEM
    currencyValueToConvert.innerHTML = new Intl.NumberFormat(fromCurrency.locale, {
        style: 'currency',
        currency: fromCurrency.currency,
        minimumFractionDigits: currencySelectFrom.value === 'bitcoin' ? 7 : 2
    }).format(valueToConvert);

    // Formata o valor de DESTINO
    currencyValueConverted.innerHTML = new Intl.NumberFormat(toCurrency.locale, {
        style: 'currency',
        currency: toCurrency.currency,
        minimumFractionDigits: currencySelectTo.value === 'bitcoin' ? 7 : 2
    }).format(finalConvertedValue);
}

function changeCurrenciesInfos() {
    // Atualiza imagem e nome da moeda de ORIGEM (Esquerda)
    const fromCurrency = currencies[currencySelectFrom.value];
    document.getElementById('currency-name-from').innerHTML = fromCurrency.name;
    document.querySelector('.currency-img-from').src = fromCurrency.img;

    // Atualiza imagem e nome da moeda de DESTINO (Direita)
    const toCurrency = currencies[currencySelectTo.value];
    document.getElementById('currency-name').innerHTML = toCurrency.name;
    document.querySelector('.currency-img').src = toCurrency.img;

    convertValues();
}

currencySelectFrom.addEventListener('change', changeCurrenciesInfos);
currencySelectTo.addEventListener('change', changeCurrenciesInfos);

convertButton.addEventListener('click', convertValues);