import React from 'react'
import './App.css'
import {withRouter} from 'react-router-dom'
import routes from './routes'
import Nav from './Components/Nav'

const App = (props) => {
  return (
    <div className="App">
      {/* BEGIN TERNARY */}
      {
        props.location.pathname === '/' ?
        ( <div> {routes} </div> )
        :
        ( <div className='main' > 
          <div id='main-nav' >
            <Nav /> 
          </div>
            {routes} 
          </div> 
        )
      }
      {/* END TERNARY */}
    </div>
  )
}

// export default App
export default withRouter(App)