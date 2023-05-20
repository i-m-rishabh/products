const axiosInstance = axios.create({
    baseURL:"https://crudcrud.com/api/7397c0728ec5454780fa9be7a41246eb"
});

document.addEventListener('DOMContentLoaded',getItems);

let button = document.querySelector('#add_product');
button.addEventListener('click',createItem);

let ul = document.querySelectorAll('ul');
ul.forEach(cat =>{
    cat.addEventListener('click', clickOnList);
})

function createItem(){
    let price = document.querySelector('#product_price').value;
    let name = document.querySelector('#product_name').value;
    let category = document.querySelector('#product_category').value;
    addToCloud(price,name,category);
}
async function addToCloud(price,name,category){
   let response =  await axiosInstance.post('/products',{
        "price":price,
        "name":name,
        "category":category
    })
    addToScreen(response.data);
}
function addToScreen({price,name,category,_id}){
    let ul = document.querySelector(`#${category}`);
    let li = document.createElement('li');
    li.id = _id;
    li.appendChild(document.createTextNode(`${price} ${name} ${category}`));
    let button = document.createElement('button');
    button.className = 'delete';
    button.textContent = 'delete';
    li.appendChild(button);
    ul.appendChild(li);
}
function clickOnList(event){
    if(event.target.classList.contains('delete')){
        let li = event.target.parentElement;
        deleteFromCloud(li,li.id);
    }
}
async function deleteFromCloud(li,id){
    let response = await axiosInstance.delete(`/products/${id}`)
    deleteFromScreen(li);
}
function deleteFromScreen(li){
    li.remove();
}
async function getItems(){
    let response = await axiosInstance.get('/products')
    response.data.forEach(product =>{
        // console.log(product);
        addToScreen(product);
    })
    
}