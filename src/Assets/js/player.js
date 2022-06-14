let buffer;

document.addEventListener("DOMContentLoaded", function() {

  /**
   *
   * @param url
   * @param context
   * @param player    DOMElement
   */
  const visualizeAudio = (url, context, player) => {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(audioBuffer => draw(normalizeData(filterData(audioBuffer)), player));
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

  /**
   *
   * @param normalizedData
   * @param player  DOMElement
   */
  const draw = (normalizedData, player) => {
    // Set up the canvas
    const canvas = player.querySelector(".songWave");
    const canvasMask = player.querySelector(".songWaveMask");
    const dpr = window.devicePixelRatio || 1;
    const padding = -5;
    let canvasWidth = canvas.parentElement.offsetWidth;
    canvas.width = canvasWidth
    canvasMask.width = canvasWidth
    //canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
    canvas.height= 60;
    canvasMask.height= 60;

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
    ctx.stroke();
  };

  const playTheSong = function( playButton, audioElement ) {
    audioElement.play();

    playButton.dataset.playing = 'true';
    playButton.classList.remove( 'icon-play' )
    playButton.classList.add( 'icon-pause' )
  }

  const pauseTheSong = function( playButton, audioElement ) {
    audioElement.pause();
    playButton.dataset.playing = 'false';
    playButton.classList.remove( 'icon-pause' )
    playButton.classList.add( 'icon-play' )
  }

  const seekControl = function ( track, context) {
    // Create the gain node for volume
    const gainNode = context.createGain();
    const analyzerNode = context.createAnalyser();
    track.connect(analyzerNode).connect(gainNode).connect( context.destination );
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const rengPlayers = document.querySelectorAll( '.reng-player' );

  // Play all the audios in the post
  rengPlayers.forEach( (player) => {
    const audioElement = player.querySelector( 'audio' );
    const audioContext = new AudioContext();
    const track = audioContext.createMediaElementSource( audioElement );
    let currentBuffer = null;
    visualizeAudio(audioElement.getAttribute('src'), audioContext, player);
    seekControl( track, audioContext, audioElement )

    const playButton = player.querySelector( '.play-button' );
    playButton.addEventListener( 'click', function() {
      if( audioContext.state === 'suspended' ) {
        audioContext.resume();
      }

      if( this.dataset.playing === 'false' ) {
        playTheSong( this, audioElement );
      } else if ( this.dataset.playing === 'true' ) {
        pauseTheSong( this, audioElement );
      }

    }, false )

    // when this track is ended
    audioElement.addEventListener( 'ended', () => {
      playButton.dataset.playing = 'false';
    } )

    const canvas = player.querySelector(".songWave");
    canvas.addEventListener( 'click', function(event) {
      let progressPercent = event.offsetX / event.target.parentNode.offsetWidth
      audioElement.currentTime = audioElement.duration * progressPercent
    } );

    const timeControl = player.querySelector( '.time' );
    const maskContainer = player.querySelector( '.mask-container' );
    audioElement.addEventListener( 'timeupdate', () => {
      let progressPercent = audioElement.currentTime / audioElement.duration * 100
      timeControl.value = progressPercent
      maskContainer.style.width = progressPercent + "%"
    } )

    const speedBox = player.querySelector( '.reng-speed' );
    speedBox.addEventListener( 'change', function( event ) {
      audioElement.playbackRate = speedBox.value;
    } );

    // Change the "play" icon when the audio is finished.
    audioElement.addEventListener( 'ended', function() {
      pauseTheSong( playButton )
    } )

    // Fast seek clicks
    const fastSeekContainer = player.querySelector( '.fast-seek' );
    fastSeekContainer.addEventListener( 'click', function( event ) {
      if( event.target.classList.contains('icon-forward') ) {
        audioElement.currentTime += 30;
      }
      if( event.target.classList.contains( 'icon-backward' ) ) {
        audioElement.currentTime -= 20;
      }
    } );
  } )

});
