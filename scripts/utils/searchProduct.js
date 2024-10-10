export function searchProduct(){
    function searching(){
        const search = document.querySelector('.js-search-bar').value;
        window.location.href = `index.html?search=${search}`;
    }

    document.querySelector('.js-search-button')
    .addEventListener('click',()=>{
        searching();
    })

    document.querySelector('.js-search-bar')
    .addEventListener(('keyup'),(event)=>{
        if(event.key === 'Enter'){
            searching();
        }
    })
}