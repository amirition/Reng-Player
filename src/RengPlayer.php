<?php

namespace Amirition\Reng;

use Amirition\Reng\Blocks\RegisterBlocks;

class RengPlayer {

	private function __construct( RegisterBlocks $blocks ) {

	}

	public static function instance() {
		static $instance;
		$blocks = new RegisterBlocks();
		if( !$instance ) {
			$instance = new self( $blocks );
		}
	}

}