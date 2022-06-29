# Event Handling

## 리액트의 이벤트 시스템

보통 우리가 사용하는 브라우저에서 사용자 인터렉션을 처리할때, 자바스크립트는 브라우저에 내장 되어있는 Web API인 Event와 EventTarget 이라는 객체를 다뤄서 처리한다.
예를 들어 버튼을 클릭 했을때, 얼럿을 띄운다고 하면

```JS
const button = document.querySelector('button'); // DOM
button.addEventListener('click', () => { console.log('listener'); }); // Add Event Handler to Listener List
```

위와 같이 Button 이라는 EventTarget Interface를 구현한 DOM에  
EventTarget.addEventListener를 실행하여 EventName에 매칭 시킨 핸들러 함수를  
별도 구현체인 EventListenerList 에 추가하고 해당 이벤트를 감시하여 콜백을 처리한다.

리액트 또한 자바스크립트로 만들어 졌기 때문에 동일한 방식으로 구현되게 된다.

하지만 리액트에서의 이벤트 핸들링이 일반 자바스크립트의 이벤트 처리와 다른점이 몇가지 있는데,  
그 예시로는 2장에서 알아보았던 JSX의 특성 때문에 소문자로 전부 작성할시 리액트가 내부적으로 DOM의 attribute로 해석하여 내부동작에 방해가 될 수 있기 때문에 camelCase로 작성해 주어야 한다는 점과
핸들러 함수가 객체의 props 형태로 넘어가기 때문에 바로 명령형 코드를 작성하는 대신, 함수형태의 객체로 만들어서 DOM 요소에 전달해야 한다는 점이다.

리액트의 컴포넌트는 DOM 요소가 아니라 리액트 객체이기 때문에 onClick 과 같은 event Handler를 부착하여도 DOM 모델로 해석이 되지 않기 때문에 내부 DOM 요소에 props로 전달 해 줄수는 있지만, 컴포넌트 레벨에서 작동하진 않는다.

**이벤트 종류**

리액트는 View 치중된 UI 라이브러리이기 때문에 보통의 웹상에서 일어나는 유저 인터렉션에 관한 이벤트들을 지원하며, DOM의 모든 Event를 지원하진 않는다.

```text
  EX) Clipboard, Composition, Keyboard, Focus, Form, Mouse, Selection, Touch, UI, Wheel, Media, Image, Animation, Transition
```

바닐라 자바스크립트와 달리 리액트의 Event 는 SyntheticEvent 객체로 크로스플랫폼 지원을 위해 리액트에서 만든 Vanilla NativeEvent의 Wrapper 객체이다.
SyntheticEvent는 React v17 이전에는 Event Pooling 이라는 과정이 있어 이벤트가 호출된 이후 객체가 무효화 되어 비동기적이나 외부에서 참조할때는 e.persist(); 메소드로 유지시켜야 했지만  
v17 이후부터는 Event Pooling을 사용하지 않기 때문에 따로 신경쓰지 않아도 된다.

 <!-- babel class property auto bind - transform-class-properties -->
