// 페이지 로드 시 일기 데이터 로드
document.addEventListener('DOMContentLoaded', function() {
    loadDiaryData();
});

// 감정 이모지 매핑 (전역 변수로 한 번만 정의) - 이미지로 대체됨
const emotionEmojis = {
    'happy': '',
    'sad': '',
    'surprised': '',
    'angry': '',
    'other': ''
};

// URL에서 일기 데이터 가져오기
function loadDiaryData() {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title') || '이것은 타이틀 입니다.';
    const emotion = urlParams.get('emotion') || 'happy';
    const date = urlParams.get('date') || '2024.07.12';
    const content = urlParams.get('content') || '';
    
    // 제목 설정
    document.getElementById('detailTitle').textContent = title;
    
    // 기분 설정
    const moodText = getEmotionText(emotion);
    document.getElementById('moodText').textContent = moodText;
    
    // 날짜 설정
    document.getElementById('detailDate').textContent = `${date} 작성`;
    
    // 내용 설정
    const contentElement = document.getElementById('contentText');
    if (content && content !== '기존 일기 내용입니다. (내용은 표시되지 않습니다.)') {
        contentElement.innerHTML = `<p>${content}</p>`;
    }
    
    // 감정에 따른 색상 설정 (CSS 클래스로 적용)
    const moodContainer = document.querySelector('.diary-detail__mood');
    moodContainer.classList.remove('happy', 'sad', 'surprised', 'angry', 'other');
    moodContainer.classList.add(emotion);

    // 수정 폼에도 현재 데이터 설정
    document.getElementById('editTitle').value = title;
    document.getElementById('editContent').value = content || '내용이 들어갑니다';
    
    // 현재 기분에 맞는 라디오 버튼 선택
    document.getElementById(`emotion${emotion.charAt(0).toUpperCase() + emotion.slice(1)}`).checked = true;
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

// 수정 폼 보여주기
function showEditForm() {
    document.getElementById('diaryDetailView').style.display = 'none';
    document.getElementById('diaryEditView').style.display = 'block';
}

// 수정 취소
function cancelEdit() {
    document.getElementById('diaryDetailView').style.display = 'flex';
    document.getElementById('diaryEditView').style.display = 'none';
}

// 수정 저장
function saveEdit() {
    const newTitle = document.getElementById('editTitle').value;
    const newContent = document.getElementById('editContent').value;
    const selectedEmotion = document.querySelector('input[name="emotion"]:checked').value;
    
    // 상세 보기에 업데이트된 내용 반영
    document.getElementById('detailTitle').textContent = newTitle;
    document.getElementById('contentText').innerHTML = `<p>${newContent}</p>`;
    
    // 기분 업데이트
    const emotionText = getEmotionText(selectedEmotion);
    document.getElementById('moodText').textContent = emotionText;
    
    // 감정에 따른 색상 설정 업데이트
    const moodContainer = document.querySelector('.diary-detail__mood');
    moodContainer.classList.remove('happy', 'sad', 'surprised', 'angry', 'other');
    moodContainer.classList.add(selectedEmotion);
    
    // 상세 보기로 돌아가기
    cancelEdit();
    
    alert('일기가 수정되었습니다!');
} 