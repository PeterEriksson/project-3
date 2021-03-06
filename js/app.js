//Set focus on the first text field
//When the page first loads, the first text field should be in focus by default.
$('#name').focus();


/*
”Job Role” section
Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".

Note: You'll need to add the "Other" job role input directly into the HTML and hide it initially with JS in order to get this feature to work when JS is disabled, which is a requirement below.
*/

//Grab textfield 'other'
const textFieldOther = $('#other-title');

//Hide the textfield "other" when page is loaded
$(textFieldOther).hide();

//Grab the option "other"
//const optionOther = $('#title option[value=other]'); Not using. Maybe take away.

//if 'other' is chosen from the select menu then textFieldOther should show. Else hide textFieldOther.
$('#title').change(function() {
   if($(this).val()==="other") {
       $(textFieldOther).show(1000);

   }
    
    else {
        $(textFieldOther).hide(500); 
    }
    
});

/*
”T-Shirt Info” section
-For the T-Shirt "Color" menu, only display the color options that match the design selected in the "Design" menu.

-If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."

-If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."

-When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.
*/

//Lets grab the different options:
const jsPuns = $('#design option:eq(1)'); //grabs js puns
//jsPuns.hide(); //works //but dont need them now.

//heart js
const heartJS = $('#design option:eq(2)');
//heartJS.hide(); //works //but dont need them now.


//Grab all different colors:
const cornFlowerBlue = $('#color option:eq(0)');
const darkSlateGrey = cornFlowerBlue.next();
const gold = darkSlateGrey.next();
const tomato = gold.next();
const steelBlue = tomato.next();
const dimGrey = steelBlue.next();

//grab color label
const $colorLabel = $('#color').prev();
//hide colorLabel from the start
$colorLabel.hide();

//option is created
// Note to self: selected is declared. Therefore it will be displayed first in the drop-down list.
//https://stackoverflow.com/questions/3518002/how-can-i-set-the-default-value-for-an-html-select-element
const $option= $('<option value="selectColor" selected>Please select a T-shirt theme</option>'); 

//prepend $option
$('#color').prepend($option);
//New place for this element is :eq(0). CornFlowerBlue moves up to eq(1)



/*
Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.

When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.
*/




//exceeds expectations:
//“Color” drop down menu is hidden until a T-Shirt design is selected.
 $('#color').hide();

//if user interacts with Design drop down menu -> trigger elements on Color drop down menu. 
$('#design').change(function() {
    if($(this).val() ==="js puns"){

        $('#color option:eq(1)').prop('selected', true); 
        
        
        cornFlowerBlue.show();
        darkSlateGrey.show();
        gold.show();
        
        
        tomato.hide();
        steelBlue.hide();
        dimGrey.hide();
        
        $option.hide();
        
        
        //exceeds expectations:
        //“Color” drop down menu is hidden until a T-Shirt design is selected.
        $('#color').show(300);
        //also show colorLabel
        $colorLabel.show(300);
        
        
    }
    else if($(this).val() ==="heart js"){
        
        //“Color” field should be updated
        $('#color option:eq(4)').prop('selected', true);
        
        
        tomato.show();
        steelBlue.show();
        dimGrey.show();
        
        cornFlowerBlue.hide();
        darkSlateGrey.hide();
        gold.hide();
        
        $option.hide();
        
        //exceeds expectations:
        //“Color” drop down menu is hidden until a T-Shirt design is selected.
        $('#color').show(300);
        //also show colorLabel
        $colorLabel.show(300);
    }
    
    //the user selects "select theme" -> hide everything and display on Color menu "Please select a T-shirt theme"
    else {
                
        tomato.hide();
        steelBlue.hide();
        dimGrey.hide();

        cornFlowerBlue.hide();
        darkSlateGrey.hide();
        gold.hide();
    
        
        //display on Color menu "Please select a T-shirt theme"
        $option.show();
        $($option).prop('selected', true);
    }
    
});


/*
”Register for Activities” section
Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.

As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
*/




const $checkboxAll = $('input[name=all]');
const $AllLabel = $('input[name=all]').parent(); //this gets both label AND checkbox

const $checkboxJsFrameworks = $('input[name=js-frameworks]');
const $jsFrameworksLabel = $AllLabel.next(); 

const $checkboxJsLibraries = $('input[name=js-libs]');
const $jsLibrariesLabel = $jsFrameworksLabel.next();

const $checkboxExpress = $('input[name=express]');
const $expressLabel = $jsLibrariesLabel.next();

const $checkboxNodeJs = $('input[name=node]');
const $nodeJsLabel = $expressLabel.next();

const $checkboxBuildTools = $('input[name=build-tools]');
const $buildToolsLabel = $nodeJsLabel.next();

const $checkboxNpm = $('input[name=npm]');
const $npmLabel = $buildToolsLabel.next();



//Visually indicate that the workshop in the competing time slot isn't available -> lets create an element 'flashMessage' for this

//Keeps track on Tuesday 9am-12pm
const $flashMessageTimeSlot = $('<div id="flashMessage">On Tuesday morning, this workshop is no longer possible to choose: </div>'); 


//Keeps track on Tuesday 1pm-4pm
const $flashMessageTimeSlot2 = $('<div id="flashMessage">On Tuesday afternoon, this workshop is no longer possible to choose: </div>'); 

//Keep track on cost
let totalCost = 0
//insert div at the end
const $yourTotalCost =  $('<div id="yourCostDiv">Your cost is($): </div>'); 
$('.activities').append($yourTotalCost);
$yourTotalCost.hide();

const $totalCost =
$('<div id="yourTotalCost"> </div>');
$('.activities').append($totalCost);
$totalCost.hide();

$('.activities').prepend($flashMessageTimeSlot);
$('.activities').prepend($flashMessageTimeSlot2);

//Fix the style of the flashMessages
$flashMessageTimeSlot.css({color: 'white',backgroundColor: 'red',fontSize: 20,"border-radius":"7px","border-style": "ridge","font-family":"Verdana, Geneva, sans-serif"});
$flashMessageTimeSlot.hide();

$flashMessageTimeSlot2.css({color: 'white',backgroundColor: 'blue',fontSize: 20, "border-radius":"7px","border-style": "ridge","font-family":"Verdana, Geneva, sans-serif"});
$flashMessageTimeSlot2.hide();





//If the user selects a workshop some hide/show events should occur (for some). Also update totalCost when checkbox is selected.
//https://www.techcoil.com/blog/how-to-use-jquery-to-detect-user-checking-and-unchecking-a-checkbox/
$($checkboxJsFrameworks).change(function() {

    if(($checkboxJsFrameworks).is(':checked')){
        $checkboxExpress.attr('disabled', true);
        
        $flashMessageTimeSlot.append($expressLabel.text());
        $flashMessageTimeSlot.slideDown(2000);
        $flashMessageTimeSlot.delay(3000)
        $flashMessageTimeSlot.slideUp(1000);
        
        totalCost +=100;
        $yourTotalCost.show();
        $totalCost.text(totalCost);
        $totalCost.show();

    }
    else{
        $checkboxExpress.attr('disabled', false);
        
        $flashMessageTimeSlot.text('On Tuesday morning, this workshop is no longer possible to choose: '); 
        
        totalCost -=100;
        $totalCost.text(totalCost);
        
    }

});


$($checkboxExpress).change(function() {

    if(($checkboxExpress).is(':checked')){
        $checkboxJsFrameworks.attr('disabled', true);
        
        $flashMessageTimeSlot.append($jsFrameworksLabel.text());
        $flashMessageTimeSlot.slideDown(2000);
        $flashMessageTimeSlot.delay(3000)
        $flashMessageTimeSlot.slideUp(1000);
        
        totalCost +=100;
        
        $totalCost.text(totalCost);
        $yourTotalCost.show();
        $totalCost.show();
    }
    else{
        $checkboxJsFrameworks.attr('disabled', false);
        
        $flashMessageTimeSlot.text('On Tuesday morning, this workshop is no longer possible to choose: ');
        totalCost -=100;
        $totalCost.text(totalCost);
        
    }

    
});



$($checkboxJsLibraries).change(function() {

    if(($checkboxJsLibraries).is(':checked')){
        $checkboxNodeJs.attr('disabled', true);
        
        //alert($flashMessageTimeSlot.text()+$nodeJsLabel.text()); 
        
        $flashMessageTimeSlot2.append($nodeJsLabel.text());
        $flashMessageTimeSlot2.slideDown(2000);
        $flashMessageTimeSlot2.delay(3000)
        $flashMessageTimeSlot2.slideUp(1000);
        
        totalCost +=100;
        
        $totalCost.text(totalCost);
        $yourTotalCost.show();
        $totalCost.show();
    }
    else{
        $checkboxNodeJs.attr('disabled', false);
        
        $flashMessageTimeSlot2.text('On Tuesday afternoon, this workshop is no longer possible to choose: ');
        totalCost -=100;
        $totalCost.text(totalCost);
    }
    
});


$($checkboxNodeJs).change(function() {

    if(($checkboxNodeJs).is(':checked')){
        $checkboxJsLibraries.attr('disabled', true);
        //alert($flashMessageTimeSlot.text()+$jsLibrariesLabel.text());
        
        $flashMessageTimeSlot2.append($jsLibrariesLabel.text());
        $flashMessageTimeSlot2.slideDown(2000);
        $flashMessageTimeSlot2.delay(3000)
        $flashMessageTimeSlot2.slideUp(1000);
        
        totalCost +=100;
        
        $totalCost.text(totalCost);
        $yourTotalCost.show();
        $totalCost.show();
    }
    else{
        $checkboxJsLibraries.attr('disabled', false);
        
        $flashMessageTimeSlot2.text('On Tuesday afternoon, this workshop is no longer possible to choose: ');
        totalCost -=100;
        $totalCost.text(totalCost);
    }
 
});

$($checkboxAll).change(function(){
   if(($checkboxAll).is(':checked')){
       
       totalCost += 200;
       
        $totalCost.text(totalCost);
        $yourTotalCost.show();
        $totalCost.show();
   }
    else{
        totalCost -=200;
        $totalCost.text(totalCost);
    }
    
});


$($checkboxBuildTools).change(function(){
   if(($checkboxBuildTools).is(':checked')){
       totalCost += 100;
       
        $totalCost.text(totalCost);
        $yourTotalCost.show();
        $totalCost.show();
   } 
    else{
        totalCost -= 100;
        $totalCost.text(totalCost);
    }
    
});

$($checkboxNpm).change(function(){
    if(($checkboxNpm).is(':checked')){
        totalCost += 100;
        
        $totalCost.text(totalCost);
        $yourTotalCost.show();
        $totalCost.show();
    }
    else{
        totalCost -= 100;
        $totalCost.text(totalCost);
    }
});
//End of checkbox events.


/*
"Payment Info" section
Display payment sections based on the payment option chosen in the select menu.

The "Credit Card" payment option should be selected by default. Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.

When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should be hidden.

When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.

NOTE: The user should not be able to select the "Select Payment Method" option from the payment select menu, because the user should not be able to submit the form without a chosen payment option.
*/

//Grab hold of credit card option (and bitcoin and paypal) in payment select. 
const $creditCardOption = $('#payment option:eq(1)');
const $paypalOption = $('#payment option:eq(2)');
const $bitcoinOption = $('#payment option:eq(3)');

//: Grab hold of Cardnumber, Zip Code, CVV, Exp date, Exp year. Hide all of this info when paypal or bitcoin is selected. All of these elements are wrapped in a div:
const creditCardDiv = $("#credit-card");

//Hide the option "Select Payment Method"
$('#payment option:eq(0)').hide();

//Make credit card selected by default.
$creditCardOption.prop('selected', true);

//Grab hold of the "PayPal" and "Bitcoin" information. Hide them.
const paypalDiv = $("p:eq(0)");
paypalDiv.hide();
const bitcoinDiv = $("p:eq(1)");
bitcoinDiv.hide();

let paypalSelected = false; 
let bitcoinSelected = false;
let creditCardSelected = false;

//We select an option in select id payment, the option is Paypal:
$('#payment').change(function(){
    if($(this).val() ==="paypal"){
        paypalDiv.show();
        bitcoinDiv.hide();
        creditCardDiv.hide();
        
        paypalSelected=true
        bitcoinSelected=false;
        creditCardSelected = false;
    }
    
});

//We select an option in select id payment, the option is bitcoin:

$('#payment').change(function(){
    if($(this).val() ==="bitcoin"){
        bitcoinDiv.show();
        paypalDiv.hide();
        creditCardDiv.hide();
        
        paypalSelected=false;
        bitcoinSelected=true;
        creditCardSelected = false;
    }
    
});

$('#payment').change(function(){
    if($(this).val() ==="credit card"){
        creditCardDiv.show();
        bitcoinDiv.hide();
        paypalDiv.hide();
        
        paypalSelected=false;
        bitcoinSelected=false;
        creditCardSelected = false;
    }
    
});

/* 
Form validation

If any of the following validation errors exist, prevent the user from submitting the form:
-Name field can't be blank.

-Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.

-User must select at least one checkbox under the "Register for Activities" section of the form.

-If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
    -Credit Card field should only accept a number between 13 and 16 digits.
    -The Zip Code field should accept a 5-digit number.
    -The CVV should only accept a number that is exactly 3 digits long.
    
NOTE: Don't rely on the built in HTML5 validation by adding the required attribute to your DOM elements. You need to actually create your own custom validation checks and error messages.

NOTE: Avoid using snippets or plugins for this project. To get the most out of the experience, you should be writing all of your own code for your own custom validation.

NOTE: Make sure your validation is only validating Credit Card info if Credit Card is the selected payment method.

*/

//Select register button
const $registerButton = $('button');
//select name field
const $nameField = $('#name');

//name validation: first name followed by space followed by surname. {1,50} makes sure the name isn't too long.
const nameValidationReg = /^[A-Z][a-z]{1,40}\s[A-Z][a-z]{1,40}$/; 

//Select label name -> Name:
const nameLabel = $nameField.prev();

const $incorrectNameMessage = $('<div id="incorrectNameMessage">Please note: No numbers. Only a-z characters. Type in only firstname and surname and start each with a capital letter </div>'); 

//insert this text next to name label
nameLabel.append($incorrectNameMessage);
$incorrectNameMessage.css({color: 'red'});
//hide it for now
$incorrectNameMessage.hide();


//Real-time Error Message (exceeds req) for name field:
//http://jsfiddle.net/UKhAn/
$($nameField).blur(function() {
    var VAL = $(this).val();
    
    if(nameValidationReg.test(VAL)){

        $nameField.css({"border-color": '#c1deeb' });
        $incorrectNameMessage.hide();
        
    }
    else {
        $nameField.css({"border-color": "red" });
        $incorrectNameMessage.show(); 
    }
});


//Real-time Error Message (exceeds req) for email field:

const emailValidationReg = /^([^@]+)(@)([^@.]+)(\.)([a-z]+)$/i;

const $incorrectEmailMessage = $('<div id="incorrectEmailMessage">Please note: Email field must be a validly formatted e-mail address, for example mike@hotmail.com. Use only lowercase. </div>'); 

//select email field
const $emailField = $("#mail");

//select emailLabel
const emailLabel = $emailField.prev();
//insert $incorrectEmailMessage next to emailLabel
emailLabel.append($incorrectEmailMessage);
//change text color to red
$incorrectEmailMessage.css({color: 'red'});
//Hide $incorrectEmailMessage to begin with
$incorrectEmailMessage.hide();



$($emailField).blur(function(){
    var emailVAL = $(this).val();
    
    if(emailValidationReg.test(emailVAL)){
    $emailField.css({"border-color": '#c1deeb' });
    $incorrectEmailMessage.hide();
    
    }
    else{
        $emailField.css({"border-color": "red" });
        $incorrectEmailMessage.show(); 
    }
    
}); //Done with Real-time Error Messages


// Form validation messages for the rest
/*
Provide some kind of indication when there’s a validation error. The field’s borders could turn red, for example, or even better for the user would be if a red text message appeared near the field.
The following fields should have some obvious form of an error indication:
Name field
Email field
Register for Activities checkboxes (at least one must be selected)
Credit Card number (Only if Credit Card payment method is selected)
Zip Code (Only if Credit Card payment method is selected)
CVV (Only if Credit Card payment method is selected)

Note: Error messages or indications should not be visible by default. They should only show upon submission, or after some user interaction.
*/

//create a message to show if no checkboxes are selected
const $incorrectCheckboxSelected = $('<div id="incorrectCheckboxSelected">Please note: At least one checkbox must be selected </div>'); 

$('.activities').append($incorrectCheckboxSelected);
$incorrectCheckboxSelected.css({color: 'red'});
$incorrectCheckboxSelected.hide();





//Conditional Error Message for credit card (exceeds requirement)
/*
Program at least one of your error messages so that more information is provided depending on the error. For example, if the user hasn’t entered a credit card number and the field is completely blank, the error message reads “Please enter a credit card number.” If the field isn’t empty but contains only 10 numbers, the error message reads “Please enter a number that is between 13 and 16 digits long.”
*/

const $inputCreditCardMessage = $('<div id="inputCreditCard"> Please enter something. </div>'); 

const $incorrectCreditCardMessage = $('<div id="incorrectCreditCard">CardNr shall be: 13-16 digits </div>'); 

const $incorrectZipMessage = $('<div id="incorrectZipMessage">Enter a 5 digit zip </div>'); 
const $incorrectCvvMessage = $('<div id="incorrectCvvMessage">Enter a 3 digit cvv </div>'); 

$incorrectZipMessage.css({color: 'red'});
$incorrectCvvMessage.css({color: 'red'});

$inputCreditCardMessage.css({color: 'red'});
$incorrectCreditCardMessage.css({color: 'red'});

//$("#credit-card").prepend($inputCreditCardMessage);
$("label[for='cc-num']").append($inputCreditCardMessage);
$inputCreditCardMessage.hide();

//$("#credit-card").prepend($incorrectCreditCardMessage);
$("label[for='cc-num']").append($incorrectCreditCardMessage);
$incorrectCreditCardMessage.hide();

$("label[for='zip']").append($incorrectZipMessage);
$incorrectZipMessage.hide();

$("label[for='cvv']").append($incorrectCvvMessage);
$incorrectCvvMessage.hide();
    

const creditCardRegex = /^\d{13,16}$/;

const $noBlankFieldsDiv = $('<div id="noBlankFieldsDiv">Please review the form. Take a look at the error messages. Make sure atleast one activity checkbox is chosen. </div>'); 

//in case text input credit card fields is blank -> show message:

$("#credit-card").append($noBlankFieldsDiv);
$noBlankFieldsDiv.hide();

//select credit card number field:
const $creditNumField = $("#cc-num");

let creditNumBoarderRed = false;

//Conditional Error Message for credit card
$($creditNumField).blur(function(){
    var creditNumberVal = $(this).val();
    
    if(creditCardRegex.test(creditNumberVal)){

    $incorrectCreditCardMessage.hide();
        
        $creditNumField.css({"border-color": '#c1deeb' });
        
        creditNumBoarderRed = false;
    
    }
    else{
        $creditNumField.css({"border-color": "red" });
        $incorrectCreditCardMessage.show(); 
        creditNumBoarderRed = true;
        
    }
    
});
$($creditNumField).blur(function(){

    var creditNumberVall = $(this).val();
    if(creditNumberVall === ''){
        
        $inputCreditCardMessage.show(); 
   
    }
    else {

        $inputCreditCardMessage.hide();
        }
    
    

});//End of Conditional Error Message for credit card
    
//select cvv text input 
const $cvvField = $('#cvv');
//select zip text input 
const $zipField = $('#zip');

const cvvRegex = /^\d{3}$/;
const zipRegex =/^\d{5}$/; 

let cvvFieldBoarderRed = false;

$($cvvField).blur(function() {
    var VALcvv = $(this).val();
    
    if(cvvRegex.test(VALcvv)){

        $cvvField.css({"border-color": '#c1deeb' });
        $incorrectCvvMessage.hide();
        cvvFieldBoarderRed=false;
        
    }
    else {
        $cvvField.css({"border-color": "red" });
        $incorrectCvvMessage.show(); 
        cvvFieldBoarderRed=true;
    }
});

let zipFieldBoarderRed = false;
$($zipField).blur(function() {
    var VALzip = $(this).val();
    
    if(zipRegex.test(VALzip)){

        $zipField.css({"border-color": '#c1deeb' });
        $incorrectZipMessage.hide();
        zipFieldBoarderRed = false;
        
    }
    else {
        $zipField.css({"border-color": "red" });
        $incorrectZipMessage.show(); 
        zipFieldBoarderRed = true;
        
    }
});





const $sucessfulFormMessage = $('<div id="sucessfulFormMessage">Your form was submitted! </div>'); 
$("#credit-card").append($sucessfulFormMessage);
$sucessfulFormMessage.css({color: 'green'});
$sucessfulFormMessage.css({"font-weight": "Bold"});
$sucessfulFormMessage.hide();

const $sucessfulFormMessagePayBit = $('<div id="sucessfulFormMessagePayBit">Your form was submitted! </div>'); 
$('.activities').append($sucessfulFormMessagePayBit);
$sucessfulFormMessagePayBit.css({color: 'green'});
$sucessfulFormMessagePayBit.css({"font-weight": "Bold"});
$sucessfulFormMessagePayBit.hide();


//--------------------
/*
//Submission 2 edits:
Some minor things fixed. 

When submit-button clicked: If-all-fields-are-ok parentheses has been edited. Now works.

Also another div has been added: sucessfulFormMessage for paypal and bitcoin ($sucessfulFormMessagePayBit).
It's added at the end of activites, pretty close to the submit-button.

css has been configured for both $sucessfulFormMessage and $sucessfulFormMessagePayBit. They are now green and bold.

$incorrectCheckboxSelected has been moved to the end of .activities (from prepend to append)

*/
//-----------------------


//register button is clicked
$('.container').on('click', 'button', function(event) {
    
 event.preventDefault();
    
    
    //check directly if total cost is 0 and alert user
            if(totalCost === 0){
       
                //IncorrectMessage has been moved down closer to the bottom of the form (prepend has become appened) 
                
           alert('select atleast one checkbox');     
            $incorrectCheckboxSelected.slideDown(2000);
            $incorrectCheckboxSelected.delay(6000)
            $incorrectCheckboxSelected.slideUp(1000);
        }
   
    
    
  //check if credit fields are visible    
       // if(creditCardDiv.is(':visible') && (totalCost > 0) ){
           if(creditCardDiv.is(':visible') ){

            
     //-> Loop thorugh inputs to see if any illegal '' or if border-color is red:
       $( [$nameField, $emailField, $creditNumField, $zipField, $cvvField] ).each(function() {
          
           //if empty field or red field -> alert user
             if(  ($(this).val()==='' )  ||  $(this).css("border-color")==="rgb(255, 0, 0)" ){

                alert('Please review field: '+  $(this).prev().text());
                 

                 
             }



           
           
    
        //If all fields are OK -> show OK message and refresh page 
        if(  (   (!($($nameField).val()==='' ) ) && !($($nameField).css("border-color")==="rgb(255, 0, 0)" )  ) && ( !($($emailField).val()==='' )   &&  !($($emailField).css("border-color")==="rgb(255, 0, 0)" )  )  &&  ( !($($creditNumField).val()==='' )   &&  !($($creditNumField).css("border-color")==="rgb(255, 0, 0)" )  )   && ( !($($zipField).val()==='' )   &&  !($($zipField).css("border-color")==="rgb(255, 0, 0)" )  )  && ( !($($cvvField).val()==='' )   &&  !($($cvvField).css("border-color")==="rgb(255, 0, 0)" )  ) &&  (totalCost > 0)   ){
            
             //console.log('hello');
            $sucessfulFormMessage.show();
            //Refresh page:
            //https://stackoverflow.com/questions/33778384/how-to-refresh-a-page-after-some-seconds-with-jquery
            setTimeout(function() {
                window.location.reload();
                }, 5000);    //OK
                  
        }
     

           
           
           
       }); //end of loop for credit card fields 
       
            

       
            
            
    } //end of if (creditCardDiv is visible) )
            //OK.

                   
    //if paypal is selected: 
    if((paypalDiv.is(':visible'))  ) {
       
     //-> Loop through inputs to see if any illegal '' or if border-color is red:
       $( [$nameField, $emailField] ).each(function() {
          
           
             if(  ($(this).val()==='' )  ||  $(this).css("border-color")==="rgb(255, 0, 0)" ){

                alert('Please review field: '+  $(this).prev().text());
        

                }
           
           
        //If all fields for paypal are OK -> show OK message and refresh page 
        if(  (   (!($($nameField).val()==='' ) ) && !($($nameField).css("border-color")==="rgb(255, 0, 0)" )  )   &&   ( !($($emailField).val()==='' )   &&  !($($emailField).css("border-color")==="rgb(255, 0, 0)" )  )   && (totalCost > 0)  ){
            
            //alert('your form has been submitted');
            $sucessfulFormMessagePayBit.show();
            
            //Refresh page:
            //https://stackoverflow.com/questions/33778384/how-to-refresh-a-page-after-some-seconds-with-jquery
            setTimeout(function() {
                window.location.reload();
                }, 5000);    
                  
        }




           
           
           
           
           
       }); //end of loop for paypal fields 
       
   
       
   } //end of if (paypal.is(':visible') && (totalCost > 0) )   //OK.
    
    
    
        //if bitcoin is selected:
    if(  (bitcoinDiv.is(':visible'))   ) {
       
     //-> Loop thorugh inputs to see if any illegal '' or if border-color is red:
       $( [$nameField, $emailField] ).each(function() {
          
           
             if(  ($(this).val()==='' )  ||  $(this).css("border-color")==="rgb(255, 0, 0)" ){

                alert('Please review field: '+  $(this).prev().text());
        

                }
           
           
        //If all fields for bitcoin are OK -> show OK message and refresh page 
        if(   (  (!($($nameField).val()==='' ) ) && !($($nameField).css("border-color")==="rgb(255, 0, 0)" )  )   &&   ( !($($emailField).val()==='' )   &&  !($($emailField).css("border-color")==="rgb(255, 0, 0)" )  )   && (totalCost > 0)   ){
            
            //alert('your form has been submitted');
            $sucessfulFormMessagePayBit.show();
            //Refresh page:
            //https://stackoverflow.com/questions/33778384/how-to-refresh-a-page-after-some-seconds-with-jquery
            setTimeout(function() {
                window.location.reload();
                }, 5000);    //OK
                  
        }



       }); //end of loop for bitcoin fields 
       
   
       
   } //end of if (bitcoin.is(':visible') && (totalCost > 0) )
    
    

    
}); //END of button click 
