// --- PWA Setup mit Elefanten-Icon ---
const canvasIcon = document.createElement('canvas');
canvasIcon.width = 192; canvasIcon.height = 192;
const ctxIcon = canvasIcon.getContext('2d');
ctxIcon.fillStyle = '#0f172a'; ctxIcon.fillRect(0,0,192,192);
ctxIcon.font = '100px sans-serif'; ctxIcon.textAlign = 'center'; ctxIcon.textBaseline = 'middle';
ctxIcon.fillText('🐘', 96, 96);

const manifestData = {
    name: "Thai Tonal Quest",
    short_name: "ThaiQuest",
    start_url: window.location.href,
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [{ src: canvasIcon.toDataURL(), sizes: "192x192", type: "image/png" }]
};
document.getElementById('pwa-manifest').href = URL.createObjectURL(new Blob([JSON.stringify(manifestData)], {type: 'application/json'}));

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swCode = `self.addEventListener('fetch', (e) => {});`;
        navigator.serviceWorker.register(URL.createObjectURL(new Blob([swCode], {type: 'text/javascript'}))).catch(() => {});
    });
}

// --- Tageswechsel & Streak-Prüfung mit Willkommens-Popup ---
let streakExtendedToday = false;

function checkDailyReset() {
    const todayStr = new Date().toDateString();
    const lastActiveDate = localStorage.getItem('thai_quest_last_date');

    if (lastActiveDate !== todayStr) {
        for (let id in lessons) {
            lessons[id].completed = false;
        }
        localStorage.setItem('thai_quest_lessons', JSON.stringify(lessons));
        localStorage.setItem('thai_quest_dialogs', JSON.stringify({})); 
        
        let currentStreak = parseInt(localStorage.getItem('thai_quest_streak')) || 1;

        if (lastActiveDate) {
            const lastDateObj = new Date(lastActiveDate);
            const currentDateObj = new Date(todayStr);
            const diffTime = Math.abs(currentDateObj - lastDateObj);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                currentStreak++;
                streakExtendedToday = true;
                playSound('complete');
            } else if (diffDays > 1) {
                currentStreak = 1;
            }
        } else {
            currentStreak = 1;
        }

        streak = currentStreak;
        localStorage.setItem('thai_quest_streak', streak);
        localStorage.setItem('thai_quest_last_date', todayStr);
    }
}

// --- Hilfsfunktion für sichere Emojis ---
function getVocabEmoji(v) {
    if (v.emoji && v.emoji !== "🇹🇭" && v.emoji.trim() !== "") {
        return v.emoji;
    }
    const m = (v.meaning || "").toLowerCase();
    if (m.includes("hallo") || m.includes("tag")) return "👋";
    if (m.includes("danke")) return "🙏";
    if (m.includes("ja")) return "✅";
    if (m.includes("nein") || m.includes("nicht")) return "❌";
    if (m.includes("toilette") || m.includes("wc")) return "🚻";
    if (m.includes("wieviel") || m.includes("geld")) return "💰";
    if (m.includes("wasser")) return "💧";
    if (m.includes("essen")) return "🍚";
    if (m.includes("hungrig")) return "😋";
    if (m.includes("lecker")) return "🍲";
    if (m.includes("scharf")) return "🔥";
    if (m.includes("freund")) return "🧑‍🤝‍🧑";
    if (m.includes("familie")) return "👨‍👩‍👧‍👦";
    if (m.includes("wie geht")) return "💬";
    if (m.includes("gut")) return "😊";
    if (m.includes("liebe")) return "❤️";
    return "💬";
}

// --- Audio & TTS ---
let synth = window.speechSynthesis;
let thaiVoice = null;

function loadThaiVoices() {
    if (!synth) return;
    const voices = synth.getVoices();
    thaiVoice = voices.find(v => v.lang.includes('th') || v.lang.includes('TH')) || null;
}

if (synth) {
    loadThaiVoices();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadThaiVoices;
    }
}

function playAudio(text) {
    if (!synth) {
        showToast("Audio wird nicht unterstützt", false);
        return;
    }
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH';
    utterance.rate = 0.8;
    if (!thaiVoice) loadThaiVoices();
    if (thaiVoice) utterance.voice = thaiVoice;
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    synth.speak(utterance);
}

window.addEventListener('touchstart', function unlockAudio() {
    if (synth && synth.paused) synth.resume();
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    window.removeEventListener('touchstart', unlockAudio);
}, { once: true });

let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

function playSound(type) {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'correct') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.setValueAtTime(659.25, now + 0.08);
            osc.frequency.setValueAtTime(783.99, now + 0.16);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        } else if (type === 'wrong') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.linearRampToValueAtTime(120, now + 0.2);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === 'complete') {
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, index) => {
                const subOsc = ctx.createOscillator();
                const subGain = ctx.createGain();
                subOsc.connect(subGain);
                subGain.connect(ctx.destination);
                subOsc.type = 'triangle';
                subOsc.frequency.setValueAtTime(freq, now + index * 0.1);
                subGain.gain.setValueAtTime(0.2, now + index * 0.1);
                subGain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.1 + 0.4);
                subOsc.start(now + index * 0.1);
                subOsc.stop(now + index * 0.1 + 0.4);
            });
        }
    } catch(e) {}
}

function showToast(text, isCorrect = true) {
    const banner = document.getElementById('toast-banner');
    const icon = document.getElementById('toast-icon');
    const msg = document.getElementById('toast-text');
    if(!banner) return;
    banner.className = "toast-banner " + (isCorrect ? "" : "wrong");
    icon.innerText = isCorrect ? "🎉" : "💡";
    msg.innerText = text;
    banner.classList.add('show');
    setTimeout(() => { banner.classList.remove('show'); }, 2000);
}

function showStreakModalIfNeeded() {
    if (streakExtendedToday) {
        const modal = document.createElement('div');
        modal.id = 'streak-modal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(5px);
            display: flex; align-items: center; justify-content: center; z-index: 9999;
            padding: 20px; box-sizing: border-box;
        `;
        modal.innerHTML = `
            <div class="card" style="width: 100%; max-width: 380px; text-align: center; padding: 2rem 1.5rem; border-bottom: 4px solid var(--streak);">
                <div style="font-size: 4.5rem; margin-bottom: 0.5rem; animation: bounce 1s infinite alternate;">🔥</div>
                <h2 style="color: var(--streak); margin-top: 0; font-size: 1.6rem;">Streak verlängert!</h2>
                <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 1.5rem;">Großartig! Du hältst deine Serie am Glühen.</p>
                <div style="background: #0f172a; padding: 15px; border-radius: 12px; margin-bottom: 1.5rem; font-size: 1.2rem; font-weight: bold; color: var(--streak);">
                    🔥 ${streak} Tage in Folge!
                </div>
                <button class="action-btn btn-primary" onclick="closeStreakModal()" style="width: 100%; font-size: 1.1rem; padding: 14px; background: var(--streak); border-bottom-color: #c2410c; color: white;">Weiter lernen 🚀</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

function closeStreakModal() {
    const modal = document.getElementById('streak-modal');
    if (modal) modal.remove();
    streakExtendedToday = false;
}

function toggleMeaning(event, meaning) {
    if (event) event.stopPropagation();
    const box = document.getElementById('meaning-display-box');
    if (box) {
        if (box.style.display === 'none' || box.innerText.includes('Bedeutung')) {
            box.innerHTML = `🇩🇪 <b>${meaning}</b>`;
            box.style.display = 'block';
            box.style.background = '#334155';
            box.style.color = '#38bdf8';
        } else {
            box.style.display = 'none';
        }
    }
}

let xp = parseInt(localStorage.getItem('thai_quest_xp')) || 0;
let streak = parseInt(localStorage.getItem('thai_quest_streak')) || 1;

checkDailyReset();

let sessionCurrent = 0;
const sessionTarget = 5;
let sessionGainedXP = 0;
let activeLessonFilter = null; 

let currentTrainIndex = null;
let currentExamIndex = null;
let currentMixIndex = null;
let trainPoints = [], trainCanvas, trainCtx, trainSnapped = false;
let examPoints = [], examCanvas, examCtx, examDrawingActive = false;

function updateHUD() {
    const xpEl = document.getElementById('xp-count');
    const streakEl = document.getElementById('streak-count');
    const lvlEl = document.getElementById('level-num');
    if(xpEl) xpEl.innerText = xp;
    if(streakEl) streakEl.innerText = streak;
    if(lvlEl) lvlEl.innerText = Math.floor(xp / 200) + 1;
    localStorage.setItem('thai_quest_xp', xp);
    localStorage.setItem('thai_quest_streak', streak);
}

// --- Pfad rendern ---
function renderPath() {
    const container = document.getElementById('path-nodes-container');
    if (!container) return;

    let html = "";
    let stationList = [
        { id: 1, title: "Urlaub & Alltag", icon: "✈️", type: "lesson", lessonId: 1 },
        { id: 2, title: "Essen & Restaurant", icon: "🍲", type: "lesson", lessonId: 2 },
        { id: 3, title: "Hör-Dialog 1", icon: "🎧", type: "dialog", dialogId: 0 },
        { id: 4, title: "Freunde & Familie", icon: "💬", type: "lesson", lessonId: 3 },
        { id: 5, title: "Hör-Dialog 2", icon: "🎧", type: "dialog", dialogId: 1 }
    ];

    stationList.forEach((station, index) => {
        let isCompleted = false;
        if (station.type === 'lesson') {
            isCompleted = lessons && lessons[station.lessonId] && lessons[station.lessonId].completed;
        } else if (station.type === 'dialog') {
            let completedDialogs = JSON.parse(localStorage.getItem('thai_quest_dialogs')) || {};
            isCompleted = completedDialogs[station.dialogId];
        }

        let isUnlocked = (index === 0) || xp > (index * 15);
        let statusClass = "active";
        let iconSymbol = station.icon;

        if (isCompleted) {
            statusClass = "completed";
            iconSymbol = "⭐";
        } else if (!isUnlocked) {
            statusClass = "locked";
            iconSymbol = "🔒";
        }

        let clickAction = station.type === 'lesson' 
            ? `startSessionForLesson(${station.lessonId}, '${station.title}')` 
            : `startDialogSession(${station.dialogId})`;

        html += `
            <div class="path-node ${statusClass}" onclick="${isUnlocked ? clickAction : `showLockedAlert()`}">
                <div class="node-icon">${iconSymbol}</div>
                <div class="node-title">${station.title}</div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function showLockedAlert() {
    showToast("Schließe erst vorherige Stationen ab! 🔒", false);
}

function startSessionForLesson(lessonId, lessonTitle) {
    activeLessonFilter = lessonId;
    sessionCurrent = 0;
    sessionGainedXP = 0;
    switchTab('mix');
}

// ==================== ALPHABET / BUCHSTABEN-LEHRE ====================
function renderAlphabet() {
    const container = document.getElementById('alphabet-container');
    if (!container) return;

    let html = `
        <div style="margin-bottom: 15px; text-align: center;">
            <h3 style="color: #38bdf8; margin-bottom: 5px;">🔤 Thailändisches Alphabet & Eselsbrücken</h3>
            <p style="color: #94a3b8; font-size: 0.85rem;">Inspiriert von Chineasy: Lerne die Buchstaben durch visuelle Eselsbrücken.</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
    `;

    letters.forEach((item, idx) => {
        let classColor = item.class === 'high' ? '#f43f5e' : (item.class === 'low' ? '#38bdf8' : '#eab308');
        html += `
            <div class="card" style="padding: 15px; text-align: center; border-bottom: 3px solid ${classColor}; background: #1e293b; border-radius: 12px;">
                <div style="font-size: 3rem; font-weight: bold; color: #f8fafc; margin-bottom: 5px;">${item.char}</div>
                <div style="font-size: 0.9rem; font-weight: bold; color: #38bdf8;">${item.name}</div>
                <div style="font-size: 0.75rem; color: #94a3b8; margin: 4px 0;">${item.meaning}</div>
                <div style="background: #0f172a; padding: 8px; border-radius: 8px; font-size: 0.75rem; color: #cbd5e1; margin-top: 8px;">
                    💡 ${item.mnem}
                </div>
                <button class="action-btn" onclick="playAudio('${item.char}')" style="margin-top: 8px; padding: 6px; font-size: 0.8rem; width: 100%;">🔊 Anhören</button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

// ==================== HÖRVERSTÄNDNIS / DIALOGE ====================
function startDialogSession(dialogId) {
    switchTab('dialog');
    const container = document.getElementById('card-content-dialog');
    const d = dialogues[dialogId] || dialogues[0];

    let linesHtml = "";
    d.lines.forEach((line, idx) => {
        linesHtml += `
            <div class="dialog-bubble" style="flex-direction: column; align-items: stretch;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 0.75rem; color: var(--accent); font-weight: bold;">${line.speaker}</div>
                    <button class="audio-btn" onclick="playAudio('${line.thai}')" style="width: 38px; height: 38px; font-size: 1rem;">🔊</button>
                </div>
                <div style="font-size: 1.5rem; font-weight: bold; letter-spacing: 1px; margin: 6px 0 2px 0;">${line.thai}</div>
                
                <button class="action-btn" onclick="toggleDialogDetails(event, 'dialog-details-${dialogId}-${idx}')" id="dialog-btn-${dialogId}-${idx}" style="font-size: 0.75rem; padding: 4px 8px; margin-top: 6px; background: #1e293b; border: 1px solid #475569; color: #94a3b8; text-align: left;">👁️ Text & Übersetzung anzeigen</button>
                
                <div id="dialog-details-${dialogId}-${idx}" style="display: none; margin-top: 8px; padding-top: 6px; border-top: 1px solid #334155; font-size: 0.85rem; color: #94a3b8;">
                    <div>🔤 Umschrift: <span style="color: #f8fafc;">${line.translit}</span></div>
                    <div>🇩🇪 Bedeutung: <span style="color: #38bdf8;">${line.meaning}</span></div>
                </div>
            </div>
        `;
    });

    let optionsHtml = "";
    d.options.forEach(opt => {
        let isCorr = opt.correct ? "true" : "false";
        optionsHtml += `<button class="action-btn choice-btn" onclick="checkDialogAnswer(${isCorr}, ${dialogId})">${opt.text}</button>`;
    });

    container.innerHTML = `
        <div style="font-size: 0.8rem; color: var(--rising); text-transform: uppercase; margin-bottom:5px;">🎧 Hörverständnis & Gespräch</div>
        <h3 style="margin-top: 5px; color: #f8fafc;">${d.title}</h3>
        <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 15px;">${d.context}</p>
        <div style="margin-bottom: 15px; max-height: 280px; overflow-y: auto; padding-right: 4px;">
            ${linesHtml}
        </div>
        <div style="border-top: 1px solid #334155; padding-top: 12px; margin-top: 10px;">
            <div style="font-weight: bold; margin-bottom: 8px; font-size: 0.9rem;">❓ ${d.question}</div>
            <div style="display: flex; flex-direction: column;">
                ${optionsHtml}
            </div>
        </div>
    `;
}

function toggleDialogDetails(event, detailsId) {
    const detailsEl = document.getElementById(detailsId);
    const btnEl = event.currentTarget;
    if (detailsEl) {
        if (detailsEl.style.display === 'none') {
            detailsEl.style.display = 'block';
            btnEl.innerText = '🙈 Details ausblenden';
            btnEl.style.color = '#38bdf8';
        } else {
            detailsEl.style.display = 'none';
            btnEl.innerText = '👁️ Text & Übersetzung anzeigen';
            btnEl.style.color = '#94a3b8';
        }
    }
}

function checkDialogAnswer(isCorrect, dialogId) {
    if (isCorrect) {
        playSound('correct');
        showToast("Richtig verstanden! 🎉 +30 XP", true);
        xp += 30;
        updateHUD();
        let completedDialogs = JSON.parse(localStorage.getItem('thai_quest_dialogs')) || {};
        completedDialogs[dialogId] = true;
        localStorage.setItem('thai_quest_dialogs', JSON.stringify(completedDialogs));
        setTimeout(() => { switchTab('path'); }, 1500);
    } else {
        playSound('wrong');
        showToast("Das war leider nicht richtig. Hör nochmal rein! 💡", false);
    }
}

function advanceSession(earnedXP) {
    sessionCurrent++;
    sessionGainedXP += earnedXP;
    xp += earnedXP;
    updateHUD();

    const fill = document.getElementById('session-fill');
    if(fill) {
        let percent = (sessionCurrent / sessionTarget) * 100;
        fill.style.width = percent + "%";
    }

    if (sessionCurrent >= sessionTarget) {
        if (activeLessonFilter && lessons[activeLessonFilter]) {
            lessons[activeLessonFilter].completed = true;
            localStorage.setItem('thai_quest_lessons', JSON.stringify(lessons));
        }
        playSound('complete');
        document.getElementById('section-mix').classList.add('hidden');
        document.getElementById('section-complete').classList.remove('hidden');
        const sumXpEl = document.getElementById('summary-xp');
        if(sumXpEl) sumXpEl.innerText = "+" + sessionGainedXP;
    } else {
        loadRandomMixMission();
    }
}

function switchTab(tab) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    ['section-path', 'section-mix', 'section-dialog', 'section-complete', 'section-train', 'section-exam', 'section-lessons', 'section-alphabet', 'section-add'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.classList.add('hidden');
    });

    const navButtons = document.querySelectorAll('.bottom-nav .nav-btn');
    navButtons.forEach(btn => {
        if(btn.getAttribute('onclick') && btn.getAttribute('onclick'].includes(tab)) {
            btn.classList.add('active');
        }
    });

    if(tab === 'path') {
        const pathEl = document.getElementById('section-path');
        if(pathEl) pathEl.classList.remove('hidden');
        updateHUD();
        renderPath();
    } else if(tab === 'mix') {
        if(navButtons[0]) navButtons[0].classList.add('active');
        const mixEl = document.getElementById('section-mix');
        if(mixEl) mixEl.classList.remove('hidden');
        loadRandomMixMission();
    } else if(tab === 'dialog') {
        if(navButtons[0]) navButtons[0].classList.add('active');
        const dialogEl = document.getElementById('section-dialog');
        if(dialogEl) dialogEl.classList.remove('hidden');
    } else if(tab === 'train') {
        const trainEl = document.getElementById('section-train');
        if(trainEl) trainEl.classList.remove('hidden');
        loadTrainCard();
    } else if(tab === 'exam') {
        const examEl = document.getElementById('section-exam');
        if(examEl) examEl.classList.remove('hidden');
        loadExamCard();
    } else if(tab === 'lessons') {
        const lessonsEl = document.getElementById('section-lessons');
        if(lessonsEl) lessonsEl.classList.remove('hidden');
        renderLessons();
    } else if(tab === 'alphabet') {
        const alphabetEl = document.getElementById('section-alphabet');
        if(alphabetEl) alphabetEl.classList.remove('hidden');
        renderAlphabet();
    }
}

// ==================== MIX-QUEST (inkl. Eselsbrücken-Fragen) ====================
function loadRandomMixMission() {
    updateHUD();
    const container = document.getElementById('card-content-mix');
    if (!container) return;

    let availableVocabs = vocabs;
    if (activeLessonFilter) {
        availableVocabs = vocabs.filter(v => v.lesson == activeLessonFilter);
        if (!availableVocabs || availableVocabs.length === 0) availableVocabs = vocabs;
    }

    // Erweitere Missionen um 'mnem_match' (Chineasy Eselsbrücke)
    const missionTypes = ['train_canvas', 'exam_canvas', 'audio_mc', 'tone_match', 'emoji_match', 'mnem_match'];
    const chosenType = missionTypes[Math.floor(Math.random() * missionTypes.length)];

    if (chosenType === 'mnem_match' && letters.length > 0) {
        renderMixMnemMatch();
        return;
    }

    currentMixIndex = Math.floor(Math.random() * availableVocabs.length);
    const v = availableVocabs[currentMixIndex];
    if (!v) return;

    setTimeout(() => playAudio(v.thai), 350);

    if (chosenType === 'train_canvas') {
        renderMixTrainCanvas(v);
    } else if (chosenType === 'exam_canvas') {
        renderMixExamCanvas(v);
    } else if (chosenType === 'audio_mc') {
        renderMixAudioMC(v, availableVocabs);
    } else if (chosenType === 'tone_match') {
        renderMixToneMatch(v);
    } else if (chosenType === 'emoji_match') {
        renderMixEmojiMatch(v, availableVocabs);
    }
}

function renderMixMnemMatch() {
    const container = document.getElementById('card-content-mix');
    const targetLetter = letters[Math.floor(Math.random() * letters.length)];
    
    let options = [targetLetter];
    while(options.length < 4 && options.length < letters.length) {
        let randL = letters[Math.floor(Math.random() * letters.length)];
        if(!options.includes(randL)) options.push(randL);
    }
    options.sort(() => Math.random() - 0.5);

    let htmlOptions = '';
    options.forEach(opt => {
        let isCorrect = (opt.char === targetLetter.char) ? "true" : "false";
        htmlOptions += `<button class="action-btn choice-btn" onclick="checkMnemMatch(${isCorrect})" style="font-size: 1.5rem; padding: 15px;">${opt.char} <span style="font-size: 0.8rem; display:block; color:#94a3b8;">${opt.name}</span></button>`;
    });

    container.innerHTML = `
        <div style="font-size: 0.8rem; color: #38bdf8; text-transform: uppercase; margin-bottom:5px;">💡 Eselsbrücken-Trainings (${sessionCurrent + 1}/${sessionTarget})</div>
        <div style="background: #1e293b; padding: 20px; border-radius: 14px; text-align: center; margin: 15px 0; border: 1px solid #475569;">
            <div style="font-size: 3rem; margin-bottom: 5px;">${targetLetter.emoji}</div>
            <div style="font-size: 1.1rem; color: #f8fafc; font-weight: bold; margin-bottom: 5px;">${targetLetter.meaning}</div>
            <div style="font-size: 0.85rem; color: #38bdf8;">"${targetLetter.mnem}"</div>
        </div>
        <div style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 10px; text-align: center;">Welcher Buchstabe passt zu dieser Eselsbrücke?</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            ${htmlOptions}
        </div>
    `;
}

function checkMnemMatch(isCorrect) {
    if(isCorrect) {
        playSound('correct');
        showToast("Richtig erkannt! 🎉 +15 XP", true);
        advanceSession(15);
    } else {
        playSound('wrong');
        showToast("Leider der falsche Buchstabe! 💡", false);
    }
}

function getToneCurveSvg(tone) {
    const details = toneDetails[tone];
    return `<svg width="40" height="24" viewBox="0 0 100 70" style="display:inline-block; vertical-align:middle; margin-right:8px;"><path d="${details.path}" stroke="#38bdf8" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`;
}

function renderMixTrainCanvas(v) {
    const container = document.getElementById('card-content-mix');
    const safeEmoji = getVocabEmoji(v);
    container.innerHTML = `
        <div style="font-size: 0.8rem; color: var(--accent); text-transform: uppercase; margin-bottom:5px;">✨ Tonkurve nachzeichnen (${sessionCurrent + 1}/${sessionTarget})</div>
        <div class="vocab-emoji-card">${safeEmoji}</div>
        <div class="word-row">
            <div class="thai-word">${v.thai}</div>
            <button class="audio-btn" onclick="playAudio('${v.thai}')">🔊</button>
        </div>
        <div class="translit">${v.translit}</div>
        <button class="action-btn" onclick="toggleMeaning(event, '${v.meaning}')" style="font-size: 0.85rem; padding: 6px 12px; margin: 5px 0 10px 0; background: #1e293b; border: 1px solid #475569; color: #94a3b8;">🔍 Bedeutung anzeigen</button>
        <div id="meaning-display-box" style="display:none; padding: 8px; border-radius: 8px; font-size: 0.95rem; margin-bottom: 10px;"></div>
        <div class="canvas-container">
            <div class="canvas-hint">Magnetische Vorlage ✍️</div>
            <canvas id="mixTrainCanvas"></canvas>
        </div>
        <div class="btn-group">
            <button class="action-btn" onclick="loadRandomMixMission()">Überspringen</button>
            <button class="action-btn btn-primary" onclick="advanceSession(15)">Richtig ➔</button>
        </div>
    `;
    setupMixCanvas('mixTrainCanvas', v.tone, true);
}

function renderMixExamCanvas(v) {
    const container = document.getElementById('card-content-mix');
    const safeEmoji = getVocabEmoji(v);
    container.innerHTML = `
        <div style="font-size: 0.8rem; color: #ef4444; text-transform: uppercase; margin-bottom:5px;">🧠 Freies Gedächtnis-Zeichnen (${sessionCurrent + 1}/${sessionTarget})</div>
        <div class="vocab-emoji-card">${safeEmoji}</div>
        <div class="word-row">
            <div class="thai-word">${v.thai}</div>
            <button class="audio-btn" onclick="playAudio('${v.thai}')">🔊</button>
        </div>
        <div class="translit">${v.translit}</div>
        <button class="action-btn" onclick="toggleMeaning(event, '${v.meaning}')" style="font-size: 0.85rem; padding: 6px 12px; margin: 5px 0 10px 0; background: #1e293b; border: 1px solid #475569; color: #94a3b8;">🔍 Bedeutung anzeigen</button>
        <div id="meaning-display-box" style="display:none; padding: 8px; border-radius: 8px; font-size: 0.95rem; margin-bottom: 10px;"></div>
        <div class="canvas-container" style="border-color: #ef4444;">
            <div class="canvas-hint" style="color: #ef4444;">Aus dem Kopf zeichnen!</div>
            <canvas id="mixExamCanvas"></canvas>
        </div>
        <div class="btn-group">
            <button class="action-btn" onclick="clearExamCanvas()">Löschen</button>
            <button class="action-btn btn-primary" onclick="checkMixExamDrawing()" style="background: var(--falling); color: #fff;">Einreichen ➔</button>
        </div>
    `;
    setupMixExamCanvas('mixExamCanvas');
}

function setupMixExamCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    examPoints = [];

    const getCoord = (e) => {
        const rect = canvas.getBoundingClientRect();
        return { x: (e.clientX || e.touches[0].clientX) - rect.left, y: (e.clientY || e.touches[0].clientY) - rect.top };
    };

    canvas.onmousedown = (e) => { examPoints = [getCoord(e)]; examDrawingActive = true; redrawExamCanvas(ctx, canvas); };
    canvas.onmousemove = (e) => { if(examDrawingActive && examPoints.length) { examPoints.push(getCoord(e)); redrawExamCanvas(ctx, canvas); } };
    canvas.onmouseup = () => { examDrawingActive = false; };

    canvas.ontouchstart = (e) => { examPoints = [getCoord(e.touches[0])]; examDrawingActive = true; redrawExamCanvas(ctx, canvas); e.preventDefault(); };
    canvas.ontouchmove = (e) => { if(examDrawingActive && examPoints.length) { examPoints.push(getCoord(e.touches[0])); redrawExamCanvas(ctx, canvas); e.preventDefault(); } };
    canvas.ontouchend = () => { examDrawingActive = false; };
}

function redrawExamCanvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (examPoints.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(examPoints[0].x, examPoints[0].y);
    for(let p of examPoints) ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 4; ctx.stroke();
}

function checkMixExamDrawing() {
    if (examPoints.length < 5) { 
        playSound('wrong');
        showToast("Bitte zeichne die Kurve in das Feld!", false); 
        return; 
    }
    
    const correctTone = vocabs[currentMixIndex].tone;
    const startY = examPoints[0].y;
    const endY = examPoints[examPoints.length - 1].y;
    let evaluatedTone = 0;
    const h = 180;

    if (correctTone === 2) {
        let minY = Math.min(...examPoints.map(p => p.y));
        evaluatedTone = (minY < h * 0.4) ? 2 : 1;
    } else if (correctTone === 4) {
        evaluatedTone = (startY > endY + 10) ? 4 : 0;
    } else if (correctTone === 1) {
        evaluatedTone = (endY > startY) ? 1 : 0;
    } else if (correctTone === 3) {
        let avgY = examPoints.reduce((acc, p) => acc + p.y, 0) / examPoints.length;
        evaluatedTone = (avgY < h * 0.5) ? 3 : 0;
    }

    const isCorrect = (evaluatedTone === correctTone);
    if (isCorrect) {
        playSound('correct');
        showToast("Richtig gezeichnet! 🎉 +25 XP", true);
        advanceSession(25);
    } else {
        playSound('wrong');
        showToast(`Falsch! Gesucht war: ${toneDetails[correctTone].name}`, false);
    }
}

function renderMixAudioMC(v, pool) {
    let options = [v.meaning];
    while(options.length < 4 && options.length < pool.length) {
        let randMeaning = pool[Math.floor(Math.random() * pool.length)].meaning;
        if(!options.includes(randMeaning)) options.push(randMeaning);
    }
    options.sort(() => Math.random() - 0.5);

    let htmlOptions = '';
    options.forEach(opt => {
        let correctCheck = (opt === v.meaning) ? "true" : "false";
        htmlOptions += `<button class="action-btn choice-btn" onclick="checkAudioMC(${correctCheck})">${opt}</button>`;
    });

    const container = document.getElementById('card-content-mix');
    const safeEmoji = getVocabEmoji(v);
    container.innerHTML = `
        <div style="font-size: 0.8rem; color: var(--xp); text-transform: uppercase; margin-bottom:5px;">👂 Was bedeutet dieses Wort? (${sessionCurrent + 1}/${sessionTarget})</div>
        <div class="vocab-emoji-card">${safeEmoji}</div>
        <div class="word-row" style="margin: 10px 0;">
            <button class="audio-btn" style="width:60px; height:60px; font-size:1.5rem;" onclick="playAudio('${v.thai}')">🔊</button>
        </div>
        <div class="translit">${v.translit}</div>
        <div style="display:flex; flex-direction:column; margin-top:10px;">
            ${htmlOptions}
        </div>
    `;
}

function checkAudioMC(isCorrect) {
    if(isCorrect) {
        playSound('correct');
        showToast("Richtig gehört! 🎉 +10 XP", true);
        advanceSession(10);
    } else {
        playSound('wrong');
        showToast("Leider falsch! 💡", false);
    }
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
        let curveSvg = getToneCurveSvg(t);
        htmlOptions += `<button class="action-btn choice-btn" style="display:flex; align-items:center;" onclick="checkToneMatch(${t}, ${v.tone})">${curveSvg} <span>${toneDetails[t].name}</span></button>`;
    });

    const container = document.getElementById('card-content-mix');
    const safeEmoji = getVocabEmoji(v);
    container.innerHTML = `
        <div style="font-size: 0.8rem; color: var(--streak); text-transform: uppercase; margin-bottom:5px;">🎯 Welcher Ton gehört dazu? (${sessionCurrent + 1}/${sessionTarget})</div>
        <div class="vocab-emoji-card">${safeEmoji}</div>
        <div class="word-row" style="margin: 5px 0;">
            <div class="thai-word" style="font-size: 2.2rem;">${v.thai}</div>
        </div>
        <div class="translit">${v.translit}</div>
        <button class="action-btn" onclick="toggleMeaning(event, '${v.meaning}')" style="font-size: 0.85rem; padding: 6px 12px; margin: 5px 0 10px 0; background: #1e293b; border: 1px solid #475569; color: #94a3b8;">🔍 Bedeutung anzeigen</button>
        <div id="meaning-display-box" style="display:none; padding: 8px; border-radius: 8px; font-size: 0.95rem; margin-bottom: 10px;"></div>
        <div style="display:flex; flex-direction:column; margin-top:5px;">
            ${htmlOptions}
        </div>
    `;
}

function checkToneMatch(selected, correct) {
    if(selected === correct) {
        playSound('correct');
        playAudio(vocabs[currentMixIndex].thai);
        showToast("Perfekt zugeordnet! 🎉 +15 XP", true);
        advanceSession(15);
    } else {
        playSound('wrong');
        showToast(`Falsch! Richtig war: ${toneDetails[correct].name}`, false);
    }
}

function renderMixEmojiMatch(v, pool) {
    let options = [v];
    while(options.length < 4 && options.length < pool.length) {
        let randV = pool[Math.floor(Math.random() * pool.length)];
        if(!options.includes(randV)) options.push(randV);
    }
    options.sort(() => Math.random() - 0.5);

    let htmlEmojis = '';
    options.forEach(opt => {
        let isCorrect = (opt.thai === v.thai) ? "true" : "false";
        let emj = getVocabEmoji(opt);
        htmlEmojis += `<div onclick="checkEmojiMatch(${isCorrect})" style="cursor:pointer; border-radius:12px; padding:15px; text-align:center; border:2px solid #475569; background:#283548;"><div style="font-size:2.5rem; margin-bottom:5px;">${emj}</div><div style="font-size:0.8rem; color:#f8fafc; font-weight:bold;">${opt.meaning}</div></div>`;
    });

    const container = document.getElementById('card-content-mix');
    container.innerHTML = `
        <div style="font-size: 0.8rem; color: var(--accent); text-transform: uppercase; margin-bottom:5px;">🖼️ Welches Symbol passt? (${sessionCurrent + 1}/${sessionTarget})</div>
        <div class="word-row" style="margin: 8px 0;">
            <div class="thai-word" style="font-size: 2.2rem;" onclick="playAudio('${v.thai}')">${v.thai}</div>
            <button class="audio-btn" onclick="playAudio('${v.thai}')">🔊</button>
        </div>
        <div class="translit">${v.translit}</div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:12px;">
            ${htmlEmojis}
        </div>
    `;
}

function checkEmojiMatch(isCorrect) {
    if(isCorrect) {
        playSound('correct');
        showToast("Richtiges Symbol gewählt! 🎉 +15 XP", true);
        advanceSession(15);
    } else {
        playSound('wrong');
        showToast("Leider das falsche Symbol! 💡", false);
    }
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

// ==================== TRAINING & PRÜFUNG ====================
function loadTrainCard() {
    updateHUD();
    const container = document.getElementById('card-content-train');
    if (!vocabs || vocabs.length === 0) { container.innerHTML = "<p>Keine Vokabeln.</p>"; return; }

    currentTrainIndex = Math.floor(Math.random() * vocabs.length);
    const v = vocabs[currentTrainIndex];
    trainSnapped = false;
    setTimeout(() => playAudio(v.thai), 300);

    const safeEmoji = getVocabEmoji(v);
    container.innerHTML = `
        <div style="font-size: 0.8rem; color: #38bdf8; text-transform: uppercase; margin-bottom:5px;">🏋️ Training (Mit Ghost-Linie)</div>
        <div class="vocab-emoji-card">${safeEmoji}</div>
        <div class="word-row">
            <div class="thai-word">${v.thai}</div>
            <button class="audio-btn" onclick="playAudio('${v.thai}')">🔊</button>
        </div>
        <div class="translit">${v.translit}</div>
        <button class="action-btn" onclick="toggleMeaning(event, '${v.meaning}')" style="font-size: 0.85rem; padding: 6px 12px; margin: 5px 0 10px 0; background: #1e293b; border: 1px solid #475569; color: #94a3b8;">🔍 Bedeutung anzeigen</button>
        <div id="meaning-display-box" style="display:none; padding: 8px; border-radius: 8px; font-size: 0.95rem; margin-bottom: 10px;"></div>
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
        showToast("Bitte Kurve einzeichnen!", false); 
        return; 
    }
    playSound('correct');
    xp += 10;
    showToast("Super trainiert! +10 XP", true);
    loadTrainCard();
}

function loadExamCard() {
    updateHUD();
    const container = document.getElementById('card-content-exam');
    if (!vocabs || vocabs.length === 0) { container.innerHTML = "<p>Keine Vokabeln.</p>"; return; }

    currentExamIndex = Math.floor(Math.random() * vocabs.length);
    const v = vocabs[currentExamIndex];
    setTimeout(() => playAudio(v.thai), 300);

    const safeEmoji = getVocabEmoji(v);
    container.innerHTML = `
        <div style="font-size: 0.8rem; color: #ef4444; text-transform: uppercase; margin-bottom:5px;">🎓 Prüfung (Aus dem Gedächtnis!)</div>
        <div class="vocab-emoji-card">${safeEmoji}</div>
        <div class="word-row">
            <div class="thai-word">${v.thai}</div>
            <button class="audio-btn" onclick="playAudio('${v.thai}')">🔊</button>
        </div>
        <div class="translit">${v.translit}</div>
        <button class="action-btn" onclick="toggleMeaning(event, '${v.meaning}')" style="font-size: 0.85rem; padding: 6px 12px; margin: 5px 0 10px 0; background: #1e293b; border: 1px solid #475569; color: #94a3b8;">🔍 Bedeutung anzeigen</button>
        <div id="meaning-display-box" style="display:none; padding: 8px; border-radius: 8px; font-size: 0.95rem; margin-bottom: 10px;"></div>
        <div class="canvas-container" style="border-color: #ef4444;">
            <div class="canvas-hint" style="color: #ef4444;">Keine Hilfslinie – Zeichne frei! 🧠</div>
            <canvas id="examCanvas"></canvas>
        </div>
        <div class="btn-group">
            <button class="action-btn" onclick="clearExamCanvas()">Löschen</button>
            <button class="action-btn btn-primary" onclick="checkExamDrawing()" style="background: var(--falling); color: #fff;">Einreichen ➔</button>
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

    examCanvas.onmousedown = (e) => { examPoints = [getCoord(e)]; examDrawingActive = true; redrawExam(); };
    examCanvas.onmousemove = (e) => { if(examDrawingActive && examPoints.length) { examPoints.push(getCoord(e)); redrawExam(); } };
    examCanvas.onmouseup = () => { examDrawingActive = false; };

    examCanvas.ontouchstart = (e) => { examPoints = [getCoord(e.touches[0])]; examDrawingActive = true; redrawExam(); e.preventDefault(); };
    examCanvas.ontouchmove = (e) => { if(examDrawingActive && examPoints.length) { examPoints.push(getCoord(e.touches[0])); redrawExam(); e.preventDefault(); } };
    examCanvas.ontouchend = () => { examDrawingActive = false; };
}

function clearExamCanvas() {
    examPoints = [];
    redrawExam();
}

function redrawExam() {
    examCtx.clearRect(0, 0, examCanvas.width, examCanvas.height);
    if (examPoints.length < 2) return;
    examCtx.beginPath();
    examCtx.moveTo(examPoints[0].x, examPoints[0].y);
    for(let p of examPoints) examCtx.lineTo(p.x, p.y);
    examCtx.strokeStyle = '#f8fafc';
    examCtx.lineWidth = 4; examCtx.stroke();
}

function checkExamDrawing() {
    if (examPoints.length < 5) { 
        playSound('wrong');
        showToast("Bitte zeichne die Kurve in das Feld!", false); 
        return; 
    }
    
    const correctTone = vocabs[currentExamIndex].tone;
    const startY = examPoints[0].y;
    const endY = examPoints[examPoints.length - 1].y;
    let evaluatedTone = 0;
    const h = examCanvas.height;

    if (correctTone === 2) {
        let minY = Math.min(...examPoints.map(p => p.y));
        evaluatedTone = (minY < h * 0.4) ? 2 : 1;
    } else if (correctTone === 4) {
        evaluatedTone = (startY > endY + 10) ? 4 : 0;
    } else if (correctTone === 1) {
        evaluatedTone = (endY > startY) ? 1 : 0;
    } else if (correctTone === 3) {
        let avgY = examPoints.reduce((acc, p) => acc + p.y, 0) / examPoints.length;
        evaluatedTone = (avgY < h * 0.5) ? 3 : 0;
    }

    const isCorrect = (evaluatedTone === correctTone);
    const container = document.getElementById('card-content-exam');

    if (isCorrect) {
        xp += 25;
        playSound('correct');
        showToast("Prüfung bestanden! 🎉 +25 XP", true);
        container.innerHTML = `
            <div style="color: #10b981; font-size: 1.8rem; font-weight: bold;">Richtig aus dem Kopf! 🎉</div>
            <p style="color: #38bdf8; font-weight: bold; margin: 10px 0;">Das war einwandfrei (${toneDetails[correctTone].name}).</p>
            <p style="color: #eab308; font-weight: bold; margin-bottom: 1.5rem;">+25 XP erhalten!</p>
            <button class="action-btn btn-primary" onclick="loadExamCard()" style="width: 100%;">Nächste Prüfungsfrage ➔</button>
        `;
    } else {
        playSound('wrong');
        showToast("Leider daneben! 💡", false);
        container.innerHTML = `
            <div style="color: #ef4444; font-size: 1.8rem; font-weight: bold;">Leider daneben! 💡</div>
            <p style="color: #94a3b8; margin: 10px 0;">Gesucht war: <b style="color: #38bdf8;">${toneDetails[correctTone].name}</b></p>
            <button class="action-btn btn-primary" onclick="loadExamCard()" style="width: 100%; background: #334155; margin-top: 1rem;">Weiter ➔</button>
        `;
    }
    updateHUD();
}

function drawGhost(ctx, canvas, tone) {
    ctx.save(); ctx.beginPath();
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.3)'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
    const w = canvas.width, h = canvas.height;
    if (tone === 0) { ctx.moveTo(20, h/2); ctx.lineTo(w - 20, h/2); }
    else if (tone === 1) { ctx.moveTo(20, h/3); ctx.lineTo(w - 20, h * 0.8); }
    else if (tone === 2) { ctx.moveTo(20, h * 0.7); ctx.quadraticCurveTo(w/2, 10, w - 20, h * 0.85); }
    else if (tone === 3) { ctx.moveTo(20, h/4); ctx.lineTo(w - 20, h/4); }
    else if (tone === 4) { ctx.moveTo(20, h * 0.8); ctx.quadraticCurveTo(w/2, h, w - 20, h/4); }
    ctx.stroke(); ctx.restore();
}

function drawPerfectCurve(ctx, canvas, tone) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGhost(ctx, canvas, tone);
    ctx.beginPath(); ctx.strokeStyle = '#10b981'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    const w = canvas.width, h = canvas.height;
    if (tone === 0) { ctx.moveTo(20, h/2); ctx.lineTo(w - 20, h/2); }
    else if (tone === 1) { ctx.moveTo(20, h/3); ctx.lineTo(w - 20, h * 0.8); }
    else if (tone === 2) { ctx.moveTo(20, h * 0.7); ctx.quadraticCurveTo(w/2, 10, w - 20, h * 0.85); }
    else if (tone === 3) { ctx.moveTo(20, h/4); ctx.lineTo(w - 20, h/4); }
    else if (tone === 4) { ctx.moveTo(20, h * 0.8); ctx.quadraticCurveTo(w/2, h, w - 20, h/4); }
    ctx.stroke();
}

function renderLessons() {
    const container = document.getElementById('lessons-container');
    if (!container) return;
    let html = "";
    for (let id in lessons) {
        let l = lessons[id];
        let count = vocabs.filter(v => v.lesson == id).length;
        let isDone = l.completed;
        html += `
            <div class="lesson-card">
                <div class="lesson-info">
                    <h4>${l.name} ${isDone ? '⭐' : ''}</h4>
                    <p>${count} Vokabeln enthalten</p>
                </div>
                <div>
                    <button class="action-btn btn-primary" onclick="startSessionForLesson(${id}, '${l.name}')" style="padding: 6px 12px; font-size: 0.8rem;">${isDone ? 'Wiederholen 🔄' : 'Starten 🚀'}</button>
                </div>
            </div>`;
    }
    container.innerHTML = html;
}

function addVocab(e) {
    e.preventDefault();
    const thai = document.getElementById('input-thai').value;
    const translit = document.getElementById('input-translit').value;
    const meaning = document.getElementById('input-meaning').value;
    const emoji = document.getElementById('input-image').value;
    const lesson = parseInt(document.getElementById('input-lesson').value);
    const tone = parseInt(document.getElementById('input-tone').value);

    vocabs.push({ thai, translit, meaning, tone, lesson, emoji });
    localStorage.setItem('thai_quest_vocabs', JSON.stringify(vocabs));

    document.getElementById('add-form').reset();
    playSound('correct');
    showToast("Wort erfolgreich gespeichert! 🚀", true);
    switchTab('path');
}

// Start mit Pfad & Streak
switchTab('path');
showStreakModalIfNeeded();
