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
          placement: $(this).attr('data-placement')
        }).on('shown.bs.tooltip', function(a, b) {

        });
      })
    },
    // errorTooltips: function() {
    //   $(".form-error").each(function() {
    //     $(this).tooltip('show');
    //   })
    // },
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
    // mobileHeaderTitle: function() {
    //   var title = $("#header h2:first");
    //   if (title.length > 0) {
    //     $("#header").after('<h2 class="' + title.attr('class') + ' header-h2-clone"><span class="container">' + title.html() + '</span></h2>')
    //   }
    // },
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
    phoneCode: function() {
      $("input[maxlength]").keyup(function() {
        if (this.value.length == this.maxLength) {
          $(this).next('input').focus();
        }
      });
    },
    formValidate: function() {
      $("form").each(function() {
        var form = this;

        // Suppress the default bubbles
        form.addEventListener("invalid", function(event) {
          event.preventDefault();
        }, true);

        // Support Safari, iOS Safari, and the Android browser—each of which do not prevent
        // form submissions by default
        $(form).on("submit", function(event) {
          if (!this.checkValidity()) {
            event.preventDefault();
          }
        });

        $(":required", form)
          // Destroy the tooltip on blur if the field contains valid data
          .on("blur", function() {
            var field = $(this);
            field.tooltip("hide");
          })
          // Show the tooltip on focus
          .on("focus", function() {
            var field = $(this);
            if (this.validity.valid) {
              field.tooltip("hide");
            } else if (this.validity.invalid) {
              field.tooltip("show");
            }
          });

        $("button:not([type=button]), input[type=submit]", form).on("click", function(event) {
          // Destroy any tooltips from previous runs
          $("input, select, textarea", form).each(function() {
            var field = $(this);
            if (field.data("toggle")) {
              field.tooltip("destroy");
            }
          });

          // Add a tooltip to each invalid field
          var invalidFields = $(":invalid", form).each(function() {
            var field = $(this).tooltip({
              animation: false,
              trigger: "focus",
              placement: "bottom",
              title: function() {
                return field[0].validationMessage;
              }
            });
          });

          // If there are errors, give focus to the first invalid field
          invalidFields.first().trigger("focus").eq(0).focus();
        });
      });
    },
    collapsableSelect: function() {

      function collpaseStuff(e) {
        var target = $(e).find(":selected").data("target");

        $(target).siblings(".collapse").collapse("hide");
        $(target).collapse('show');
      }

      $("select[data-toggle='collapse']").change(function() {
        collpaseStuff(this);
      });

      $("select[data-toggle='collapse']").each(function() {
        collpaseStuff(this);
      });

    },
    initDatepicker: function() {
      if ($(".datepicker").length) {
        $(".datepicker").datepicker({
          changeYear: true,
          changeMonth: true,
          yearRange: "-100:+0"
        });
      }
    },
    init: function() {
      var scope = this;
      $(document).ready(function() {
        scope.heroCarousel();
        scope.mobileMenu();
        scope.tabs();
        scope.selects();
        scope.helps();
        scope.phoneCode();
        scope.guiAccordion();
        scope.formValidate();
        scope.initDatepicker();
        scope.collapsableSelect();

        // $("input[data-original-title]").each(function() {
        //   $(this).tooltip({
        //     placement: $(this).attr('data-placement'),
        //     trigger: "focus"
        //   });
        // });

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
