$(document).ready(function() {

    const urlParms = new URLSearchParams(window.location.search);
    const id = urlParms.get("character").toString();
    
    const publicKey = '0e29c84e5f3b57b6f6a73f77359f0838';
    const privateKey = '3386c5b3f752c885270f3fa4c9dc3c4485e89f71';
    const timestamp = new Date().getTime().toString();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey);

    
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    console.log(apiUrl)
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(Data => {
        function description(){
            if(Data.data.results[0].description == "") 
                     {return "NO DESCRIPTION"}
            else {
                return Data.data.results[0].description
            }
        }
        function appearance(){
            detail_text.innerHTML += ('<p class="m-0 marvel-text "><b>Appearance in Comics :    </b>' +'</p>');
            for(i=0; i<Data.data.results[0].comics.items.length ; i++){
                detail_text.innerHTML+= ('<li class="marvel-text"> '+ Data.data.results[0].comics.items[i].name +' </li>');
                
            }
        }
     

        var detail_text = document.createElement("div");
        detail_text.className = "marvel-text";
        detail_text.innerHTML += ('<p class="m-0 marvel-text"><b>Name :</b>'+ Data.data.results[0].name +'</p>');
        detail_text.innerHTML += ('<p class="m-0 marvel-text"><b>Description :    </b>'+ description()+'</p>');
        appearance();  


    let image = document.createElement('img');
    image.className = "justify-content-center";
    image.src = Data.data.results[0].thumbnail.path + '.'+ Data.data.results[0].thumbnail.extension;


    const character = document.createElement('div');
    character.className = 'character'; 
    character.append(image);
    character.append(detail_text)



    $(".box").append(character);


    
    
    
    
    
    
    
    
    
    
    
    })

















    
});