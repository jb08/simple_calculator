
/* initialize variables to improve readability */
var calc_screen = document.getElementById("screen_num");
var calc_screen_symbol = document.getElementById("screen_symbol");
var btn_clear = document.getElementById("b-clear");
var btn_subtract = document.getElementById("b-subtract");
var btn_add = document.getElementById("b-addition");
var btn_divide = document.getElementById("b-divide");
var btn_times = document.getElementById("b-times");
var btn_equals = document.getElementById("b-equals");
var btn_pM = document.getElementById("b-pM");
var btn_dec = document.getElementById("b-decimal");
/* end initialize variables to improve readability */


/* state */
var rand_1 = null;
var rand_2 = null;
var rator = null;
var rator_just_provided = false;
var ok_to_replace_expression = true;
/* end state */

/* operators enum */
var operator = { ADD: 1, SUBTRACT: 2, DIVIDE: 3, MULTIPLY: 4}
var symbol = { ADD: "+", SUBTRACT: "-", DIVIDE: "\xF7" , MULTIPLY: "\xD7", RESET: ""}
/* end operators enum */

/* digits */
var button;
for (var i = 0; i <= 9; i++) {
  //console.log(i);
  button = document.getElementById("b-" + i);
  button.onclick = function(e) {
    var num = e.target.id.substring(2);
    	if(ok_to_replace_expression)
    	{
    		console.log("ok_to_replace_expression - replace");
    		set_screen(num);
    		ok_to_replace_expression = false;	
    	}
    	else if(get_screen() == "0")
    	{
    		console.log("screen was zero - replace");
    		set_screen(num);	
    	}
    	/*else if(rator == null)
    	{
    		console.log("screen wasn't zero - concatenate");
    		set_screen(get_screen()+num);
    	}*/
    	else
    	{
    		console.log("modify rand_2");
    		set_screen(get_screen()+num);
    	}

    	rator_just_provided = false;
    	ok_to_replace_expression = false;
		console.log("set -> rator_just_provided = false")
	};

}
/* end digits */

/*Operators */
btn_subtract.onclick = function() 
{ 
	console.log("subtract - onclick");
	attempt_to_evaluate();
	rand_1 = get_screen();
	console.log("rand_1: " + rand_1 + "; type: " + typeof(rand_1));
	rator = operator.SUBTRACT;
	rator_just_provided = true;
	ok_to_replace_expression = true;
	set_screen_symbol(symbol.SUBTRACT);
	print_state();
}

btn_divide.onclick = function() 
{ 
	console.log("divide - onclick");
	attempt_to_evaluate();
	rand_1 = get_screen();
	console.log("rand_1: " + rand_1 + "; type: " + typeof(rand_1));
	rator = operator.DIVIDE;
	set_screen_symbol(symbol.DIVIDE);
	rator_just_provided = true;
	ok_to_replace_expression = true;
	print_state();
}

btn_times.onclick = function() 
{ 
	console.log("multiply - onclick");
	attempt_to_evaluate();
	rand_1 = get_screen();
	console.log("rand_1: " + rand_1 + "; type: " + typeof(rand_1));
	rator = operator.MULTIPLY;
	rator_just_provided = true;
	ok_to_replace_expression = true;
	set_screen_symbol(symbol.MULTIPLY);
	print_state();
}

btn_add.onclick = function() 
{ 
	console.log("add - onclick");
	attempt_to_evaluate();
	rand_1 = get_screen();
	console.log("rand_1: " + rand_1 + "; type: " + typeof(rand_1));
	rator = operator.ADD;
	rator_just_provided = true;
	ok_to_replace_expression = true;
	set_screen_symbol(symbol.ADD);
	print_state();
}
/* end operators */

/* special */
btn_equals.onclick = function() { 

	if(rator != null) /* can't have rand_2 before rator */
	{
		rand_2 = get_screen();
	}

	set_screen_symbol(symbol.RESET);
	process_result();
};

btn_pM.onclick = function() {

	console.log("plusMinus - onclick");
	var val = get_screen();
	val = -Number(val);
	set_screen(val)
}

btn_clear.onclick = function() 
{ 
	reset_state();
	set_screen_symbol(symbol.RESET);
};

btn_dec.onclick = function() 
{ 
	if(get_screen().indexOf(".") == -1)
	{
		set_screen(get_screen()+".");	
	}
	else
	{
		console.log("value already had a decimal place -- break")
	}
};
/* end special */

/* getters and setters */
function get_screen() { return calc_screen.innerText;};
function set_screen(val) { 
	console.log("set_screen()")
	console.log("   val: " + val + "; val: " + typeof(val));
	calc_screen.innerText = val;
}

function set_screen_symbol(val) { 
	calc_screen_symbol.innerText = val;
}


/* end getters and setters */

/* helper functions */
function process_result()
{
	console.log("process_result");
	print_state();

	rand_1 = Number(rand_1);
	rand_2 = Number(rand_2);
	var result = null;

	if(rator == null)
	{
		console.log("rator was null - leave screen as-is");
		result = get_screen();
	}
	else if(rator == operator.ADD)
	{	
		result = String(rand_1 + rand_2);
	}
	else if(rator == operator.SUBTRACT)
	{
		result = String(rand_1 - rand_2);
	}
	else if(rator == operator.DIVIDE)
	{
		if(rand_2 == 0)
		{
			result = "NAN"
		}
		else 
		{
			result = String(rand_1 / rand_2);
		}
	}
	else if(rator == operator.MULTIPLY)
	{
		result = String(rand_1 * rand_2);
	}
	else
	{
		console.log("Operator not recognized");
	}

	console.log("   result: " + result + "; result: " + typeof(result));

	//reset state
	reset_state()

	//update display
	set_screen(result);
}

function print_state()
{
	console.log("print state: ")
	console.log("   rand_1: " + rand_1 + "; type: " + typeof(rand_1));
	console.log("   rand_2: " + rand_2 + "; type: " + typeof(rand_2));
	console.log("   rator: " + rator + "; type: " + typeof(rator));
	console.log("   rator_just_provided: " + rator_just_provided + "; type: " + typeof(rator_just_provided));
}

function reset_state()
{
	console.log("--reset_state()--")
	rand_1 = null;
	rand_2 = null;
	rator = null;
	rator_just_provided = false;
	ok_to_replace_expression = true;
	set_screen(0);
}

function attempt_to_evaluate()
{
	console.log("attempt_to_evaluate()")
	if(rator_just_provided)
	{
		console.log("operator double click -- break")
		return	
	}

	if (rator!= null) rand_2 = get_screen();

	//print_state();

	console.log("rand_1: " + rand_1 + "; rand_2: " + rand_2 +"; rator: " + rator);

	if(rand_1 != null && rand_2 != null && rator != null)
	{
		console.log("expression ready for evaluation");
		process_result();
	}
	else
	{
		console.log("expression not ready for evaluation");
	}
}
/* end helper functions */

