# 개발자 가이드

## 목차

- [style 폴더 구조](#style-폴더-구조)
- [mixins](#mixins)
  - [flexbox](#_flexboxscss)
  - [position](#_positionscss)
  - [typography](#_typographyscss)
- [constants](#constants)
  - [constants 명명](#constants-명명)

Styling은 [SCSS](https://sass-lang.com), [CSS Modules](https://github.com/css-modules/css-modules)를 사용하여 작성되었습니다.

## style 폴더 구조

style 폴더는 두 위치로 나뉩니다.

- src/shared/ui/styles: 공통적으로 사용되는 스타일로서, 컴포넌트에서 사용되는 constants 및 mixin이 포함됩니다.
- src/app/ui/styles: 전역적으로 사용되는 스타일로서 글로벌 스타일 및 :root class에 포함되는 color 변수

@use문을 사용하는 스타일은 "src/shared/ui/styles"에 존재하며, 아래의 두 가지로 나뉩니다.

- mixins: 믹스인
- constants: 상수

그에 대한 사용 방식은 아래와 같습니다.

```scss
// src/shared/ui/Button/Button.module.scss

@use "@/shared/ui/styles/constants" as c;
@use "@/shared/ui/styles/mixins" as m;

.button {
  @include m.fontDisplay1(regular); // mixins 사용
  height: c.$S_HEADER_HEIGHT; // constants 사용
  color: var(--c-primary); // :root class에 포함된 color 변수 사용
}
```

## mixins

### \_flexbox.scss

- flex, inlineFlex를 mixin으로 제공합니다.

### \_position.scss

- position 관련 mixin을 제공합니다.

### \_typography.scss

- 디자인시스템에 존재하는 typography를 mixin으로 제공합니다.
- display1 -> fontDisplay1과 같이 typography mixin은 font를 prefix로 명명되어있습니다.
  - arguments로는 font-weight를 받으며, semibold, medium, regular와 같이 입력 가능합니다.

## Constants

### Constants 명명

constants는 아래와 같은 명명 규칙을 따릅니다.

- src/app/ui/styles/\_colors.scss
  - --c-{color-name} 와 같은 형태로 --c를 prefix로 하며, hierarchy의 경우 hyphen(-)으로 구분합니다.
    - 예시: --c-primary, --c-primary-100, --c-primary-200
- src/shared/ui/styles/constants/\_dimensions.scss
  - $Z\_{NAME} 와 같은 형태로 $Z\_ (z-index를 뜻함)를 prefix로 합니다.
    - 예시: $Z_MODAL, $Z_TOOLTIP
- src/shared/ui/styles/constants/\_box-shadows.scss
  - $B\_{NAME}과 같은 형태로 $B\_를 prefix로 합니다.
    - 예시: $B_SHADOW_SM
- src/shared/ui/styles/constants/\_rounded.scss
  - $R\_{NAME}과 같이 $R\_를 prefix로 합니다.
    - 예시: $R_ROUNDED_NONE
- src/shared/ui/styles/constants/sizes.module.scss
  - $S\_{NAME} 와 같은 형태로 $S\_ (size를 뜻함)를 prefix로 합니다.
    - 예시: $S_HEADER_HEIGHT, $S_BUTTON_HEIGHT
  - :export를 할 시엔 snakeCase를 camelCase로 변환하여 사용하며, typescript에서 사용 시엔 camelCase로 사용합니다.
    - 예시: $S_HEADER_HEIGHT -> headerHeight

```scss
// src/shared/ui/styles/constants/sizes.module.scss
$S_BUTTON_WIDTH: 100px;

:export {
  buttonWidth: $S_BUTTON_WIDTH;
}
```

```tsx
// src/app/ui/Button/Button.tsx
import sizes from "@/shared/ui/styles/constants/sizes.module.scss";

const buttonWidth = sizes.buttonWidth;
```
