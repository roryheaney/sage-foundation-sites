<header id="site-header">
  <div class="top-bar" id="top-menu" data-topbar role="navigation">
    <ul class="title-area">
      <li class="name"><h1><a href="<?php echo esc_url(home_url()); ?>">
        <?php bloginfo('name'); ?>
      </a></h1> </li>
      <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
    </ul>
    <div class="top-bar-right">
      <ul class="dropdown menu" data-dropdown-menu>
        <?php if (has_nav_menu('primary_navigation')) :?>
            <?php wp_nav_menu([
              'theme_location' => 'primary_navigation', 
              'menu_class' => 'nav', 
              'container' => '', 
              'items_wrap' => '%3$s', 
              'walker' => new Roots\Sage\Extras\Foundation_Nav_Menu()
            ]);?>
        <?php endif;?>
      </ul>
    </div>

 
  </div>
</header>
