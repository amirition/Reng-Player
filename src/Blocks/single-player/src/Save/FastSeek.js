export default function FastSeek( props ) {
	const style = {
		color: props.color,
		display: 'flex',
		flexWrap: 'nowrap',
	}
	return (
		<div className="fast-seek" style={style}>
			<i className="icon-backward"></i>
			<i className="icon-play play-button" data-playing="false" role="switch" aria-checked="false"></i>
			<i className="icon-forward"></i>
		</div>
	);
}
