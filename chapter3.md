# Component

대망의 컴포넌트, 리액트의 핵심 요소이다.
컴포넌트는 Class를 사용하는 Class 형 컴포넌트와, 단순 Function 으로 이루어진 함수형 컴포넌트 두가지의 선언 방식이 있다.

<br />

## Types of Component

---

<br />

### Class형 컴포넌트

```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    const name = 'react';
    return <div className={name}>{name}</div>;
  }
}
```

Class형 컴포넌트는 React 에서 미리 정의한 Component Class를 상속받기 때문에 render라는 함수를 명시적으로 사용해주어야 한다.

Class형 컴포넌트와 Functional 컴포넌트의 가장 큰 차이점은 lifeCycle과 자체적인 state이다.

<br />

### 함수형 컴포넌트

```javascript
import React from 'react';

const MyComponent = () => {
  return <div>new Component</div>;
};

export default MyComponent;
```

함수형 컴포넌트는 위와 같이 Class에 비해 간결하게 사용이 가능하며 별도의 상속없이 자체적으로 사용이 가능하다.

<br />

## Props

---

props 는 Properties 를 줄인 표현으로 React에서 컴포넌트의 속성을 설정할때 사용하는 요소입니다.

<br />

### Usage of props

이전에 선언한 MyComponent 함수형 컴포넌트를 활용한 props 사용예제

```javascript
// My Component (functional)
import React from 'react';

const MyComponent = (props) => {
  return <div>new {props.componentName}</div>;
};

export default MyComponent;

// My Component (Class)
class MyComponent extends Component {
  // instance의 property로 조회
  render() {
    return <div>new {this.props.componentName}</div>;
  }
}

// Root
import React from 'react';
import MyComponent from './MyComponent';

const App = () => {
  return <MyComponent name="my-component" />;
};
```

위와 같이 props 는 HTML에서 의미하는 attribute와 유사한 개념이다.

<br />

### Default Props

그럼 만약 사용자가 props를 지정하지 않았을 경우 기본으로 보여줄 값은 어떻게 설정해야 할까

```javascript
// My Component
import React from 'react';

const MyComponent = (props) => {
  return <div>new {props.componentName}</div>;
};

MyComponent.defaultProps = {
  componentName: '기본 컴포넌트',
};

export default MyComponent;
```

Prototype을 이용하여 defaultProps를 선언해주면 렌더링시 해당하는 속성이 없을경우 default값 으로 사용하게 된다.

<br />

### props.children

만약 컴포넌트를 Wrapper로 사용하고 싶을경우 children이라는 기본 props를 활용하여 child element를 활용할 수 있다.

```javascript
// My Component
import React from 'react';

const MyComponent = (props) => {
  return (
    <>
      <div>new {props.componentName}</div>
      <br />
      {props.children}
    </>
  );
};

MyComponent.defaultProps = {
  componentName: '기본 컴포넌트',
};

export default MyComponent;

// Root
import React from 'react';
import MyComponent from './MyComponent';

const App = () => {
  return <MyComponent name="my-component">두두등장</MyComponent>;
};
```

위와 같이 사용시

```html
<MyComponent name="my-component">두두등장</MyComponent>
```

MyComponent 사이의 두두등장 텍스트가 children 으로서 들어가게 되며 여기엔 여러가지 요소들이 들어갈 수 있다.

<br />

### Object Destructuring

JSX의 Props 또한 defaultProps처럼 Component의 prototype 객체 이므로 ES6 문법인 Object Destructuring을 활용하여 변수를 할당할 수 있다.

```javascript
// My Component
import React from 'react';
const MyComponent = ({ componentName, children }) => {
  return (
    <>
      {/* destructuring */}
      <div>new {componentName}</div>
      <br />
      {/* destructuring */}
      {children}
    </>
  );
};

MyComponent.defaultProps = {
  componentName: '기본 컴포넌트',
};

export default MyComponent;

// Root
import React from 'react';
import MyComponent from './MyComponent';
const App = () => {
  return <MyComponent name="my-component">두두등장</MyComponent>;
};
```

<br />

### required props

일반적인 웹 개발에서 그렇듯 특정 타입만 와야 하는 값이 있을 수 있다.
이럴땐 **PropTypes** 라는 라이브러리를 사용해 필수 요소와 해당되는 객체타입을 지정할 수 있다.

```js

  ...
  import PropTypes from 'prop-types';

  const MyComponent = ({componentName, children}) => { ... };

  MyComponent.defaultProps = {
    componentName: '디폴트 값'
  };

  MyComponent.propTypes = {
    componentName: PropTypes.string // expected String
    componentNumber: PropTypes.number.isRequired // required 필수
  };
```

_reference_

```
bool, func, number, object, string, symbol, node, array, any,
instanceOf, oneOf(any[]), oneOfType(PropType.type[]),
objectOf({ [key: PropType.type]: any }), shape({ [key: any]: any }),
arrayOf(PropType.type)
```

그 외 https://github.com/facebook/prop-types 참고

<br />

## State

---

state는 컴포넌트의 상태 ( 컴포넌트에서 자체적으로 변경이 가능한 값 ) 을 의미한다.
props와의 차이점은 props는 부모로 부터 주입 받는 반면 state는 component 내부에서도 선언, 변경이 가능하다.

### Class Component State

---

```js
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0;
    }
  }

  render() {
    const { number } = this.state;
    return (
      <>
        <h1>{number}</h1>
        <button onClick={() => {
          this.setState({ number: number + 1});
        }}> +1 </button>
      </>
    )
  }
}
```

class Component는 props와 동일하게 this 의 instance 로 접근한다.

react의 state는 생성시의 constructor 내부에서만 반영되기 때문에 instance 생성 이후 값을 변경할 시에는 무조건 setState를 활용하여 setter 로 변경해야 렌더링에 반영 된다.

<br />

### setState 의 종류

---

setState는 변경 값을 모아 한번에 리렌더링 하는 배칭(batching)이라는 과정을 거쳐 비동기적으로 변경이 되기 때문에.  
batching이 일어나는 경우에 this.state 값은 기대하던 값이 아닐 수도 있다.  
이럴땐 setState의 인자로 콜백함수를 받아 현재 state를 기준으로 값이 사용 가능하다.

```js
// state 를 업데이트
this.setState(state)

// 현재값을 기준으로 변경 ( 비동기 )
this.setState((state, props) => { [key]: state.key + 1 })

// 스테이트 변경
this.setState({ number: number + 1}, () => { console.log(this.state.number) }) 콜백
```

<br />

### 함수형 컴포넌트에서의 state

---

그렇다면 React.Component를 상속받지 않는 함수형 컴포넌트에서는 state를 어떻게 사용할까?
React.Component에서 활용되는 lifeCycle과 주로 쓰이는 메소드들은 별도의 Hook 이라는 형태로 분류되어있어 함수형으로 활용이 가능하다.

```js
import React from 'react';

const MessageComponent = () => {
  const [message, setMessage] = React.useState('');
  const onClickEnter = () => setMessage('환영합니다');
  const onClickLeave = () => setMessage('안녕히 가세요');

  return (
    <div>
      <button onClick={onClickEnter}></button>
      <button onClick={onClickLeave}></button>
      <h1>{message}</h1>
    </div>
  );
};
```

위 형태와 같이 useState의 인자로 초기 상태값(defaultState)을 넣어 실행하게 되면
[state, setter]로 이루어진 배열을 반환한다.

<br />

## notes

---

useState로 반환되는 state는 클래스형의 객체 프로퍼티인 state와는 다르게 각각이 하나의 변수로 취급되어 여러번 선언이 가능하다.

state는 Component Driven으로 해당 컴포넌트에 종속되며 top-down 방식으로 흐르기 때문에 컴포넌트의 state는 오직 해당 컴포넌트와 그 하위 컴포넌트만 알 수 있다.
