document.querySelectorAll('#user-list tr').forEach((el) => {
    el.addEventListner('click', function(){
        const id = el.querySelector('td').textContent;
        getComment(id);
    })    
});

async function getUser(){
    try{

    }catch(e){
        
    }
}