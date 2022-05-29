let buffer;

document.addEventListener("DOMContentLoaded", function() {

  const AudioContext = window.AudioContext || window.webkitAudioContext;

  const audioContext = new AudioContext();
  const audioElement = document.querySelector( 'audio' );
  const track = audioContext.createMediaElementSource( audioElement );
  let currentBuffer = null;
  const visualizeAudio = url => {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => draw(normalizeData(filterData(audioBuffer))));
  };

  const filterData = audioBuffer => {
    const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
    const seekContainer = document.querySelector( '.seek-container' );
    const samples = parseInt(seekContainer.offsetWidth / 4); // Number of samples we want to have in our final data set
    const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      let blockStart = blockSize * i; // the location of the first sample in the block
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
      }
      filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
    }
    return filteredData;

  }

  const normalizeData = filteredData => {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map(n => n * multiplier);
  }

  const draw = normalizedData => {
    // Set up the canvas
    const canvas = document.querySelector("#songWave");
    const canvasMask = document.querySelector("#songWaveMask");
    const dpr = window.devicePixelRatio || 1;
    const padding = 2;
    let canvasWidth = canvas.parentElement.offsetWidth;
    canvas.width = canvasWidth
    canvasMask.width = canvasWidth
    //canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
    canvas.height= 100;
    canvasMask.height= 100;

    const ctx = canvas.getContext("2d");
    const ctxMask = canvasMask.getContext("2d");

    ctx.scale(1, dpr);
    ctxMask.scale(1, dpr);

    ctx.translate(0, canvas.offsetHeight / 2 + padding); // Set Y = 0 to be in the middle of the canvas
    ctxMask.translate(0, canvasMask.offsetHeight / 2 + padding); // Set Y = 0 to be in the middle of the canvas

    // draw the line segments
    //const strokeWidth = (canvasWidth / normalizedData.length) - (padding / 2);
    const strokeWidth = 4;
    for (let i = 0; i < normalizedData.length; i++) {
      const x = strokeWidth * i;
      let height = normalizedData[i] * 15;

      drawLineSegment(ctx, x, height, strokeWidth, 'rgba(0,0,0,0.3)');
      drawLineSegment(ctxMask, x, height, strokeWidth, 'rgba(42, 157, 143, .7)');
    }
  };

  const drawLineSegment = (ctx, x, y, width, color) => {
    ctx.lineWidth = 1 ; // how thick the line is
    ctx.beginPath();
    ctx.moveTo(x , 0);
    ctx.lineTo(x, -y);
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    //ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
    //ctx.lineTo(x + width, 0);
    ctx.stroke();
  };

  visualizeAudio(audioElement.getAttribute('src'));


  // Create the gain node for volume
  const gainNode = audioContext.createGain();
  const analyzerNode = audioContext.createAnalyser();
  const volumeControl = document.querySelector( '#volume' );
  const timeControl = document.querySelector( '#time' );
  const maskContainer = document.querySelector( '.mask-container' );
  track.connect(analyzerNode).connect(gainNode).connect( audioContext.destination );

  const playButton = document.querySelector( '.play-button' );
  console.log( playButton )
  playButton.addEventListener( 'click', function() {
    if( audioContext.state === 'suspended' ) {
      audioContext.resume();
      //let testArray = new Float32Array( dataArray );
    }

    if( this.dataset.playing === 'false' ) {
      audioElement.play();
      this.dataset.playing = 'true';
      this.querySelector('i').classList.remove( 'icon-play' )
      this.querySelector('i').classList.add( 'icon-pause' )
    } else if ( this.dataset.playing === 'true' ) {
      audioElement.pause();
      this.dataset.playing = 'false';
      this.querySelector('i').classList.remove( 'icon-pause' )
      this.querySelector('i').classList.add( 'icon-play' )
    }

  }, false )

  // when this track is ended
  audioElement.addEventListener( 'ended', () => {
    playButton.dataset.playing = 'false';
  } )

  audioElement.addEventListener( 'timeupdate', () => {
    let progressPercent = audioElement.currentTime / audioElement.duration * 100
    timeControl.value = progressPercent
    maskContainer.style.width = progressPercent + "%"
  } )

  // When the volume is changed
  volumeControl.addEventListener( 'input', function() {
    gainNode.gain.value = this.value;
  }, false );

  const canvas = document.querySelector("#songWave");
  canvas.addEventListener( 'click', function(event) {
    let progressPercent = event.offsetX / event.target.parentNode.offsetWidth
    audioElement.currentTime = audioElement.duration * progressPercent
  } );

  const speedBox = document.querySelector( '#reng-speed' );
  speedBox.addEventListener( 'change', function( event ) {
    audioElement.playbackRate = speedBox.value;
  } );

  // Fast seek clicks
  // Don't mind the green underline in PHPStorm
  const fastSeekContainer = document.querySelector( '.reng-player .fast-seek' );
  fastSeekContainer.addEventListener( 'click', function( event ) {
    if( event.target.classList.contains('icon-forward') ) {
      audioElement.currentTime += 30;
    }
    if( event.target.classList.contains( 'icon-backward' ) ) {
      audioElement.currentTime -= 20;
    }
  } );

  // TODO: Change the player icon when the player is finished .

});
