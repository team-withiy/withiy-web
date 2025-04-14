# ENV

환경변수 파일 관리는 env/ 폴더 내부에서 이루어지며,
env-cmd 및 dotenv를 사용합니다.

## 필수 env

- env/.env.example
  - .env.[properties] 파일에서의 필요한 key 값들을 나타냅니다.
- env/.env.test
  - vitest 테스트 실행 환경에서의 env 값들을 관리합니다.
- env/.env.e2e
  - playwright 테스트 실행 환경에서의 env 값들을 관리합니다.

## 상황별 env

- env/.env.local
  - 로컬 환경에서 개발할 때 필요한 env 입니다. .env.example의 형식을 따릅니다.
- env/.env.development
  - dev 환경 배포와 관련된 env 입니다. .env.example의 형식을 따릅니다.
- env/.env.production
  - prod 환경 배포와 관련된 env 입니다. .env.example의 형식을 따릅니다.
