# Netflix-like Front-End Demo Site
<br><br>
## 프로젝트 기본 정보

이 프로젝트는 Netflix와 유사한 프론트엔드 데모 사이트로, 사용자가 영화를 검색하고 필터링하며 다양한 영화 정보를 확인할 수 있도록 구성되었습니다. React와 TypeScript를 활용하여 개발되었으며, TMDB API를 통해 실시간 영화 정보를 가져옵니다.
<br><br>

## 기술 스택

- **React**: UI 컴포넌트 라이브러리
- **TypeScript**: JavaScript의 슈퍼셋, 정적 타입 체크
- **CSS Modules**: 컴포넌트 단위로 스타일링
- **TMDB API**: 영화 정보 제공
- **React Router**: 페이지 라우팅 처리
- **Axios**: API 호출
- **Node.js**: 개발 서버
- **npm**: 패키지 관리
<br><br>


## 설치 및 실행 가이드


### 1. 레포지토리 클론

먼저, GitHub에서 레포지토리를 클론합니다.

```bash
git clone https://github.com/your-username/netflix-clone.git
cd netflix-clone
```


### 2. 의존성 설치
프로젝트에 필요한 패키지를 설치합니다.

```bash
npm install
```


### 3. 개발 서버 실행
로컬 서버에서 프로젝트를 실행합니다.

```bash
npm start
```

`http://localhost:3000`에서 애플리케이션을 확인할 수 있습니다.


### 4. 빌드
배포를 위한 빌드를 생성합니다.

```bash
npm run build
```
<br><br>

## 프로젝트 (폴더) 구조 설명
```plaintext
/src
  ├── /components              // UI 컴포넌트들이 위치하는 폴더
  │    ├── MovieCard.tsx        // 개별 영화 카드 컴포넌트 (영화 포스터, 제목, hover 효과 등)
  │    ├── MovieFilter.tsx      // 필터링 UI 컴포넌트 (언어, 장르, 정렬 등 필터링 기능 제공)
  │    ├── MovieList.tsx        // 필터링된 영화들을 표시하는 컴포넌트
  │    └── Navbar.tsx           // 네비게이션 바 컴포넌트 (페이지 이동 및 메뉴 표시)
  ├── /pages                   // 각 페이지 컴포넌트들이 위치하는 폴더
  │    ├── Home.tsx             // 홈 페이지 컴포넌트 (첫 페이지, 인기 영화 등 표시)
  │    ├── Popular.tsx          // 인기 영화 페이지 컴포넌트 (인기 있는 영화들을 보여줌)
  │    ├── Search.tsx           // 영화 검색 및 필터링 페이지 컴포넌트
  │    ├── Signin.tsx           // 로그인 페이지 컴포넌트
  │    └── Wishlist.tsx         // 즐겨찾기 페이지 컴포넌트 (즐겨찾기 목록 표시)
  ├── /utils                    // 유틸리티 함수들을 모은 폴더
  │    ├── URL.tsx              // URL 관련 함수들 (예: URL 파라미터 처리)
  │    └── api.ts               // TMDB API와의 연동을 위한 함수들 (API 요청 및 응답 처리)
  ├── /styles                   // 각 컴포넌트 및 페이지의 스타일링 파일들이 위치하는 폴더
  │    ├── Home.module.css      // 홈 페이지 스타일링 (CSS Modules 사용)
  │    ├── MovieFilter.module.css // 필터링 UI 스타일링
  │    ├── MovieList.module.css // 영화 리스트 스타일링
  │    ├── Navbar.module.css    // 네비게이션 바 스타일링
  │    ├── Popular.module.css  // 인기 영화 페이지 스타일링
  │    ├── SignIn.css           // 로그인 페이지 스타일링
  │    ├── Wishlist.module.css // 즐겨찾기 페이지 스타일링
  │    ├── Search.module.css    // 검색 페이지 스타일링
  │    └── MovieCard.module.css // 영화 카드 스타일링
  ├── App.css                   // 전체 애플리케이션의 기본 스타일
  ├── App.tsx                   // 애플리케이션의 라우팅 및 기본 설정 (React Router 설정)
  ├── index.css                 // 전역 스타일링 (기본 스타일 설정)
  └── index.tsx                 // React Entry Point (애플리케이션 시작 파일, ReactDOM.render 호출)

  ```
`/components`: UI 컴포넌트 폴더, 각 페이지에서 사용되는 컴포넌트들이 위치합니다.
`/pages`: 주요 페이지 컴포넌트들이 위치합니다.
`/utils`: API 호출 및 URL 처리를 위한 유틸리티 함수들입니다.
`/styles`: 각 컴포넌트 및 페이지의 CSS 스타일이 포함된 폴더입니다.
<br><br>

## 개발 가이드

### 코딩 컨벤션
1. **컴포넌트 네이밍**: 컴포넌트 파일은 `PascalCase`로 이름을 작성합니다. 예: `MovieCard.tsx`, `Navbar.tsx`
2. **함수 네이밍**: 함수는 `camelCase`로 이름을 작성합니다. 예: `handleClick`, `fetchData`
3. 상태 관리: `useState`와 `useEffect`를 적절히 사용하여 컴포넌트 상태를 관리합니다.
4. 스타일링: 각 컴포넌트는 CSS Module을 사용하여 스타일링하며, 클래스 이름은 `BEM(Block, Element, Modifier)` 방식으로 작성합니다.
<br><br>

### Git 커밋 메시지 규칙
- `feat`: 새로운 기능을 추가
- `fix`: 버그 수정
- `design`: CSS 등 사용자 UI 디자인 변경
- `style`: 코드 포맷 변경, 세미 콜론 누락 등
- `refactor`: 코드 리팩토링
- `comment`: 필요한 주석 추가 및 변경
- `docs`: 문서 수정
- `test`: 테스트 코드 추가
- `chore`: 빌드 업무 수정, 패키지 매니저 수정 등
- `rename`: 파일 혹은 폴더명을 수정하거나 옮기는 작업
- `remove`: 파일 삭제
- `add`: 새로운 코드나 문서 추가
- `implement`: 중요한 구현을 완료했을 때
- `move`: 코드 이동
- `updated`: 계정이나 라이브러리 업데이트
<br><br>

### 브랜치 구성
(Git Flow 브랜치 전략 적용)
- **main**: 메인 브랜치
- **develop**: 기능 개발과 버그 수정
- **feature**: 각 기능을 개발 (작업이 완료되면 develop 브랜치로 머지)
- `feature/home`: 홈 페이지 구현
- `feature/login`: 로그인 페이지 구현
- `feature/navbar`: 네비게이션 바 구현
- `feature/popular`: 인기 영화 페이지 구현
- `feature/search`: 영화 검색 기능 구현
- `feature/tmdb-api-setup`: TMDB API 연동
- `feature/wishlist`: 즐겨찾기 페이지 구현
- `gh-pages`: 배포용 브랜치
<br><br>


