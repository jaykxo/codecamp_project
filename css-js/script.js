// DOM 요소들
const diaryForm = document.getElementById('diaryForm');
const navTabs = document.querySelectorAll('.nav-tab');

// 일기 카드 생성 함수
function createDiaryCard(diary) {
    const cardDiv = document.createElement('div');
    cardDiv.className = `diary-card ${diary.emotion}`;
    
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
    
    // 클릭 이벤트 추가
    cardDiv.addEventListener('click', () => {
        showDiaryDetail(cardDiv);
    });
    
    return cardDiv;
}

// 일기목록에 새 카드 추가 함수
function addDiaryCard(diary) {
    const diaryCardsContainer = document.getElementById('diaryCards');
    const newCard = createDiaryCard(diary);
    diaryCardsContainer.appendChild(newCard);
}

// 일기 상세 정보 표시 함수
function showDiaryDetail(card) {
    const emotion = card.classList.contains('happy') ? '행복해요' : 
                   card.classList.contains('sad') ? '슬퍼요' :
                   card.classList.contains('surprised') ? '놀랐어요' :
                   card.classList.contains('angry') ? '화나요' : '기타';
    
    const title = card.querySelector('.card-title').textContent;
    const date = card.querySelector('.card-date').textContent;
    
    alert(`📝 일기 상세 정보\n\n감정: ${emotion}\n제목: ${title}\n날짜: ${date}`);
}

// 기존 카드 클릭 이벤트 추가
document.querySelectorAll('.diary-card').forEach(card => {
    card.addEventListener('click', () => {
        showDiaryDetail(card);
    });
});

// 폼 제출 이벤트 처리
diaryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emotion = this.querySelector('input[name="emotion"]:checked').value;
    const title = this.querySelector('#title').value;
    
    const newDiary = {
        emotion: emotion,
        title: title,
        date: new Date().toLocaleDateString('ko-KR')
    };
    
    addDiaryCard(newDiary);
    
    this.reset();
    this.querySelector('input[value="happy"]').checked = true;
    
    alert('일기가 등록되었습니다!');
});

// 네비게이션 탭 이벤트 처리
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