# <데려가냥?> 유기동물 조회 웹 프로젝트
Open API를 활용해 유기동물 현황 정보를 조회할 수 있는 반응형 단일 페이지 웹 프로젝트입니다. 전국의 수많은 유기동물을 쉽게 조회하여 입양으로 이어질 수 있도록 정보들을 제공하는 것이 목표입니다.

<br/>

## Functions
- **유기동물 통계 자료**: 유기동물의 최근 일주일 간 개체수와 금일 축종별 개체수 통계를 시각화하였습니다.
- **공고기간이 임박한 유기동물 조회**: 공고 기간이 얼마 남지 않은 유기동물을 조회할 수 있습니다.
- **다양한 조건부 검색**: 필터 기능을 사용하여 유기동물들을 지역, 축종, 품종별로 검색할 수 있습니다.
- **자세한 정보 및 위치 제공**: 특정 유기동물에 대한 자세한 정보를 제공하고 담당 보호소의 위치를 카카오맵 지도로 보여줍니다.

<br/>

## Skills
- **HTML5**
- **CSS3**
- **JavaScript**
- **Express**
- **Open API**: 동물보호관리시스템 유기동물 조회 서비스 오픈 API, 카카오맵 API
- **Open Source**: Chart.js

<br/>

## 서버 실행
1. 동물보호관리시스템 유기동물 조회 서비스 open api를 사용하기 위해 발급한 api key를 저장하도록 다음과 같은 폴더 구조 아래의 apikey.js 파일을 생성<br/>
<img width="205" alt="6" src="https://github.com/user-attachments/assets/96c71fee-a0e0-4a62-8142-cc46147bc295"><br/>
2. apikey.js에 아래 코드 작성
```javascript
    const config = {
        ABANDONMENTPUBLICSRVC_ENCODING_API_KEY: "인코딩된 api key 값",
        ABANDONMENTPUBLICSRVC_DECODING_API_KEY: "디코딩된 api key 값",
    };
   
    export default config;
```
3. 터미널 명령어
```
    npm i
    npm start
```

<br/>

## 사이트 모습
### 홈
<img width="600" alt="1" src="https://github.com/user-attachments/assets/97063008-9058-4877-896c-c7a27ed55a3b"><br/><br/>
### 페이지네이션과 무한스크롤
<img width="600" alt="2" src="https://github.com/user-attachments/assets/5e823801-b75e-4b83-accb-c39f66a4d2cf"><br/><br/>
### 모달창
<img width="600" alt="3" src="https://github.com/user-attachments/assets/16bb89cc-e024-4747-bace-fc12eca708f1"><br/><br/>
### 스켈레톤 로딩
<img width="600" alt="5" src="https://github.com/user-attachments/assets/55aafbae-ae96-4866-bda4-8c32f3906411"><br/><br/>
### 데이터 부재
<img width="600" alt="4" src="https://github.com/user-attachments/assets/b2f18f1f-9847-4c87-ad7a-ddd298d5cc4f"><br/><br/>

<br/>

## 회고
- **코드 분할**: 설계된 와이어프레임에 맞춰 css를 작성하고 바닐라 자바스크립트로 기능 구현을 완벽히 해낸다에 초점을 두다보니 코드 분할이 이루어지지 않았습니다.
- **SPA**: 여러 페이지를 보는 듯한 효과를 주는 라우팅과 SPA, 재사용성을 위한 컴포넌트화의 필요성을 느끼고 관심과 공부 계획을 가지게 되었습니다.
