document.addEventListener('DOMContentLoaded',function(){


    const userInput = document.querySelector('#userInput');
    const submit = document.querySelector('#submit');
    const sectionContainer = document.querySelector('.grocery-items-container');
    const clear = document.querySelector('.clear-item');
    const topBar = document.querySelector('.message-green')


    let groceryItems = [];
    let currentIndex = -1 ; 


    if (localStorage.getItem('groceryItems')){
        groceryItems = JSON.parse(localStorage.getItem('groceryItems'));
        displayGrocery();
    }
    submit.addEventListener('click', function(){
        const cart = userInput.value; 
        if (currentIndex === -1){
            

            if (cart !== ''){
                groceryItems.push(cart);
                showTopBar('Items Added', 'message-green');
            }    
        }else {
            if (cart !== ''){
                groceryItems[currentIndex] = cart; 
                showTopBar('Items edited', 'message-green');       
            }   
        };
        saveGroceryItems();
        displayGrocery();
        currentIndex = -1; 
        userInput.value='';
        
    });
    userInput.addEventListener('keydown',function(event){
        if(event.key === 'Enter'){
            submit.click();
        };
    })
        
        

    function displayGrocery(){
        let displayGrocery = groceryItems.map(function(item,index){
            return `<div class="grocery-items">
                    <div class="item-content">
                        ${item}
                    </div>
                    <div class="buttons">
                        <button class="edit-button" onclick="editItem(${index})">Edit</button>
                        <button class="trash-button" onclick="trashItem(${index})">Throw</button>
                    </div>
                </div>`
        }).join('');

        sectionContainer.innerHTML= displayGrocery;

        
    };

    function editItem(index){
        userInput.value = groceryItems[index];
        currentIndex = index; 
        submit.textContent = 'Update';
    }

    function trashItem(index){
        groceryItems.splice(index,1);
        saveGroceryItems();
        displayGrocery();
        showTopBar('Items Removed', 'message-red');
    };

    clear.addEventListener('click', function(){
        groceryItems = [];
        saveGroceryItems();
        displayGrocery();
        showTopBar('Items Cleared', 'message-red');
    })


    function showTopBar(message,className){
        topBar.textContent = message; 
        topBar.className = className;
        topBar.style.display = 'flex';
        setTimeout(function(){
            topBar.style.display ='none';
        },1500);
    }

    function saveGroceryItems(){
        localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
    }

    window.editItem =editItem;
    window.trashItem = trashItem;
});