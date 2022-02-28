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
            <h1 class="text-danger text-center fw-bold fs-1">Sorry, No Phone Found</h1>
        `;
        toggleSpinner('none');
        displayError.appendChild(div);
    } else {
        const displayResult = document.getElementById('display-result');
        displayResult.textContent = '';
        const displayDetail = document.getElementById('display-detail');
        displayDetail.textContent = '';
        // console.log(phones);
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
                <div class="card-body">
                    <h5 class="card-title">Phone: ${phone.phone_name}</h5>
                    <p class="card-text fw-bold fs-5">Brand: ${phone.brand}</p>
                    <button onclick="showDetail('${phone.slug}')" class="btn btn-success">Show Details</button>
                </div>
            </div>
        `;
            toggleSpinner('none');
            displayResult.appendChild(div);
        });
    }
};

const showDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(responses => responses.json())
        .then(value => displayDetails(value.data));
};

const displayDetails = detail => {
    const displayDetail = document.getElementById('display-detail');
    displayDetail.textContent = '';
    // console.log(detail);

    const div = document.createElement('div');
    div.classList.add('card');
    if (detail.releaseDate == "") {
        div.innerHTML = `
            <img src="${detail.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h6 class="card-title">Release Date: <span class="text-danger">Sorry, release date details not available.</span></h6>
                <h6 class="card-text">Chipset: <span class="fw-normal">${detail.mainFeatures.chipSet}</span></h6>
                <h6 class="card-text">Storage: <span class="fw-normal">${detail.mainFeatures.storage}</span></h6>
                <h6 class="card-text">Display: <span class="fw-normal">${detail.mainFeatures.displaySize}</span></h6>
            </div>
        `;
    } else {
        div.innerHTML = `
            <img src="${detail.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h6 class="card-title">Release Date: <span class="fw-normal">${detail.releaseDate}</span></h6>
                <h6 class="card-text">Chipset: <span class="fw-normal">${detail.mainFeatures.chipSet}</span></h6>
                <h6 class="card-text">Storage: <span class="fw-normal">${detail.mainFeatures.storage}</span></h6>
                <h6 class="card-text">Display: <span class="fw-normal">${detail.mainFeatures.displaySize}</span></h6>
            </div>
        `;
    }
    displayDetail.appendChild(div);
};