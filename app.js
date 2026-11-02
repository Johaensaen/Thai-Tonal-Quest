// --- PWA Setup ---
const manifestData = {
    name: "Thai Tonal Quest",
    short_name: "ThaiQuest",
    start_url: window.location.href,
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [{ src: "https://via.placeholder.com/192.png?text=🇹🇭", sizes: "192x192", type: "image/png" }]
};
document.getElementById('pwa-manifest').href = URL.createObjectURL(new Blob([JSON.stringify(manifestData)], {type: 'application/json'}));

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swCode = `self.addEventListener('fetch', (e) => {});`;
        navigator.serviceWorker.register(URL.createObjectURL(new Blob([swCode], {type: 'text/javascript'}))).catch(() => {});
    });
}

// --- Web Audio API Synthesizer (Retro & Clean Soundeffekte) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'correct') {
        // Fröhlicher, aufsteigender Erfolgston (Ping-Ping!)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
    } 
    else if (type === 'wrong') {
        // Tiefer Fehler-Ton (Bop)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(120, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
    } 
    else if (type === 'complete') {
        // Epischer Lektions-Triumph Jingle (Tadaa!)
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, index) => {
            const subOsc = audioCtx.createOscillator();
            const subGain = audioCtx.createGain();
            subOsc.connect(subGain);
            subGain.connect(audioCtx.destination);
            
            subOsc.type = 'triangle';
            subOsc.frequency.setValueAtTime(freq, now + index * 0.1);
            subGain.gain.setValueAtTime(0.2, now + index * 0.1);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.1 + 0.4);
            
            subOsc.start(now + index * 0.1);
            subOsc.stop(now + index * 0.1 + 0.4);
        });
    }
}

// --- App Status & Variablen ---
let xp = parseInt(localStorage.getItem('thai_quest_xp')) || 0;
let streak = parseInt(localStorage.getItem('thai_quest_streak')) || 1;

let currentTrainIndex = null;
let currentExamIndex = null;
let currentMixIndex = null;
let trainPoints = [], trainCanvas, trainCtx, trainSnapped = false;
let examPoints = [], examCanvas, examCtx;

const toneSymbols = { 0: "➡️", 1: "↘️", 2: "📉", 3: "📈", 4: "🚀" };

function playAudio(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
}

function updateHUD() {
    document.getElementById('xp-count').innerText = xp;
    document.getElementById('streak-count').innerText = streak;
    document.getElementById('level-num').innerText = Math.floor(xp / 50) + 1;
    localStorage.setItem('thai_quest_xp', xp);
    localStorage.setItem('thai_quest_streak', streak);
}

function switchTab(tab) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('section-mix').classList.add('hidden');
    document.getElementById('section-train').classList.add('hidden');
    document.getElementById('section-exam').classList.add('hidden');
    document.getElementById('section-lessons').classList.add('hidden');
    document.getElementById('section-add').classList.add('hidden');

    if(tab === 'mix') {
        document.querySelector('[onclick="switchTab(\'mix\')"]').classList.add('active');
        document.getElementById('section-mix').classList.remove('hidden');
        document.getElementById('mode-subtitle').innerText = "🎲 Duolingo-Mix (Zufällige Aufgabentypen)";
        loadRandomMixMission();
    } else if(tab === 'train') {
        document.querySelector('[onclick="switchTab(\'train\')"]').classList.add('active');
        document.getElementById('section-train').classList.remove('hidden');
        document.getElementById('mode-subtitle').innerText = "🏋️ Trainingsmodus (Mit magnetischer Anleitung)";
        loadTrainCard();
    } else if(tab === 'exam') {
        document.querySelector('[onclick="switchTab(\'exam\')"]').classList.add('active');
        document.getElementById('section-exam').classList.remove('hidden');
        document.getElementById('mode-subtitle').innerText = "🎓 Prüfungsmodus (Keine Hilfslinie - Aus dem Kopf!)";
        loadExamCard();
    } else if(tab === 'lessons') {
        document.querySelector('[onclick="switchTab(\'lessons\')"]').classList.add('active');
        document.getElementById('section-lessons').classList.remove('hidden');
        document.getElementById('mode-subtitle').innerText = "Lernpakete & Lektionen";
        renderLessons();
    } else if(tab === 'add') {
        document.querySelector('[onclick="switchTab(\'add\')"]').classList.add('active');
        document.getElementById('section-add').classList.remove('hidden');
        document.getElementById('mode-subtitle').innerText = "Neues Wort hinzufügen";
    }
}

// ==================== MIX-QUEST (ZUFÄLLIGE AUFGABEN) ====================
function loadRandomMixMission() {
    updateHUD();
    if (!vocabs || vocabs.length === 0) {
        document.getElementById('card-content-mix').innerHTML = "<p>Keine Vokabeln vorhanden.</p>";
        return;
    }

    const missionTypes = ['train_canvas', 'exam_canvas', 'audio_mc', 'tone_match'];
    const chosenType = missionTypes[Math.floor(Math.random() * missionTypes.length)];

    currentMixIndex = Math.floor(Math.random() * vocabs.length);
    const v = vocabs[currentMixIndex];

    if (chosenType === 'train_canvas') {
        renderMixTrainCanvas(v);
    } else if (chosenType === 'exam_canvas') {
        renderMixExamCanvas(v);
    } else if (chosenType === 'audio_mc') {
        renderMixAudioMC(v);
    } else if (chosenType === 'tone_match') {
        renderMixToneMatch(v);
    }
}

function renderMixTrainCanvas(v) {
    setTimeout(() => playAudio(v.thai), 300);
    const container = document.getElementById('card-content-mix');
    container.innerHTML = `
        <div style="font-size: 0.8rem; color: var(--accent); text-transform: uppercase;">✨ Mix: Tonkurve nachzeichnen</div>
        <div class="word-row">
            <div class="thai-word">${v.thai}</div>
            <button class="audio-btn" onclick="playAudio('${v.thai}')">🔊</button>
        </div>
        <div class="translit">${v.translit}</div>
        <div class="meaning">${v.meaning}</div>
        <div class="canvas-container">
            <div class="canvas-hint">Magnetische Vorlage ✍️</div>
            <canvas id="mixTrainCanvas"></canvas>
        </div>
        <div class="btn-group">
            <button class="action-btn" onclick="loadRandomMixMission()">Überspringen</button>
            <button class="action-btn btn-primary" onclick="resolveMixMission(15, true)">Richtig ➔</button>
        </div>
    `;
    setupMixCanvas('mixTrainCanvas', v.tone, true);
}

function renderMixExamCanvas(v) {
    setTimeout(() => playAudio(v.thai), 300);
    const container = document.getElementById('card-content-mix');
    container.innerHTML = `
        <div style="font-size: 0.8rem; color: #ef4444; text-transform: uppercase;">🧠 Mix: Freies Gedächtnis-Zeichnen</div>
        <div class="word-row">
            <div class="thai-word">${v.thai}</div>
            <button class="audio-btn" onclick="playAudio('${v.thai}')">🔊</button>
        </div>
        <div class="translit">${v.translit}</div>
        <div class="meaning">${v.meaning}</div>
        <div class="canvas-container" style="border-color: #ef4444;">
            <div class="canvas-hint" style="color: #ef4444;">Aus dem Kopf zeichnen!</div>
            <canvas id="mixExamCanvas"></canvas>
        </div>
        <div class="btn-group">
            <button class="action-btn" onclick="loadRandomMixMission()">Überspringen</button>
            <button class="action-btn btn-primary" onclick="resolveMixMission(25, true)" style="background: #ef4444;">Einreichen ➔</button>
        </div>
    `;
    setupMixCanvas('mixExamCanvas', v.tone, false);
}

function renderMixAudioMC(v) {
    setTimeout(() => playAudio(v.thai), 400);
    
    let options = [v.meaning];
    while(options.length < 4 && options.length < vocabs.length) {
        let randMeaning = vocabs[Math.floor(Math.random() * vocabs.length)].meaning;
        if(!options.includes(randMeaning)) options.push(randMeaning);
    }
    options.sort(() => Math.random() - 0.5);

    let htmlOptions = '';
    options.forEach(opt => {
        let correctCheck = (opt === v.meaning) ? "true" : "false";
        htmlOptions += `<button class="action-btn" style="background:#283548; margin-bottom:8px;" onclick="checkAudioMC(${correctCheck})">${opt}</button>`;
    });

    const container = document.getElementById('card-content-mix');
    container.innerHTML = `
        <div style="font-size: 0.8rem; color: var(--xp); text-transform: uppercase;">👂 Mix: Was bedeutet dieses Wort?</div>
        <div class="word-row" style="margin: 20px 0;">
            <button class="audio-btn" style="width:70px; height:70px; font-size:1.8rem;" onclick="playAudio('${v.thai}')">🔊</button>
        </div>
        <div class="translit">${v.translit}</div>
        <div style="display:flex; flex-direction:column; margin-top:15px;">
            ${htmlOptions}
        </div>
    `;
}

function checkAudioMC(isCorrect) {
    if(isCorrect) {
        xp += 10;
        playSound('correct');
        alert("Richtig gehört! 🎉 +10 XP");
    } else {
        playSound('wrong');
        alert("Leider falsch! 💡");
    }
    loadRandomMixMission();
}

function renderMixToneMatch(v) {
    let options = [v.tone];
    while(options.length < 4) {
        let randTone = Math.floor(Math.random() * 5);
        if(!options.includes(randTone)) options.push(randTone);
    }
    options.sort(() => Math.random() - 0.5);

    let htmlOptions = '';
    options.forEach(t => {
        htmlOptions += `<button class="action-btn" style="background:#283548; font-size:1.2rem;" onclick="checkToneMatch(${t}, ${v.tone})">${toneSymbols[t]} ${toneDetails[t].name.split(' ')[0]}</button>`;
    });

    const container = document.getElementById('card-content-mix');
    container.innerHTML = `
        <div style="font-size: 0.8rem; color: var(--streak); text-transform: uppercase;">🎯 Mix: Welcher Ton gehört dazu?</div>
        <div class="thai-word" style="margin: 15px 0;">${v.thai}</div>
        <div class="translit">${v.translit}</div>
        <div class="meaning">${v.meaning}</div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:15px;">
            ${htmlOptions}
        </div>
    `;
}

function checkToneMatch(selected, correct) {
    if(selected === correct) {
        xp += 15;
        playSound('correct');
        playAudio(vocabs[currentMixIndex].thai);
        alert("Perfekt zugeordnet! 🎉 +15 XP");
    } else {
        playSound('wrong');
        alert(`Falsch! Richtig war: ${toneDetails[correct].name}`);
    }
    loadRandomMixMission();
}

function resolveMixMission(rewardXP, playSnd) {
    if(playSnd && vocabs[currentMixIndex]) {
        playAudio(vocabs[currentMixIndex].thai);
    }
    playSound('correct');
    xp += rewardXP;
    loadRandomMixMission();
}

function setupMixCanvas(canvasId, tone, hasGhost) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    let points = [];
    let isDrawing = false;

    if(hasGhost) drawGhost(ctx, canvas, tone);

    const getCoord = (e) => {
        const rect = canvas.getBoundingClientRect();
        return { x: (e.clientX || e.touches[0].clientX) - rect.left, y: (e.clientY || e.touches[0].clientY) - rect.top };
    };

    canvas.onmousedown = (e) => { isDrawing = true; points = [getCoord(e)]; };
    canvas.onmousemove = (e) => {
        if(!isDrawing) return;
        points.push(getCoord(e));
        redrawCanvas(ctx, canvas, points, tone, hasGhost, false);
    };
    canvas.onmouseup = () => {
        if(!isDrawing) return;
        isDrawing = false;
        if(hasGhost && points.length > 3) {
            drawPerfectCurve(ctx, canvas, tone);
            playAudio(vocabs[currentMixIndex].thai);
        }
    };

    canvas.ontouchstart = (e) => { isDrawing = true; points = [getCoord(e)]; e.preventDefault(); };
    canvas.ontouchmove = (e) => {
        if(!isDrawing) return;
        points.push(getCoord(e));
        redrawCanvas(ctx, canvas, points, tone, hasGhost, false);
        e.preventDefault();
    };
    canvas.ontouchend = () => {
        if(!isDrawing) return;
        isDrawing = false;
        if(hasGhost && points.length > 3) {
            drawPerfectCurve(ctx, canvas, tone);
            playAudio(vocabs[currentMixIndex].thai);
        }
    };
}

function redrawCanvas(ctx, canvas, points, tone, hasGhost, snapped) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(hasGhost) drawGhost(ctx, canvas, tone);
    if(points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for(let p of points) ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = snapped ? '#10b981' : '#38bdf8';
    ctx.lineWidth = 4;
    ctx.stroke();
}


// ==================== TRAINING MODUS ====================
function loadTrainCard() {
    updateHUD();
    const container = document.getElementById('card-content-train');
    if (!vocabs || vocabs.length === 0) { container.innerHTML = "<p>Keine Vokabeln.</p>"; return; }

    currentTrainIndex = Math.floor(Math.random() * vocabs.length);
    const v = vocabs[currentTrainIndex];
    trainSnapped = false;
    setTimeout(() => playAudio(v.thai), 300);

    container.innerHTML = `
        <div style="font-size: 0.8rem; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px;">🏋️ Training (Mit Ghost-Linie)</div>
        <div class="word-row">
            <div class="thai-word">${v.thai}</div>
            <button class="audio-btn" onclick="playAudio('${v.thai}')">🔊</button>
        </div>
        <div class="translit">${v.translit}</div>
        <div class="meaning">${v.meaning}</div>
        <div class="canvas-container">
            <div class="canvas-hint">Nachzeichnen (snapt ein) ✍️</div>
            <canvas id="trainCanvas"></canvas>
        </div>
        <div class="btn-group">
            <button class="action-btn" onclick="clearTrainCanvas()">Löschen</button>
            <button class="action-btn btn-primary" onclick="checkTrainDrawing()">Richtig ➔</button>
        </div>
    `;
    setupTrainCanvas();
}

function setupTrainCanvas() {
    trainCanvas = document.getElementById('trainCanvas');
    trainCtx = trainCanvas.getContext('2d');
    trainCanvas.width = trainCanvas.parentElement.clientWidth;
    trainCanvas.height = trainCanvas.parentElement.clientHeight;
    trainPoints = []; trainSnapped = false;

    const getCoord = (e) => {
        const rect = trainCanvas.getBoundingClientRect();
        return { x: (e.clientX || e.touches[0].clientX) - rect.left, y: (e.clientY || e.touches[0].clientY) - rect.top };
    };

    trainCanvas.onmousedown = (e) => { trainPoints = [getCoord(e)]; trainSnapped = false; redrawTrain(); };
    trainCanvas.onmousemove = (e) => { if(trainPoints.length) { trainPoints.push(getCoord(e)); redrawTrain(); } };
    trainCanvas.onmouseup = () => { if(trainPoints.length > 3) { drawPerfectCurve(trainCtx, trainCanvas, vocabs[currentTrainIndex].tone); trainSnapped = true; playAudio(vocabs[currentTrainIndex].thai); } };

    trainCanvas.ontouchstart = (e) => { trainPoints = [getCoord(e.touches[0])]; trainSnapped = false; redrawTrain(); e.preventDefault(); };
    trainCanvas.ontouchmove = (e) => { if(trainPoints.length) { trainPoints.push(getCoord(e.touches[0])); redrawTrain(); e.preventDefault(); } };
    trainCanvas.ontouchend = () => { if(trainPoints.length > 3) { drawPerfectCurve(trainCtx, trainCanvas, vocabs[currentTrainIndex].tone); trainSnapped = true; playAudio(vocabs[currentTrainIndex].thai); } };

    drawGhost(trainCtx, trainCanvas, vocabs[currentTrainIndex].tone);
}

function clearTrainCanvas() {
    trainPoints = []; trainSnapped = false;
    redrawTrain();
}

function redrawTrain() {
    trainCtx.clearRect(0, 0, trainCanvas.width, trainCanvas.height);
    drawGhost(trainCtx, trainCanvas, vocabs[currentTrainIndex].tone);
    if (trainPoints.length < 2) return;
    trainCtx.beginPath();
    trainCtx.moveTo(trainPoints[0].x, trainPoints[0].y);
    for(let p of trainPoints) trainCtx.lineTo(p.x, p.y);
    trainCtx.strokeStyle = trainSnapped ? '#10b981' : '#38bdf8';
    trainCtx.lineWidth = 4; trainCtx.stroke();
}

function checkTrainDrawing() {
    if (!trainSnapped && trainPoints.length < 3) { 
        playSound('wrong');
        alert("Bitte Kurve einzeichnen!"); 
        return; 
    }
    playSound('correct');
    xp += 10;
    loadTrainCard();
}

// ==================== PRÜFUNGS MODUS ====================
function loadExamCard() {
    updateHUD();
    const container = document.getElementById('card-content-exam');
    if (!vocabs || vocabs.length === 0) { container.innerHTML = "<p>Keine Vokabeln.</p>"; return; }

    currentExamIndex = Math.floor(Math.random() * vocabs.length);
    const v = vocabs[currentExamIndex];
    setTimeout(() => playAudio(v.thai), 300);

    container.innerHTML = `
        <div style="font-size: 0.8rem; color: #ef4444; text-transform: uppercase; letter-spacing: 1px;">🎓 Prüfung (Aus dem Gedächtnis!)</div>
        <div class="word-row">
            <div class="thai-word">${v.thai}</div>
            <button class="audio-btn" onclick="playAudio('${v.thai}')">🔊</button>
        </div>
        <div class="translit">${v.translit}</div>
        <div class="meaning">${v.meaning}</div>
        <div class="canvas-container" style="border-color: #ef4444;">
            <div class="canvas-hint" style="color: #ef4444;">Keine Hilfslinie – Zeichne frei! 🧠</div>
            <canvas id="examCanvas"></canvas>
        </div>
        <div class="btn-group">
            <button class="action-btn" onclick="clearExamCanvas()">Löschen</button>
            <button class="action-btn btn-primary" onclick="checkExamDrawing()" style="background: #ef4444; border-bottom-color: #b91c1c;">Einreichen ➔</button>
        </div>
    `;
    setupExamCanvas();
}

function setupExamCanvas() {
    examCanvas = document.getElementById('examCanvas');
    examCtx = examCanvas.getContext('2d');
    examCanvas.width = examCanvas.parentElement.clientWidth;
    examCanvas.height = examCanvas.parentElement.clientHeight;
    examPoints = [];

    const getCoord = (e) => {
        const rect = examCanvas.getBoundingClientRect();
        return { x: (e.clientX || e.touches[0].clientX) - rect.left, y: (e.clientY || e.touches[0].clientY) - rect.top };
    };

    examCanvas.onmousedown = (e) => { examPoints = [getCoord(e)]; redrawExam