# Styling

리액트에서 요소를 스타일링 할때는 여러가지 방법이 있는데
일반적인 HTML 처럼
CSS, Sass를 사용한 스타일링과
JS를 사용하는 CSS Module, styled-components, classnames, emotion 등이다

## CSS, SASS

```js
import './index.css';
import './index.scss';
```

scss의 경우 node-sass 라는 라이브러리를 설치해서 sass를 해석하거나
기타 번들러 (webpack, vite) 등에서 sass loader를 붙여주면 된다.
CRA 로 만든 앱의 경우 yarn eject 명령을 실행해서 config등 숨겨진 요소를 추출해서 수정해 줄 수 있다.

## CSS Module

CSS 모듈은 CSS의 형태를 unique한 값으로 변경해서 겹치지 않게 자동으로 관리해 주는 라이브러리 이다.
기존에는 따로 loader 설정을 해주어야 했지만 CRA V2 부터는 확장명을 어쩌고.module.css 로 module.css로 만들어 주면 자동으로 인식해서 css module로 적용시켜 준다.
CSS Module을 사용하게 되면 css selector를 key로한 classname 객체를 반환하여 그대로 className이나 id에 사용해 주면 된다.

```css
#top {
  background: blue;
}
.top {
  font-size: 500px;
}
```

```js
  import styles from "./styles.module.css"
  const component = () => {
      return (
        <div id={styles.top} className={id={styles.top}}> // id와 class의 scope를 모듈에서 별도로 관리
          ㅋㅋ
        </div>
      )
  }
```

## classnames

classnames는 css클래스를 조건부로 설정할 때 매우 유용한 라이브러리다.

```js
classNames('one', { two: true });
```

위와 같은 식으로 선언하며 string으로 값을 넣을시 그대로 문자열 className, 객체형으로 넣을시 key에 해당하는 value가 truthy 일 때만 key 이름으로 클래스를 적용시킨다.

## Styled-Component

styledComponent는 css in js 라고 불리는 형태로 자바스크립트 내부에 css를 선언하는 방식이다.
파일단위로 관리가 간편하다, css파일이 별도로 필요 없다, css 속성값에 JS 변수를 사용할수 있다 등의 장점이 있어서 많이 쓰이고 있다.

```js
import styled, { css } from 'styled-components';

const fontSize = 50;
const Button = styled.button`
    background: white;
    color: red;
    font-size: `${fontSize}px`;
    &:hover {
      color: blue;
    }
    ... sass 문법
    ... mediaquery etc
  `;
```

## emotion

styledComponent와 비슷한 css in js 라이브러리 이다.
기본적으로 동작은 매우 유사하지만 StyledComponent와 달리 SSR 처리 ( ServerStyleSheet 처리 없어도됨 ) 가 자유롭고 css props를 결합이 가능해서 유닛 모듈화 시킬 수 있다.
하지만 매우 유의미한 차이가 있지는 않아서 환경에 맞춰 마음에 드는 방식으로 처리하면 된다.
