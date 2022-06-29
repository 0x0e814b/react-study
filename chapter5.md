# REF

Class Component의 createRef 나 Hooks의 useRef Hook 을 사용하여 생성하는 레퍼런스 객체  
{ current: ref } 형태로 감싸진 순수 자바스크립트 객체 를 반환하며, 리렌더링과 별개로 값이 유지되며 생명주기에 따라 객체가 유지된다.  
ref는 변경되어도 상태 변경이 되지않고 참조용으로만 사용하기 떄문에 다양하게 활용을 할 수 있지만  
어떤 요소를 참조하는 자바스크립트 객체이므로 남발할 경우 메모리 관리에 불리할 수 있다.

## ref 생성 방법

Ref는 React.createRef() 를 통해 생성이 가능하고 ref 라는 어트리뷰트를 통해 Element 에 부착이 된다.

```js
// class
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef}></div>;
  }
}

//function

const Component = () => {
  const myRef = useRef(null);

  return <div ref={myRef}></div>;
};
```

이렇게 부착된 ref는 this.myRef.current 로 접근이 가능하다.

## ref 활용 사례

컴포넌트를 ref로 할당하여 외부 컴포넌트에서 내부 메소드 호출 ( 비권장 )  
컴포넌트 내부에서 DOM을 직접 조작해야 할때 (ex. focus)  
타이머, 포커스, 텍스트 선택영역, 혹은 미디어의 재생을 관리할 때.  
애니메이션을 직접적으로 실행시킬 때.  
서드 파티 DOM 라이브러리를 React와 같이 사용할 때 등 여러가지 경우에 활용이 가능하다.

```js
// class
class FocusInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  render() {
    return <input type="text" ref={this.textInput} />;
  }
}

// function
const Component = () => {
  const myRef = useRef(null);
  const focusToInput = () => {
    myRef.current.focus();
  }
  return (
    <input type="text" ref={myRef} onChange={}/>
    <button onClick={focusToInput}>Focus</button>
  )
}
```

## REACT에서 DOM 다루기

일반적으로 REACT는 VDOM을 사용하여 내부 컴포넌트를 메모리상에서 관리를 하며 변경상태에 따라 UI를 새롭게 그려낸다.
하지만 새로 그려지는 대신 요소자체를 업데이트 하는 (ex. 캔버스에 그림 그리기) 상황처럼 꼭 DOM 자체에 접근을 해야 하는 상황일떄 Ref 를 사용하여 DOM을 참조한다.

## 주의사항

ref가 콜백형태 (인라인) 형태로 바인딩 될 경우 이전 ref를 제거하고 새로 할당하기 위해 초기값이 null 로 초기화 된 후에 할당된다.
**클래스 컴포넌트의 경우 컴포넌트 인스턴스를 ref에 할당 할 수 있지만, 함수형 컴포넌트는 인스턴스가 없기 때문에 ref에 할당이 불가능하다.**
