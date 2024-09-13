$(document).ready(function() {
    
    
    $("#search-bar").on("click",function(){
          var value = $("#t").val().toLowerCase();
          var marvelCards = $(".marvel");
        
          $.each(marvelCards, function(index , card){
                if(card.id.includes(value)){
                      card.style.display = "";
                    }
                    else {
                          card.style.display = "none";
                        }
                      })
                    });

                    
                    
                    const publicKey = '0e29c84e5f3b57b6f6a73f77359f0838';
                    const privateKey = '3386c5b3f752c885270f3fa4c9dc3c4485e89f71';
                    const timestamp = new Date().getTime().toString();
                    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey);
                    console.log(timestamp)
                    console.log("MD5 Hash: " + hash);
                    
                    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
                    console.log(apiUrl)
                    
                    fetch(apiUrl)
                      .then(response => response.json())
                      .then(data => {
                        function display(){
                            for (var i = 0; i < data.data.results.length;i++) { 


                                    let image = document.createElement('img');
                                    image.id = data.data.results[i].id;
                                    image.src = data.data.results[i].thumbnail.path + '.'+ data.data.results[i].thumbnail.extension;

                                    let text = document.createElement("div");
                                    text.className = "text";
                                    text.innerHTML += ('<p class="m-0 fs-2 ml-4 "><b>Name :'+ data.data.results[i].name +'</b></p>');


                                    let marvel = document.createElement("div");
                                    marvel.id = data.data.results[i].name;
                                    marvel.className = "marvel align-items-center";
                                    marvel.append(image);
                                    marvel.append(text);
                                    
                                    
                                        $(".main").append(marvel);     
                        
                             }  
                        
                           }
                          display();
                          $("img").click(function(){
                            //new page
                                 window.location.href = "character.html?character="+ this.id;
                        }); 
                    
                        });



});










