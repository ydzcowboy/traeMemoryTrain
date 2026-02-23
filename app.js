// 存储打卡记录的key
const STORAGE_KEY = 'memory_training_records';

// 应用状态
let appState = {
    currentSection: 'home',
    todayRecords: [],
    
    // 达标训练 - 单词
    wordData: [],
    wordStartTime: 0,
    wordResults: [],
    
    // 达标训练 - 古诗
    poemData: null,
    poemStartTime: 0,
    
    // 进阶训练 - 数字
    numberData: [],
    numberTimer: null,
    numberStartTime: 0,
    
    // 进阶训练 - 词汇
    vocabData: [],
    vocabTimer: null,
    vocabStartTime: 0,
    
    // 高阶训练 - 字母
    letterData: [],
    letterTimer: null,
    letterStartTime: 0,
    
    // 高阶训练 - 扑克牌
    pokerData: [],
    pokerTimer: null,
    pokerStartTime: 0,
    
    // 计时器
    timers: {}
};

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    displayCurrentDate();
    initNavigation();
    initTabs();
    loadTodayRecords();
    updateTodayStats();
    loadRecordsToFilter();
}

// 显示当前日期
function displayCurrentDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('zh-CN', options);
}

// 初始化导航
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.dataset.section;
            switchSection(section);
            
            // 更新按钮状态
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 切换区块
function switchSection(section) {
    appState.currentSection = section;
    
    // 隐藏所有区块
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    
    // 显示目标区块
    document.getElementById(section + 'Section').classList.add('active');
    
    // 刷新记录页
    if (section === 'records') {
        renderRecords();
    }
}

// 初始化标签页
function initTabs() {
    // 达标训练标签页
    document.querySelectorAll('#basicSection .tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            switchBasicTab(tab);
        });
    });
    
    // 进阶训练标签页
    document.querySelectorAll('#intermediateSection .tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            switchIntermediateTab(tab);
        });
    });
    
    // 高阶训练标签页
    document.querySelectorAll('#advancedSection .tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            switchAdvancedTab(tab);
        });
    });
}

function switchBasicTab(tab) {
    document.querySelectorAll('#basicSection .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('#basicSection .tab-btn[data-tab="' + tab + '"]').classList.add('active');
    
    document.querySelectorAll('#basicSection .training-content').forEach(c => c.classList.remove('active'));
    
    if (tab === 'word') {
        document.getElementById('wordTraining').classList.add('active');
        showWordStartPhase();
    } else {
        document.getElementById('poemTraining').classList.add('active');
        showPoemStartPhase();
    }
}

function switchIntermediateTab(tab) {
    document.querySelectorAll('#intermediateSection .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('#intermediateSection .tab-btn[data-tab="' + tab + '"]').classList.add('active');
    
    document.querySelectorAll('#intermediateSection .training-content').forEach(c => c.classList.remove('active'));
    
    if (tab === 'number') {
        document.getElementById('numberTraining').classList.add('active');
        showNumberStartPhase();
    } else {
        document.getElementById('vocabTraining').classList.add('active');
        showVocabStartPhase();
    }
}

function switchAdvancedTab(tab) {
    document.querySelectorAll('#advancedSection .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('#advancedSection .tab-btn[data-tab="' + tab + '"]').classList.add('active');
    
    document.querySelectorAll('#advancedSection .training-content').forEach(c => c.classList.remove('active'));
    
    if (tab === 'letter') {
        document.getElementById('letterTraining').classList.add('active');
        showLetterStartPhase();
    } else {
        document.getElementById('pokerTraining').classList.add('active');
        showPokerStartPhase();
    }
}

// ========== 达标训练 - 英语单词 ==========

function startBasicTraining() {
    switchSection('basic');
    document.querySelectorAll('.nav-btn')[1].click();
    if (!appState.wordData.length) initWordTraining();
}

function showWordStartPhase() {
    document.getElementById('wordStartPhase').classList.remove('hidden');
    document.getElementById('wordStudyPhase').classList.add('hidden');
    document.getElementById('wordTestPhase').classList.add('hidden');
    document.getElementById('wordResultPhase').classList.add('hidden');
}

function initWordTraining() {
    // 随机选择5个单词
    const shuffled = [...VOCABULARY_DATA].sort(() => Math.random() - 0.5);
    appState.wordData = shuffled.slice(0, 5);
    appState.wordStudyStartTime = Date.now();
    appState.wordResults = [];
    
    // 显示单词学习
    showWordStudyPhase();
    startWordTimer();
}

function showWordStudyPhase() {
    document.getElementById('wordStartPhase').classList.add('hidden');
    document.getElementById('wordStudyPhase').classList.remove('hidden');
    document.getElementById('wordTestPhase').classList.add('hidden');
    document.getElementById('wordResultPhase').classList.add('hidden');
    
    const wordList = document.getElementById('wordList');
    wordList.innerHTML = appState.wordData.map(w => `
        <div class="word-item">
            <div class="word">${w.word}</div>
            <div class="phonetic">${w.phonetic}</div>
            <div class="meaning">${w.meaning}</div>
        </div>
    `).join('');
}

function startWordTimer() {
    appState.wordStartTime = Date.now();
    appState.timers.word = setInterval(() => {
        const elapsed = Math.floor((Date.now() - appState.wordStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        document.getElementById('wordTimer').textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function startWordTest() {
    clearInterval(appState.timers.word);
    appState.wordTestStartTime = Date.now();
    
    document.getElementById('wordStudyPhase').classList.add('hidden');
    document.getElementById('wordTestPhase').classList.remove('hidden');
    
    // 启动测试阶段计时器
    appState.timers.wordTest = setInterval(() => {
        const elapsed = Math.floor((Date.now() - appState.wordTestStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        document.getElementById('wordTimerTest').textContent = `${minutes}:${seconds}`;
    }, 1000);
    
    const testItems = document.getElementById('wordTestItems');
    testItems.innerHTML = appState.wordData.map((w, i) => `
        <div class="test-item">
            <div class="meaning">${i + 1}. ${w.meaning}</div>
            <input type="text" id="wordInput${i}" placeholder="请输入英文单词" autocomplete="off">
        </div>
    `).join('');
    
    // 聚焦第一个输入框
    document.getElementById('wordInput0').focus();
}

function submitWordTest() {
    clearInterval(appState.timers.wordTest);
    
    let correct = 0;
    let errors = 0;
    const results = [];
    
    appState.wordData.forEach((w, i) => {
        const input = document.getElementById('wordInput' + i);
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = w.word.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            correct++;
            input.classList.add('correct');
            results.push({ correct: true, word: w.word, answer: userAnswer });
        } else {
            errors++;
            input.classList.add('wrong');
            results.push({ correct: false, word: w.word, answer: userAnswer });
        }
    });
    
    const studyTime = Math.floor((appState.wordTestStartTime - appState.wordStudyStartTime) / 1000);
    const testTime = Math.floor((Date.now() - appState.wordTestStartTime) / 1000);
    const totalTime = studyTime + testTime;
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    const timeStr = `${minutes}分${seconds}秒`;
    
    appState.wordResults = results;
    
    // 保存记录
    saveRecord({
        date: getTodayDate(),
        type: 'basic',
        subType: 'word',
        time: timeStr,
        correct: correct,
        total: 5,
        accuracy: (correct / 5 * 100).toFixed(1)
    });
    
    // 显示结果
    showWordResult(correct, errors, timeStr);
    
    // 更新今日统计
    loadTodayRecords();
    updateTodayStats();
}

function showWordResult(correct, errors, timeStr) {
    document.getElementById('wordTestPhase').classList.add('hidden');
    document.getElementById('wordResultPhase').classList.remove('hidden');
    
    const accuracy = (correct / 5 * 100).toFixed(1);
    
    document.getElementById('wordResultSummary').innerHTML = `
        <h4>单词测试结果</h4>
        <div class="score">${accuracy}%</div>
        <div class="details">
            <p>完成时间：${timeStr}</p>
            <p>正确数：${correct} / 5</p>
            <p>错误数：${errors}</p>
        </div>
        <div class="correct-answers">
            <h5>答案详情：</h5>
            ${appState.wordResults.map(r => `
                <p style="color: ${r.correct ? '#28a745' : '#dc3545'}">
                    ${r.word} - ${r.answer || '(未填写)'} ${r.correct ? '✓' : '✗'}
                </p>
            `).join('')}
        </div>
    `;
}

function resetWordTraining() {
    clearInterval(appState.timers.word);
    clearInterval(appState.timers.wordTest);
    appState.wordData = [];
    showWordStartPhase();
}

// ========== 达标训练 - 古诗 ==========

function showPoemStartPhase() {
    document.getElementById('poemStartPhase').classList.remove('hidden');
    document.getElementById('poemStudyPhase').classList.add('hidden');
    document.getElementById('poemTestPhase').classList.add('hidden');
    document.getElementById('poemResultPhase').classList.add('hidden');
}

function initPoemTraining() {
    // 随机选择一首古诗
    const randomIndex = Math.floor(Math.random() * POEM_DATA.length);
    appState.poemData = POEM_DATA[randomIndex];
    appState.poemStudyStartTime = Date.now();
    
    showPoemStudyPhase();
    startPoemTimer();
}

function showPoemStudyPhase() {
    document.getElementById('poemStartPhase').classList.add('hidden');
    document.getElementById('poemStudyPhase').classList.remove('hidden');
    document.getElementById('poemTestPhase').classList.add('hidden');
    document.getElementById('poemResultPhase').classList.add('hidden');
    
    const poem = appState.poemData;
    const linesHtml = poem.lines.map((line, lineIndex) => {
        const charsHtml = line.chars.split('').map((char, charIndex) => {
            const pinyinArr = line.pinyin.split(' ');
            const p = pinyinArr[charIndex] || '';
            return `
                <div class="poem-char-group">
                    <div class="pinyin">${p}</div>
                    <div class="char">${char}</div>
                </div>
            `;
        }).join('');
        return `<div class="poem-line">${charsHtml}</div>`;
    }).join('');
    
    document.getElementById('poemCard').innerHTML = `
        <h4>《${poem.title}》</h4>
        <p class="author">【${poem.author}】</p>
        ${linesHtml}
    `;
}

function startPoemTimer() {
    appState.poemStartTime = Date.now();
    appState.timers.poem = setInterval(() => {
        const elapsed = Math.floor((Date.now() - appState.poemStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        document.getElementById('poemTimer').textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function startPoemTest() {
    clearInterval(appState.timers.poem);
    appState.poemTestStartTime = Date.now();
    
    // 启动测试阶段计时器
    appState.timers.poemTest = setInterval(() => {
        const elapsed = Math.floor((Date.now() - appState.poemTestStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        document.getElementById('poemTimerTest').textContent = `${minutes}:${seconds}`;
    }, 1000);
    
    document.getElementById('poemStudyPhase').classList.add('hidden');
    document.getElementById('poemTestPhase').classList.remove('hidden');
    
    const poem = appState.poemData;
    
    // 显示标点提示（每句的标点符号）
    const promptHtml = poem.lines.map((line, i) => {
        // 提取标点符号
        const punctuation = line.chars.match(/[，。？！]/g) || [];
        const punctStr = punctuation.join('');
        return `<div class="poem-line-prompt">第${i + 1}句：${punctStr || '无'}</div>`;
    }).join('');
    
    document.getElementById('poemPrompt').innerHTML = promptHtml;
    
    // 生成输入框（每句一个）
    const inputHtml = poem.lines.map((line, i) => {
        const charCount = line.chars.replace(/[，。？！]/g, '').length;
        // 生成下划线
        const blanks = '____ '.repeat(charCount).trim();
        return `
            <div class="poem-line-input">
                <div class="line-label">第 ${i + 1} 句</div>
                <input type="text" id="poemInput${i}" placeholder="${blanks}">
            </div>
        `;
    }).join('');
    
    document.getElementById('poemInputArea').innerHTML = inputHtml;
    document.getElementById('poemInput0').focus();
}

function submitPoemTest() {
    const poem = appState.poemData;
    let correct = 0;
    let total = 0;
    const results = [];
    
    poem.lines.forEach((line, i) => {
        const input = document.getElementById('poemInput' + i);
        const userAnswer = input.value.trim();
        const correctAnswer = line.chars;
        
        // 去掉标点后比较
        const cleanAnswer = userAnswer.replace(/[，。？！、\s]/g, '');
        const cleanCorrect = correctAnswer.replace(/[，。？！、\s]/g, '');
        
        let lineCorrect = 0;
        const minLen = Math.min(cleanAnswer.length, cleanCorrect.length);
        for (let j = 0; j < minLen; j++) {
            if (cleanAnswer[j] === cleanCorrect[j]) {
                lineCorrect++;
            }
        }
        
        const lineAccuracy = cleanCorrect.length > 0 ? (lineCorrect / cleanCorrect.length) * 100 : 0;
        
        if (lineAccuracy >= 80) {
            correct++;
            input.classList.add('correct');
        } else {
            input.classList.add('wrong');
        }
        
        total++;
        results.push({ 
            correct: lineAccuracy >= 80, 
            answer: userAnswer, 
            correctAnswer: correctAnswer,
            accuracy: lineAccuracy.toFixed(1)
        });
    });
    
    clearInterval(appState.timers.poemTest);
    
    const accuracy = (correct / total * 100).toFixed(1);
    const isCorrect = accuracy >= 80;
    
    const studyTime = Math.floor((appState.poemTestStartTime - appState.poemStartTime) / 1000);
    const testTime = Math.floor((Date.now() - appState.poemTestStartTime) / 1000);
    const totalTime = studyTime + testTime;
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    const timeStr = `${minutes}分${seconds}秒`;
    
    // 保存记录
    saveRecord({
        date: getTodayDate(),
        type: 'basic',
        subType: 'poem',
        time: timeStr,
        correct: correct,
        total: total,
        accuracy: accuracy
    });
    
    // 显示结果
    showPoemResult(accuracy, isCorrect, timeStr, poem, results);
    
    // 更新今日统计
    loadTodayRecords();
    updateTodayStats();
}

function showPoemResult(accuracy, isCorrect, timeStr, poem, results) {
    document.getElementById('poemTestPhase').classList.add('hidden');
    document.getElementById('poemResultPhase').classList.remove('hidden');
    
    document.getElementById('poemResultSummary').innerHTML = `
        <h4>古诗背诵结果</h4>
        <div class="score">${accuracy}%</div>
        <div class="details">
            <p>完成时间：${timeStr}</p>
            <p>正确：${results.filter(r => r.correct).length} / ${results.length} 句</p>
        </div>
        <div class="correct-answers">
            <h5>答案详情：</h5>
            ${results.map((r, i) => `
                <p style="color: ${r.correct ? '#28a745' : '#dc3545'}">
                    第${i + 1}句：${r.answer || '(未填写)'} ${r.correct ? '✓' : '✗'}
                </p>
                ${!r.correct ? `<p style="color: #666; margin-left: 20px; font-size: 0.9rem;">正确答案：${r.correctAnswer}</p>` : ''}
            `).join('')}
        </div>
    `;
}

function resetPoemTraining() {
    clearInterval(appState.timers.poem);
    clearInterval(appState.timers.poemTest);
    appState.poemData = null;
    showPoemStartPhase();
}

// ========== 进阶训练 - 数字记忆 ==========

function startIntermediateTraining() {
    switchSection('intermediate');
    document.querySelectorAll('.nav-btn')[2].click();
}

function showNumberStartPhase() {
    document.getElementById('numberStartPhase').classList.remove('hidden');
    document.getElementById('numberStudyPhase').classList.add('hidden');
    document.getElementById('numberTestPhase').classList.add('hidden');
    document.getElementById('numberResultPhase').classList.add('hidden');
}

function initNumberTraining() {
    // 生成40个随机数字（每位数字0-9）
    appState.numberData = [];
    for (let i = 0; i < 40; i++) {
        appState.numberData.push(Math.floor(Math.random() * 10));
    }
    
    showNumberStudyPhase();
    startNumberCountdown();
}

function showNumberStudyPhase() {
    document.getElementById('numberStartPhase').classList.add('hidden');
    document.getElementById('numberStudyPhase').classList.remove('hidden');
    document.getElementById('numberTestPhase').classList.add('hidden');
    document.getElementById('numberResultPhase').classList.add('hidden');
}

function startNumberCountdown() {
    let timeLeft = 300; // 5分钟
    appState.numberStartTime = Date.now();
    
    document.getElementById('numberCountdown').textContent = formatTime(timeLeft);
    
    appState.timers.number = setInterval(() => {
        timeLeft--;
        document.getElementById('numberCountdown').textContent = formatTime(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(appState.timers.number);
            startNumberTest();
        }
    }, 1000);
}

function showNumberStudyPhase() {
    document.getElementById('numberStartPhase').classList.add('hidden');
    document.getElementById('numberStudyPhase').classList.remove('hidden');
    document.getElementById('numberTestPhase').classList.add('hidden');
    document.getElementById('numberResultPhase').classList.add('hidden');
    
    const grid = document.getElementById('numberGrid');
    grid.innerHTML = appState.numberData.map(n => `
        <div class="number-cell">${n}</div>
    `).join('');
}

function startNumberTest() {
    clearInterval(appState.timers.number);
    document.getElementById('numberStudyPhase').classList.add('hidden');
    document.getElementById('numberTestPhase').classList.remove('hidden');
    
    // 生成40个输入框
    const grid = document.getElementById('numberInputGrid');
    grid.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'number-input-wrapper';
        
        const indexSpan = document.createElement('span');
        indexSpan.className = 'number-input-index';
        indexSpan.textContent = i + 1;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'numberInput' + i;
        input.maxLength = 1;
        input.dataset.index = i;
        input.inputMode = 'numeric';
        input.pattern = '[0-9]';
        
        input.addEventListener('input', function() {
            // 只保留数字
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // 输入后自动跳到下一个
            if (this.value && i < 39) {
                const nextInput = document.getElementById('numberInput' + (i + 1));
                if (nextInput) nextInput.focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            // 按回车跳到下一个
            if (e.key === 'Enter' && i < 39) {
                const nextInput = document.getElementById('numberInput' + (i + 1));
                if (nextInput) nextInput.focus();
            }
            // 按退格键且当前为空时，跳到上一个
            if (e.key === 'Backspace' && !this.value && i > 0) {
                const prevInput = document.getElementById('numberInput' + (i - 1));
                if (prevInput) {
                    prevInput.focus();
                }
            }
            // 按左箭头跳到上一个
            if (e.key === 'ArrowLeft' && i > 0) {
                const prevInput = document.getElementById('numberInput' + (i - 1));
                if (prevInput) prevInput.focus();
            }
            // 按右箭头跳到下一个
            if (e.key === 'ArrowRight' && i < 39) {
                const nextInput = document.getElementById('numberInput' + (i + 1));
                if (nextInput) nextInput.focus();
            }
        });
        
        wrapper.appendChild(indexSpan);
        wrapper.appendChild(input);
        grid.appendChild(wrapper);
    }
    
    document.getElementById('numberInput0').focus();
}

function submitNumberTest() {
    let correct = 0;
    let errors = 0;
    const results = [];
    
    appState.numberData.forEach((n, i) => {
        const input = document.getElementById('numberInput' + i);
        const userAnswer = parseInt(input.value.trim());
        
        if (userAnswer === n) {
            correct++;
            input.classList.add('correct');
            results.push({ correct: true, expected: n, answer: userAnswer });
        } else {
            errors++;
            input.classList.add('wrong');
            results.push({ correct: false, expected: n, answer: userAnswer });
        }
    });
    
    const elapsed = Math.floor((Date.now() - appState.numberStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeStr = `${minutes}分${seconds}秒`;
    
    // 保存记录
    saveRecord({
        date: getTodayDate(),
        type: 'intermediate',
        subType: 'number',
        time: timeStr,
        correct: correct,
        total: 40,
        accuracy: (correct / 40 * 100).toFixed(1)
    });
    
    // 显示结果
    showNumberResult(correct, errors, timeStr, results);
    
    // 更新今日统计
    loadTodayRecords();
    updateTodayStats();
}

function showNumberResult(correct, errors, timeStr, results) {
    document.getElementById('numberTestPhase').classList.add('hidden');
    document.getElementById('numberResultPhase').classList.remove('hidden');
    
    const accuracy = (correct / 40 * 100).toFixed(1);
    
    document.getElementById('numberResultSummary').innerHTML = `
        <h4>数字记忆测试结果</h4>
        <div class="score">${accuracy}%</div>
        <div class="details">
            <p>完成时间：${timeStr}</p>
            <p>正确数：${correct} / 40</p>
            <p>错误数：${errors}</p>
        </div>
        <div class="correct-answers">
            <h5>答案对比（显示前10个）：</h5>
            ${results.slice(0, 10).map((r, i) => `
                <p style="color: ${r.correct ? '#28a745' : '#dc3545'}">
                    ${i + 1}. 正确答案: ${r.expected} - 你的答案: ${r.answer || '(未填写)'} ${r.correct ? '✓' : '✗'}
                </p>
            `).join('')}
        </div>
    `;
}

function resetNumberTraining() {
    clearInterval(appState.timers.number);
    appState.numberData = [];
    showNumberStartPhase();
}

// ========== 进阶训练 - 词汇记忆 ==========

function showVocabStartPhase() {
    document.getElementById('vocabStartPhase').classList.remove('hidden');
    document.getElementById('vocabStudyPhase').classList.add('hidden');
    document.getElementById('vocabTestPhase').classList.add('hidden');
    document.getElementById('vocabResultPhase').classList.add('hidden');
}

function initVocabTraining() {
    // 随机选择20个词汇
    const shuffled = [...VOCABULARY_WORDS].sort(() => Math.random() - 0.5);
    appState.vocabData = shuffled.slice(0, 20);
    
    showVocabStudyPhase();
    startVocabCountdown();
}

function showVocabStudyPhase() {
    document.getElementById('vocabStartPhase').classList.add('hidden');
    document.getElementById('vocabStudyPhase').classList.remove('hidden');
    document.getElementById('vocabTestPhase').classList.add('hidden');
    document.getElementById('vocabResultPhase').classList.add('hidden');
    
    const list = document.getElementById('vocabList');
    list.innerHTML = appState.vocabData.map((v, i) => `
        <div class="vocab-item">${i + 1}. ${v}</div>
    `).join('');
}

function startVocabCountdown() {
    let timeLeft = 300;
    appState.vocabStartTime = Date.now();
    
    document.getElementById('vocabCountdown').textContent = formatTime(timeLeft);
    
    appState.timers.vocab = setInterval(() => {
        timeLeft--;
        document.getElementById('vocabCountdown').textContent = formatTime(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(appState.timers.vocab);
            startVocabTest();
        }
    }, 1000);
}

function showVocabStudyPhase() {
    document.getElementById('vocabStartPhase').classList.add('hidden');
    document.getElementById('vocabStudyPhase').classList.remove('hidden');
    document.getElementById('vocabTestPhase').classList.add('hidden');
    document.getElementById('vocabResultPhase').classList.add('hidden');
    
    const list = document.getElementById('vocabList');
    list.innerHTML = appState.vocabData.map((v, i) => `
        <div class="vocab-item">${i + 1}. ${v}</div>
    `).join('');
}

function startVocabTest() {
    clearInterval(appState.timers.vocab);
    document.getElementById('vocabStudyPhase').classList.add('hidden');
    document.getElementById('vocabTestPhase').classList.remove('hidden');
    
    const grid = document.getElementById('vocabInputList');
    grid.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'vocabInput' + i;
        input.placeholder = (i + 1).toString();
        grid.appendChild(input);
    }
    
    document.getElementById('vocabInput0').focus();
}

function submitVocabTest() {
    let correct = 0;
    let errors = 0;
    const results = [];
    
    appState.vocabData.forEach((v, i) => {
        const input = document.getElementById('vocabInput' + i);
        const userAnswer = input.value.trim();
        
        if (userAnswer === v) {
            correct++;
            input.classList.add('correct');
            results.push({ correct: true, expected: v, answer: userAnswer });
        } else {
            errors++;
            input.classList.add('wrong');
            results.push({ correct: false, expected: v, answer: userAnswer });
        }
    });
    
    const elapsed = Math.floor((Date.now() - appState.vocabStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeStr = `${minutes}分${seconds}秒`;
    
    // 保存记录
    saveRecord({
        date: getTodayDate(),
        type: 'intermediate',
        subType: 'vocab',
        time: timeStr,
        correct: correct,
        total: 20,
        accuracy: (correct / 20 * 100).toFixed(1)
    });
    
    showVocabResult(correct, errors, timeStr, results);
    loadTodayRecords();
    updateTodayStats();
}

function showVocabResult(correct, errors, timeStr, results) {
    document.getElementById('vocabTestPhase').classList.add('hidden');
    document.getElementById('vocabResultPhase').classList.remove('hidden');
    
    const accuracy = (correct / 20 * 100).toFixed(1);
    
    document.getElementById('vocabResultSummary').innerHTML = `
        <h4>词汇记忆测试结果</h4>
        <div class="score">${accuracy}%</div>
        <div class="details">
            <p>完成时间：${timeStr}</p>
            <p>正确数：${correct} / 20</p>
            <p>错误数：${errors}</p>
        </div>
        <div class="correct-answers">
            <h5>答案对比（显示前10个）：</h5>
            ${results.slice(0, 10).map((r, i) => `
                <p style="color: ${r.correct ? '#28a745' : '#dc3545'}">
                    ${i + 1}. 正确答案: ${r.expected} - 你的答案: ${r.answer || '(未填写)'} ${r.correct ? '✓' : '✗'}
                </p>
            `).join('')}
        </div>
    `;
}

function resetVocabTraining() {
    clearInterval(appState.timers.vocab);
    appState.vocabData = [];
    showVocabStartPhase();
}

// ========== 高阶训练 - 字母记忆 ==========

function startAdvancedTraining() {
    switchSection('advanced');
    document.querySelectorAll('.nav-btn')[3].click();
}

function showLetterStartPhase() {
    document.getElementById('letterStartPhase').classList.remove('hidden');
    document.getElementById('letterStudyPhase').classList.add('hidden');
    document.getElementById('letterTestPhase').classList.add('hidden');
    document.getElementById('letterResultPhase').classList.add('hidden');
}

function initLetterTraining() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    appState.letterData = [];
    const used = new Set();
    
    while (appState.letterData.length < 20) {
        const l = letters[Math.floor(Math.random() * letters.length)];
        if (!used.has(l)) {
            used.add(l);
            appState.letterData.push(l);
        }
    }
    
    showLetterStudyPhase();
    startLetterCountdown();
}

function showLetterStudyPhase() {
    document.getElementById('letterStartPhase').classList.add('hidden');
    document.getElementById('letterStudyPhase').classList.remove('hidden');
    document.getElementById('letterTestPhase').classList.add('hidden');
    document.getElementById('letterResultPhase').classList.add('hidden');
    
    const grid = document.getElementById('letterGrid');
    grid.innerHTML = appState.letterData.map(l => `
        <div class="letter-cell">${l}</div>
    `).join('');
}

function startLetterCountdown() {
    let timeLeft = 300;
    appState.letterStartTime = Date.now();
    
    document.getElementById('letterCountdown').textContent = formatTime(timeLeft);
    
    appState.timers.letter = setInterval(() => {
        timeLeft--;
        document.getElementById('letterCountdown').textContent = formatTime(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(appState.timers.letter);
            startLetterTest();
        }
    }, 1000);
}

function showLetterStudyPhase() {
    document.getElementById('letterStartPhase').classList.add('hidden');
    document.getElementById('letterStudyPhase').classList.remove('hidden');
    document.getElementById('letterTestPhase').classList.add('hidden');
    document.getElementById('letterResultPhase').classList.add('hidden');
    
    const grid = document.getElementById('letterGrid');
    grid.innerHTML = appState.letterData.map(l => `
        <div class="letter-cell">${l}</div>
    `).join('');
}

function startLetterTest() {
    clearInterval(appState.timers.letter);
    document.getElementById('letterStudyPhase').classList.add('hidden');
    document.getElementById('letterTestPhase').classList.remove('hidden');
    
    const grid = document.getElementById('letterInputGrid');
    grid.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'letter-input-wrapper';
        
        const indexSpan = document.createElement('span');
        indexSpan.className = 'letter-input-index';
        indexSpan.textContent = i + 1;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'letterInput' + i;
        input.maxLength = 1;
        input.dataset.index = i;
        
        input.addEventListener('input', function() {
            this.value = this.value.toUpperCase().replace(/[^A-Z]/g, '');
            
            if (this.value && i < 19) {
                const nextInput = document.getElementById('letterInput' + (i + 1));
                if (nextInput) nextInput.focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && i < 19) {
                const nextInput = document.getElementById('letterInput' + (i + 1));
                if (nextInput) nextInput.focus();
            }
            if (e.key === 'Backspace' && !this.value && i > 0) {
                const prevInput = document.getElementById('letterInput' + (i - 1));
                if (prevInput) prevInput.focus();
            }
            if (e.key === 'ArrowLeft' && i > 0) {
                const prevInput = document.getElementById('letterInput' + (i - 1));
                if (prevInput) prevInput.focus();
            }
            if (e.key === 'ArrowRight' && i < 19) {
                const nextInput = document.getElementById('letterInput' + (i + 1));
                if (nextInput) nextInput.focus();
            }
        });
        
        wrapper.appendChild(indexSpan);
        wrapper.appendChild(input);
        grid.appendChild(wrapper);
    }
    
    document.getElementById('letterInput0').focus();
}

function submitLetterTest() {
    let correct = 0;
    let errors = 0;
    const results = [];
    
    appState.letterData.forEach((l, i) => {
        const input = document.getElementById('letterInput' + i);
        const userAnswer = input.value.trim().toUpperCase();
        
        if (userAnswer === l) {
            correct++;
            input.classList.add('correct');
            results.push({ correct: true, expected: l, answer: userAnswer });
        } else {
            errors++;
            input.classList.add('wrong');
            results.push({ correct: false, expected: l, answer: userAnswer });
        }
    });
    
    const elapsed = Math.floor((Date.now() - appState.letterStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeStr = `${minutes}分${seconds}秒`;
    
    saveRecord({
        date: getTodayDate(),
        type: 'advanced',
        subType: 'letter',
        time: timeStr,
        correct: correct,
        total: 20,
        accuracy: (correct / 20 * 100).toFixed(1)
    });
    
    showLetterResult(correct, errors, timeStr, results);
    loadTodayRecords();
    updateTodayStats();
}

function showLetterResult(correct, errors, timeStr, results) {
    document.getElementById('letterTestPhase').classList.add('hidden');
    document.getElementById('letterResultPhase').classList.remove('hidden');
    
    const accuracy = (correct / 20 * 100).toFixed(1);
    
    document.getElementById('letterResultSummary').innerHTML = `
        <h4>字母记忆测试结果</h4>
        <div class="score">${accuracy}%</div>
        <div class="details">
            <p>完成时间：${timeStr}</p>
            <p>正确数：${correct} / 20</p>
            <p>错误数：${errors}</p>
        </div>
        <div class="correct-answers">
            <h5>答案对比：</h5>
            ${results.map((r, i) => `
                <p style="color: ${r.correct ? '#28a745' : '#dc3545'}">
                    ${i + 1}. 正确答案: ${r.expected} - 你的答案: ${r.answer || '(未填写)'} ${r.correct ? '✓' : '✗'}
                </p>
            `).join('')}
        </div>
    `;
}

function resetLetterTraining() {
    clearInterval(appState.timers.letter);
    appState.letterData = [];
    showLetterStartPhase();
}

// ========== 高阶训练 - 扑克牌记忆 ==========

function showPokerStartPhase() {
    document.getElementById('pokerStartPhase').classList.remove('hidden');
    document.getElementById('pokerStudyPhase').classList.add('hidden');
    document.getElementById('pokerTestPhase').classList.add('hidden');
    document.getElementById('pokerResultPhase').classList.add('hidden');
}

function initPokerTraining() {
    // 生成30张随机扑克牌
    const deck = [];
    for (const suit of POKER_SUITS) {
        for (const value of POKER_VALUES) {
            deck.push({ suit, value, display: suit + value });
        }
    }
    
    const shuffled = deck.sort(() => Math.random() - 0.5);
    appState.pokerData = shuffled.slice(0, 30);
    
    showPokerStudyPhase();
    startPokerCountdown();
}

function showPokerStudyPhase() {
    document.getElementById('pokerStartPhase').classList.add('hidden');
    document.getElementById('pokerStudyPhase').classList.remove('hidden');
    document.getElementById('pokerTestPhase').classList.add('hidden');
    document.getElementById('pokerResultPhase').classList.add('hidden');
    
    const grid = document.getElementById('pokerGrid');
    grid.innerHTML = appState.pokerData.map((p, i) => {
        const isRed = p.suit === '♥' || p.suit === '♦';
        return `<div class="poker-card ${isRed ? 'red' : 'black'}">${p.suit}${p.value}</div>`;
    }).join('');
}

function startPokerCountdown() {
    let timeLeft = 300;
    appState.pokerStartTime = Date.now();
    
    document.getElementById('pokerCountdown').textContent = formatTime(timeLeft);
    
    appState.timers.poker = setInterval(() => {
        timeLeft--;
        document.getElementById('pokerCountdown').textContent = formatTime(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(appState.timers.poker);
            startPokerTest();
        }
    }, 1000);
}

function showPokerStudyPhase() {
    document.getElementById('pokerStartPhase').classList.add('hidden');
    document.getElementById('pokerStudyPhase').classList.remove('hidden');
    document.getElementById('pokerTestPhase').classList.add('hidden');
    document.getElementById('pokerResultPhase').classList.add('hidden');
    
    const grid = document.getElementById('pokerGrid');
    grid.innerHTML = appState.pokerData.map((p, i) => {
        const isRed = p.suit === '♥' || p.suit === '♦';
        return `<div class="poker-card ${isRed ? 'red' : 'black'}">${p.suit}${p.value}</div>`;
    }).join('');
}

function startPokerTest() {
    clearInterval(appState.timers.poker);
    document.getElementById('pokerStudyPhase').classList.add('hidden');
    document.getElementById('pokerTestPhase').classList.remove('hidden');
    
    appState.pokerSelectedIndex = 0;
    appState.pokerAnswers = new Array(30).fill(null);
    
    const grid = document.getElementById('pokerInputGrid');
    grid.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const item = document.createElement('div');
        item.className = 'poker-input-item';
        item.id = 'pokerInput' + i;
        item.onclick = () => selectPokerCard(i);
        item.innerHTML = `
            <div class="position">${i + 1}</div>
            <div class="value">?</div>
        `;
        grid.appendChild(item);
    }
    
    // 显示选择器
    showPokerSelector();
    updatePokerInputDisplay();
}

function showPokerSelector() {
    const selectorHtml = `
        <div class="poker-selector" id="pokerSelector">
            <h4>选择第 <span id="currentPokerIndex">1</span> 张牌</h4>
            <div class="suit-selector">
                <span data-suit="♠" class="black" onclick="selectSuit('♠')">♠</span>
                <span data-suit="♥" class="red" onclick="selectSuit('♥')">♥</span>
                <span data-suit="♣" class="black" onclick="selectSuit('♣')">♣</span>
                <span data-suit="♦" class="red" onclick="selectSuit('♦')">♦</span>
            </div>
            <div class="value-selector">
                ${POKER_VALUES.map(v => `<span onclick="selectValue('${v}')">${v}</span>`).join('')}
            </div>
            <button class="confirm-btn" onclick="confirmPokerCard()">确认</button>
        </div>
    `;
    
    // 在输入区域前插入选择器
    const inputGrid = document.getElementById('pokerInputGrid');
    let selector = document.getElementById('pokerSelector');
    if (!selector) {
        inputGrid.insertAdjacentHTML('beforebegin', selectorHtml);
    }
    
    appState.selectedSuit = null;
    appState.selectedValue = null;
    updateSuitSelectorDisplay();
}

function selectSuit(suit) {
    appState.selectedSuit = suit;
    updateSuitSelectorDisplay();
}

function selectValue(value) {
    appState.selectedValue = value;
    updateValueSelectorDisplay();
}

function updateSuitSelectorDisplay() {
    document.querySelectorAll('.poker-selector .suit-selector span').forEach(span => {
        span.classList.toggle('selected', span.dataset.suit === appState.selectedSuit);
    });
}

function updateValueSelectorDisplay() {
    document.querySelectorAll('.poker-selector .value-selector span').forEach(span => {
        span.classList.toggle('selected', span.textContent === appState.selectedValue);
    });
}

function confirmPokerCard() {
    if (!appState.selectedSuit || !appState.selectedValue) {
        alert('请选择花色和数字');
        return;
    }
    
    const display = appState.selectedSuit + appState.selectedValue;
    appState.pokerAnswers[appState.pokerSelectedIndex] = display;
    
    // 移动到下一个位置
    appState.pokerSelectedIndex++;
    
    if (appState.pokerSelectedIndex >= 30) {
        submitPokerTest();
        return;
    }
    
    // 更新显示
    document.getElementById('currentPokerIndex').textContent = appState.pokerSelectedIndex + 1;
    appState.selectedSuit = null;
    appState.selectedValue = null;
    updateSuitSelectorDisplay();
    updateValueSelectorDisplay();
    updatePokerInputDisplay();
}

function selectPokerCard(index) {
    appState.pokerSelectedIndex = index;
    document.getElementById('currentPokerIndex').textContent = index + 1;
    updatePokerInputDisplay();
}

function updatePokerInputDisplay() {
    for (let i = 0; i < 30; i++) {
        const item = document.getElementById('pokerInput' + i);
        const answer = appState.pokerAnswers[i];
        const valueEl = item.querySelector('.value');
        
        if (answer) {
            const isRed = answer.includes('♥') || answer.includes('♦');
            valueEl.textContent = answer;
            valueEl.className = 'value ' + (isRed ? 'red' : 'black');
            item.classList.add('selected');
        } else {
            valueEl.textContent = '?';
            valueEl.className = 'value';
            item.classList.toggle('selected', i === appState.pokerSelectedIndex);
        }
    }
}

function submitPokerTest() {
    let correct = 0;
    let errors = 0;
    const results = [];
    
    appState.pokerData.forEach((p, i) => {
        const userAnswer = appState.pokerAnswers[i];
        const correctAnswer = p.display;
        const item = document.getElementById('pokerInput' + i);
        
        if (userAnswer === correctAnswer) {
            correct++;
            item.classList.add('correct');
            results.push({ correct: true, expected: correctAnswer, answer: userAnswer });
        } else {
            errors++;
            item.classList.add('wrong');
            results.push({ correct: false, expected: correctAnswer, answer: userAnswer });
        }
    });
    
    // 隐藏选择器
    const selector = document.getElementById('pokerSelector');
    if (selector) {
        selector.style.display = 'none';
    }
    
    const elapsed = Math.floor((Date.now() - appState.pokerStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeStr = `${minutes}分${seconds}秒`;
    
    saveRecord({
        date: getTodayDate(),
        type: 'advanced',
        subType: 'poker',
        time: timeStr,
        correct: correct,
        total: 30,
        accuracy: (correct / 30 * 100).toFixed(1)
    });
    
    showPokerResult(correct, errors, timeStr, results);
    loadTodayRecords();
    updateTodayStats();
}

function showPokerResult(correct, errors, timeStr, results) {
    document.getElementById('pokerTestPhase').classList.add('hidden');
    document.getElementById('pokerResultPhase').classList.remove('hidden');
    
    const accuracy = (correct / 30 * 100).toFixed(1);
    
    document.getElementById('pokerResultSummary').innerHTML = `
        <h4>扑克牌记忆测试结果</h4>
        <div class="score">${accuracy}%</div>
        <div class="details">
            <p>完成时间：${timeStr}</p>
            <p>正确数：${correct} / 30</p>
            <p>错误数：${errors}</p>
        </div>
        <div class="correct-answers">
            <h5>答案对比（显示前15个）：</h5>
            ${results.slice(0, 15).map((r, i) => `
                <p style="color: ${r.correct ? '#28a745' : '#dc3545'}">
                    ${i + 1}. 正确答案: ${r.expected} - 你的答案: ${r.answer || '(未填写)'} ${r.correct ? '✓' : '✗'}
                </p>
            `).join('')}
        </div>
    `;
}

function resetPokerTraining() {
    clearInterval(appState.timers.poker);
    appState.pokerData = [];
    
    // 清理选择器
    const selector = document.getElementById('pokerSelector');
    if (selector) {
        selector.remove();
    }
    
    showPokerStartPhase();
}

// ========== 工具函数 ==========

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function getTodayDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

// ========== 记录管理 ==========

function saveRecord(record) {
    const records = getAllRecords();
    records.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function getAllRecords() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function loadTodayRecords() {
    const today = getTodayDate();
    const allRecords = getAllRecords();
    appState.todayRecords = allRecords.filter(r => r.date === today);
}

function updateTodayStats() {
    const records = appState.todayRecords;
    
    const basicComplete = records.some(r => r.type === 'basic');
    const intermediateComplete = records.some(r => r.type === 'intermediate');
    const advancedComplete = records.some(r => r.type === 'advanced');
    
    const basicEl = document.getElementById('basicStatus');
    const intermediateEl = document.getElementById('intermediateStatus');
    const advancedEl = document.getElementById('advancedStatus');
    
    basicEl.textContent = basicComplete ? '已完成' : '未完成';
    basicEl.className = 'stat-value' + (basicComplete ? ' completed' : '');
    
    intermediateEl.textContent = intermediateComplete ? '已完成' : '未完成';
    intermediateEl.className = 'stat-value' + (intermediateComplete ? ' completed' : '');
    
    advancedEl.textContent = advancedComplete ? '已完成' : '未完成';
    advancedEl.className = 'stat-value' + (advancedComplete ? ' completed' : '');
}

function loadRecordsToFilter() {
    const records = getAllRecords();
    const dateSet = new Set();
    
    records.forEach(r => dateSet.add(r.date));
    
    const select = document.getElementById('recordsDateFilter');
    const sortedDates = Array.from(dateSet).sort().reverse();
    
    select.innerHTML = '<option value="all">全部日期</option>';
    sortedDates.forEach(d => {
        const option = document.createElement('option');
        option.value = d;
        option.textContent = d;
        select.appendChild(option);
    });
}

function filterRecords() {
    renderRecords();
}

function renderRecords() {
    const dateFilter = document.getElementById('recordsDateFilter').value;
    const typeFilter = document.getElementById('recordsTypeFilter').value;
    
    let records = getAllRecords();
    
    if (dateFilter !== 'all') {
        records = records.filter(r => r.date === dateFilter);
    }
    
    if (typeFilter !== 'all') {
        records = records.filter(r => r.type === typeFilter);
    }
    
    // 辅助函数：将时间字符串转换为秒数
    const parseTimeToSeconds = (timeStr) => {
        const match = timeStr.match(/(\d+)分(\d+)秒/);
        if (match) {
            return parseInt(match[1]) * 60 + parseInt(match[2]);
        }
        return 0;
    };
    
    // 找出每天每个subType的最佳成绩记录
    const groupedByDateAndType = {};
    
    records.forEach(r => {
        const key = r.date + '-' + r.subType;
        if (!groupedByDateAndType[key]) {
            groupedByDateAndType[key] = r;
        } else {
            // 比较准确率，如果准确率相同则比较正确数，正确数相同则比较用时
            const currentAcc = parseFloat(r.accuracy);
            const bestAcc = parseFloat(groupedByDateAndType[key].accuracy);
            const currentTime = parseTimeToSeconds(r.time);
            const bestTime = parseTimeToSeconds(groupedByDateAndType[key].time);
            
            if (currentAcc > bestAcc || 
                (currentAcc === bestAcc && r.correct > groupedByDateAndType[key].correct) ||
                (currentAcc === bestAcc && r.correct === groupedByDateAndType[key].correct && currentTime < bestTime)) {
                groupedByDateAndType[key] = r;
            }
        }
    });
    
    // 排序显示：按日期、训练类型、项目分组排序
    const typeOrder = { 'basic': 1, 'intermediate': 2, 'advanced': 3 };
    const subTypeOrder = { 'word': 1, 'poem': 2, 'number': 3, 'vocab': 4, 'letter': 5, 'poker': 6 };
    
    records.sort((a, b) => {
        // 按日期从新到旧
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        // 按训练类型
        if (typeOrder[a.type] !== typeOrder[b.type]) return typeOrder[a.type] - typeOrder[b.type];
        // 按项目
        return subTypeOrder[a.subType] - subTypeOrder[b.subType];
    });
    
    const tbody = document.getElementById('recordsBody');
    
    if (records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #888;">暂无记录</td></tr>';
    } else {
        tbody.innerHTML = records.map(r => {
            const typeNames = {
                'basic': '达标训练',
                'intermediate': '进阶训练',
                'advanced': '高阶训练'
            };
            const subTypeNames = {
                'word': '英语单词',
                'poem': '古诗背诵',
                'number': '数字记忆',
                'vocab': '词汇记忆',
                'letter': '字母记忆',
                'poker': '扑克牌'
            };
            const key = r.date + '-' + r.subType;
            const isBest = groupedByDateAndType[key] === r;
            const star = isBest ? '⭐' : '';
            return `
                <tr>
                    <td>${r.date}</td>
                    <td>${typeNames[r.type]}</td>
                    <td>${subTypeNames[r.subType]} ${star}</td>
                    <td>${r.time}</td>
                    <td>${r.correct}</td>
                    <td>${r.total - r.correct}</td>
                    <td>${r.accuracy}%</td>
                </tr>
            `;
        }).join('');
    }
    
    // 统计汇总
    const totalRecords = records.length;
    const avgAccuracy = totalRecords > 0 
        ? (records.reduce((sum, r) => sum + parseFloat(r.accuracy), 0) / totalRecords).toFixed(1)
        : 0;
    
    const basicCount = records.filter(r => r.type === 'basic').length;
    const intermediateCount = records.filter(r => r.type === 'intermediate').length;
    const advancedCount = records.filter(r => r.type === 'advanced').length;
    
    document.getElementById('recordsSummary').innerHTML = `
        <h4>统计汇总</h4>
        <div class="summary-grid">
            <div class="summary-item">
                <div class="label">总记录数</div>
                <div class="value">${totalRecords}</div>
            </div>
            <div class="summary-item">
                <div class="label">平均准确率</div>
                <div class="value">${avgAccuracy}%</div>
            </div>
            <div class="summary-item">
                <div class="label">达标训练</div>
                <div class="value">${basicCount}</div>
            </div>
            <div class="summary-item">
                <div class="label">进阶训练</div>
                <div class="value">${intermediateCount}</div>
            </div>
            <div class="summary-item">
                <div class="label">高阶训练</div>
                <div class="value">${advancedCount}</div>
            </div>
        </div>
    `;
}