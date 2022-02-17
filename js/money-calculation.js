
 // income 
 let income;
 // food 
 let food;
 // rent 
 let rent;
// clothes 
let clothes; 
 // expenses 
 let expenses;
// balance 
let balance; 
// savePercent
let savePercent; 
 // saving 
let saving;
 // remainingBalance
 let remainingBalance; 


/**
 * this function return dom element
 */
function getElement(id) {
    
    var el = document.getElementById(id) // get the dom element from id and store it as a var el

    return el; // return the dom element;
}

/**
 * this function remove error message of input validation  
 */
function removeInputError(id) {

    /**
     *                 Remove invalid-feedback message
     * i.   get the parent element from the element of the id
     * ii.   chose the second children which is a span
     * iii.   set span inner text as empty string
     */
    getElement(id).parentNode.children[1].innerText = ''
    /** 
     *          Remove is-invalid class
     * i.   get the input element of the id
     * ii.   access class list
     * iii.   remove is-invalid class
     */
    getElement(id).classList.remove('is-invalid');
}

/**
 * this function show error message of input validation
 */
function showInputError(message, id) {

    /** 
     * 1. add is-invalid class to input.
     * 2. show invalid feedback message under input.
     */

    var input = getElement(id);

    /**
     *                 Add is-invalid class to input
     * i.   get the input element of the id
     * ii.   access class list
     * iii.   add is-invalid class
     */

    input.classList.add('is-invalid');
    /**
     *                 Add invalid-feedback message
     * i.   get the parent element from the element of the id
     * ii.   chose the second children which is span
     * iii.   set error message as span inner text 
     */
    input.parentElement.children[1].innerText = message;
}

/**
 * this function return input element value and also do validation 
 * if validation fail then it will retrun false as value
 */
function getInput(id) {

    //get input field by id
    // store input field as a variable for future use
    var el = getElement(id); 

    //show error message if input value is empty
    if (el.value == '') {
        const message = el.name + ' can not be empty';
        showInputError(message, id);
        return false;
    }

    //show error message if input value is not a number
    if (isNaN(el.value)) {
        const message = el.name + ' is not a number';
        showInputError(message, id);
        return false;
    }

    //show error message if input value is negative number
    if (el.value < 0) {
        const message = el.name + ' can not be a negative number';
        showInputError(message, id);
        return false;
    }

    //remove error messages if exist
    removeInputError(id);

    //get value of input field
    //parse it to float from string
    var value = parseFloat(el.value); 

    return value
}





//listen for click event on expenses calculation button
document.getElementById("expensesCalculateBtn").addEventListener('click', function () {

    income = getInput('incomeInput'); //store value of  income input in income var
    food = getInput('foodExpensesInput'); //store value of food expenses input in food var
    rent = getInput('rentExpensesInput'); //store value of rent expenses input in rent var
    clothes = getInput('clothesExpensesInput'); //store value of clothes expenses input in clothes var

    if(income != false && food != false && rent != false && clothes != false){  //if all the required input is validated the code bellow will run
        expenses = food + rent + clothes; //calculate expenses
        balance = income - expenses; //calculate balance
    
    
    
        if (expenses > income) { //if expenses is greater the income then a warning message will be fired
            toastr.error('How is it possible to spend more than you earn? ', 'Serriously !'); // warning message
        } else {
    
            getElement('total-expense').innerText = expenses; // display total expenses on website
    
            getElement('balance').innerText = balance; // display balance on website
    
            toastr.success('Calculation done', 'Finished'); //success message
        }
    }else{ //if input validation failed the code bellow will run
        toastr.error('Fill out all the fileds properly', 'Oops'); // warning message
    }

   




});


//listen for click event on save button
document.getElementById("saveBtn").addEventListener('click', function () {

    savePercent = getInput('saveInput'); //store value of save input in savePercent var

    if (savePercent != false) { //if save percent validation succeed then the code bellow will run
        if (income == 0 || isNaN(income)) { //if income is 0 or income is not defined then a warning message will be fired
            toastr.warning('Earn first then save', 'You have no income!'); //warning message
        } else {
            // calculate saving
            saving = income * (savePercent / 100); //calculate saving

            if (saving > balance) { //if saving  is greater then balance  then a warning message will be fired
                toastr.warning('You do not have enough money to save', 'Saving amount exceed balance'); //warning message
            } else {
                getElement('saving').innerText = saving; //show saving
                remainingBalance = balance - saving; // calculate remaining balance
                getElement('remaining-balance').innerText = remainingBalance; // show remaining balance
                toastr.success('Looks like you saved some money', 'Congrats'); //success message
            }

        }

    }else{ //if input validation failed the code bellow will run
        toastr.error('Fill out all the fileds properly', 'Oops'); // warning message
    }



});