export default function PlayButton() {
	return (
		<button className="play-button" data-playing="false" role="switch" aria-checked="false">
			<i className="icon-play"></i>
		</button>
	);
}
