// ==> toggle spinner
const toggleSpinner = spinnerStyle => {
    document.getElementById('toggle-spinner').style.display = spinnerStyle;
};

// ==> search button click event
const findPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    toggleSpinner('block');

    loadPhoneData(searchText);
};

// ==> load all data according to user search value
const loadPhoneData = data => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${data}`;
    fetch(url)
        .then(responses => responses.json())
        .then(value => displaySearchResult(value.data));
};

// ==> display loaded data
const displaySearchResult = phones => {
    if (phones.length !== 0) {
        const displayError = document.getElementById('display-error');
        displayError.textContent = '';
        const displayDetail = document.getElementById('display-detail');
        displayDetail.textContent = '';
        const displayResult = document.getElementById('display-result');
        displayResult.textContent = '';
        // console.log(phones);
        phones.slice(0, 20).forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card align-items-center shadow p-3 mb-5 bg-body rounded"">
                    <img src="${phone.image}" class="card-img-top w-50 mt-2" alt="${phone.phone_name}">
                    <div class="card-body d-flex flex-column align-items-center">
                        <h5 class="card-title">Device: ${phone.phone_name}</h5>
                        <p class="card-text fw-bold fs-5">Brand: ${phone.brand}</p>
                        <button onclick="showDetail('${phone.slug}')" class="btn btn-success">Show Details</button>
                    </div>
                </div>
            `;
            toggleSpinner('none');
            displayResult.appendChild(div);
        });
    } else {
        const displayResult = document.getElementById('display-result');
        displayResult.textContent = '';
        const displayDetail = document.getElementById('display-detail');
        displayDetail.textContent = '';
        const displayError = document.getElementById('display-error');
        displayError.textContent = '';
        displayError.innerHTML = `
            <h1 class="text-danger text-center fw-bold fs-1">Sorry, No Phone Found</h1>
        `;
        toggleSpinner('none');
    }
};

// ==> load specific phone details
const showDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(responses => responses.json())
        .then(value => displayDetails(value.data));
};

// ==> display phone details
const displayDetails = detail => {
    const displayDetail = document.getElementById('display-detail');
    displayDetail.textContent = '';
    // console.log(detail);

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${detail.image}" class="card-img-top w-75 mx-auto mt-2" alt="...">
        <div class="card-body">
            <h6 class="card-text">Device: <span class="fw-normal">${detail.name}</span></h6>
            <h6 class="card-title">Release Date: <span class="fw-normal">${detail.releaseDate !== '' ? detail.releaseDate : '<span class="text-danger">Sorry, release date details not available.</span>'}</span></h6>
            <h6 class="card-text">Chipset: <span class="fw-normal">${detail.mainFeatures.chipSet === undefined ? '<span class="text-danger">Sorry, chipset details not available.</span>' : detail.mainFeatures.chipSet}</span></h6>
            <h6 class="card-text">Storage: <span class="fw-normal">${detail.mainFeatures.storage}</span></h6>
            <h6 class="card-text">Memory: <span class="fw-normal">${detail.mainFeatures.memory}</span></h6>
            <h6 class="card-text">Display: <span class="fw-normal">${detail.mainFeatures.displaySize}</span></h6>
            <h6 class="card-text">Bluetooth: <span class="fw-normal">${detail.others === undefined ? '<span class="text-danger">Sorry, details not found.</span>' : detail.others.Bluetooth}</span></h6>
            <h6 class="card-text">GPS: <span class="fw-normal">${detail.others === undefined ? '<span class="text-danger">Sorry, details not found.</span>' : detail.others.GPS}</span></h6>
            <h6 class="card-text">NFC: <span class="fw-normal">${detail.others === undefined ? '<span class="text-danger">Sorry, details not found.</span>' : detail.others.NFC}</span></h6>
            <h6 class="card-text">Radio: <span class="fw-normal">${detail.others === undefined ? '<span class="text-danger">Sorry, details not found.</span>' : detail.others.Radio}</span></h6>
            <h6 class="card-text">USB: <span class="fw-normal">${detail.others === undefined ? '<span class="text-danger">Sorry, details not found.</span>' : detail.others.USB}</span></h6>
            <h6 class="card-text">WLAN: <span class="fw-normal">${detail.others === undefined ? '<span class="text-danger">Sorry, details not found.</span>' : detail.others.WLAN}</h6>
            <h6 class="card-text">Sensors: <span class="fw-normal">${detail.mainFeatures.sensors}</span></h6>            
        </div>
    `;
    displayDetail.appendChild(div);
};