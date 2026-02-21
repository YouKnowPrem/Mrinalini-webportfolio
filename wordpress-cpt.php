<?php
/*
Plugin Name: Academic Portfolio Headless Integration
Description: Registers Custom Post Types (Publications) and exposes them to the REST API for the Next.js frontend.
Version: 1.0
Author: Senior Engineer
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Register 'Publication' Custom Post Type
 */
function ap_register_publications_cpt() {
    $labels = array(
        'name'                  => _x( 'Publications', 'Post Type General Name', 'text_domain' ),
        'singular_name'         => _x( 'Publication', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'             => __( 'Publications', 'text_domain' ),
        'name_admin_bar'        => __( 'Publication', 'text_domain' ),
        'add_new'               => __( 'Add New', 'text_domain' ),
        'add_new_item'          => __( 'Add New Publication', 'text_domain' ),
        'edit_item'             => __( 'Edit Publication', 'text_domain' ),
        'all_items'             => __( 'All Publications', 'text_domain' ),
    );
    $args = array(
        'label'                 => __( 'Publication', 'text_domain' ),
        'description'           => __( 'Academic Publications', 'text_domain' ),
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'custom-fields', 'revisions' ),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-book',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true, // Exposes to WP REST API
        'rest_base'             => 'publications',
    );
    register_post_type( 'publication', $args );
}
add_action( 'init', 'ap_register_publications_cpt', 0 );

/**
 * Ensure ACF (Advanced Custom Fields) or standard custom fields are exposed in REST API
 * Assuming we have custom fields: journal_name, publication_year, external_link, featured
 */
function ap_register_rest_fields() {
    $fields = array('journal_name', 'publication_year', 'external_link', 'featured');
    
    foreach ($fields as $field) {
        register_rest_field( 'publication', $field, array(
            'get_callback'    => function( $post_arr ) use ( $field ) {
                return get_post_meta( $post_arr['id'], $field, true );
            },
            'update_callback' => null,
            'schema'          => null,
        ) );
    }
}
add_action( 'rest_api_init', 'ap_register_rest_fields' );

/**
 * Configure CORS to allow Next.js queries if hosted on same domain or specific origin
 */
function ap_cors_http_header(){
	// Assuming shared hosting environment where the Next.js build is at root and WP in /cms
	// This helps with local development or specific subdomains.
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
}
add_action('init','ap_cors_http_header');

// Optional: Redirect frontend requests to root so the headless Next.js app handles routing
// If a user accidentally visits /cms/publication/book-title
// add_action( 'template_redirect', function() {
//    if ( ! is_admin() && ! is_rest() ) {
//        wp_redirect( home_url() ); // Or the root domain
//        exit;
//    }
// });
