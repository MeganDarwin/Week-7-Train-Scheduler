 $(document).ready(function(){

 var config = {
    apiKey: "AIzaSyCc-W7qs-qtQ2IYSeAnkc1bZZpFUMRsRQI",
    authDomain: "trainscheduler-d8806.firebaseapp.com",
    databaseURL: "https://trainscheduler-d8806.firebaseio.com",
    projectId: "trainscheduler-d8806",
    storageBucket: "trainscheduler-d8806.appspot.com",
    messagingSenderId: "761836917472"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain = 0;
  var frequency = 0;
 

    $("#submit-button").on("click", function(event) {
      event.preventDefault();

      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      firstTrain = $("#first-train").val().trim();
      frequency = $("#frequency").val().trim();

      console.log(trainName);
      console.log(destination);
      console.log(firstTrain);
      console.log(frequency);

      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
      });

  });
  
    database.ref().on("child_added", function(data) {
      var data = data.val();
      console.log(data);
      console.log(data.trainName);
      console.log(data.destination);
      console.log(data.firstTrain);
      console.log(data.frequency);

    var now = moment().format("hh:mm a");
    console.log("Current Time" + now);

    var firstTrainTime = moment(data.firstTrain, "hh:mm").subtract(1, "years").format("hh:mm a");
   console.log("First Train Time:" + firstTrainTime);

   //minutes since first arrival 
   //a.diff(b, 'days')
   //var diffTime =  moment().diff(moment(firstTrainTime), "minutes");
   //could not get this to work properly so following calculations display NaN
    var diffTime = moment.duration(moment().diff(moment(firstTrain, "HH:mm")), "minutes");
   console.log("Diff Time" + diffTime);

   var timeRemaining = diffTime % frequency;
  console.log(timeRemaining);

  var minutesAway = frequency - timeRemaining;
  console.log(minutesAway);

  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");



  $("#table-body").append(
    "<tr><td>" + data.trainName +
     "</td><td>" + data.destination + 
     "</td><td>" + data.frequency + 
     "</td><td>" + data.nextArrival + 
     "<td>" + data.minutesAway + "</td>" +
    "</td></tr>"
     );



      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



})