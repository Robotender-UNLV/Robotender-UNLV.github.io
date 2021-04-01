function displayDrinkOptions(alcoholType) {
    console.log(alcoholType);
    //display none on parent div
    $(".alcoholFilter").addClass("d-none");
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
                    var parentDrinkContainer = "<div class='parentDrinkContainer " +drinkName+" '></div>"
                    $('.drinks').append(parentDrinkContainer)

                    //add drink to parentDrinkContainer
                        var imgTest = "<img class = 'img-fluid' src ='" + parentObj[x].src +"'/>";
                        $(drinkNameClass).append(imgTest);
                    
                   
                    var drink = "<div> <h2>" + parentObj[x].name + "</h2> <ul class='ingredients'></ul></div>" ;
                    $(drinkNameClass).append(drink);

                   

                    
                }
                // if(parentObj[x].ingredients.alcohol[y] == true)
                // {
                //     var ingredientToAdd = "<li class= 'alcohol'>" + y + "</li>";
                //     var ulDiv = drinkNameClass + "> div > ul ";
                //     $(ulDiv).append(ingredientToAdd);
                // }
                
            }

            //  //go through mixers
            //  for(a in parentObj[x].ingredients.mixer)
            //  {

            //      if(parentObj[x].ingredients.mixer[a] == true)
            //      {
            //          console.log("A " + a);
            //          var ingredientToAdd = "<li class= 'mixer'>" + a + "</li>";
            //          var ulDiv = drinkNameClass + "> div > ul ";
            //          $(ulDiv).append(ingredientToAdd);
            //      }
                
            //  }
            //  //go through syrups
            //  for(a in parentObj[x].ingredients.syrup)
            //  {

            //      if(parentObj[x].ingredients.syrup[a] == true)
            //      {
            //          console.log("A " + a);
            //          var ingredientToAdd = "<li class= 'syrup'>" + a + "</li>";
            //          var ulDiv = drinkNameClass + "> div > ul ";
            //          $(ulDiv).append(ingredientToAdd);
            //      }
                
            //  }
             
        }

    });
    
}
function back() {
    $(".drinks").parent().addClass("d-none");
    $(".alcoholFilter").removeClass("d-none");
}