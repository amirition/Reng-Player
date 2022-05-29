<?php

/**
 * Plugin Name: Reng Player
 * Plugin URI: https://github.com/amirition/reng-player
 * Description: Your next lightweight audio player
 * Version: 0.1.0
 * Author: Amirition
 * Author URI: https://github.com/amirition/
 * License: GNU
 */

namespace Amirition\Reng;

if (!class_exists(RengPlayer::class) && is_readable(__DIR__.'/vendor/autoload.php')) {
	/** @noinspection PhpIncludeInspection */
	require_once __DIR__.'/vendor/autoload.php';
}

class_exists(RengPlayer::class) && RengPlayer::instance();