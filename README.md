# 💬 네넵 (NeNep)
> **“이 메시지, 보내도 괜찮을까?”**  
> 조직 내 커뮤니케이션의 심리적 부담을 줄여주는 AI 메시지 가이드

<p align="left">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=Tailwind%20CSS&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white">
</p>

---

## 💡 Why NeNep?
단순히 문장을 공손하게 바꾸는 서비스는 많습니다. 하지만 **네넵**은 다릅니다.  
우리는 **"조직 내 관계와 상황 속에서 발생하는 심리적 부담"**에 집중합니다. 

*   **자기검열 시간 단축:** 상급자나 외부 업체와 소통할 때 썼다 지웠다 반복하는 시간을 줄여줍니다.
*   **맞춤형 톤앤매너:** 상대방의 커뮤니케이션 스타일에 최적화된 문장을 제안합니다.
*   **오해 방지:** 세대 차이나 조직 문화 차이로 인해 발생할 수 있는 텍스트 기반의 오해를 최소화합니다.

---

## ✨ Key Features

### 1. 실시간 팝업 레이어 (`Alt + L`)
메신저 입력창 위에서 즉시 활성화됩니다. 복사하고 붙여넣는 번거로움 없이, 전송 직전의 불안함을 확신으로 바꿔보세요.

### 2. 관계 기반 맥락 추론 (Context-Smart Preset)
채팅방 이름과 대화 흐름을 분석하여 상대와의 관계를 자동으로 파악합니다.
- **직속 상사:** 격식과 예의를 갖춘 보고형 문체
- **외부 거래처:** 신뢰감 있는 비즈니스 문체
- **팀 동료:** 명확하고 효율적인 협업형 문체

### 3. 상대 특징 분석 및 맞춤형 제안
상대방의 채팅 스타일(두괄식, 무뚝뚝함, 바쁨 등)을 키워드로 분석하여, 상대가 선호하는 방식으로 문장을 조정합니다.

### 4. 친밀도 & 조직 문화 슬라이더
- **친밀도:** '거의 모르는 사이'부터 '친한 사이'까지 5단계 세부 조절 기능을 제공합니다.
- **조직 문화:** 대기업(정중), 스타트업(유연), 공공기관(격식) 등 조직 성격에 최적화된 표현을 지원합니다.

---

## 🖥️ Demo Flow

1.  **초안 작성:** 사용자가 메신저 입력창에 거친 초안을 작성합니다.
2.  **네넵 호출:** 단축키 `Alt + L`을 눌러 팝업을 띄웁니다.
3.  **AI 교정:** 상황과 관계가 반영된 최적의 메시지 후보군을 확인합니다.
4.  **자동 치환:** 마음에 드는 문구를 선택하면 입력창이 즉시 변경됩니다.

---

## 🛠 Tech Stack

| Category | Tech Stack |
| :--- | :--- |
| **Frontend** | React, TypeScript, TailwindCSS |
| **State Management** | Zustand |
| **Build Tool** | Vite |
| **AI Integration** | GPT-4 based API (Custom Prompt Engineering) |

---

## 🔒 Privacy & Data
네넵은 사용자의 보안과 데이터 프라이버시를 최우선으로 생각합니다.
- **No Raw Storage:** 채팅 원문을 서버에 저장하지 않습니다.
- **Feature Extraction:** 대화의 특징값만을 추출하여 분석에 활용합니다.
- **On-Device (Future):** 향후 개인정보 보호를 위해 온디바이스(On-device) 기반 분석 구조를 목표로 합니다.

---

## 🚀 Future Plans (Roadmap)
- [ ] **Platform Expansion:** Slack, Microsoft Teams, 네이버웍스 전용 브라우저 익스텐션 출시
- [ ] **Custom Training:** 회사별 고유의 커뮤니케이션 가이드라인 학습 기능
- [ ] **On-device AI:** 보안 강화를 위한 로컬 환경 내 특징 분석 엔진 탑재
- [ ] **Feedback Loop:** 사용자의 최종 선택 데이터를 기반으로 한 개인화 스타일 고도화

---

## 👥 Team
**멋쟁이사자처럼 아이디어톤 프로젝트 - 4조**
- **Product Manager:** 이영서, 정민규
- **Designer:** 이수민
- **Frontend Developer:** 박서연
- **Backend Developer:** 강성욱, 이어진


---
© 2026 NeNep Project. All rights reserved.