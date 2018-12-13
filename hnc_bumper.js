jQuery(document).ready(function($) {

  // test 3
  var url = "url(https://static1.squarespace.com/static/57ffd9078419c2478119849d/t/";

  var bumperBaseImg = [
    "5b9854cf88251bd9ec43285a/1536709839148/duty_base.png",
    "5b985483352f535f013750ba/1536709763014/beauty_base.png",
    "5b98552770a6ad55d7a3b078/1536709927016/rear_base.png"];

  var brushGuardImg = [
    "",
    "5b985505575d1ff027bead4e/1536709893756/duty_bg_singlebar.png",
    "5b9854f9b8a0459b5bfbf59e/1536709881538/duty_bg_singlebar_lb20.png",
    "5b9854ff40ec9af8cd9ae1df/1536709887629/duty_bg_singlebar_lb30.png",
    "5b9854d5032be4d95abc0910/1536709845179/duty_bg_cyclops20.png",
    "5b9854db575d1ff027beabd2/1536709851100/duty_bg_cyclops30.png",
    "5b9854f003ce6454bd9ecf09/1536709872951/duty_bg_mks.png",
    "5b9854e5758d46177e2cbff7/1536709861351/duty_bg_mks_lb20.png",
    "5b9854ebaa4a9935bb9b4b4c/1536709867473/duty_bg_mks_lb30.png",
    "",
    "5b9854a2b8a0459b5bfbf244/1536709794972/beauty_bg_singlebar.png",
    "5b9854954fa51a8f86e18e97/1536709781746/beauty_bg_singlebar_lb20.png",
    "5b98549d6d2a7391a85833b2/1536709789661/beauty_bg_singlebar_lb30.png",
    "5b985489758d46177e2cbc63/1536709769126/beauty_bg_cyclops20.png",
    "5b9854906d2a7391a8583344/1536709776284/beauty_bg_cyclops30.png"];
  
  var beautyLightBarImg = [
    "",
    "5b9854a91ae6cf8f2be6a54e/1536709801931/beauty_lb20.png",
    "5b9854b08a922d3b25b73e79/1536709808966/beauty_lb30.png"];
  
  var bumperLightsImg = [
    "",
    "5b98551088251bd9ec432b56/1536709904556/duty_lights_round.png",
    "5b98551acd8366dd195f6c73/1536709914484/duty_lights_square.png",
    "5b9855200e2e72043c36a318/1536709920753/duty_lights_square2x.png",
    "",
    "5b9854b70ebbe8b8339955ae/1536709815438/beauty_lights_round.png",
    "5b9854bdaa4a9935bb9b496b/1536709821861/beauty_lights_square.png",
    "5b9854c4575d1ff027beaa94/1536709828082/beauty_lights_square2x.png",
    "",
    "5b98552c0ebbe8b833995b7f/1536709932890/rear_lights_round.png",
    "5b98553203ce6454bd9ed1ca/1536709938649/rear_lights_square.png"];
  
  var bmpType = "#field65229546"; // Bumper type
  var bmpBrsh = "#field65225773"; // Brush guard
  var bmpLBar = "#field68560182"; // Bumper light bar
  var bmpLite = "#field65274454"; // Bumper lights
  var bmpMake = "#field65261766"; // Truck make

  $(bmpMake).val($(document).attr('title').split(' ', 1)); // Set vehicle make to value pulled from page title
  $("#fsRow3088884-2").hide(); // Hide make from view, since this is picked by the page itself
  
  var bg_index = 0;
  var bl_index = 0;
  var fadeout = 100;
  var fadein = 350;

  function rollingCounter() {
    $('#price').each(function () {
      $(this).prop('Counter',$(this).text()).animate({
        Counter: ($("input#field69987202").val())
      }, {
        duration: 500,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      });
    });
  }
  
  function updateOpts() { // sets options to show/hide for different scenarios
    
    rollingCounter(); // update price field with animated counter
    
    if ($(bmpType)[0].selectedIndex == 1) { // If beauty bumper is chosen...
      $(bmpBrsh + " option:eq(6)").prop("disabled","disabled"); // disable MKS options
      $(bmpBrsh + " option:eq(7)").prop("disabled","disabled");
      $(bmpBrsh + " option:eq(8)").prop("disabled","disabled");
      $(bmpLite + " option:eq(3)").removeAttr("disabled");  // enable 2xSquare option
      bg_index = 9;
      bl_index = 4;
    } else if ($(bmpType)[0].selectedIndex == 2) { // If rear bumper is chosen...
      $(bmpLite + " option:eq(3)").prop("disabled","disabled"); // disable 2xSquare option
      bl_index = 8;
    } else { // If duty bumper is chosen...
      $(bmpBrsh + " option:eq(6)").removeAttr("disabled"); // enable MKS options
      $(bmpBrsh + " option:eq(7)").removeAttr("disabled");
      $(bmpBrsh + " option:eq(8)").removeAttr("disabled");
      $(bmpLite + " option:eq(3)").removeAttr("disabled");  // enable 2xSquare option
      bg_index = 0;
      bl_index = 0;
    }

    if ($(bmpBrsh)[0].selectedIndex > 5) { 
      $( "#bumperPreview" ).addClass( "mks" );
    } else {
      $( "#bumperPreview" ).removeClass( "mks" );
    }
    
  }
 
  var delay;
  
  $('form').on('change', function() { // when anything in the form changes...
    clearTimeout(delay);
    delay = setTimeout(function() {
      $(updateOpts); // update price and options, with 1ms delay to fix iPhone issue
    }, 1); 
  })
  
  $('#fsRow3088884-31').on('click', 'a', function() { // when discount code update is pressed...
    clearTimeout(delay);
    delay = setTimeout(function() {
      $(updateOpts); // update price after 1 second delay to wait for discount code to update from formstack server
    }, 1000); 
  });
  
  $(bmpType).change(function() { // when bumper type changes...
    var bmpTypeIndex = this.selectedIndex;
    $("#bumperCustomize").fadeOut(fadeout, function() {  // fade main bumper image out
      $("#bumperBaseImg").css('background-image', url + bumperBaseImg[bmpTypeIndex] + ")"); // change base bumper image
      $("#brushGuardImg").add("#beautyLightBarImg").add("#bumperLightsImg").css('background-image','none'); // reset option images
      $("#bumperCustomize").fadeIn(fadein); // fade main bumper image back in
     });
     $(bmpBrsh).children('option:enabled').eq(0).prop('selected',true); // reset options
     $(bmpLBar).children('option:enabled').eq(0).prop('selected',true); // reset options
     $(bmpLite).children('option:enabled').eq(0).prop('selected',true); // reset options
  });

  $(bmpBrsh).change(function() { // when brush guard changes
    $("#brushGuardImg").fadeOut(fadeout, function() {
      $(this).css('background-image', url + brushGuardImg[bg_index + $(bmpBrsh)[0].selectedIndex] + ")").fadeIn(fadein); // change its image
    });
  });
  
  $(bmpLBar).change(function() { // bumper light bar changes
    $("#beautyLightBarImg").fadeOut(fadeout, function() {
      $(this).css('background-image', url + beautyLightBarImg[$(bmpLBar)[0].selectedIndex] + ")").fadeIn(fadein); // change its image
    });
  });

  $(bmpLite).change(function() { // when bumper lights changes
    $("#bumperLightsImg").fadeOut(fadeout, function() {
      $(this).css('background-image', url + bumperLightsImg[bl_index + $(bmpLite)[0].selectedIndex] + ")").fadeIn(fadein); // change its image
    });
  });
  
});
