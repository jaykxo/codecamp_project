import React from "react";
import "./BoardsDetail.css";
import detailImage from "../../../assets/images/detail_example.png"
import thumbnailImage from "../../../assets/images/thumbnail_example.png"
import unknownIcon from "../../../assets/icons/unknown.png"
import locationIcon from "../../../assets/icons/location.png"
import linkIcon from "../../../assets/icons/link.png"


const BoardsDetail = () => {
  return (
    <div className="detail-container">
      {/* 제목 & 메타 정보 */}
      <header className="detail-header">
        <h1 className="detail-title">
          살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
          쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
        </h1>
        <div className="detail-meta">
          <div className="detail-meta-profile">
            <img src={unknownIcon} className="profile-icon" />
            <span className="meta-author">홍길동</span>
          </div>
          <span className="meta-date">2024.11.11</span>
        </div>
        <hr className="form-divider" />
        <div className="header-icons">
          <img src={linkIcon}></img>
          <img src={locationIcon}></img>
        </div>

      </header>

      {/* 본문 이미지 + 텍스트 */}
      <section className="detail-body">
        <figure className="detail-image-block">
          <img
            className="detail-image"
            src={detailImage}
            alt="상세화면 임시 이미지"
          />
          <figcaption className="detail-image-caption"></figcaption>
        </figure>

        <article className="detail-content">
          <p>
            살겠노라 살겠노라. 청산에 살겠노라. <br />
            머루랑 다래를 먹고 청산에 살겠노라. <br />
            얄리얄리 얄랑셩 얄라리 얄라
          </p>
          <p>
            우는구나 우는구나 새야. 자고 일어나 우는구나 새야. <br />
            너보다 시름 많은 나도 자고 일어나 우노라. <br />
            얄리얄리 얄라셩 얄라리 얄라
          </p>
          <p>
            갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
            <br />
            이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐. <br />
            얄리얄리 얄라셩 얄라리 얄라
          </p>
          <p>
            이럭저럭 하여 낮일랑 지내 왔건만 <br />
            올 이도 갈 이도 없는 밤일랑 또 어찌할 것인가. <br />
            얄리얄리 얄라셩 얄라리 얄라
          </p>
          <p>
            어디다 던지는 돌인가 누구를 맞히려던 돌인가. <br />
            미워할 이도 사랑할 이도 없이 맞아서 우노라. <br />
            얄리얄리 얄라셩 얄라리 얄라
          </p>
          <p>
            살겠노라 살겠노라. 바다에 살겠노라. <br />
            나문재, 굴, 조개를 먹고 바다에 살겠노라. <br />
            얄리얄리 얄라셩 얄라리 얄라
          </p>
          <p>
            가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라. <br />
            사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라. <br />
            얄리얄리 얄라셩 얄라리 얄라
          </p>
          <p>
            가다 보니 배불룩한 술독에 독한 술을 빚는구나. <br />
            조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
            <br />
            얄리얄리 얄라셩 얄라리 얄라
          </p>
        </article>
      </section>

      <section className="detail-video-preview">
        <div className="video-frame">
          <img
            className="video-thumb"
            src={thumbnailImage}
            alt="비디오 썸네일"
          />
        </div>
        {/* 아이콘 두 개  */}
      </section>

      {/* 하단 액션 버튼 아이콘 추가 */}
      <footer className="detail-actions">
        <button type="button" className="btn outline">
          목록으로
        </button>
        <div className="action-right">
          <button type="button" className="btn ghost">
            수정하기 
          </button>
        </div>
      </footer>
    </div>
  );
};

export default BoardsDetail;