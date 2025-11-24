import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { getSiteConfig } from './config/siteConfig.js'

// Render App
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)

// Load config
const cfg = getSiteConfig()

// ------------------------------
// Set Document Title
// ------------------------------
document.title = cfg.metaTitle || cfg.siteName

// ------------------------------
// Set Meta Description
// ------------------------------
let metaDesc = document.querySelector('meta[name="description"]')
if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.name = 'description'
    document.head.appendChild(metaDesc)
}
metaDesc.content = cfg.metaDescription || cfg.siteDetails || cfg.siteName

// ------------------------------
// Set Favicon
// ------------------------------
let linkIcon = document.querySelector('link[rel="icon"]')
if (!linkIcon) {
    linkIcon = document.createElement('link')
    linkIcon.rel = 'icon'
    document.head.appendChild(linkIcon)
}
linkIcon.href = cfg.favicon || '/vite.svg'

// ------------------------------
// Set Open Graph Image (Facebook, LinkedIn, etc.)
// ------------------------------
let ogImage = document.querySelector('meta[property="og:image"]')
if (!ogImage) {
    ogImage = document.createElement('meta')
    ogImage.setAttribute('property', 'og:image')
    document.head.appendChild(ogImage)
}
ogImage.content = cfg.metaImage || cfg.logo || '/default-image.png'

// ------------------------------
// Set Twitter Card Image
// ------------------------------
let twitterImage = document.querySelector('meta[name="twitter:image"]')
if (!twitterImage) {
    twitterImage = document.createElement('meta')
    twitterImage.name = 'twitter:image'
    document.head.appendChild(twitterImage)
}
twitterImage.content = cfg.metaImage || cfg.logo || '/default-image.png'

// ------------------------------
// Set Open Graph Title
// ------------------------------
let ogTitle = document.querySelector('meta[property="og:title"]')
if (!ogTitle) {
    ogTitle = document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    document.head.appendChild(ogTitle)
}
ogTitle.content = cfg.metaTitle || cfg.siteName

// ------------------------------
// Set Open Graph Description
// ------------------------------
let ogDesc = document.querySelector('meta[property="og:description"]')
if (!ogDesc) {
    ogDesc = document.createElement('meta')
    ogDesc.setAttribute('property', 'og:description')
    document.head.appendChild(ogDesc)
}
ogDesc.content = cfg.metaDescription || cfg.siteDetails || cfg.siteName

