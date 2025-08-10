// DOM 요소들
const diaryForm = document.getElementById('diaryForm');
const navTabs = document.querySelectorAll('.nav-tab');

// 페이지 전환 함수
function showDiaryList() {
    document.getElementById('diarySection').style.display = 'flex';
    document.getElementById('formSection').style.display = 'flex';
    document.getElementById('diaryDetailSection').style.display = 'none';
}

function showDiaryDetail(diary) {
    // 상세페이지 데이터 설정
    document.getElementById('detailTitle').textContent = diary.title;
    document.getElementById('detailEmotion').textContent = diary.emotionText;
    document.getElementById('detailDate').textContent = `${diary.date} 작성`;
    
    // 내용 설정 (기존 일기인 경우 여러 줄로 표시)
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
    
    // 감정에 따른 색상과 이모지 설정
    const emotionElement = document.getElementById('detailEmotion');
    emotionElement.style.color = getEmotionColor(diary.emotion);
    
    // 감정에 따른 이모지 설정
    const emotionEmojis = {
        'happy': '😊',
        'sad': '😢',
        'surprised': '😲',
        'angry': '😠',
        'other': '🤔'
    };
    
    // CSS 변수로 이모지 설정
    emotionElement.style.setProperty('--emotion-emoji', `"${emotionEmojis[diary.emotion] || '😊'}"`);
    
    // 페이지 전환
    document.getElementById('diarySection').style.display = 'none';
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('diaryDetailSection').style.display = 'flex';
}

// 감정별 색상 반환 함수
function getEmotionColor(emotion) {
    const colors = {
        'happy': '#EA5757',
        'sad': '#28B4E1',
        'surprised': '#D59029',
        'angry': '#777777',
        'other': '#A229ED'
    };
    return colors[emotion] || '#333';
}

// 감정 텍스트 변환 함수
function getEmotionText(emotion) {
    const texts = {
        'happy': '행복해요',
        'sad': '슬퍼요',
        'surprised': '놀랐어요',
        'angry': '화나요',
        'other': '기타'
    };
    return texts[emotion] || '기타';
}

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
    
    // 클릭 이벤트 수정 - 새 상세페이지로 이동
    cardDiv.addEventListener('click', () => {
        const diaryData = {
            ...diary,
            emotionText: getEmotionText(diary.emotion)
        };
        // 새 상세페이지로 이동
        window.location.href = `diary-detail.html?id=${diary.id || Date.now()}&title=${encodeURIComponent(diary.title)}&emotion=${diary.emotion}&date=${encodeURIComponent(diary.date)}&content=${encodeURIComponent(diary.content || '')}`;
    });
    
    return cardDiv;
}

// 일기목록에 새 카드 추가 함수
function addDiaryCard(diary) {
    const diaryCardsContainer = document.getElementById('diaryCards');
    const newCard = createDiaryCard(diary);
    diaryCardsContainer.appendChild(newCard);
}





// 폼 제출 이벤트 처리
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

// 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', function() {
    // 기존 카드 클릭 이벤트 추가 - 새 상세페이지로 이동
    document.querySelectorAll('.diary-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.card-title').textContent;
            const date = card.querySelector('.card-date').textContent;
            const emotion = card.classList.contains('happy') ? 'happy' : 
                           card.classList.contains('sad') ? 'sad' :
                           card.classList.contains('surprised') ? 'surprised' :
                           card.classList.contains('angry') ? 'angry' : 'other';
            
            // 새 상세페이지로 이동
            window.location.href = `diary-detail.html?id=${Date.now()}&title=${encodeURIComponent(title)}&emotion=${emotion}&date=${encodeURIComponent(date)}&content=${encodeURIComponent('기존 일기 내용입니다. (내용은 표시되지 않습니다.)')}`;
        });
    });
    
    // 뒤로가기 버튼 이벤트
    document.getElementById('backBtn').addEventListener('click', showDiaryList);
    
    // 수정 버튼 이벤트 (아직 기능 미구현)
    document.getElementById('editBtn').addEventListener('click', function() {
        alert('수정 기능은 다음 단계에서 구현됩니다!');
    });
}); 