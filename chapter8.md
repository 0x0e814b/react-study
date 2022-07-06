# Hooks

Hooks는 리액트 16.8 버전 부터 도입된 기능으로
함수 컴포넌트 에서도 클래스 컴포넌트의 라이프사이클 같은 동작을 구현 할 수 있게끔 만들어 준다.

## useState

useState는 함수 컴포넌트에서 자체적인 상태를 가질 수 있게끔 선언해준다.
useState를 선언하면 [value, setValue] 로 이루어진 배열을 반환하는데
setValue는 setter역할을 value는 getter 역할을 한다.

한번에 하나의 상태값만 관리가 가능하지만 여러개 선언이 가능하여 상태가 많은 경우 여러번 선언하면 된다.

setState로 state변경시 변경된 값은 다음 렌더링의 useState 결과 값으로 들어오게 되며
그 전에 접근해야 한다면 setState의 인자를 함수로 넘겨서 그 함수의 파라미터로 접근 할 수 있다.

### 초기 state

만약 초기 state가 어떠한 값을 받아와야 한다면 useState의 인자로 값을 반환하는 함수를 넣어서 해당 반환값을 initialState로 사용할 수 있다.

```js
const [state, setState] = useState(() => {
  const initialState = functionTakesLongTime(props);
  return initialState;
});
```

### reRender 취소

리액트는 내부적으로 Object.is(obj, obj2) 메소드를 사용해서 값을 비교 하고 있으므로
리렌더링 전에 state를 동일한 값으로 변경시 setState 갱신을 취소할 수 있다.

## useEffect (클래스 컴포넌트 LifeCycle과 유사함)

useEffect는 리액트 컴포넌트가 렌더링된 후 특정 작업을 수행하는 Hooks 이다.
Mount, Update와 유사한 맥락으로 렌더링시에 실행이 되며 useEffect(fn, deps[]?)의 형태로 선언한다.

첫번째 fn은 실행할 함수가 들어간다. fn 에서 다른 함수를 반환할 경우 cleanup 함수로 취급되어 언마운트, 리렌더링 직전에 실행되어 unmount와 유사한 싸이클로 동작하는 클린업 함수를 실행 가능 하다. 주로 ref에 부착한 eventListener 의 제거, clearTimeout, interval 제거 와 같은 경우에 사용한다.

두번째 dependency 배열은 기본적으론 optional이다. 아무것도 전달하지 않을 경우 컴포넌트가 렌더링이 완료된 후에 실행이 되지만, 배열로 어떠한 값을 넣을경우 그 값이 변경 되었을때만 해당 effect를 사용하겠다는 의미가 된다.  
하지만 빈 배열을 넣을경우 추후 변경될 값이 없으므로 최초 렌더링 시에만 실행이 된다.  
또한 effect에서 사용되는 state가 deps 배열안에 없을 경우 항상 초기에 설정된 initialState를 참조하게 되므로 주의가 필요하다.

### useLayoutEffect

기본적으로 useEffect는 relayout과 repaint가 진행되는 animationFrame 이후 발생하지만
DOM 변경과 같은 사용자가 리렌더 이전에 동기화 된 값을 확인해야 하는 경우
useLayoutEffect라는 조금 변경된 훅을 사용하여 useEffect처럼 사용할 수 있다.
useLayoutEffect의 동작은 기본적으로 useEffect와 동일하지만 실행시점의 차이가있다.
하지만 useEffect가 추구하는 방식이 좀 더 권장되므로 어쩔수 없는 경우에만 사용하는 것이 권장 된다.

## useReducer

useReducer는 state보다 더 다양한 상태를 관리하고 싶을때 사용하는 hook 이다.
reducer는 업데이트를 위한 action을 전달받아 해당 action에 매칭되는 동작을 실행시켜 새로운 상태를 반환하는 함수이다. reducer 또한 불변성을 중요시 해야 하며 기본적인 구조로는

```ts
interface reducerAction {
  [key: any]: any;
}

interface reduxAction extends reducerAction {
  type: string;
}
```

와 같은 형태로 선언하여 액션을 동작시킨다.
reducer를 기반으로 사용하는 redux 라는 라이브러리가 있는데
해당 라이브러리는 특정 type을 명시해서 해당 type을 action의 구분 값 으로 사용한다.

useReducer는 useReducer(fn, {}) 의 형태로 사용하게 되는데 첫번쨰 파라미터에는 reducer action을 처리할 reducer 함수를 담고, 두번째 파라미터에는 해당 리듀서에서 사용할 상태 기본값을 담는다.

useReducer를 해당형태로 선언할시 [state, dispatcher] 의 형태로 이루어진 배열을 반환하는데 state는 초기 상태이고 dispatch는 action을 reducer에 전달 시키는 함수이다.

reducer함수는 state, action의 파라미터를 받게 되는데 action 은 우리가 dispatch로 전달할 액션 형태이며, state는 setState의 함수 파라미터 처럼 현재 상태를 받는다.

```js
  function reducer(state, action) {
    console.log(state, action);
    switch(action.type) {
      case 'INCREMENT':
        return { value: state + 1 };
      case 'DECREMENT':
        return { value: state - 1 };
      default
        return state;
    }
  }
```

## useMemo

useMemo를 사용하면 동일한 state 값을 캐싱하여 함수 컴포넌트 내에서 발생하는 연산을 최적화 할 수 있다.

사용 방법은 useEffect와 동일하게 useMemo(fn, deps[]) 를 사용한다.

useMemo에 전달된 함수는 렌더링 도중 실행이 되므로 통상적으로 렌더링 중에 하지 않는 행동들을 Memo를 사용해서 실행하면 안된다.

deps 배열이 없는경우 매 렌더링마다 새 값을 계산한다.

## useCallback

useCallback은 useMemo와 유사 함수이다. 주로 렌더링 성능을 최적화 해야 하는 상황에서 사용하는데 useMemo 는 state를 캐싱하는 반면 useCallback은 함수를 caching 하여 특정 state가 변경되었을 경우에만 함수를 새로 생성한다.

```js
const onClick = useCallback(() => {
  setNumber(number);
}, [number]);
```

useEffect 처럼 빈배열을 넣게되면 처음 렌더링시 단 한번만 실행이 된다.

## useRef

[chapter5. ref 참조](./chapter5.md)

## 커스텀 Hooks 만들기

여러 컴포넌트에서 비슷한 동작을 공유할 경우 이러한 동작을 Custom Hooks 로 만들어서
재사용 할 수 있다.

```js
import { useReducer } from ‘react‘;

function reducer(state, action) {
  return {
    …state,
    [action.name]: action.value
  };
}

export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = e => {
    dispatch(e.target);
  };
  return [state, onChange];
}
```

```js
export default function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setwidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return width;
}

function someComponent() {
  const width = useWindowWidth();
}
```
