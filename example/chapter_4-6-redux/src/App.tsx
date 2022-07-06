import { CSSProperties } from 'react'
import ItemList from './components/itemList/itemList.component'

const AppStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

function App() {
  return (
    <main className="App" style={AppStyle}>
      <ItemList />
    </main>
  )
}

export default App
