/**
 * WordPress dependencies
 */
import {
	useBlockProps,
} from '@wordpress/block-editor';

import ButtonsBar from "./Save/ButtonsBar";
import AudioCanvas from "./Save/AudioCanvas";

const Save = ( props ) => {
	const blockProps = useBlockProps.save();

	return (
		<div className="reng-player">
			<div className="thumbnail">
				<img src={props.attributes.audioCover} className="audio-cover" />
			</div>
			<div className="song flex horizontal">
				<div className="flex vertical left">
					<AudioCanvas audioUrl={props.attributes.audioUrl} />
					<ButtonsBar backgroundColor={props.attributes.audioColor} />
				</div>
				<div className="volume-range">
					<input type="range" id="volume" min="0" max="2" step="0.1" value="1" />
				</div>
			</div>
		</div>
	);
};

export default Save;
