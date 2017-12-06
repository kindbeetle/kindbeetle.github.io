$(function() {
  var d = new Array();
  var k = false;
  var q = $('#lines canvas');
  var t = 30;
  var n = 3;
  var j = ['#F25C35', '#FFF'];
  var u = 0.4;
  var o = 90;
  var g = 70;
  var e = 10;
  var b = 5;
  var c = 4;
  var i = 65;
  var w = -10;
  var h = 0;
  var p = 364;
  var m = 0;
  var s = 0;
  function a(z) {
    var y = $('#small_logo');
    var A = $('#iphone');
    if (z + p <= $(window).height()) {
      if (!y.hasClass('shown')) {
        $('#small_logo, #pocket p')
          .addClass('shown')
          .fadeIn('slow');
      }
      var x = parseInt(A.css('top')) - (s - z) / 1.5;
      s = z;
      if (x >= m && x <= p) {
        A.css('top', String(x) + 'px');
      }
    }
  }
  function l() {
    var G = q.height();
    var H = q.width();
    q.attr('width', String(H + 'px'));
    q.attr('height', String(G) + 'px');
    var C = 0;
    var F = G - t;
    var D = 0;
    var I = d.length;
    var z = b + Math.round(Math.random() * (c - b));
    var E = -Math.round(Math.random() * z);
    while (C <= F) {
      C = C + t;
      if (D < I) {
        var A = 0;
        d[D].bNoCurves = E + 1 < z;
        d[D].aCoordinates.splice(0, d[D].aCoordinates.length);
        d[D].nActivePeakIsEvery = e + Math.floor(Math.random() * (g - e));
        d[D].nLastPeakCounter = -Math.floor(Math.random() * o);
        d[D].aCoordinates.push({ nX: A, nY: C, nChange: Math.random() * u });
        while (A < H) {
          var B = o + A;
          d[D].aCoordinates.push({ nX: B, nY: C, nChange: Math.random() * u });
          A = B;
        }
      } else {
        var x = j[Math.floor(Math.random() * j.length)];
        var y = {
          sColor: x,
          aCoordinates: [],
          nActivePeakIsEvery: e + Math.floor(Math.random() * (g - e)),
          nLastPeakCounter: -Math.floor(Math.random() * o),
          bNoCurves: E + 1 < z,
        };
        var A = 0;
        y.aCoordinates.push({ nX: A, nY: C, nChange: Math.random() * u });
        while (A < H) {
          var B = o + A;
          y.aCoordinates.push({ nX: B, nY: C, nChange: Math.random() * u });
          A = B;
        }
        d[D] = y;
      }
      D++;
      E = (E + 1) % z;
    }
    d.splice(D);
    k = true;
  }
  function v(E) {
    var A = d.length;
    var B = q.height();
    for (var y = 0; y < A; y++) {
      var D = d[y].aCoordinates.length;
      var C = d[y].nLastPeakCounter;
      for (var x = 0; x < D; x++) {
        if (C % d[y].nActivePeakIsEvery === 0 && !d[y].bNoCurves) {
          var z = (y + 1) * t + d[y].aCoordinates[x].nChange * E / 2;
          if (z > B - n - 1) {
            z = B - n - 1;
          } else {
            if (z < n + 1) {
              z = n + 1;
            }
          }
          if ((y + 1) * t - z > i) {
            z = (y + 1) * t - i;
          }
          d[y].aCoordinates[x].nY = z;
        } else {
          d[y].aCoordinates[x].nY = (y + 1) * t;
        }
        C++;
      }
    }
  }
  function f() {
    q.clearCanvas();
    for (var x = 0; x < d.length; x++) {
      var y = d[x].sColor;
      var A = {
        strokeStyle: y,
        strokeWidth: n,
        rounded: true,
        imageSmooting: true,
      };
      for (var z = 1; z <= d[x].aCoordinates.length; z++) {
        A['x' + String(z)] = d[x].aCoordinates[z - 1].nX;
        A['y' + String(z)] = d[x].aCoordinates[z - 1].nY;
      }
      q.drawLine(A);
    }
  }
  function r(x) {
    if (x == 0 || !k) {
      l();
    }
    v(x);
    f();
  }
  $('#mdsslides').initializeMDSSlides({
    nAutoSlideChangePercentage: 50,
    fSlideOnShow: {
      lines: function(x) {
        r(x);
      },
      phone: function(x) {
        a(x);
      },
      animations: function(x) {
        $('video')[0].play();
      },
    },
    fSlideOnHide: {
      animations: function(x) {
        $('video')[0].pause();
      },
    },
    fSlideOnSlide: {
      lines: function(x) {
        r(x);
      },
      orange_logo: function(x) {
        if (x <= w) {
          if (!$('#logo_row1').hasClass('animated')) {
            $('.logo_row').addClass('animated');
            $('#logo_row1').css('left', '-90px');
            $('#logo_row2').css('left', '1090px');
            $('.logo_row').fadeIn('slow');
            $('.logo_row').animate({ left: '418px' }, 'slow', function() {
              $('#contuur_blackbox')
                .delay('slow')
                .fadeIn('slow', function() {
                  $('.logo_row').addClass('finished_animation');
                });
            });
          }
        }
      },
      phone: function(x) {
        a(x);
      },
    },
  });
});
