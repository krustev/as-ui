(function($) {
  var app = {
    guiAccordion: function() {
      $(".gui-accordion-toggle").on('click', function() {
          var root = $(this).parents('.gui-accordion');
          if (root.hasClass('active')) root.removeClass('active').find('.gui-accordion-content').slideUp();
          else root.addClass('active').find('.gui-accordion-content').slideDown();
        })
        .parents('.gui-accordion.active').find('.gui-accordion-content').show();
    },
    helps: function() {
      $(".help").each(function() {
        $(this).tooltip({
          placement: $(this).attr('data-placement') || "top"
        }).on('shown.bs.tooltip', function(a, b) {

        });
      })
    },
    heroCarousel: function() {
      $('.hero-carousel').on('init', function(event, slick) {
        var $items = slick.$dots.find('li');
        $items.addClass('dot');
        $items.find('button').remove();
      });
      $(".hero-carousel").not('.initialized').each(function() {
        $(this).addClass('initialized').slick({
          rtl: true,
          arrows: false,
          dots: true,
          adaptiveHeight: false
        })
      })
    },
    mobileMenu: function() {
      $("#header .container-fluid").append('<span id="mobile-menu"><span></span><span></span><span></span></span>');
      $('#mobile-menu').on('click', function() {
        $(document.body).toggleClass('mobile-menu-active')
      })
      $(document.body).on('click', function(e) {
        var el = $(e.target);
        if (!el.hasClass('mobile-menu-holder') &&
          el[0].id != 'mobile-menu' &&
          el.parents('#mobile-menu').length === 0 &&
          el.parents('.mobile-menu-holder').length === 0) {
          $(document.body).removeClass('mobile-menu-active')
        }
      });
    },
    mobileHeaderTitle: function() {
      var title = $("#header h2:first");
      if (title.length > 0) {
        $("#header").after('<h2 class="' + title.attr('class') + ' header-h2-clone"><span class="container">' + title.html() + '</span></h2>')
      }
    },
    selects: function() {
      $("select.form-control").not('.wrapped').addClass('wrapped').wrap('<div class="select"></div>');
      (function(scope) {
        setTimeout(function() {
          scope.selects()
        }, 777);
      })(this)
    },
    // menu: function() {
    //   var $win = $(window),
    //     header = $("#header");
    //   minHead = /*$win.scrollTop() > 0 ||*/ $win.width() < 1200 || header.hasClass('header-in');
    //   header[minHead ? 'addClass' : 'removeClass']('header-small')
    // },
    tabs: function() {
      var links = $(".gui-tab-holder").each(function() {
        var scope = this;
        $('.gui-tabs a', scope).on('click', function(e) {
          e.preventDefault()
          $('.gui-tabs a.active', scope).not(this).removeClass('active')
          $(this).addClass('active');
          $(".gui-tab", scope).removeClass('active').filter(this.getAttribute('href')).addClass('active')
        })
      }).find('.gui-tabs a');
      links.filter('.active').each(function() {
        $(this.getAttribute('href')).addClass('active')
      });
      links.filter('[href="' + location.hash + '"]').click()
    },
    showHide: function() {
      $(".show-contoller").each(function() {

        var controller = $(this).data("controller"),
            state = $(this).data("state"),
            target = $(this).data("target");

        $(this).click(function() {
          if ( $(controller).is(state) ) {
            console.log(target);
            $(target).toggleClass("hide");
          }
        });
      });
    },
    init: function() {
      var scope = this;
      $(document).ready(function() {
        scope.heroCarousel();
        // scope.menu();
        scope.mobileMenu();
        scope.tabs();
        // scope.mobileHeaderTitle();
        scope.selects();
        scope.helps();
        scope.showHide();
        scope.guiAccordion();
        $("input[title]").each(function() {
          $(this).tooltip({
            placement: $(this).attr('data-placement') || "top",
            trigger: "focus"
          }).on('shown.bs.tooltip', function(a, b) {});
        });
        $.fn.modal.prototype.constructor.Constructor.DEFAULTS.backdrop = 'static';
        setTimeout(function() {
          $(document.body).addClass('document-ready')
        }, 10)
      })
      $(window).on('load resize scroll', function() {
        // scope.menu();
      })
    }
  }

  app.init();

  //Expose:

  //window.app = app;

})(jQuery);
