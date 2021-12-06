// --- global variables ---

var loans = [
  { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
]; 

// --- function: loadDoc() ---

function loadDoc() {
  
  // pre-fill defaults for first loan year
  var defaultYear = loans[0].loan_year;
  $("#loan_year0" + 1).val(defaultYear++);
  var defaultLoanAmount = loans[0].loan_amount;
  $("#loan_amt0" + 1).val(defaultLoanAmount.toFixed(2));
  var defaultInterestRate = loans[0].loan_int_rate;
  $("#loan_int0" + 1).val(defaultInterestRate);
  var loanWithInterest = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
  $("#loan_bal0" + 1).val(toComma(loanWithInterest.toFixed(2)));
  
  // pre-fill defaults for other loan years
  for(var i=2; i<6; i++) {
    
    
    $("#loan_year0" + i).val(defaultYear++);
    $("#loan_year0" + i).attr("disabled", true);
    
    $("#loan_year0" + i).css({"background-color": "gray",
                              "color": "white"});
    
    
    $("#loan_amt0" + i).val(defaultLoanAmount.toFixed(2));
    $("#loan_int0" + i).val(defaultInterestRate);
    $("#loan_int0" + i).attr("disabled", true);
    $("#loan_int0" + i).css({"background-color": "gray",
                             "color": "white"});
    
   loanWithInterest = (loanWithInterest + defaultLoanAmount) * (1 + defaultInterestRate);
   $("#loan_bal0" + i).val(toComma(loanWithInterest.toFixed(2)));
    
    } // end: "for" loop
  
  // all input fields: select contents on focus
  $("input[type=text]").focus(function() {
    $(this).select();
    $(this).css("background-color", "yellow");
  }); 
  $("input[type=text]").blur(function() {
    $(this).css("background-color", "white");
    updateLoansArray();
  });
  
  // set focus to first year: messes up codepen
  // $("#loan_year01").focus();
  $("#loan_year01").blur( function() {
    updateLoansArray();
  });
    
} // end: function loadDoc()



function toComma(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateLoansArray() {
  let result = parseInt($("#loan_year01").val());
  
  //if year input invalid, default to 2020
  if(isNaN(result) || result>=10000 || result<=999){
    loans[0].loan_year = 2020;
    $("#loan_year01").val(2020);
  }
  else{
    //Store first row values in loans array
    loans[0].loan_year = result;
  }
  
  loans[0].loan_amount = parseFloat($("#loan_amt01").val());
  //if first amount invalid, default to 10000
  if(isNaN(loans[0].loan_amount)){
    loans[0].loan_amount = 10000;
    $("#loan_amt01").val(10000);
  }
  
  loans[0].loan_int_rate = parseFloat($("#loan_int01").val());
  //if interest rate input invalid, default to 0.0453
  if(isNaN(loans[0].loan_int_rate)){
    loans[0].loan_int_rate = 0.0453;
    $("#loan_int01").val(0.0453);
  }
  
  for(var i=1; i<5; i++) {
    //Store remaining years in loans array: incrementing by 1
    loans[i].loan_year = loans[0].loan_year + i;
    $("#loan_year0"+ (i+1) ).val(loans[i].loan_year);
    //Store remaining amounts in loans array: store whatever value the table contains
    loans[i].loan_amount = parseFloat($("#loan_amt0" + (i+1)).val());
    //if current amount input invalid, default to 10000
    if(isNaN(loans[i].loan_amount)){
      loans[i].loan_amount = 10000;
      $("#loan_amt0" + (i+1)).val(10000);
    }
    $("#loan_amt0"+ (i+1) ).val(loans[i].loan_amount);
    //Store remaining (identical) interest rates in loans array
    loans[i].loan_int_rate = loans[0].loan_int_rate;
    $("#loan_int0"+ (i+1) ).val(loans[i].loan_int_rate);
  }
  
  //Array of objects (loans) exists in localStorage, as proven by console
  localStorage.setItem("LoansArr", JSON.stringify(loans));
  console.log(JSON.parse(localStorage.getItem("LoansArr")));
}

var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope){
  $scope.amt1 = 10000;
  $scope.int1 = 0.0453;
  $scope.bal1 = 10453;
  
  $scope.amt2 = 10000;
  $scope.bal2 = 21379.52;
  
  $scope.amt3 = 10000;
  $scope.bal3 = 32801.01;
  
  $scope.amt4 = 10000;
  $scope.bal4 = 44739.9;
  
  $scope.amt5 = 10000;
  $scope.bal5 = 57219.62;
});
