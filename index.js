document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let winMessageShown = false;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        this.textContent = this.dataset.card; // Reveals the emoji

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.card === secondCard.dataset.card;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();

        if (document.querySelectorAll('.card.flipped').length === cards.length) {
            showWinMessage();
        }
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = ''; // Hide the emoji
            secondCard.textContent = ''; // Hide the emoji

            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function showWinMessage() {
        if (!winMessageShown) {
            const winMessage = document.getElementById('win-message');
            winMessage.classList.remove('hidden');
            winMessage.style.color = 'rgb(39, 230, 39)';
            winMessage.style.display = 'flex';
            winMessage.style.flexDirection = 'column';
            winMessage.style.justifyContent = 'center';
            winMessage.style.alignItems = 'center';
            winMessage.style.fontSize = '5rem';
            winMessage.textContent = 'You win!';
            winMessageShown = true;
        }
    }

    cards.forEach(card => card.addEventListener('click', flipCard));

    // Randomize the sequence of cards
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
});
