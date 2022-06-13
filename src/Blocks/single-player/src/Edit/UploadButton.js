import {
  MediaUpload,
  MediaUploadCheck
} from '@wordpress/block-editor'

import {
  Button
} from '@wordpress/components'

export default function UploadButton (props) {
  const ALLOWED_MEDIA_TYPES = ['audio']
  return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={(media) => {
				  props.changeAttributes(media)
				}}
				value={props.audioId}
				allowedTypes={ALLOWED_MEDIA_TYPES}
				render={({ open }) => (
					<Button onClick={open}>{props.audioId !== 0 ? 'Change the Audio' : 'Upload a new Audio'}</Button>
				)}
			/>
		</MediaUploadCheck>
  )
}
