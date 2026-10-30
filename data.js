// A bundled starter course keeps the app useful offline and removes the need
// to enter the core vocabulary by hand.
const courseLessons = [
    {
        id: 1,
        name: "1. Erste Schritte: Mittelton",
        tone: 0,
        description: "Fünf nützliche Wörter mit gleichbleibender Tonhöhe.",
        words: [
            { thai: "มา", translit: "maa", meaning: "kommen", tone: 0, lesson: 1 },
            { thai: "ไป", translit: "bpai", meaning: "gehen / fahren", tone: 0, lesson: 1 },
            { thai: "ดู", translit: "duu", meaning: "sehen / anschauen", tone: 0, lesson: 1 },
            { thai: "ดี", translit: "dii", meaning: "gut", tone: 0, lesson: 1 },
            { thai: "คน", translit: "khon", meaning: "Person / Mensch", tone: 0, lesson: 1 }
        ]
    },
    {
        id: 2,
        name: "2. Alltag: Tiefton",
        tone: 1,
        description: "Ein tiefer, gleichmäßig fallender Ton für Alltag und Essen.",
        words: [
            { thai: "ไข่", translit: "khài", meaning: "Ei", tone: 1, lesson: 2 },
            { thai: "ใหม่", translit: "mài", meaning: "neu", tone: 1, lesson: 2 },
            { thai: "ป่า", translit: "pàa", meaning: "Wald", tone: 1, lesson: 2 },
            { thai: "เก่า", translit: "kào", meaning: "alt", tone: 1, lesson: 2 },
            { thai: "ข่าว", translit: "khàao", meaning: "Nachricht", tone: 1, lesson: 2 }
        ]
    },
    {
        id: 3,
        name: "3. Zuhause & Gespräche: Fallender Ton",
        tone: 2,
        description: "Der Ton beginnt höher und fällt deutlich ab.",
        words: [
            { thai: "ข้าว", translit: "khâao", meaning: "Reis", tone: 2, lesson: 3 },
            { thai: "บ้าน", translit: "bâan", meaning: "Haus / Zuhause", tone: 2, lesson: 3 },
            { thai: "พูด", translit: "phûut", meaning: "sprechen", tone: 2, lesson: 3 },
            { thai: "ใช่", translit: "châi", meaning: "ja / richtig", tone: 2, lesson: 3 },
            { thai: "เล่น", translit: "lên", meaning: "spielen", tone: 2, lesson: 3 }
        ]
    },
    {
        id: 4,
        name: "4. Dinge & Eigenschaften: Hochton",
        tone: 3,
        description: "Halte die Stimme hoch – diese Wörter haben einen hohen Ton.",
        words: [
            { thai: "รัก", translit: "rák", meaning: "lieben / Liebe", tone: 3, lesson: 4 },
            { thai: "นก", translit: "nók", meaning: "Vogel", tone: 3, lesson: 4 },
            { thai: "รถ", translit: "rót", meaning: "Auto / Fahrzeug", tone: 3, lesson: 4 },
            { thai: "ม้า", translit: "máa", meaning: "Pferd", tone: 3, lesson: 4 },
            { thai: "นั้น", translit: "nán", meaning: "jenes / das dort", tone: 3, lesson: 4 }
        ]
    },
    {
        id: 5,
        name: "5. Tiere & Fragen: Steigender Ton",
        tone: 4,
        description: "Die Stimme steigt vom tiefen zum hohen Ton.",
        words: [
            { thai: "ขาว", translit: "khǎao", meaning: "weiß", tone: 4, lesson: 5 },
            { thai: "หมา", translit: "mǎa", meaning: "Hund", tone: 4, lesson: 5 },
            { thai: "หมู", translit: "mǔu", meaning: "Schwein / Schweinefleisch", tone: 4, lesson: 5 },
            { thai: "หิว", translit: "hǐw", meaning: "hungrig", tone: 4, lesson: 5 },
            { thai: "ไหน", translit: "nǎi", meaning: "wo / welcher", tone: 4, lesson: 5 }
        ]
    }
];

const allCourseWords = courseLessons.flatMap(lesson => lesson.words);
const courseWordByThai = new Map(allCourseWords.map(word => [word.thai, word]));
const legacyStarterWords = new Set(["สวัสดี", "ขอบคุณ", "ไม่", "น้ำ", "กิน", "หิว"]);
const savedVocabs = JSON.parse(localStorage.getItem("thai_quest_vocabs") || "[]");
const savedLessons = JSON.parse(localStorage.getItem("thai_quest_lessons") || "{}");
const customVocabs = [...new Map((Array.isArray(savedVocabs) ? savedVocabs : [])
    .filter(word =>
        word &&
        typeof word.thai === "string" &&
        !courseWordByThai.has(word.thai) &&
        !legacyStarterWords.has(word.thai)
    )
    .map(word => [word.thai, word])
).values()];

const firstIncompleteLesson = courseLessons.findIndex((lesson, index) =>
    !savedLessons[lesson.id]?.completed ||
    (index > 0 && !courseLessons.slice(0, index).every(previous => savedLessons[previous.id]?.completed))
);
const completedLessonCount = firstIncompleteLesson === -1 ? courseLessons.length : firstIncompleteLesson;

let lessons = Object.fromEntries(courseLessons.map((lesson, index) => [
    lesson.id,
    { name: lesson.name, completed: index < completedLessonCount }
]));

const unlockedLessonCount = Math.min(completedLessonCount + 1, courseLessons.length);
let vocabs = [
    ...courseLessons.slice(0, unlockedLessonCount).flatMap(lesson => lesson.words),
    ...customVocabs.filter(word => {
        const lesson = Number.parseInt(word.lesson, 10) || 1;
        return lesson <= unlockedLessonCount;
    })
];

const toneDetails = {
    0: { name: "Mittelton (Mid)" },
    1: { name: "Tiefton (Low)" },
    2: { name: "Fallender Ton (Falling)" },
    3: { name: "Hochton (High)" },
    4: { name: "Steigender Ton (Rising)" }
};

function installProgressiveCourse() {
    const container = document.getElementById("lessons-container");
    const style = document.createElement("style");
    style.textContent = `
        .course-intro { margin: 0 0 16px; color: #cbd5e1; line-height: 1.6; }
        .course-lesson { margin: 12px 0; padding: 18px; border: 1px solid #334155; border-radius: 14px; background: #0f172a; }
        .course-lesson.is-current { border-color: #38bdf8; }
        .course-lesson.is-locked { opacity: .58; }
        .course-lesson-heading { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
        .course-lesson h3 { margin: 0 0 6px; color: #f8fafc; font-size: 1.05rem; }
        .course-lesson p { margin: 5px 0 12px; color: #cbd5e1; }
        .course-tone { color: #38bdf8; font-size: .78rem; font-weight: 700; text-transform: uppercase; }
        .course-words { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; margin: 14px 0; }
        .course-word { padding: 10px; border-radius: 10px; background: #1e293b; color: #e2e8f0; text-align: left; }
        .course-word strong { display: block; color: #f8fafc; font-size: 1.25rem; }
        .course-word small { color: #94a3b8; }
        .course-status { white-space: nowrap; color: #94a3b8; font-size: .82rem; }
        .course-intro-note { color: #94a3b8; font-size: .9rem; }
    `;
    document.head.appendChild(style);

    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[character]);

    window.renderLessons = function renderCourseLessons() {
        const nextIndex = courseLessons.findIndex(lesson => !lessons[lesson.id].completed);
        const activeIndex = nextIndex === -1 ? courseLessons.length : nextIndex;
        container.innerHTML = `
            <p class="course-intro">Lerne die Wörter in kleinen Paketen. Übe sie im Trainingsmodus und schließe ein Paket ab, wenn du bereit bist. Dadurch wird automatisch die nächste Lektion freigeschaltet.</p>
            ${courseLessons.map((lesson, index) => {
                const completed = lessons[lesson.id].completed;
                const isCurrent = index === activeIndex;
                const status = completed ? "Abgeschlossen" : isCurrent ? "Jetzt verfügbar" : "🔒 Gesperrt";
                const words = index <= activeIndex
                    ? `<div class="course-words">${lesson.words.map(word => `
                        <button class="course-word" type="button" onclick="playAudio('${escapeHtml(word.thai)}')" aria-label="${escapeHtml(word.meaning)} anhören">
                            <strong lang="th">${escapeHtml(word.thai)}</strong>
                            ${escapeHtml(word.translit)}<br><small>${escapeHtml(word.meaning)}</small>
                        </button>`).join("")}</div>`
                    : "";
                const action = completed
                    ? `<span class="course-status">✓ ${status}</span>`
                    : isCurrent
                        ? `<button class="action-btn btn-primary" type="button" onclick="completeLesson(${lesson.id})">Gelernt – nächste Lektion freischalten</button>`
                        : `<span class="course-status">${status}</span>`;
                return `<article class="course-lesson ${completed ? "is-complete" : isCurrent ? "is-current" : "is-locked"}">
                    <div class="course-lesson-heading"><div>
                        <span class="course-tone">${escapeHtml(toneDetails[lesson.tone].name)} · ${lesson.words.length} Wörter</span>
                        <h3>${escapeHtml(lesson.name)}</h3>
                    </div>${action}</div>
                    <p>${escapeHtml(lesson.description)}</p>
                    ${words}
                </article>`;
            }).join("")}
            <p class="course-intro-note">Dein Fortschritt und eigene Wörter bleiben auf diesem Gerät gespeichert.</p>
        `;
    };

    window.completeLesson = function completeCourseLesson(id) {
        const currentIndex = courseLessons.findIndex(lesson => !lessons[lesson.id].completed);
        const nextLesson = courseLessons[currentIndex];
        if (!nextLesson) {
            return;
        }
        if (Number(id) !== nextLesson.id) {
            console.warn("Ignored an out-of-order lesson completion request.", id);
            return;
        }

        lessons[nextLesson.id].completed = true;
        const newlyUnlocked = courseLessons[currentIndex + 1];
        if (newlyUnlocked) {
            const unlockedWords = [
                ...newlyUnlocked.words,
                ...customVocabs.filter(word => Number.parseInt(word.lesson, 10) === newlyUnlocked.id)
            ];
            const existingWords = new Set(vocabs.map(word => word.thai));
            unlockedWords.forEach(word => {
                if (!existingWords.has(word.thai)) {
                    vocabs.push(word);
                    existingWords.add(word.thai);
                }
            });
        }

        localStorage.setItem("thai_quest_lessons", JSON.stringify(lessons));
        localStorage.setItem("thai_quest_vocabs", JSON.stringify(vocabs));
        xp += 50;
        updateHUD();
        renderLessons();
    };

    const lessonSelect = document.getElementById("input-lesson");
    if (lessonSelect) {
        const unlocked = courseLessons.slice(0, unlockedLessonCount);
        lessonSelect.innerHTML = unlocked.map(lesson =>
            `<option value="${lesson.id}">${escapeHtml(lesson.name)}</option>`
        ).join("");
    }

    const navButtons = Array.from(document.querySelectorAll(".nav-btn"));
    const lessonTab = navButtons.find(button => button.getAttribute("onclick") === "switchTab('lessons')");
    const addTab = navButtons.find(button => button.getAttribute("onclick") === "switchTab('add')");
    const lessonsTitle = document.querySelector("#section-lessons h3");
    const addTitle = document.querySelector("#section-add h3, #section-add h2");
    if (lessonTab) lessonTab.textContent = "📦 Lernpfad";
    if (addTab) addTab.textContent = "+ Eigene Wörter";
    if (lessonsTitle) lessonsTitle.textContent = "Dein Lernpfad";
    if (addTitle) addTitle.textContent = "Eigenes Wort hinzufügen (optional)";

    if (container) window.renderLessons();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installProgressiveCourse, { once: true });
} else {
    installProgressiveCourse();
}
