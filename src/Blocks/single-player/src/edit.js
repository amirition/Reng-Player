/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss'

import AudioCanvas from './Edit/AudioCanvas'
import AudioCover from './AudioCover'
import UploadButton from './Edit/UploadButton'
import {useBlockProps} from "@wordpress/block-editor";

import {prominent} from "color.js";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function Edit (props) {
	const blockProps = useBlockProps({
		className: 'reng-single-player-block'
	});
  const { attributes, setAttributes } = props

  const setMediaAttributes = function (media) {
		prominent(media.image.src, {
			amount: 1,
			format: 'hex'
		}).then(color => {
			props.setAttributes({
				audioColor: color,
				audioUrl: media.url,
				audioId: media.id,
				audioCover: media.image.src,
				audioTitle: media.title
			});
		})
  }

  return (
		<div {...blockProps}>
			<AudioCover
				audioId={attributes.audioId}
				audioTitle={attributes.audioTitle}
				audioCover={attributes.audioCover}
			/>
			<AudioCanvas audioTitle={attributes.audioTitle} />
			<UploadButton audioId={attributes.audioId} changeAttributes={setMediaAttributes}/>
		</div>
  )
};
