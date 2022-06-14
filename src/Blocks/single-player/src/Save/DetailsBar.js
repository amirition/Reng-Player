import Speed from './Speed'
import FastSeek from './FastSeek'
import Info from './Info'

export default function DetailsBar (props) {

	/**
	 * pSBC - Shade Blend Convert - Version 4.1 - 01/7/2021
	 * https://github.com/PimpTrizkit/PJs/blob/master/pSBC.js
	 * Basically it makes a color lighter
	 */
  const pSBC = (p, c0, c1, l) => {
    let pSBCr = (d) => {
      const i = parseInt
      let n = d.length; const x = {}
      if (n > 9) {
        const [r, g, b, a] = (d = d.split(','))
        n = d.length
        if (n < 3 || n > 4) return null
        x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
      } else {
        if (n == 8 || n == 6 || n < 4) return null
        if (n < 6)d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '')
        d = i(d.slice(1), 16)
        if (n == 9 || n == 5)x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = Math.round((d & 255) / 0.255) / 1000
        else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
      } return x
    }
    let r; let g; let b; let P; let f; let t; let h; const i = parseInt; const m = Math.round; let a = typeof (c1) === 'string'
    if (typeof (p) !== 'number' || p < -1 || p > 1 || typeof (c0) !== 'string' || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null
    if (!pSBCr) {
      pSBCr = (d) => {
        let n = d.length; const x = {}
        if (n > 9) {
          [r, g, b, a] = d = d.split(','), n = d.length
          if (n < 3 || n > 4) return null
          x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
        } else {
          if (n == 8 || n == 6 || n < 4) return null
          if (n < 6)d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '')
          d = i(d.slice(1), 16)
          if (n == 9 || n == 5)x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000
          else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
        } return x
      }
    }
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == 'c' ? !h : false : h, f = pSBCr(c0), P = p < 0, t = c1 && c1 != 'c' ? pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p
    if (!f || !t) return null
    if (l)r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b)
    else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5)
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0
    if (h) return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')'
    else return '#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
  }

  // Returns black or white foreground color depending on the background
  const textColor = function (backgroundColor) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(backgroundColor)
    if (!result) {
      return '#333'
    }
    const shade = (parseInt(result[1], 16) + parseInt(result[2], 16) + parseInt(result[3], 16)) / 3
    return shade > 128 ? '#333' : '#f1f1f1'
  }

  const barStyle = {
    background: 'linear-gradient( 45deg, ' +
			pSBC(0.4, props.backgroundColor) +
			', ' +
			props.backgroundColor +
			', ' +
			pSBC(0.3, props.backgroundColor) +
			')'
  }

  return (
		<div className="details-bar" style={barStyle}>
			<Speed color={textColor(props.backgroundColor)} backgroundColor={props.backgroundColor} />
			<Info
				color={textColor(props.backgroundColor)}
				audioTitle={props.audioTitle}
				audioArtist={props.audioArtist}
			/>
			<FastSeek color={textColor(props.backgroundColor)} />
		</div>
  )
}
