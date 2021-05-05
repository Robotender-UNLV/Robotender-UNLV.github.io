function suggested()
{

    localStorage.setItem("pump1", "vodka");
    localStorage.setItem("pump2", "orange");

    localStorage.setItem("pump3", "simple");

    localStorage.setItem("pump4", "sweet and sour");
    $(".drinks").empty();
    $(".drinks").parent().removeClass("d-none");
    var title = "<h2>Suggested Drinks</h2>";

    $('.drinks').append(title);
    let drinkRandom = [];
    const numberOfSuggestions = Math.floor(Math.random() * 10 ) +1;  // 1 though 9
    $.getJSON('drinks.json', function(data) {
        var parentObj = data.drinks;
        for(var i = 0; i <= numberOfSuggestions; i++)
        {
           
            //generate random value for drink placement & place in values not allowed
            let drinkValue;
            do
            {
                drinkValue = Math.floor(Math.random() * parentObj.length); // 0 to max amount of objects
            }while(drinkRandom.includes(drinkValue));

            drinkRandom.push(drinkValue); //add value to array

            var drinkName = parentObj[drinkValue].name.split(' ').join('');
            var drinkNameClass = "."+ drinkName;

            //should be added to the list.
            var parentDrinkContainer = "<div class='parentDrinkContainer d-flex "+drinkName+"' data-drink='"+drinkName+"'></div>"
            $('.drinks').append(parentDrinkContainer)

            //add drink to parentDrinkContainer
                var imgTest = "<img class = 'img-fluid pr-5' src ='" + parentObj[drinkValue].src +"'/>";
                $(drinkNameClass).append(imgTest);
            
           
            var drink = "<div class='p-3'> <h2>" + parentObj[drinkValue].name + "</h2> <p>"+ parentObj[drinkValue].description +"</p><button class='btn btn-outline-success'>Order Now</button></div>" ;
            $(drinkNameClass).append(drink);
           

        }
    });

}
function order(info)
{

    $("#order").addClass("d-none");
    $("#loading").removeClass("d-none");
    var numberOfIngredients = document.getElementById("ingredientContainer").childElementCount;
    console.log(numberOfIngredients);
    var ingredient0 = document.getElementById('ingredientNum0').firstChild.textContent;
    var neededIngredients = [ingredient0];
    if(numberOfIngredients == 2)
    {
        var ingredient1 = document.getElementById('ingredientNum1').firstChild.textContent;
         neededIngredients = [ingredient0, ingredient1];

    }
    else if(numberOfIngredients == 3)
    {
        var ingredient2 = document.getElementById('ingredientNum2').firstChild.textContent;

        var ingredient1 = document.getElementById('ingredientNum1').firstChild.textContent;

        neededIngredients = [ingredient0, ingredient1,ingredient2];


    }
    else if(numberOfIngredients == 4)
    {
        var ingredient2 = document.getElementById('ingredientNum2').firstChild.textContent;
        

        var ingredient1 = document.getElementById('ingredientNum1').firstChild.textContent;

        var ingredient3 = document.getElementById('ingredientNum3').firstChild.textContent;

        neededIngredients = [ingredient0, ingredient1,ingredient2, ingredient3];

    }

    //check if pumps are set to right ingredients
    var pump1 = localStorage.getItem("pump1");
    var pump2 = localStorage.getItem("pump2");
    var pump3 = localStorage.getItem("pump3");
    var pump4 = localStorage.getItem("pump4");
    
    var pumpArray = [pump1, pump2, pump3, pump4];
    var amounts = [0,0,0,0];
    console.log(pumpArray);
    

        console.log(neededIngredients);
    //get time amount 
    for(var i = 0; i < pumpArray.length; i=i+1)
    {
        for(var j = 0; j < neededIngredients.length; j=j+1)
        {
            if(neededIngredients[j] == pumpArray[i])
            {
                console.log("Found " + j);
                //found the ingredient
                var idName = "ingredientNum"+j;
                console.log(idName);
                var ingredientPumpValue = document.getElementById(idName).lastChild.value;
                if(typeof ingredientPumpValue !== 'undefined')
                {
                   
                    console.log(ingredientPumpValue);
                    if(ingredientPumpValue == 0 || ingredientPumpValue == "none")
                    {
                        amounts[i] = 0;
                    }
                    else if(ingredientPumpValue == "Half Shot" || ingredientPumpValue == "Light")
                    {
                        amounts[i] = 5;
                    }
                    else if(ingredientPumpValue == "Single Shot" || ingredientPumpValue == "Normal")
                    {
                        amounts[i] = 10;
                    }
                    else if(ingredientPumpValue == "Double Shot" || ingredientPumpValue == "Extra")
                    {
                        amounts[i] = 20;
                    }
                    pumpArray[i] = "default"; 
                    neededIngredients[j] = "defaultIngred"
                }
                
               
            }
            

        }
    }
    console.log(amounts);

    var activeDrink = true;
    for(var a = 0; a < neededIngredients.length; a=a+1)
    {
        if(neededIngredients[1] != "defaultIngred")
        {
            activeDrink = false;
        }
    }
    $("#ingredientContainer").empty();
    if(activeDrink)
    {
        
       
        console.log("YOU CAN MAKE THIS");
        
        $.ajax({
            url: '/robo?pump1=' + amounts[0] + '&pump2=' + amounts[1] +' &pump3=' + amounts[2] + '&pump4=' + amounts[3],
            method: 'GET',
            success: function(result) {
                console.log(result);
                //replace with order complete message
                $("#ingredientContainer").append("<div><h1>Drink Pouring! Enjoy</h1></div>");
                $("#order").addClass("d-none");
                $("#loading").addClass("d-none")
                
         }
        });
       
    }
    else
    {
        $("#ingredientContainer").append("<div><h1>Unfortunately, this is not currently available</h1></div>");
        $("#order").addClass("d-none");
        $("#loading").addClass("d-none");
        console.log("You cannot make this");
    }

}
$('#pumpsModal').on('hide.bs.modal', function(){
    var pump1  = document.getElementById('pump1').lastChild.value;
    var pump2  = document.getElementById('pump2').lastChild.value;
    var pump3  = document.getElementById('pump3').lastChild.value;
    var pump4  = document.getElementById('pump4').lastChild.value;

    localStorage.setItem("pump1", pump1);
    localStorage.setItem("pump2", pump2);

    localStorage.setItem("pump3", pump3);

    localStorage.setItem("pump4", pump4);


    
    
})
$( "#pumpsModal" ).on('shown.bs.modal', function(){
    $("#savePumps").removeClass("d-none");
    var pumpClass = document.getElementsByClassName("pumpSet")
    var EleName = $('.pumpSet ul li').find('select');
    console.log(EleName);
    if(EleName.length == 0)
    {
       
        let options = "<select><option>vodka</option><option>triple sec</option><option>gin</option><option>vermouth</option><option>rum</option><option>tequila</option><option>whiskey</option><option>cranberry</option><option>grapefruit</option><option>orange</option><option>sprite</option><option>soda water</option><option>grenadine</option><option>simple</option><option>sweet and sour</option></select>"
        $('.pumpSet ul li').append(options);
    }
   
   
});

function cleanMode()
{
    $("#pumpSet ul").empty().append("<div><h1>Clean Mode, Load cleaning solution now</h1></div>");
    $("#savePumps").addClass("d-none");
    $("#continue").removeClass("d-none");
   
}
function cleaning()
{
    $.ajax({
        url: '/robo?pump1=20&pump2=20&pump3=20&pump4=20',
        method: 'GET',
        success: function(result) {
            console.log(result);
            //replace with order complete message
            $("#pumpSet ul").append("<div><h1>Cleaning Complete, run water</h1></div>");
            $("#savePumps").addClass("d-none");
            $("#continue").addClass("d-none");
            
     }
    });


}

function displayDrinkOptions(alcoholType) {
    console.log(alcoholType);
    //display none on parent div
    // $(".alcoholFilter").addClass("d-none");
     $(".drinks").empty();
    $(".drinks").parent().removeClass("d-none");
    

    //populate menu with that alcohol based
    $.getJSON('drinks.json', function(data) {
        var parentObj = data.drinks;
        for(x in parentObj)
        {
            var drinkName= parentObj[x].name.split(' ').join(''); //name of drink
            var drinkNameClass = "."+ drinkName;
            for(y in parentObj[x].ingredients.alcohol)
            {

               
                if(y == alcoholType && parentObj[x].ingredients.alcohol[y] == true)
                {
                    //should be added to the list.
                    var parentDrinkContainer = "<div class='parentDrinkContainer d-flex "+drinkName+"' data-drink='"+drinkName+"'></div>"
                    $('.drinks').append(parentDrinkContainer)

                    //add drink to parentDrinkContainer
                        var imgTest = "<img class = 'img-fluid pr-5' src ='" + parentObj[x].src +"'/>";
                        $(drinkNameClass).append(imgTest);
                    
                   
                    var drink = "<div class='p-3'> <h2>" + parentObj[x].name + "</h2> <p>"+ parentObj[x].description +"</p><button class='btn btn-outline-success'>Order Now</button></div>" ;
                    $(drinkNameClass).append(drink);

                   

                    
                }
                // if(parentObj[x].ingredients.alcohol[y] == true)
                // {
                //     var ingredientToAdd = "<li class= 'alcohol'>" + y + "</li>";
                //     var ulDiv = drinkNameClass + "> div > ul ";
                //     $(ulDiv).append(ingredientToAdd);
                // }
                
            }

           
             
        }

    });
    
}


//Fill ingredient modal
$(document).on('click', '.parentDrinkContainer', function (e) {
   
    var className = $(this).attr("data-drink");
    console.log(className);
    var ulDiv = ".ingredients";
    $(ulDiv).empty();
    $.getJSON('drinks.json', function(data) {
        var parentObj = data.drinks;
       
        var newClass ="ingredientNum";
        var ingredientCounter = 0;
        for(x in parentObj)
        {
           console.log("X " + x + "obj " + parentObj[x].name.split(' ').join('') + " className " + className);
          
            if(parentObj[x].name.split(' ').join('') === className)
            {
                console.log("I am Equal :D")
                for(a in parentObj[x].ingredients.alcohol)
                {

                    if(parentObj[x].ingredients.alcohol[a] == true)
                    {
                        console.log("A " + a);
                        var myid = newClass + ingredientCounter;
                        var ingredientToAdd = "<div id='"+myid+"'><label class= 'alcohol'>" + a + "</label><select><option>None</option><option>Half Shot</option><option selected>Single Shot</option><option>Double Shot</option></select></div>";
                        ingredientCounter++;
                        $(ulDiv).append(ingredientToAdd);
                    }
                    
                }
                //  //go through mixers
                for(a in parentObj[x].ingredients.mixer)
                {

                    if(parentObj[x].ingredients.mixer[a] == true)
                    {
                        console.log("A " + a);
                        var myid = newClass + ingredientCounter;
                        var ingredientToAdd = "<div id='"+myid+"'><label class= 'mixer'>" + a + "</label><select><option>None</option><option>Light</option><option selected>Normal</option><option>Extra</option></select></div>";
                        ingredientCounter++;
                        $(ulDiv).append(ingredientToAdd);
                    }
                    
                }
                //go through syrups
                for(a in parentObj[x].ingredients.syrup)
                {

                    if(parentObj[x].ingredients.syrup[a] == true)
                    {
                        console.log("A " + a);
                        var myid = newClass + ingredientCounter;
                        var ingredientToAdd = "<div id='"+myid+"'><label class= 'syrup'>" + a + "</label><select><option>None</option><option>Light</option><option selected>Normal</option><option>Extra</option></select></div>";
                        ingredientCounter++;
                        $(ulDiv).append(ingredientToAdd);
                    }
                    
                }
                
                return;
            }
            
        }
    });
    $("#order").removeClass("d-none");
        $("#loading").addClass("d-none");
    $('#myModal').modal('show')
   
  });

  