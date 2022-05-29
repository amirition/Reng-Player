<?php

namespace Amirition\Reng;

use Amirition\Reng\Assets\RegisterScripts;
use Amirition\Reng\Blocks\RegisterBlocks;

class RengPlayer {

	/**
	 * @var RegisterBlocks
	 */
	private $blocks;

	/**
	 * @var RegisterScripts
	 */
	private $scripts;

	private function __construct(
		RegisterBlocks $blocks,
		RegisterScripts $scripts
	) {
		$this->blocks = $blocks;
		$this->scripts = $scripts;
	}

	public static function instance() {
		static $instance;
		$blocks = new RegisterBlocks();
		$scripts = new RegisterScripts();

		if( !$instance ) {
			$instance = new self( $blocks, $scripts );
		}

	}

}