const buttonAddInfo = document.querySelector('#button-add-info');
const blockContainInfo = document.querySelector('#block-contain-info');
const submitButton = document.querySelector('#submit');

const handleClickRemoveInfo = (e) => {
    e.preventDefault();

    const buttonRemove = e.target;
    const blockInputInfo = buttonRemove.closest('.block-input-info');
    blockInputInfo.remove();
};

const handleAddInfoInput = (e) => {
    e.preventDefault();

    const blockInputInfo = document.createElement('div');
    const inputInfo = document.createElement('input');
    const buttonRemove = document.createElement('button');
    const icon = document.createElement('i');

    icon.classList.add('fa', 'fa-close');
    buttonRemove.classList.add('remove-info');
    inputInfo.classList.add('flex-1', 'input-info');
    inputInfo.setAttribute('type', 'text');
    blockInputInfo.classList.add('container', 'flex-row', 'block-input-info');

    buttonRemove.addEventListener('click', handleClickRemoveInfo);

    buttonRemove.appendChild(icon);
    blockInputInfo.appendChild(inputInfo);
    blockInputInfo.appendChild(buttonRemove);

    blockContainInfo.appendChild(blockInputInfo);
    inputInfo.focus();
};

window.addEventListener('load', handleAddInfoInput);

buttonAddInfo.addEventListener('click', handleAddInfoInput);
submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    /** @type {HTMLInputElement[]} */
    const inputInfos = document.querySelectorAll('.input-info');

    const infoArr = [];
    for (const inputInfo of inputInfos) {
        const value = inputInfo.value;

        infoArr.push(value);
    }

    localStorage.setItem('info-search', JSON.stringify(infoArr));

    // TODO: Add notice before redirect

    const href = window.location.origin + '/result?q=' + infoArr.join(',');
    window.location.replace(href);
});

// TODO: Add Press Enter Listen
