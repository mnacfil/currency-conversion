const select = document.getElementById('drop-down');
const group1 = document.querySelector('.group-1 .currency-list');
const group2 = document.querySelector('.group-2 .currency-list');
const group3 = document.querySelector('.group-3 .currency-list');
const date = document.querySelector('.date');

const url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';

// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/eur.json

const givenCurrency = ['USD', 'EUR', 'AUD', 'CAD', 'CHF', 'NZD', 'BGN'];

const calculate = async (e) => {
    const baseValue = select.value;
    const response = await fetch(`${url}${baseValue}.json`);
    const rates = await response.json();
    date.textContent = rates.date;

    const currencyToConvert = givenCurrency.filter(item => item !== baseValue.toUpperCase());

    const keys = Object.keys(rates[baseValue]).filter(item => {
        return currencyToConvert.includes(item.toUpperCase());
    });
    const values = rates[baseValue];

    // wipe the value of group1, group2, group3
    group1.innerHTML = "";
    group2.innerHTML = "";
    group3.innerHTML = "";

    let count1 = 0;
    let count2 = 0;
    let count3 = 0;

    for(let i = 0; i < currencyToConvert.length; i++) {
        const para = document.createElement('p');
        const value = values[keys[i]];
        const key = keys[i];
        const paraTxtValue = `${baseValue}-${key}: ${value}`;
        if(value < 1) {
            count1++;
            para.textContent = paraTxtValue
            group1.appendChild(para);
        }
        else if (value >= 1 && value < 1.5) {
            count2++;
            para.textContent = paraTxtValue
            group2.appendChild(para);
        }
        else {
            count3++;
            para.textContent = paraTxtValue
            group3.appendChild(para);;
        }
    }

    const countHtml1 = document.createElement('p')
    const countHtml2 = document.createElement('p')
    const countHtml3 = document.createElement('p')
    countHtml1.textContent = `COUNT: ${count1}`;
    countHtml2.textContent = `COUNT: ${count2}`;
    countHtml3.textContent = `COUNT: ${count3}`;
    group1.appendChild(countHtml1);
    group2.appendChild(countHtml2);
    group3.appendChild(countHtml3);
}

select.addEventListener('change', calculate);

calculate();