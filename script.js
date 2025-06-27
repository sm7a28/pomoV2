let timer;
let isRunning = false;
let currentMode = 'work';
let remainingTime = 25 * 60; // 25分
let workTime = 25 * 60;
let breakTime = 5 * 60;

// DOM要素の取得
const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const statusText = document.getElementById('statusText');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');

// 時間表示の更新
function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// タイマーメイン処理
function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = true;

    timer = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateDisplay();
        } else {
            // タイムアップ
            clearInterval(timer);
            isRunning = false;
            startBtn.disabled = false;
            stopBtn.disabled = true;
            resetBtn.disabled = false;
            
            // モードの切り替え
            if (currentMode === 'work') {
                currentMode = 'break';
                remainingTime = breakTime;
                statusText.textContent = '休憩時間';
                timeDisplay.style.color = '#e74c3c';
            } else {
                currentMode = 'work';
                remainingTime = workTime;
                statusText.textContent = '作業時間';
                timeDisplay.style.color = '#2ecc71';
            }
            
            // ビープ音
            const audio = new Audio();
            audio.src = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU';
            audio.play();
        }
    }, 1000);
}

// タイマーの停止
function stopTimer() {
    if (!isRunning) return;
    
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
}

// タイマーのリセット
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
    
    if (currentMode === 'work') {
        remainingTime = workTime;
    } else {
        remainingTime = breakTime;
    }
    updateDisplay();
    timeDisplay.style.color = '#2ecc71';
    statusText.textContent = '作業時間';
}

// イベントリスナーの設定
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// 設定の変更
workTimeInput.addEventListener('change', () => {
    if (!isRunning) {
        workTime = parseInt(workTimeInput.value) * 60;
        if (currentMode === 'work') {
            remainingTime = workTime;
            updateDisplay();
        }
    }
});

breakTimeInput.addEventListener('change', () => {
    if (!isRunning) {
        breakTime = parseInt(breakTimeInput.value) * 60;
        if (currentMode === 'break') {
            remainingTime = breakTime;
            updateDisplay();
        }
    }
});

// 初期表示
updateDisplay();
