import './App.css'
import { MyRoutes } from "./routing/MyRoutes"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import es from 'javascript-time-ago/locale/es'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(es)

function App() {

  return (
    <>
      <div className="layout">
        <MyRoutes />
      </div>
    </>
  )
}

export default App
