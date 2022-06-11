
export default function Info(props) {
	const style= {
		color: props.color,
		margin: 0
	}

	return (
		<p style={style}>{props.audioArtist} - {props.audioTitle}</p>
	);
}
