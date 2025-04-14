# FSD architecture

해당 프로젝트는 [FSD architecture](https://feature-sliced.github.io/documentation/kr/)를 따릅니다.

폴더 구조는 Next.js의 app directory를 사용하기 때문에 아래와 같은 구조를 따릅니다.

보통의 경우는 segment 단위에서의 barrel file을 import해오는 것이 convention이나,
tree-shaking에 좋지 않은 영향을 끼치기 때문에 지키지 않습니다.

```text
├── app                # NextJS app 폴더
├── src
│   ├── app            # FSD app 폴더
│   ├── entities
│   ├── features
│   ├── views          # FSD pages 폴더
│   ├── shared
│   ├── widgets
```
