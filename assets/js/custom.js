$(document).ready(function() {

  $("main#spapp > section").height($(document).height() - 60);

  var app = $.spapp({pageNotFound : 'error_404'}); // initialize

  // define routes

  app.route({view: 'babies', load: 'Babies.html' });
  app.route({view: 'home', load: 'Home.html' });


  // run app
  app.run();

});
