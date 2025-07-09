# 📊 차트보드 (ChartBoard)

## 📢 서비스 한줄 소개  
**ChartBoard** — SQL 쿼리 결과를 다양한 차트로 시각화하고, 대시보드에서 차트들을 한눈에 조회하는 데이터 시각화 웹 서비스

---

## 📝 서비스 소개  
**ChartBoard**는 사용자가 입력한 SQL 쿼리 결과를 **다양한 형태의 차트로 시각화**하고, 이를 대시보드에 추가하여 데이터를 직관적으로 관리할 수 있도록 돕는 데이터 시각화 도구입니다.


---

## 👥 개발자 소개

| 이름   | 역할         |
|--------|--------------|
| 곽채연 | Frontend 개발, Backend 개발 |

---

## 🛠 기술 스택

- **Frontend**: React, TypeScript  
- **Backend**: Spring Boot  
- **Database**: MariaDB  

---

## 📁 주요 파일 구조
```
chartboardproject/
├── public/
│ └── (로고 이미지)
│
├── src/
│ ├── api/
│ │ └── chartboardApi.ts
│ │
│ ├── assets/
│ │ └── (로고 이미지)
│ │
│ ├── layouts/
│ │ └── ChartBoardLayout.tsx
│ │
│ ├── pages/
│ │ ├── collections/
│ │ │ ├── CollectionMainPage.tsx
│ │ │ ├── CollectionChartListPage.tsx
│ │ │ ├── CollectionDashboardListPage.tsx
│ │ │ ├── RowToChartPage.tsx
│ │ │ └── RowToDashboard.tsx
│ │ │
│ │ ├── customSqlSearch/
│ │ │ └── CustomSqlSearchPage.tsx
│ │ │
│ │ └── user/
│ │ ├── LoginPage.tsx
│ │ ├── SignupPage.tsx
│ │ ├── ConnectDbPage.tsx
│ │ └── MyPage.tsx
│ │
│ ├── router/
│ │ └── router.tsx
│ │
│ ├── App.css
│ ├── App.tsx
│ ├── index.css
│ └── main.tsx
│
└── index.html
```
---

## 📌 주요 기능

### ✅ SQL 쿼리 실행
- SELECT문 입력 → 쿼리 실행 결과를 테이블과 다양한 차트(bar, line, scatter)로 시각화
- 차트 저장 가능

### 📋 대시보드 관리
- 생성된 차트를 대시보드에 배치
- **드래그 & 리사이즈**로 차트 위치와 크기 조정 가능

---

## 🚀 시작 방법 (로컬 실행)
⚙️ 백엔드 서버도 함께 실행되어 있어야 데이터가 정상 출력됩니다.

```bash
# 프로젝트 클론
git clone https://github.com/kwak513/chart-board-front.git

# 디렉토리 이동
cd chart-board-front

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```
---


