import { getEmotionText, applyEmotionClass } from './utils.js';

// 페이지 로드 시 일기 데이터 로드
document.addEventListener('DOMContentLoaded', function() {
    loadDiaryData();
});

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
    applyEmotionClass(moodContainer, emotion);

    // 수정 폼에도 현재 데이터 설정
    document.getElementById('editTitle').value = title;
    document.getElementById('editContent').value = content || '내용이 들어갑니다';
    
    // 현재 기분에 맞는 라디오 버튼 선택
    document.getElementById(`emotion${emotion.charAt(0).toUpperCase() + emotion.slice(1)}`).checked = true;
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
    
    // 1. localStorage에서 기존 일기들 가져오기
    const diaries = JSON.parse(localStorage.getItem('diaries') || '[]');
    
    // 2. 현재 일기 찾아서 업데이트 (제목으로 찾기)
    const diaryIndex = diaries.findIndex(diary => diary.title === document.getElementById('detailTitle').textContent);
    if (diaryIndex !== -1) {
        diaries[diaryIndex] = {
            ...diaries[diaryIndex],  // 기존 데이터 유지
            title: newTitle,         // 새 제목
            content: newContent,     // 새 내용
            emotion: selectedEmotion // 새 감정
        };
    }
    
    // 3. localStorage에 다시 저장
    localStorage.setItem('diaries', JSON.stringify(diaries));
    
    // 상세 보기에 업데이트된 내용 반영
    document.getElementById('detailTitle').textContent = newTitle;
    document.getElementById('contentText').innerHTML = `<p>${newContent}</p>`;
    
    // 기분 업데이트
    const emotionText = getEmotionText(selectedEmotion);
    document.getElementById('moodText').textContent = emotionText;
    
    // 감정에 따른 색상 설정 업데이트
    const moodContainer = document.querySelector('.diary-detail__mood');
    applyEmotionClass(moodContainer, selectedEmotion);
    
    // 상세 보기로 돌아가기
    cancelEdit();
    
    alert('일기가 수정되었습니다!');
}

// 모듈에서 함수들을 전역으로 노출 (HTML onclick에서 사용하기 위해)
window.showEditForm = showEditForm;
window.cancelEdit = cancelEdit;
window.saveEdit = saveEdit; 