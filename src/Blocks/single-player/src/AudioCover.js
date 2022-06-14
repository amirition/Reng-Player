import {
  ResponsiveWrapper
} from '@wordpress/components'

import defaultThumbnail from './img/music.png'

export default function AudioCover (props) {
  return (
		<ResponsiveWrapper>
			<img className="audio-cover" alt={props.audioTitle} src={
				props.audioCover !== undefined ? props.audioCover : defaultThumbnail
			} />
		</ResponsiveWrapper>
  )
}
