<?php
/**
 * Plugin Name:       Blockylicious
 * Description:       A plugin of funky blocks.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            pumpkinslayer12
 * Author URI:		  https://github.com/pumpkinslayer12
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blockylicious
 *
 * @package           create-block
 */

namespace BlockyliciousBlockBundle;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function create_custom_block_category($categories)
{
	array_unshift(
		$categories,
		[
			'slug' => 'blockylicious',
			'title' => 'Blockylicious'

		]
	);
	return $categories;

}

function create_block_blockylicious_block_init()
{
	add_filter('block_categories_all', 'BlockyliciousBlockBundle\create_custom_block_category');
	register_block_type(__DIR__ . '/build/blocks/curvy');
	register_block_type(__DIR__ . '/build/blocks/clickyGroup');
	register_block_type(__DIR__ . '/build/blocks/clickyButton');
	register_block_type(__DIR__ . '/build/blocks/piccyGallery');
	register_block_type(__DIR__ . '/build/blocks/piccyImage');

	add_action('enqueue_block_assets', function () {
		wp_enqueue_style("dashicons");
	});

}
add_action('init', 'BlockyliciousBlockBundle\create_block_blockylicious_block_init');

function convert_custom_properties($value)
{
	$prefix = 'var:';
	$prefix_len = strlen($prefix);
	$token_in = '|';
	$token_out = '--';
	if (str_starts_with($value, $prefix)) {
		$unwrapped_name = str_replace(
			$token_in,
			$token_out,
			substr($value, $prefix_len)
		);
		$value = "var(--wp--$unwrapped_name)";
	}

	return $value;
}