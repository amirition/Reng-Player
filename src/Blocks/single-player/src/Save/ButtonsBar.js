import Speed from './Speed';
import FastSeek from './FastSeek';
import PlayButton from './PlayButton';

export default function ButtonsBar() {
	return(
		<div className="buttons-bar">
			<Speed />
			<FastSeek />
			<PlayButton />
		</div>
	)
}
