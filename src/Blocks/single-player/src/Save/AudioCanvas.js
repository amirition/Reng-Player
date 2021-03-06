export default function AudioCanvas (props) {
  return (
		<div className="grid-x cell">
			<input type="range" className="time" min="0" max="100" step="0.01" value="0" width="100%" />
			<audio className="reng-single" src={props.audioUrl}></audio>
			<div className="seek-container cell">
				<canvas className="songWave"></canvas>
				<div className="mask-container">
					<canvas className="songWaveMask"></canvas>
				</div>
			</div>
		</div>
  )
}
