<header id="site-header" class="site-header-bar">
  <div class="top-bar site-header-bar__top-bar" id="top-menu" data-topbar role="navigation">
    <ul class="title-area site-header-bar__title-area">
      <li class="name"><h1><a href="<?php echo esc_url(home_url()); ?>">
        <?php bloginfo('name'); ?>
      </a></h1> </li>
      <li class="toggle-topbar menu-icon site-header-bar__toggle-topbar"><a href="#"><span>Menu</span></a></li>
    </ul>
    <div class="top-bar-right site-header-bar__top-bar-right">
      <ul class="dropdown menu site-header-bar__nav" data-dropdown-menu>
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
