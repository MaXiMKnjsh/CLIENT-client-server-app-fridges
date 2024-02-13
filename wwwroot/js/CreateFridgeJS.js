function changeClass(button) {
    if (button.classList.contains('btn-secondary')) {
        button.classList.remove('btn-secondary');
        button.classList.add('btn-success');
    }
    else {
        button.classList.remove('btn-success');
        button.classList.add('btn-secondary');
    }
}