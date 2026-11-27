let timer = null;
let messageTimer = null;
let seconds = 30;
let progress = 0;
let soundEnabled = true;

const scanSound = document.getElementById("scanSound");
const soundToggle = document.getElementById("soundToggle");

document.getElementById("openInvitation").addEventListener("click", startPrank);

async function startPrank() {
    document.getElementById("invitation").style.display = "none";
    document.getElementById("hackerScreen").style.display = "block";

    // Audio playback is started by this click, which is permitted by browsers.
    if (soundEnabled) {
        try {
            scanSound.currentTime = 0;
            await scanSound.play();
        } catch (error) {
            // The simulation still works if the browser blocks or cannot decode audio.
            soundToggle.textContent = "🔇 Sound unavailable — tap to retry";
        }
    }

    const messages = [
        ">> Initializing mobile scan simulation...",
        ">> Connecting to visual scanner...",
        ">> Analyzing simulated device...",
        ">> Running security animation...",
        ">> Scanning process in progress...",
        ">> Simulation almost completed..."
    ];

    let index = 0;
    const messageBox = document.getElementById("messages");
    messageBox.innerHTML = "";

    messageTimer = setInterval(() => {
        if (index < messages.length) {
            const line = document.createElement("p");
            line.textContent = messages[index];
            messageBox.appendChild(line);
            index++;
        } else {
            clearInterval(messageTimer);
        }
    }, 3000);

    timer = setInterval(() => {
        seconds--;
        progress = ((30 - seconds) / 30) * 100;

        document.getElementById("progress").textContent =
            Math.min(100, Math.floor(progress)) + "%";
        document.getElementById("progressFill").style.width =
            Math.min(100, progress) + "%";

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        document.getElementById("countdown").textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(remainingSeconds).padStart(2, "0");

        if (seconds <= 0) {
            clearInterval(timer);
            clearInterval(messageTimer);
            scanSound.pause();
            scanSound.currentTime = 0;

            document.getElementById("progress").textContent = "100%";
            document.getElementById("progressFill").style.width = "100%";
            document.getElementById("finalMessage").innerHTML =
                "<h1 class='reveal-title'>GOT YOU! 🎉<br>HAPPY BIRTHDAY SHREE!</h1>" +
                "<p class='reveal-note'>No phone was hacked. It was only a birthday surprise!</p>";
        }
    }, 1000);
}


