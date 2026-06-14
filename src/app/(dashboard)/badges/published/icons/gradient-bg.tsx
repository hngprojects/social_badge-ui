import React from 'react'

export default function GradientBgSm() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="117" height="294" fill="none" viewBox="0 0 117 294">
            <path fill="url(#sm)" d="M0-119.778h151.101v720.466H0z" />
            <defs>
                <radialGradient id="sm" cx="0" cy="0" r="1" gradientTransform="matrix(106.845 0 0 509.446 75.55 240.455)" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF693E" stopOpacity=".18" />
                    <stop offset=".6" stopColor="#FF693E" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>

    );
}


export  function GradientBgLg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="310" height="180" fill="none" viewBox="0 0 310 163">
  <path fill="url(#lg)" d="M0-66.5h400v400H0z"/>
  <defs>
    <radialGradient id="lg" cx="0" cy="0" r="1" gradientTransform="translate(200 133.5) scale(282.843)" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FF693E" stopOpacity=".18"/>
      <stop offset=".6" stopColor="#FF693E" stopOpacity="0"/>
    </radialGradient>
  </defs>
</svg>

    );
}
