Next 로 만든 기본 쇼핑몰 웹사이트 입니다.

*******************계정 보호와 privacy issue로 사진 및 유저 정보는 업로드 되지않습니다*********************
-------------------------------------------------------------------------------------------------------  
*****6/9/2026 업데이트*****  

cc-shop 의 개발을 시작합니다.
Next 프로젝트로 시작하였고 디렉토리 개발 상황은 매일 업데이트 됩니다.

Admin 권한 로그인이 있고 일반 유저 로그인 이 따로 존재하면 Admin 권한은 쇼핑몰의 물건들은 관리 감독 할수 있습니다.

Admin 계정은 상품을 업로드/삭제 할수 있고, 대표 상품으로 설정 또는 취소 시킬수 있습니다.
현재 Admin 계정의 더 많은 권리 권한을 개발하고 있습니다.  

*****6/10/2026 업데이트*****  

Admin 계정 생성 방지, user 로만 회원 가입 가능.

-------------------------------------------------------------------------------------------------------   
/app  
│   globals.css  
│   layout.tsx  
│   middleware.js  
│   page.jsx                ← Home 페이지  
│  
├── about  
│     page.jsx  
│  
├── admin  
│   │   layout.jsx          ← admin 전용 레이아웃 (권한 체크)  
│   │   page.jsx            ← admin 메인 페이지 (대시보드)  
│   │  
│   ├── products  
│   │       page.jsx        ← 상품 목록 + 삭제 + 대표 설정 버튼  
│   │  
│   └── upload  
│           page.jsx        ← 상품 업로드 페이지  
│  
├── api  
│   ├── auth  
│   │   ├── login  
│   │   │       route.js  
│   │   ├── logout  
│   │   │       route.js  
│   │   └── register  
│   │           route.js  
│   │  
│   ├── home  
│   │   ├── feature  
│   │   │       route.js    ← 대표 이미지 설정  
│   │   └── unfeature  
│   │           route.js    ← 대표 이미지 해제  
│   │  
│   └── products  
│       ├── delete  
│       │       route.js  
│       ├── list  
│       │       route.js  
│       └── upload  
│               route.js  
│  
├── auth  
│   ├── login  
│   │       page.jsx  
│   └── register  
│           page.jsx  
│  
├── components  
│       Header.jsx  
│  
├── contact  
│       page.jsx  
│  
├── deals  
│       page.jsx  
│  
└── products  
        page.jsx  



