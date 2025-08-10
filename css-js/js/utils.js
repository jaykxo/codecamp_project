import { EMOTION_TEXTS, EMOTION_COLORS } from './constants.js';

// 감정 텍스트 변환 함수
export function getEmotionText(emotion) {
    return EMOTION_TEXTS[emotion] || '기타';
}

// 감정별 색상 반환 함수
export function getEmotionColor(emotion) {
    return EMOTION_COLORS[emotion] || '#333';
}



// 감정에 따른 CSS 클래스 적용 함수
export function applyEmotionClass(element, emotion) {
    const emotions = ['happy', 'sad', 'surprised', 'angry', 'other'];
    emotions.forEach(em => element.classList.remove(em));
    element.classList.add(emotion);
} 