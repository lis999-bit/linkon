# 링크온 (LinkOn)

불을 켜면 당신이 나타나요. 빛으로 만나는 반익명 연결 서비스.

- 실제 버전: https://lis999-bit.github.io/linkon/
- 시험 버전: https://lis999-bit.github.io/linkon/test/

## 수정하는 순서
1. `test/` 폴더의 파일을 고쳐서 올려요. 시험 버전 주소에서 확인해요.
2. 문제가 없으면 `./promote.sh` 로 실제 버전에 반영하고 올려요.
3. 반영할 때는 `test/app.js` 맨 위 `APP_VERSION` 과 `test/version.json` 의 값을 같이 올려요.
   실제 버전을 쓰고 있던 사람들에게 "새 버전이 있어요" 안내가 떠요.

## 알아 두기
- 시험 버전과 실제 버전은 같은 Firebase 데이터베이스를 써요. 데이터 구조나 서버 규칙을 바꾸는 수정은 시험 버전에서도 실제 사용자에게 영향을 줄 수 있어요.
- 서버 규칙(`database.rules.json`)을 바꾸면 Firebase 콘솔에 다시 게시해야 해요.
- 문제가 생기면 GitHub 기록에서 이전 커밋으로 되돌릴 수 있어요.
