# 반복되는 요소 출력

리액트에서 반복되는 요소를 출력하려면 배열에 컴포넌트나 엘리먼트들을 담아서 바인딩 하면된다.
여기서는 일반적인 JS 배열을 사용할 수 있다.

map, filter 등의 요소로 가공이 가능하며, 요소에 key라는 attribute를 지정해 주어야 요소를 식별한 효율적인 리렌더링이 가능하다.
Key값을 설정할때는 항상 유일한 unique 키 여야 하고, 만약 중복될 경우 오류가 발생할 수 있다.

## 예시

```js
const example = [
  { id: 0, text: 'test0' },
  { id: 1, text: 'test1' },
  { id: 2, text: 'test2' },
  { id: 3, text: 'test3' },
  { id: 4, text: 'test4' },
];

const ListComponent = () => {
  const [list, setList] = useState(example);
  return (
    <ul>
      {list.map((item) => {
        <li key={item.id}>{item.text}</li>;
      })}
    </ul>
  );
};
```

## 불변성

배열을 state로 선언하여 사용할 경우, 배열을 조작할때 불변성을 지켜주어야 하는데 이것은 리액트가 상태를 업데이트하는 원리 떄문이다.  
리액트는 상태값을 업데이트 할 때 얕은 비교를 수행하는데, 속성을 하나하나 비교하는 것이 아닌 참조 값만 비교하여 상태 변화를 감지한다.  
이러한 이유 때문에 원시값이 아닌 메모리 참조 변수를 상태로 사용할 경우 직접 접근하여 수정하는 것이 아닌 새로운 값으로 만들어 변경하여야 한다.

```js
const example = [
  { id: 0, text: 'test0' },
  { id: 1, text: 'test1' },
  { id: 2, text: 'test2' },
  { id: 3, text: 'test3' },
  { id: 4, text: 'test4' },
];

const ListComponent = () => {
  const [list, setList] = useState(example);

  const addItem = () => {
    const listLen = list.length;
    const newItem = { id: listLen, text: `test${listLen}` };
    setList([...list, newItem]);
  };

  return (
    <>
      <ul>
        {list.map((item) => {
          <li key={item.id}>{item.text}</li>;
        })}
      </ul>
      <button onClick={addItem}>아이템 추가</button>
    </>
  );
};
```
