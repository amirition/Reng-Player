<?php

namespace Amirition\Reng\Blocks;

class RegisterBlocks {

	public function __construct() {

		$this->register_hooks();
	}

	public function register_hooks() {
		add_action( 'init', [$this, 'register_block_types'] );
	}

	public function register_block_types() {
		// Single audio player
		register_block_type( __DIR__ . '/single-player/build' );
	}
}