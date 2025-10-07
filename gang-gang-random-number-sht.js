document.addEventListener("DOMContentLoaded", () => {
    const numbers = [
        document.getElementById("gang-gang-1"),
        document.getElementById("gang-gang-2"),
        document.getElementById("gang-gang-3"),
        document.getElementById("gang-gang-4"),
        document.getElementById("gang-gang-5"),
        document.getElementById("gang-gang-6")
    ];

    const button = document.querySelector("button");
    let rolling = false;

    // Helper to get a random number based on position
    function getRandomNum(index) {
        if (index === 0) return Math.floor(Math.random() * 2); // 0-1
        if (index === 5) return 0; // last number always 0
        return Math.floor(Math.random() * 10); // 0-9
    }

    // Jackpot animation
    function rollNumbers() {
        if (rolling) return; // Prevent spam clicks
        rolling = true;
        button.disabled = true;

        numbers.forEach((numEl, i) => {
            let count = 0;
            const speed = 50 + i * 10; // staggered delay for each number
            const interval = setInterval(() => {
                numEl.textContent = Math.floor(Math.random() * 10);
                count++;
                if (count > 20 + i * 2) {
                    clearInterval(interval);
                    numEl.textContent = getRandomNum(i);
                    numEl.classList.add("animate");
                    setTimeout(() => numEl.classList.remove("animate"), 300);
                    if (i === numbers.length - 1) {
                        rolling = false;
                        button.disabled = false;
                        confettiExplosion(); 
                    }
                }
            }, speed);
        });
    }
    function confettiExplosion() {
        const confettiContainer = document.getElementById("confetti-container");
        if (!confettiContainer) return;

        const colors = ["#ff0", "#ff6a00", "#ff00f7", "#00eaff", "#fff200", "#ff4d4d"];
        const total = 200;

        for (let i = 0; i < total; i++) {
            const confetti = document.createElement("div");
            confetti.classList.add("confetti");
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + "%";
            confetti.style.animationDelay = Math.random() * 0.8 + "s";
            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000); // cleanup
        }

        // Add background glow animation
        document.body.classList.add("jackpot-mode");
        setTimeout(() => document.body.classList.remove("jackpot-mode"), 3000);
    }

    // Animate the button like a jackpot lever
    button.addEventListener("click", () => {
        button.classList.add("pulling");
        rollNumbers();
        setTimeout(() => {
            button.classList.remove("pulling");
            button.classList.add("released");
            setTimeout(() => button.classList.remove("released"), 300);
        }, 400);
    });
});