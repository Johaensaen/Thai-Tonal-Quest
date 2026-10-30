const courseLessons = [
    {
        id: 1,
        name: "1. Hallo & unterwegs",
        description: "Nützliche Wörter für erste Gespräche und unterwegs.",
        words: [
            { thai: "มา", translit: "maa", meaning: "kommen", tone: 0, lesson: 1 },
            { thai: "ไป", translit: "bpai", meaning: "gehen / fahren", tone: 0, lesson: 1 },
            { thai: "ดู", translit: "duu", meaning: "sehen / anschauen", tone: 0, lesson: 1 },
            { thai: "ดี", translit: "dii", meaning: "gut", tone: 0, lesson: 1 },
            { thai: "คน", translit: "khon", meaning: "Person / Mensch", tone: 0, lesson: 1 },
            { thai: "พูด", translit: "phûut", meaning: "sprechen", tone: 2, lesson: 1 },
            { thai: "ใช่", translit: "châi", meaning: "ja / richtig", tone: 2, lesson: 1 },
            { thai: "ใหม่", translit: "mâi", meaning: "neu", tone: 2, lesson: 1 },
            { thai: "เก่า", translit: "kào", meaning: "alt", tone: 1, lesson: 1 },
            { thai: "ข่าว", translit: "khàao", meaning: "Nachricht", tone: 1, lesson: 1 }
        ]
    },
    {
        id: 2,
        name: "2. Essen & Zuhause",
        description: "Wörter rund ums Essen, Zuhause und Befinden.",
        words: [
            { thai: "ไข่", translit: "khài", meaning: "Ei", tone: 1, lesson: 2 },
            { thai: "ข้าว", translit: "khâao", meaning: "Reis", tone: 2, lesson: 2 },
            { thai: "บ้าน", translit: "bâan", meaning: "Haus / Zuhause", tone: 2, lesson: 2 },
            { thai: "กิน", translit: "kin", meaning: "essen", tone: 0, lesson: 2 },
            { thai: "น้ำ", translit: "náam", meaning: "Wasser", tone: 3, lesson: 2 },
            { thai: "หมู", translit: "mǔu", meaning: "Schwein / Schweinefleisch", tone: 4, lesson: 2 },
            { thai: "หิว", translit: "hǐw", meaning: "hungrig", tone: 4, lesson: 2 },
            { thai: "แม่", translit: "mâe", meaning: "Mutter", tone: 2, lesson: 2 },
            { thai: "นอน", translit: "non", meaning: "schlafen / liegen", tone: 0, lesson: 2 },
            { thai: "เล่น", translit: "lên", meaning: "spielen", tone: 2, lesson: 2 }
        ]
    },
    {
        id: 3,
        name: "3. Draußen, Tiere & Dinge",
        description: "Entdecke Tiere, Orte und Dinge in deiner Umgebung.",
        words: [
            { thai: "ป่า", translit: "pàa", meaning: "Wald", tone: 1, lesson: 3 },
            { thai: "รัก", translit: "rák", meaning: "lieben / Liebe", tone: 3, lesson: 3 },
            { thai: "นก", translit: "nók", meaning: "Vogel", tone: 3, lesson: 3 },
            { thai: "รถ", translit: "rót", meaning: "Auto / Fahrzeug", tone: 3, lesson: 3 },
            { thai: "ม้า", translit: "máa", meaning: "Pferd", tone: 3, lesson: 3 },
            { thai: "นั้น", translit: "nán", meaning: "jenes / das dort", tone: 3, lesson: 3 },
            { thai: "ขาว", translit: "khǎao", meaning: "weiß", tone: 4, lesson: 3 },
            { thai: "หมา", translit: "mǎa", meaning: "Hund", tone: 4, lesson: 3 },
            { thai: "ไหน", translit: "nǎi", meaning: "wo / welcher", tone: 4, lesson: 3 },
            { thai: "ปลา", translit: "bplaa", meaning: "Fisch", tone: 0, lesson: 3 }
        ]
    }
];

const allCourseWords = courseLessons.flatMap(lesson => lesson.words);
const courseWordByThai = new Map(allCourseWords.map(word => [word.thai, word]));
const legacyStarterWords = new Set(["สวัสดี", "ขอบคุณ", "ไม่", "น้ำ", "กิน", "หิว"]);

function readStoredObject(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "{}");
        return value && typeof value === "object" ? value : {};
    } catch (error) {
        console.error(`Gespeicherte Daten (${key}) konnten nicht gelesen werden:`, error);
        return {};
    }
}

const savedVocabs = readStoredObject("thai_quest_vocabs");
const storedVocabList = Array.isArray(savedVocabs) ? savedVocabs : [];
const customVocabs = [...new Map(storedVocabList
    .filter(word =>
        word &&
        typeof word.thai === "string" &&
        !courseWordByThai.has(word.thai) &&
        !legacyStarterWords.has(word.thai)
    )
    .map(word => {
        const savedLesson = Number.parseInt(word.lesson, 10) || 1;
        const lesson = Math.min(Math.max(savedLesson, 1), courseLessons.length);
        return [word.thai, { ...word, lesson }];
    })
).values()];
const savedDailyLessons = readStoredObject("thai_quest_daily_lessons_v1");
const dailyReviewStorageKey = "thai_quest_daily_review_v1";
const toneDetails = {
    0: { name: "Mittelton (Mid)" },
    1: { name: "Tiefton (Low)" },
    2: { name: "Fallender Ton (Falling)" },
    3: { name: "Hochton (High)" },
    4: { name: "Steigender Ton (Rising)" }
};

const firstIncompleteLesson = courseLessons.findIndex(lesson => !savedDailyLessons[lesson.id]?.completed);
const completedLessonCount = firstIncompleteLesson === -1 ? courseLessons.length : firstIncompleteLesson;
const unlockedLessonCount = Math.min(completedLessonCount + 1, courseLessons.length);
const lessons = Object.fromEntries(courseLessons.map((lesson, index) => {
    const saved = savedDailyLessons[lesson.id] || {};
    return [lesson.id, {
        name: lesson.name,
        completed: index < completedLessonCount && saved.completed === true,
        completedAt: typeof saved.completedAt === "string" ? saved.completedAt : "",
        progress: Number.isInteger(saved.progress) ? Math.min(Math.max(saved.progress, 0), lesson.words.length) : 0
    }];
}));
let vocabs = [
    ...courseLessons.slice(0, unlockedLessonCount).flatMap(lesson => lesson.words),
    ...customVocabs.filter(word => word.lesson <= unlockedLessonCount)
];

function localDateKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function saveDailyLessons() {
    try {
        localStorage.setItem("thai_quest_daily_lessons_v1", JSON.stringify(lessons));
        const savedWords = [...new Map([...vocabs, ...customVocabs]
            .map(word => [word.thai, word])).values()];
        localStorage.setItem("thai_quest_vocabs", JSON.stringify(savedWords));
    } catch (error) {
        console.error("Der Tagesfortschritt konnte nicht gespeichert werden:", error);
        alert("Dein Fortschritt konnte nicht gespeichert werden. Prüfe den freien Gerätespeicher.");
    }
}

function saveDailyReview(review) {
    try {
        localStorage.setItem(dailyReviewStorageKey, JSON.stringify(review));
    } catch (error) {
        console.error("Die Tageswiederholung konnte nicht gespeichert werden:", error);
        alert("Dein Wiederholungsfortschritt konnte nicht gespeichert werden. Prüfe den freien Gerätespeicher.");
    }
}

function getDailyReview() {
    const today = localDateKey();
    const saved = readStoredObject(dailyReviewStorageKey);
    if (saved.date === today && Array.isArray(saved.words)) {
        return {
            date: today,
            words: saved.words,
            progress: Number.isInteger(saved.progress) ? Math.min(Math.max(saved.progress, 0), 10) : 0,
            completed: saved.completed === true
        };
    }

    const pool = [...vocabs];
    for (let index = pool.length - 1; index > 0; index--) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
    }
    return {
        date: today,
        words: pool.slice(0, 10).map(word => word.thai),
        progress: 0,
        completed: false
    };
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[character]);
}

let activeDailySession = null;
function installProgressiveCourse() {
    const container = document.getElementById("lessons-container");
    const style = document.createElement("style");
    style.textContent = `
        .course-intro { margin: 0 0 16px; color: #cbd5e1; line-height: 1.6; }
        .course-lesson { margin: 12px 0; padding: 18px; border: 1px solid #334155; border-radius: 14px; background: #0f172a; }
        .course-lesson.is-current { border-color: #38bdf8; }
        .course-lesson.is-locked { opacity: .68; }
        .course-lesson-heading { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
        .course-lesson h3 { margin: 0 0 6px; color: #f8fafc; font-size: 1.05rem; }
        .course-lesson p { margin: 5px 0 12px; color: #cbd5e1; }
        .course-tone { color: #38bdf8; font-size: .78rem; font-weight: 700; text-transform: uppercase; }
        .course-words { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0; }
        .course-word { padding: 5px 8px; border-radius: 8px; background: #1e293b; color: #e2e8f0; }
        .course-status { white-space: nowrap; color: #94a3b8; font-size: .82rem; }
        .course-progress { color: #94a3b8; font-size: .9rem; }
        .daily-question { margin-top: 12px; text-align: center; }
        .daily-question-word { margin: 18px 0 4px; color: #f8fafc; font-size: 3rem; }
        .daily-question-hint { color: #94a3b8; }
        .daily-choices { display: grid; gap: 9px; margin-top: 20px; }
        .daily-choice { padding: 12px; border: 1px solid #475569; border-radius: 10px; background: #1e293b; color: #f8fafc; font: inherit; cursor: pointer; }
        .daily-choice:hover { border-color: #38bdf8; }
        .daily-feedback { margin: 18px 0; padding: 12px; border-radius: 10px; background: #1e293b; }
        .daily-feedback.is-correct { color: #86efac; }
        .daily-feedback.is-incorrect { color: #fca5a5; }
        .daily-progress-track { height: 7px; margin: 8px 0 16px; border-radius: 8px; background: #334155; }
        .daily-progress-fill { height: 100%; border-radius: inherit; background: #38bdf8; }
        .daily-session-title { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        @media (max-width: 480px) { .course-lesson-heading { flex-direction: column; } }
    `;
    document.head.appendChild(style);

    window.renderLessons = function renderCourseLessons() {
        const subtitle = document.getElementById("mode-subtitle");
        if (subtitle) subtitle.innerText = "Dein geführter Lernpfad für heute";
        const today = localDateKey();
        const currentIndex = courseLessons.findIndex(lesson => !lessons[lesson.id].completed);
        const allComplete = currentIndex === -1;
        const currentLesson = allComplete ? null : courseLessons[currentIndex];
        const currentProgress = currentLesson ? lessons[currentLesson.id].progress : 0;
        const previousLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
        const availableToday = !previousLesson ||
            (lessons[previousLesson.id].completedAt && lessons[previousLesson.id].completedAt < today);
        const review = allComplete ? getDailyReview() : null;
        const lastCourseLesson = courseLessons[courseLessons.length - 1];
        const canReviewToday = allComplete &&
            lessons[lastCourseLesson.id].completedAt < today &&
            !review.completed;
        const reviewCompletedToday = allComplete &&
            lessons[lastCourseLesson.id].completedAt < today &&
            review.completed;

        container.innerHTML = `
            <p class="course-intro">Jede Tageslektion hat 10 Wörter. Du wechselst zwischen Üben mit Ton-Hinweisen und kleinen Prüfungsfragen. Nach dem zehnten Wort ist die Lektion automatisch abgeschlossen.</p>
            ${courseLessons.map((lesson, index) => {
                const state = lessons[lesson.id];
                const completed = state.completed;
                const isCurrent = index === currentIndex;
                const isAvailable = isCurrent && availableToday;
                const toneNames = [...new Set(lesson.words.map(word => toneDetails[word.tone].name.split(" ")[0]))].join(" · ");
                const status = completed
                    ? "✓ Abgeschlossen"
                    : isAvailable
                        ? "Heute verfügbar"
                        : isCurrent
                            ? "Morgen geht's weiter"
                            : "🔒 Noch gesperrt";
                const words = completed || isCurrent
                    ? `<div class="course-words">${lesson.words.map(word => `
                        <span class="course-word" lang="th">${escapeHtml(word.thai)}</span>`).join("")}</div>`
                    : "";
                const action = isAvailable
                    ? `<button class="action-btn btn-primary" type="button" onclick="startDailyLesson(${lesson.id})">${state.progress ? `Weiterlernen (${state.progress}/10)` : "Tageslektion starten"}</button>`
                    : `<span class="course-status">${status}</span>`;
                return `<article class="course-lesson ${completed ? "is-complete" : isCurrent ? "is-current" : "is-locked"}">
                    <div class="course-lesson-heading"><div>
                        <span class="course-tone">${toneNames} · 10 Wörter</span>
                        <h3>${escapeHtml(lesson.name)}</h3>
                    </div>${action}</div>
                    <p>${escapeHtml(lesson.description)}</p>
                    ${isCurrent && !completed ? `<p class="course-progress">${state.progress} von 10 Wörtern gelernt</p>` : ""}
                    ${words}
                </article>`;
            }).join("")}
            ${allComplete ? `
                <article class="course-lesson ${canReviewToday ? "is-current" : "is-locked"}">
                    <div class="course-lesson-heading"><div>
                        <span class="course-tone">Alle Themen · gemischte Töne</span>
                        <h3>Tägliche Wiederholung</h3>
                    </div>${canReviewToday
                        ? `<button class="action-btn btn-primary" type="button" onclick="startDailyLesson('review')">${review.progress ? `Weiterlernen (${review.progress}/10)` : "10 Wörter wiederholen"}</button>`
                        : `<span class="course-status">${reviewCompletedToday ? "✓ Heute erledigt" : "Morgen wieder verfügbar"}</span>`}</div>
                    <p>${reviewCompletedToday
                        ? "Stark! Morgen wartet eine neue gemischte Runde auf dich."
                        : "Wiederhole jeden Tag zehn zufällig gemischte Wörter und Töne."}</p>
                    ${canReviewToday && review.progress ? `<p class="course-progress">${review.progress} von 10 Wörtern gelernt</p>` : ""}
                </article>
            ` : ""}
            <p class="course-progress">Dein Fortschritt bleibt auf diesem Gerät gespeichert.</p>
        `;
    };

    window.getDailyLessonSession = function getCourseLessonSession(id) {
        if (String(id) === "review") {
            const review = getDailyReview();
            const lastLesson = courseLessons[courseLessons.length - 1];
            if (completedLessonCount !== courseLessons.length ||
                lessons[lastLesson.id].completedAt >= localDateKey() ||
                review.completed) return null;

            const reviewWords = review.words
                .map(thai => vocabs.find(word => word.thai === thai))
                .filter(Boolean);
            if (reviewWords.length !== 10) return null;
            saveDailyReview(review);
            return { id: "review", name: "Tägliche Wiederholung", words: reviewWords, progress: review.progress };
        }

        const lesson = courseLessons.find(item => item.id === Number(id));
        const index = courseLessons.indexOf(lesson);
        if (!lesson || index !== completedLessonCount) return null;
        const previous = index > 0 ? lessons[courseLessons[index - 1].id] : null;
        const progress = lessons[lesson.id].progress;
        if (previous && (!previous.completed || (!progress && previous.completedAt >= localDateKey()))) return null;
        return { id: lesson.id, name: lesson.name, words: lesson.words, progress };
    };

    window.recordDailyLessonAnswer = function recordCourseLessonAnswer(id, nextProgress) {
        if (!activeDailySession || String(activeDailySession.id) !== String(id) ||
            nextProgress !== activeDailySession.progress + 1 ||
            nextProgress > activeDailySession.words.length) return false;

        activeDailySession.progress = nextProgress;
        if (activeDailySession.id === "review") {
            const review = getDailyReview();
            review.progress = nextProgress;
            if (nextProgress === 10) review.completed = true;
            saveDailyReview(review);
            if (nextProgress === 10) {
                xp += 50;
                updateHUD();
            }
            return nextProgress === 10;
        }

        const state = lessons[id];
        state.progress = nextProgress;
        if (nextProgress === 10) {
            state.completed = true;
            state.completedAt = localDateKey();
            xp += 50;
            updateHUD();
            const newlyUnlocked = courseLessons[id];
            if (newlyUnlocked) {
                const existing = new Set(vocabs.map(word => word.thai));
                const newlyUnlockedWords = [
                    ...newlyUnlocked.words,
                    ...customVocabs.filter(word => word.lesson === newlyUnlocked.id)
                ];
                newlyUnlockedWords.forEach(word => {
                    if (!existing.has(word.thai)) {
                        vocabs.push(word);
                        existing.add(word.thai);
                    }
                });
            }
        }
        saveDailyLessons();
        return nextProgress === 10;
    };

    window.startDailyLesson = function startCourseLesson(id) {
        const session = window.getDailyLessonSession(id);
        if (!session) {
            window.renderLessons();
            return;
        }
        activeDailySession = session;
        renderDailyQuestion(session.progress);
    };

    function renderDailyQuestion(index, feedback = null) {
        const word = activeDailySession.words[index];
        if (!word) {
            renderDailyCompletion();
            return;
        }

        const isPractice = index % 2 === 0;
        const title = isPractice ? "🏋️ Üben mit Hinweisen" : "🎓 Prüfung ohne Hinweise";
        const candidates = [...new Map(vocabs
            .filter(candidate => candidate.meaning !== word.meaning)
            .map(candidate => [candidate.meaning, candidate.meaning])).values()];
        for (let i = candidates.length - 1; i > 0; i--) {
            const swapIndex = Math.floor(Math.random() * (i + 1));
            [candidates[i], candidates[swapIndex]] = [candidates[swapIndex], candidates[i]];
        }
        const options = [word.meaning, ...candidates.slice(0, 3)];
        for (let i = options.length - 1; i > 0; i--) {
            const swapIndex = Math.floor(Math.random() * (i + 1));
            [options[i], options[swapIndex]] = [options[swapIndex], options[i]];
        }

        container.innerHTML = `
            <div class="daily-session-title">
                <span class="course-tone">${title}</span>
                <span class="course-status">${index + 1} / 10</span>
            </div>
            <div class="daily-progress-track"><div class="daily-progress-fill" style="width:${index * 10}%"></div></div>
            <div class="daily-question">
                <div class="word-row" style="justify-content:center">
                    <div class="daily-question-word" lang="th">${escapeHtml(word.thai)}</div>
                    <button class="audio-btn" type="button" data-daily-audio="${escapeHtml(word.thai)}" aria-label="Wort anhören">🔊</button>
                </div>
                ${isPractice ? `<p class="daily-question-hint">${escapeHtml(word.translit)} · ${escapeHtml(toneDetails[word.tone].name)}</p>` : ""}
                <p>${isPractice ? "Was bedeutet dieses Wort?" : "Erinnerst du dich an die Bedeutung?"}</p>
                ${feedback ? `
                    <div class="daily-feedback ${feedback.correct ? "is-correct" : "is-incorrect"}">
                        ${feedback.correct ? "Richtig! Gut gemacht." : `Noch nicht ganz. Die richtige Bedeutung ist: ${escapeHtml(word.meaning)}.`}
                        <p>Ton: ${escapeHtml(toneDetails[word.tone].name)}</p>
                    </div>
                    <button class="action-btn btn-primary" type="button" onclick="continueDailyLesson()">Weiter ➔</button>
                ` : `<div class="daily-choices">${options.map((option, optionIndex) => `
                    <button class="daily-choice" type="button" onclick="answerDailyLesson(${index}, ${optionIndex})">${escapeHtml(option)}</button>`).join("")}</div>`}
            </div>
        `;
        container.querySelector("[data-daily-audio]")?.addEventListener("click", event => {
            playAudio(event.currentTarget.dataset.dailyAudio);
        });
        if (!feedback) {
            window.dailyAnswerOptions = options;
        }
    }

    window.answerDailyLesson = function answerCourseLesson(index, optionIndex) {
        if (!activeDailySession || index !== activeDailySession.progress ||
            !Array.isArray(window.dailyAnswerOptions)) return;
        const word = activeDailySession.words[index];
        const selectedMeaning = window.dailyAnswerOptions[optionIndex];
        if (typeof selectedMeaning !== "string") return;
        const correct = selectedMeaning === word.meaning;
        if (correct) {
            xp += 5;
            updateHUD();
        }
        const completed = window.recordDailyLessonAnswer(activeDailySession.id, index + 1);
        window.dailyAnswerOptions = null;
        if (completed) {
            renderDailyCompletion();
            return;
        }
        renderDailyQuestion(index, { correct });
    };

    window.continueDailyLesson = function continueCourseLesson() {
        if (!activeDailySession) return;
        window.startDailyLesson(activeDailySession.id);
    };

    function renderDailyCompletion() {
        const isReview = activeDailySession?.id === "review";
        const title = isReview ? "Tageswiederholung geschafft!" : "Tageslektion abgeschlossen!";
        container.innerHTML = `
            <div class="daily-question">
                <div style="font-size:3rem">🎉</div>
                <h3>${title}</h3>
                <p>Du hast alle 10 Wörter bearbeitet. +50 XP Bonus!</p>
                <button class="action-btn btn-primary" type="button" onclick="finishDailyLesson()">Weiter zum Lernpfad</button>
            </div>
        `;
    }

    window.finishDailyLesson = function finishCourseLesson() {
        activeDailySession = null;
        window.renderLessons();
    };

    window.completeLesson = function completeCourseLesson(id) {
        console.warn("Lektionen werden automatisch nach zehn beantworteten Wörtern abgeschlossen.", id);
    };

    const lessonSelect = document.getElementById("input-lesson");
    if (lessonSelect) {
        lessonSelect.innerHTML = courseLessons.slice(0, unlockedLessonCount).map(lesson =>
            `<option value="${lesson.id}">${escapeHtml(lesson.name)}</option>`
        ).join("");
    }

    const navButtons = Array.from(document.querySelectorAll(".nav-btn"));
    const lessonTab = navButtons.find(button => button.getAttribute("onclick") === "switchTab('lessons')");
    const addTab = navButtons.find(button => button.getAttribute("onclick") === "switchTab('add')");
    const lessonsTitle = document.querySelector("#section-lessons h3");
    const addTitle = document.querySelector("#section-add h3, #section-add h2");
    if (lessonTab) lessonTab.textContent = "📅 Tageslektion";
    if (addTab) addTab.textContent = "+ Eigene Wörter";
    if (lessonsTitle) lessonsTitle.textContent = "Dein täglicher Lernpfad";
    if (addTitle) addTitle.textContent = "Eigenes Wort hinzufügen (optional)";

    if (container) {
        window.renderLessons();
        window.switchTab("lessons");
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installProgressiveCourse, { once: true });
} else {
    installProgressiveCourse();
}
