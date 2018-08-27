// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBGgGrR0ajKZevjmJKqjn-G8Ecegp3izu0",
    authDomain: "final-reservation-site.firebaseapp.com",
    databaseURL: "https://final-reservation-site.firebaseio.com",
    projectId: "final-reservation-site",
    storageBucket: "",
    messagingSenderId: "532422781447"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var reservationData = {};

  $('.reservation-day li').on('click', function() {
    reservationData.day = $(this).text();
  });

$('.reservation-form').on('submit', function(e) {

  console.log($('.dropdown-menu').val());

   preventDefault(e);

  //if (reservationData.day === "" || reservationData.name === "") {
  //if ($('input[name^=fullname]').text === "") {
  //  $('button').addClass('error');

  //} else {

  reservationData.name = $('reservation-name').val();
  var reservationsReference = database.ref('reservations');
  reservationsReference.push(reservationData);

  });

function getReservation() {
  database.ref('reservations').on('value', function (results) {
    var allReservations = results.val();
    $('.reservations').empty();
        for (var reservation = 0; reservation < allReservations.length; reservation++) {
          var context = {
            name: allReservations[reservation].name,
            day: allReservations[reservation].day,
            reservationId: reservation
          };
          var source = $("#reservation-template").html();

          var template = Handlebars.compile(source);

          var reservationListItem = template(context);

          $('.reservations').append(reservationListItem);
        }
  });
};

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 10,
    scrollwheel: false
  });

  var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    title: 'Monks Café'
  });
}