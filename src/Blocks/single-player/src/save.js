/**
 * WordPress dependencies
 */
import {
  useBlockProps
} from '@wordpress/block-editor'

import DetailsBar from './Save/DetailsBar'
import AudioCanvas from './Save/AudioCanvas'

const Save = (props) => {
  const blockProps = useBlockProps.save()
	
  return (
		<div className="reng-player reng-single-player">
			<div className="thumbnail">
				<img src={props.attributes.audioCover} className="audio-cover" />
			</div>
			<div className="song flex horizontal">
				<div className="flex vertical left">
					<AudioCanvas audioUrl={props.attributes.audioUrl} />
					<DetailsBar
						audioTitle={props.attributes.audioTitle}
						audioArtist={props.attributes.audioArtist}
						backgroundColor={props.attributes.audioColor}
					/>
				</div>
			</div>
		</div>
  )
}

export default Save
