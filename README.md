# On-Hz Music Review Platform

## environment
- React 18.x
- vite
- yarn 4.2.1
- typescript 5.5.4
- tanstack-query 5.x
- zustand 4.x

> yarn install (npm install X)
> yarn dev (개발 모드 실행)
> git push 전에 yarn run build 로 typescript error 수정하기! (배포 시 빌드 안될 가능성 있음)

## 배포 방법
- git push 시 젠킨스를 통해 배포됨.
- 처음 docker를 띄워야할 경우 dist 폴더, ecosystem.config.cjs 파일 필요.
  - yarn run build 하여 dist 폴더 생성
  - sh deploy.sh 실행하여 docker가 위치한 곳에 폴더, 파일 전송
  - docker-compose up -d --build 하여 도커 띄우기
  - docker exec -it on-hz-client /bin/sh 접속하여 dist 폴더 내 파일과 ecosystem.config.cjs 확인

## FSD 구조
- app
- page
- widgets
- features
- shared
  - api
  - helpers
  - hooks
  - routing
  - store
  - ui

## Branch rule
- main : 운영 소스코드
- develop : 스테이징 소스코드
- feature : 기능별 소스코드
- {이름} : 개인별 소스코드

## Commit rule
- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- design: css, ui 추가 및 수정
- refactor : 코드 리팩토링
- test : 테스트 코드, 리팩토링 테스트 코드 추가
- temp : 임시 저장
- etc : 기타 수정사항

### 작성 예시
```Plain Text
feat : 로그인 기능 추가
- jwt access token 발급 로직 추가
- jwt refresh token 발급 로직 추가
```
test