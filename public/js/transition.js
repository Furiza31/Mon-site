let links = document.querySelectorAll('a');
let transitionOut = document.getElementById('transitionOut');

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        transitionOut.style.height = "100%";
        setTimeout(() => {
            window.location.href = link.href;
        }, 1000);
    });
});