# Netflix-like Front-End Demo Site


## 프로젝트 기본 정보

이 프로젝트는 Netflix와 유사한 프론트엔드 데모 사이트로, 사용자가 영화를 검색하고 필터링하며 다양한 영화 정보를 확인할 수 있도록 구성되었습니다. React와 TypeScript를 활용하여 개발되었으며, TMDB API를 통해 실시간 영화 정보를 가져옵니다.

## 기술 스택

- **React**: UI 컴포넌트 라이브러리
- **TypeScript**: JavaScript의 슈퍼셋, 정적 타입 체크
- **CSS Modules**: 컴포넌트 단위로 스타일링
- **TMDB API**: 영화 정보 제공
- **React Router**: 페이지 라우팅 처리
- **Axios**: API 호출
- **Node.js**: 개발 서버
- **npm**: 패키지 관리

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

## 프로젝트 (폴더) 구조 설명
```plaintext
/src
  ├── /components
  │    ├── MovieCard.tsx        // 개별 영화 카드 (영화 포스터, 제목, hover 등)
  │    ├── MovieFilter.tsx      // 필터링 UI 컴포넌트
  │    ├── MovieList.tsx        // 필터링 적용 후 영화들 표시
  │    └── Navbar.tsx           // 네비게이션 바
  ├── /pages
  │    ├── Home.tsx             // 홈 페이지
  │    ├── Popular.tsx          // 인기 영화 페이지
  │    ├── Search.tsx           // 영화 검색 및 필터링 페이지
  │    ├── Signin.tsx           // 로그인 페이지
  │    └── Wishlist.tsx         // 즐겨찾기 페이지
  ├── /utils
  │    ├── URL.tsx              // URL 관련 함수
  │    └── api.ts               // TMDB API와 관련된 함수들
  ├── /styles
  │    ├── Home.module.css
  │    ├── MovieFilter.module.css
  │    ├── MovieList.module.css
  │    ├── Navbar.module.css
  │    ├── Popular.module.css
  │    ├── SignIn.css
  │    ├── Wishlist.module.css
  │    ├── Search.module.css    // 검색 페이지 스타일
  │    └── MovieCard.module.css // 영화 카드 스타일
  ├── App.css
  ├── App.tsx                   // 라우팅 및 기본 설정
  ├── index.css
  └── index.tsx                 // React entry point
  ```
`/components`: UI 컴포넌트 폴더, 각 페이지에서 사용되는 컴포넌트들이 위치합니다.
`/pages`: 주요 페이지 컴포넌트들이 위치합니다.
`/utils`: API 호출 및 URL 처리를 위한 유틸리티 함수들입니다.
`/styles`: 각 컴포넌트 및 페이지의 CSS 스타일이 포함된 폴더입니다.

## 개발 가이드
### 코딩 컨벤션
1. **컴포넌트 네이밍**: 컴포넌트 파일은 `PascalCase`로 이름을 작성합니다. 예: `MovieCard.tsx`, `Navbar.tsx`
2. **함수 네이밍**: 함수는 `camelCase`로 이름을 작성합니다. 예: `handleClick`, `fetchData`
3. 상태 관리: `useState`와 `useEffect`를 적절히 사용하여 컴포넌트 상태를 관리합니다.
4. 스타일링: 각 컴포넌트는 CSS Module을 사용하여 스타일링하며, 클래스 이름은 `BEM(Block, Element, Modifier)` 방식으로 작성합니다.

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

### 브랜치 전략 설명
이 프로젝트에서는 Git Flow 전략을 따릅니다.

- main: 제품 출시 브랜치, 안정적인 코드만 포함
- develop: 개발 브랜치, 모든 새로운 기능은 여기서 개발됩니다.
- feature: 새로운 기능을 개발하는 브랜치로 feature/<기능명> 형식으로 사용됩니다.

**브랜치 구성:**
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