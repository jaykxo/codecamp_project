import { getEmotionColor, getEmotionText, applyEmotionClass } from './utils.js';

const diaryForm = document.getElementById('diaryForm');
const navTabs = document.querySelectorAll('.nav-tab');

let diaries = [];

/**
 * localStorage에서 일기 데이터를 불러와 전역 배열에 저장하고 화면에 렌더링
 * 페이지 로드 시 자동으로 호출됨
 */
function loadDiariesFromStorage() {
    const storedDiaries = localStorage.getItem('diaries');
    if (storedDiaries) {
        try {
            diaries = JSON.parse(storedDiaries);
            diaries.forEach(diary => {
                addDiaryCard(diary);
            });
        } catch (error) {
            console.error('localStorage 데이터 파싱 오류:', error);
            diaries = [];
        }
    }
}

/**
 * 전역 일기 배열을 localStorage에 JSON 형태로 저장
 * 일기 추가/수정/삭제 시마다 호출됨
 */
function saveDiariesToStorage() {
    localStorage.setItem('diaries', JSON.stringify(diaries));
}

function showDiaryList() {
    document.getElementById('diarySection').style.display = 'flex';
    document.getElementById('formSection').style.display = 'flex';
    document.getElementById('diaryDetailSection').style.display = 'none';
}

function showDiaryDetail(diary) {
    document.getElementById('detailTitle').textContent = diary.title;
    document.getElementById('detailEmotion').textContent = diary.emotionText;
    document.getElementById('detailDate').textContent = `${diary.date} 작성`;
    
    const contentElement = document.getElementById('detailContent');
    if (diary.content && diary.content !== '기존 일기 내용입니다. (내용은 표시되지 않습니다.)') {
        contentElement.innerHTML = `<p>${diary.content}</p>`;
    } else {
        contentElement.innerHTML = `
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
        `;
    }
    
    const emotionElement = document.getElementById('detailEmotion');
    emotionElement.style.color = getEmotionColor(diary.emotion);
    
    document.getElementById('diarySection').style.display = 'none';
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('diaryDetailSection').style.display = 'flex';
}

/**
 * 일기 카드 DOM 요소를 생성
 * @param {Object} diary - 일기 데이터 객체
 * @returns {HTMLElement} 생성된 카드 링크 요소
 */
function createDiaryCard(diary) {
    const cardDiv = document.createElement('div');
    cardDiv.className = `diary-card ${diary.emotion}`;
    
    const linkElement = document.createElement('a');
    linkElement.href = `/css-js/pages/diary-detail.html?id=${diary.id || Date.now()}&title=${encodeURIComponent(diary.title)}&emotion=${diary.emotion}&date=${encodeURIComponent(diary.date)}&content=${encodeURIComponent(diary.content || '')}`;
    linkElement.style.textDecoration = 'none';
    linkElement.style.color = 'inherit';
    linkElement.style.display = 'block';
    
    cardDiv.innerHTML = `
        <div class="card-image"></div>
        <div class="card-contents">
            <div class="card-division">
                <div class="card-emotion"></div>
                <div class="card-date">${diary.date}</div> 
            </div>
            <div class="card-title">${diary.title}</div>
        </div>
    `;
    
    linkElement.appendChild(cardDiv);
    return linkElement;
}

/**
 * 일기 목록에 새 카드를 추가
 * @param {Object} diary - 추가할 일기 객체
 */
function addDiaryCard(diary) {
    const diaryCardsContainer = document.getElementById('diaryCards');
    const newCard = createDiaryCard(diary);
    diaryCardsContainer.appendChild(newCard);
}

diaryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emotion = this.querySelector('input[name="emotion"]:checked').value;
    const title = this.querySelector('#title').value;
    const content = this.querySelector('#content').value;
    
    const newDiary = {
        emotion: emotion,
        title: title,
        content: content,
        date: new Date().toLocaleDateString('ko-KR')
    };
    
    addDiaryCard(newDiary);
    diaries.push(newDiary);
    saveDiariesToStorage();
    
    this.reset();
    this.querySelector('input[value="happy"]').checked = true;
    
    alert('일기가 등록되었습니다!');
});

navTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        navTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        if (this.dataset.tab === 'photo') {
            alert('사진보관함 기능은 아직 개발 중입니다!');
            navTabs[0].classList.add('active');
            this.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    loadDiariesFromStorage();
    
    if (diaries.length === 0) {
        document.querySelectorAll('.diary-card').forEach(card => {
            const title = card.querySelector('.card-title').textContent;
            const date = card.querySelector('.card-date').textContent;
            const emotion = card.classList.contains('happy') ? 'happy' : 
                            card.classList.contains('sad') ? 'sad' :
                            card.classList.contains('surprised') ? 'surprised' :
                            card.classList.contains('angry') ? 'angry' : 'other';
            
            const linkElement = document.createElement('a');
            linkElement.href = `/css-js/pages/diary-detail.html?id=${Date.now()}&title=${encodeURIComponent(title)}&emotion=${emotion}&date=${encodeURIComponent(date)}&content=${encodeURIComponent('기존 일기 내용입니다. (내용은 표시되지 않습니다.)')}`;
            linkElement.style.textDecoration = 'none';
            linkElement.style.color = 'inherit';
            linkElement.style.display = 'block';
            
            card.parentNode.insertBefore(linkElement, card);
            linkElement.appendChild(card);
        });
    }
    
    document.getElementById('backBtn').addEventListener('click', showDiaryList);
    
    document.getElementById('editBtn').addEventListener('click', function() {
        alert('수정 기능은 다음 단계에서 구현됩니다!');
    });
}); 