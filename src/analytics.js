const GA_MEASUREMENT_ID = 'G-989C871H97'

export function initAnalytics() {
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID)
}

export function trackEvent(eventName, eventParams = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams)
  }
}
