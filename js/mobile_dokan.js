const toggleSpinner = spinnerStyle => {
    document.getElementById('toggle-spinner').style.display = spinnerStyle;
};

const findPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    toggleSpinner('block');

    loadPhoneData(searchText);
};

const loadPhoneData = data => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${data}`;
    fetch(url)
        .then(responses => responses.json())
        .then(value => displaySearchResult(value.data));
};

const displaySearchResult = phones => {
    if (phones.length == 0) {
        const displayError = document.getElementById('display-error');
        displayError.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
            <h1 class="text-danger text-center fw-bold fs-1">Sorry, No Result Found</h1>
        `;
        toggleSpinner('none');
        displayError.appendChild(div);
    } else {
        const displayResult = document.getElementById('display-result');
        displayResult.textContent = '';
        // console.log(phones);
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
            </div>
        `;
            toggleSpinner('none');
            displayResult.appendChild(div);
        });
    }
};