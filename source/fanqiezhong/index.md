---
title: 兔子钟
date: 2024-01-01 00:00:00
comments: false
top_img: https://imgs.luckynwa.top/profile/yys/1.webp
---

{% raw %}

<div class="pomodoro-wrap">
  <div class="pomodoro-box">
    <div class="bunny-ear bunny-ear-left"></div>
    <div class="bunny-ear bunny-ear-right"></div>
    <div class="timer-circle">
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#eee" stroke-width="4"/>
        <circle id="progressRing" cx="60" cy="60" r="54" fill="none" stroke="#ff69b4" stroke-width="4" stroke-linecap="round" stroke-dasharray="339.29" stroke-dashoffset="0"/>
      </svg>
      <div class="timer-text">
        <span id="timeDisplay">25:00</span>
        <small id="modeText">专注模式</small>
      </div>
    </div>

    <div class="btn-group">
      <button id="actionBtn" class="btn-primary" onclick="toggleTimer()">开始</button>
      <button class="btn-secondary" onclick="resetTimer()">重置</button>
    </div>

    <div class="tab-group">
      <button class="tab active" onclick="switchMode('work', this)">专注 25分</button>
      <button class="tab" onclick="switchMode('short', this)">短休 5分</button>
      <button class="tab" onclick="switchMode('long', this)">长休 15分</button>
    </div>

    <div class="count-box">
      今日完成 <span id="countNum">0</span> 个兔子
    </div>
  </div>
</div>

<style>
  .pomodoro-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 480px);
    max-height: 520px;
  }

  .pomodoro-box {
    background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%);
    border-radius: 50% 50% 40% 40%;
    padding: 100px 48px 80px;
    box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 15px 40px rgba(255,105,180,0.2);
    width: 888px;
    text-align: center;
    position: relative;
    transform: translateY(-8px);
  }

  .bunny-ear {
    position: absolute;
    width: 80px;
    height: 180px;
    background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%);
    border-radius: 50% 50% 40% 40%;
    top: -140px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  }

  .bunny-ear::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 120px;
    background: #ff69b4;
    border-radius: 50%;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }

  .bunny-ear-left {
    left: 200px;
    transform: rotate(-15deg);
  }

  .bunny-ear-right {
    right: 200px;
    transform: rotate(15deg);
  }

  .timer-circle {
    position: relative;
    width: 160px;
    height: 160px;
    margin: 0 auto 24px;
  }

  .timer-circle svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  #progressRing {
    transition: stroke-dashoffset 1s linear;
  }

  .timer-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  #timeDisplay {
    display: block;
    font-size: 2.4em;
    font-weight: 600;
    color: #ff69b4;
    font-variant-numeric: tabular-nums;
  }

  #modeText {
    display: block;
    color: rgba(255,255,255,0.5);
    font-size: 12px;
    margin-top: 4px;
  }

  .btn-group {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .btn-primary {
    flex: 1;
    padding: 9px 0;
    border: none;
    border-radius: 8px;
    background: #ff69b4;
    color: #1a1a1a;
    font-size: 13px;
    cursor: pointer;
    font-weight: 600;
  }

  .btn-primary:hover {
    background: #ff85c8;
  }

  .btn-secondary {
    padding: 9px 18px;
    border: 1px solid #ff69b4;
    border-radius: 8px;
    background: transparent;
    color: #ff69b4;
    font-size: 13px;
    cursor: pointer;
  }

  .btn-secondary:hover {
    background: rgba(255,105,180,0.15);
  }

  .tab-group {
    display: flex;
    gap: 6px;
    margin-bottom: 16px;
  }

  .tab {
    flex: 1;
    padding: 7px 0;
    border: 1px solid #ff69b4;
    border-radius: 6px;
    background: transparent;
    color: #ff69b4;
    font-size: 12px;
    cursor: pointer;
  }

  .tab.active {
    background: #ff69b4;
    border-color: #ff69b4;
    color: #1a1a1a;
  }

  .count-box {
    padding-top: 12px;
    border-top: 1px solid rgba(255,105,180,0.3);
    color: rgba(255,255,255,0.6);
    font-size: 12px;
  }

  #countNum {
    color: #ff69b4;
    font-weight: 600;
  }
</style>

<script>
  let timeLeft = 25 * 60;
  let totalTime = 25 * 60;
  let timer = null;
  let isRunning = false;
  let count = 0;

  const timeDisplay = document.getElementById('timeDisplay');
  const modeText = document.getElementById('modeText');
  const actionBtn = document.getElementById('actionBtn');
  const progressRing = document.getElementById('progressRing');
  const countNum = document.getElementById('countNum');
  const circumference = 2 * Math.PI * 54;

  progressRing.style.strokeDasharray = circumference;

  function update() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    timeDisplay.textContent = m.toString().padStart(2,'0') + ':' + s.toString().padStart(2,'0');
    progressRing.style.strokeDashoffset = circumference * (1 - timeLeft / totalTime);
  }

  function toggleTimer() {
    if (isRunning) {
      clearInterval(timer);
      isRunning = false;
      actionBtn.textContent = '继续';
    } else {
      isRunning = true;
      actionBtn.textContent = '暂停';
      timer = setInterval(() => {
        timeLeft--;
        update();
        if (timeLeft <= 0) {
          clearInterval(timer);
          isRunning = false;
          actionBtn.textContent = '开始';
          if (document.querySelector('.tab.active').onclick.toString().includes('work')) {
            count++;
            countNum.textContent = count;
          }
          alert('时间到！');
        }
      }, 1000);
    }
  }

  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    actionBtn.textContent = '开始';
    const mode = document.querySelector('.tab.active').onclick.toString();
    if (mode.includes('work')) timeLeft = 25 * 60;
    else if (mode.includes('short')) timeLeft = 5 * 60;
    else timeLeft = 15 * 60;
    totalTime = timeLeft;
    update();
  }

  function switchMode(mode, el) {
    clearInterval(timer);
    isRunning = false;
    actionBtn.textContent = '开始';
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    if (mode === 'work') { timeLeft = 25*60; totalTime = 25*60; modeText.textContent = '专注模式'; }
    else if (mode === 'short') { timeLeft = 5*60; totalTime = 5*60; modeText.textContent = '短休模式'; }
    else { timeLeft = 15*60; totalTime = 15*60; modeText.textContent = '长休模式'; }
    update();
  }

  update();
</script>

{% endraw %}
