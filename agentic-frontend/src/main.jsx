import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { getSiteConfig } from './config/siteConfig.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
const cfg = getSiteConfig()
document.title = cfg.title || cfg.siteName
let metaDesc = document.querySelector('meta[name="description"]')
if (!metaDesc) {
  metaDesc = document.createElement('meta')
  metaDesc.name = 'description'
  document.head.appendChild(metaDesc)
}
metaDesc.content = cfg.metaDescription || cfg.siteDetails || cfg.siteName
let linkIcon = document.querySelector('link[rel="icon"]')
if (!linkIcon) {
  linkIcon = document.createElement('link')
  linkIcon.rel = 'icon'
  document.head.appendChild(linkIcon)
}
linkIcon.href = cfg.favicon || '/vite.svg'
