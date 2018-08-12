<?php

add_theme_support( 'post-thumbnails' );

function api_get_menu() {
  return array(
    header => wp_get_nav_menu_items('Header menu'),
    footer => wp_get_nav_menu_items('Footer menu')
  );
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'myroutes', '/menu', array(
    'methods' => 'GET',
    'callback' => 'api_get_menu',
  ));
});