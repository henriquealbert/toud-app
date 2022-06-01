import Script from 'next/script'

export const GoogleTagManagerHeader = () => (
  <Script
    id="google-tag-manager-header"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WWWLL67');`
    }}
  ></Script>
)

export const GoogleTagManagerBody = () => (
  <noscript
    dangerouslySetInnerHTML={{
      __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWWLL67"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`
    }}
  ></noscript>
)
