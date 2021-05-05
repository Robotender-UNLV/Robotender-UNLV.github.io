function suggested()
{

    localStorage.setItem("pump1", "default");
    localStorage.setItem("pump2", "default");

    localStorage.setItem("pump3", "default");

    localStorage.setItem("pump4", "default");
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
    var numberOfIngredients = document.getElementById("ingredientContainer").childElementCount;
    console.log(numberOfIngredients);
    var ingredient0 = document.getElementById('ingredientNum0').firstChild.textContent;
    if(numberOfIngredients = 2)
    {
        var ingredient1 = document.getElementById('ingredientNum1').firstChild.textContent;
        var neededIngredients = [ingredient0, ingredient1];
    }
    else if(numberOfIngredients = 3)
    {
        var ingredient2 = document.getElementById('ingredientNum2').firstChild.textContent;
        var ingredient1 = document.getElementById('ingredientNum1').firstChild.textContent;
        var neededIngredients = [ingredient0, ingredient1,ingredient2];
    }
    else if(numberOfIngredients = 4)
    {
        var ingredient2 = document.getElementById('ingredientNum2').firstChild.textContent;
        var ingredient1 = document.getElementById('ingredientNum1').firstChild.textContent;
        var ingredient3 = document.getElementById('ingredientNum3').firstChild.textContent;
        var neededIngredients = [ingredient0, ingredient1,ingredient2, ingredient3];
    }

    //check if pumps are set to right ingredients
    var pump1 = localStorage.getItem("pump1");
    var pump2 = localStorage.getItem("pump2");
    var pump3 = localStorage.getItem("pump3");
    var pump4 = localStorage.getItem("pump4");
    
    var pumpArray = [pump1, pump2, pump3, pump4];

    console.log(pumpArray);

    const filteredArray = neededIngredients.filter(function(x) { 
         return pumpArray.indexOf(x) < 0;
        });

    console.log(filteredArray);

    if(filteredArray.length == 0)
    {
        console.log("YOU CAN MAKE THIS");
        $.ajax({
            url: '/led?status=[10,0,5,20]',
            method: 'GET',
            success: function(result) {
                console.log(result);
         }
        });
        e.preventDefault();
    }
    else
    {
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

    var pumpClass = document.getElementsByClassName("pumpSet")
    var EleName = $('.pumpSet ul li').find('select');
    console.log(EleName);
    if(EleName.length == 0)
    {
       
        let options = "<select><option>vodka</option><option>triple sec</option><option>gin</option><option>vermouth</option><option>rum</option><option>tequila</option><option>whiskey</option><option>cranberry</option><option>grapefruit</option><option>orange</option><option>sprite</option><option>soda water</option><option>grenadine</option><option>simple</option><option>sweet and sour</option></select>"
        $('.pumpSet ul li').append(options);
    }
   
   
});


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
    $('#myModal').modal('show')
   
  });

  