import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserStore from './store/UserStore'
import './index.css'
import MessageStore from './store/MessageStore'
import LinkStore from './store/LinkStore'
import ThemeContextWrapper from './components/ThemeContextWrapper'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeContextWrapper>
    <Context.Provider value={{
      user: new UserStore(),
      messages: new MessageStore(),
      links: new LinkStore()
    }}>
      <App />
    </Context.Provider>
  </ThemeContextWrapper>
);
