let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;

const timeDisplay = document.getElementById("time-display");
const startPauseBtn = document.getElementById("start-pause-btn");
const lapBtn = document.getElementById("lap-btn");
const resetBtn = document.getElementById("reset-btn");
const lapTimesList = document.getElementById("lap-times");


function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const milliseconds = String(ms % 1000).padStart(3, "0").slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}


function updateTime() {
    timeDisplay.textContent = formatTime(elapsedTime);
}


startPauseBtn.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseBtn.textContent = "Start";
        lapBtn.disabled = true;  
    } else {
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateTime();
        }, 10);
        startPauseBtn.textContent = "Pause";
        lapBtn.disabled = false;  
    }
    isRunning = !isRunning;
    resetBtn.disabled = false;  
});


lapBtn.addEventListener("click", () => {
    lapCount++;
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapTimesList.appendChild(lapItem);
});


resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    lapCount = 0;
    updateTime();
    startPauseBtn.textContent = "Start";
    lapBtn.disabled = true;  
    resetBtn.disabled = true;  
    lapTimesList.innerHTML = "";  
});

updateTime();
