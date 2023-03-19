const buttonAddInfo = document.querySelector('#button-add-info');
const blockContainInfo = document.querySelector('#block-contain-info');

buttonAddInfo.addEventListener('click', (e) => {
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

    buttonRemove.appendChild(icon);
    blockInputInfo.appendChild(inputInfo);
    blockInputInfo.appendChild(buttonRemove);

    blockContainInfo.appendChild(blockInputInfo);
    inputInfo.focus();
});
