<?php
namespace Amirition\Reng\Assets;

class RegisterScripts {

	public function __construct() {
		$this->register_hooks();
	}

	public function register_hooks() {
		add_action( 'admin_enqueue_scripts', [$this, 'enqueue_admin_styles'] );
		add_action( 'admin_enqueue_scripts', [$this, 'enqueue_admin_scripts'] );

		add_action( 'wp_enqueue_scripts', [$this, 'enqueue_public_styles'] );
		add_action( 'wp_enqueue_scripts', [$this, 'enqueue_public_scripts'] );
	}

	public function enqueue_admin_styles() {

	}

	public function enqueue_admin_scripts() {

 	}

	public function enqueue_public_styles() {
		wp_enqueue_style( 'player', plugin_dir_url( __FILE__ ) . '/css/player.css' );
	}

	public function enqueue_public_scripts() {
		wp_enqueue_script( 'player', plugin_dir_url(__FILE__ ) . '/js/player.js', array(), '1.0.0', true );
	}
}