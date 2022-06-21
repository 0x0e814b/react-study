# JSX

<br />

## JSX란 무엇인가?

---

JSX는 XML과 유사한 JS 확장 문법으로서 Facebook에서 만든 OpenSource 포맷이다.
웹 엔진이나 브라우저에 의해 구현되도록 의도되지 않았으며 JS 정식문법도 아니라 일반적인 브라우저에서는 해석 할 수 없다. Babel등의 다양한 전 처리 장치를 사용해 표준 ECMA스크립트로 변환되어 사용된다. 비슷한 포맷으로는 JXON이라는 포맷이 있으나 JSX와 달리 HTML 처럼 모든 태그를 짝을 맞추어 줘야 해서 상대적으로 잘 쓰이지 않는다.

<br />

## JSX Transpiling

---

```jsx
function App() {
  return (
    <div>
      Hello <b>JSX!</b>
    </div>
  );
}
```

위와 같은 JSX 문서를 트랜스파일링하면 개발측으로 부터 미리 정의된 preset을 통해 아래와 같이 변경된다.

```javascript
function App() {
  return React.createElement(
    'div',
    null,
    'Hello ',
    React.createElement('b', null, 'JSX!')
  );
}
```

위 예시와 같이 JSX는 Element로 정의된 부분을 React.createElement를 사용해 생성한다.

```javascript
React.createElement(component, props, ...children);
```

이는 번거롭겠지만 JSX없이도 리액트를 충분히 사용할 수 있음을 보여준다.

<br />

## 주의점

---

1. 여러요소가 있을경우 감싸는 wrapper 요소가 필요하다.
   - VDOM 에서 변화감지를 효율적으로 하기위해 컴포넌트는 하나의 DOM Tree로 만들어야 한다는 규칙이 있음
   - 마땅한 wrapper 요소가 없을경우 React.Fragment(<></>) 를 사용하여 fragment를 생성가능
2. JSX의 return fragment내 에선 if문 선언이 불가능하다.
   - 3항 연산자를 사용하여 조건부 렌더링이 가능
3. JSX의 return 함수는 반드시 값을 반환해야한다
   - undefined 등의 값이 오면 parse에러가 발생하는데 이를 방지하기위해 2번처럼 if문 선언을 막은것으로 추정됨.
4. JSX는 HTML과 비슷하게 생겼지만 결국엔 Javascript로 파싱되므로 기존 DOM에 사용되는 attribute는 JS 문법과 겹치면 에러가 발생할 수 있어 별도의 표기법이 존재한다.
   - ex) class (reference name), style (pass by object)
   - version 16 이상부터는 자동으로 변경 해 주고 경고를 띄움.
5. JSX에서는 홀수로 이루어진 태그는 Component로 인식하므로 self-closing 태그가 아닌 태그는 꼭 짝을 맞춰 주어야 한다.
   - self-closing tag > img, input, hr, br ... etc
6. JSX의 return 함수 내부에 주석을 작성할때도 Template 구문 내부에 {/_ 주석 _/} 과 같은 형식으로 작성해야 스크립트로 인식하여 주석처리가 된다. 그 외에는 텍스트로 표현됨
