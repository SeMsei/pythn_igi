const cards = document.getElementsByClassName("worker");
    console.log(cards);

    for (var i = 0; i < cards.length; i++) {
        const details =  document.getElementsByClassName("worker")[i].querySelector('.worker-details');

        document.getElementsByClassName("worker")[i].addEventListener('mouseenter', () => {
        details.style.opacity = '1';
        });

        document.getElementsByClassName("worker")[i].addEventListener('mouseleave', () => {
            details.style.opacity = '0';
        });
    }