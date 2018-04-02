
var config = {
    apiKey: "AIzaSyBK67OsyKmd9naABZuJAo4U2Kso6-juPBA",
    authDomain: "activity-9f716.firebaseapp.com",
    databaseURL: "https://activity-9f716.firebaseio.com",
    projectId: "activity-9f716",
    storageBucket: "activity-9f716.appspot.com",
    messagingSenderId: "923349095451"
  };

firebase.initializeApp(config);

var database = firebase.database();

//declare variables
var trainName;
var destination;
var frequencey;
var trainTime;

var NextArrival;
var MinutesAway;

//on click functions
$("#SubmitBtn").on("click", function () {
    
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#Destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequencey = $("#frequency").val().trim();

    // Code for handling the push
    database.ref().push({
        fireName: trainName,
        fireDestination: destination,
        fireTrainTime: trainTime,
        fireFrequency: frequencey,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // Clears all of the text-boxes
    $("##trainName").val("");
    $("#Destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");

});

// database.ref().on("value", function(snapshot){
// using push require to use below codes.
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    console.log(snapshot.val());

    console.log("fireName: " + snapshot.val().fireName);
    console.log("fireDestination: " + snapshot.val().fireDestination);
    console.log("fireFrequency: " + snapshot.val().fireFrequency);
    console.log("fireTrainTime: " + snapshot.val().fireTrainTime);
    

   // Time is 3:30 AM
//    var firstTime = "03:30";

   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(fireTrainTime, "HH:mm").subtract(1, "years");
   console.log("first time: ", firstTimeConverted);
   
   // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
   
   // Difference between the times
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("DIFFERENCE IN TIME: " + diffTime);
   
   // Time apart (remainder)
   var tRemainder = diffTime % frequencey;
   console.log(tRemainder);
   
   // Minute Until Train
   var MinutesAway = frequencey - tRemainder;
   console.log("MINUTES TILL TRAIN: " + MinutesAway);
   
   // Next Train
   var NextArrival = moment().add(MinutesAway, "minutes");
   console.log("ARRIVAL TIME: " + moment(NextArrival).format("hh:mm"));


     // Obtain a reference to the tbody element in the DOM
    var tableBody = $("tbody");
    
    // Create and save a reference to new empty table row
    var tableRow = $("<tr>");

    var tableName = $("<td>").text(snapshot.val().fireName);
    var tableDestination = $("<td>").text(snapshot.val().fireDestination);
    var tableFrequency = $("<td>").text(snapshot.val().fireFrequency);
    var tableTrainTime = $("<td>").text(snapshot.val().NextArrival);
    var tableTrainTime = $("<td>").text(snapshot.val().MinutesAway);
        

   
    // Append the td elements to the new table row
    tableRow.append(tableName);
    tableRow.append(tableDestination);
    tableRow.append(tableFrequency);
    tableRow.append(tableTrainTime);
   

    // Append the table row to the tbody element
    tableBody.append(tableRow);

},function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

