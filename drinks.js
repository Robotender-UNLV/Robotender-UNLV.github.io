function suggested()
{
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
       
        let options = "<select><option>vodka</option><option>Triple sec</option><option>Gin</option><option>Vermouth</option><option>Rum</option><option>tequila</option><option>Whiskey</option><option>cranberry</option><option>grapefruit</option><option>Orange</option><option>sprite</option><option>Soda Water</option><option>Grenadine</option><option>Simple Syrup</option><option>sweet and sour</option></select>"
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
                        var ingredientToAdd = "<div><label class= 'alcohol'>" + a + "</label><select><option>None</option><option>Half Shot</option><option selected>Single Shot</option><option>Double Shot</option></select></div>";
                    
                        $(ulDiv).append(ingredientToAdd);
                    }
                    
                }
                //  //go through mixers
                for(a in parentObj[x].ingredients.mixer)
                {

                    if(parentObj[x].ingredients.mixer[a] == true)
                    {
                        console.log("A " + a);
                        var ingredientToAdd = "<div><label class= 'mixer'>" + a + "</label><select><option>None</option><option>Light</option><option selected>Normal</option><option>Extra</option></select></div>";
                    
                        $(ulDiv).append(ingredientToAdd);
                    }
                    
                }
                //go through syrups
                for(a in parentObj[x].ingredients.syrup)
                {

                    if(parentObj[x].ingredients.syrup[a] == true)
                    {
                        console.log("A " + a);
                        var ingredientToAdd = "<div><label class= 'syrup'>" + a + "</label><select><option>None</option><option>Light</option><option selected>Normal</option><option>Extra</option></select></div>";
                    
                        $(ulDiv).append(ingredientToAdd);
                    }
                    
                }
                
                return;
            }
            
        }
    });
    $('#myModal').modal('show')
   
  });

  