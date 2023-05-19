const axiosInstance = axios.create({
    baseURL:"https://crudcrud.com/api/07ca8cdd1a2d4deba752c557be140321"
})
document.addEventListener('DOMContentLoaded',domLoaded);
addButton = document.getElementById('add_product');
addButton.addEventListener('click',addProduct);
let ul = document.getElementsByTagName('ul');
for(let i=0; i<ul.length; i++){
    ul[i].addEventListener('click', clickOnList);
}

function addProduct(){
    let price = document.getElementById('product_price').value;
    let name = document.getElementById('product_name').value;
    let category = document.getElementById('product_category').value;
    // console.log(price,name,category);
    addToCloud(price,name,category);
}

function addToCloud(price,name,category){
    axiosInstance.post('/products',{
        "price":price,
        "name":name,
        "category":category
    })
    .then(res =>{
        console.log('product added to cloud');
        addToScreen(price,name,category,res.data._id);
    })
    .catch(err =>{
        console.log(err);
    })
}

function addToScreen(price,name,category,id){
    let li = document.createElement('li');
    li.id = id;
    li.appendChild(document.createTextNode(`${price} ${name} ${category}`));
    let button = document.createElement('button');
    button.className='delete';
    button.textContent = 'delete';
    li.appendChild(button);
    let ul = document.getElementById(category);
    ul.appendChild(li);
}

function clickOnList(event){
    if(event.target.classList.contains('delete')){
        deleteFromCloud(event.target.parentElement.id,event);
    }
}
function deleteFromCloud(id,event){
    axiosInstance.delete(`/products/${id}`)
    .then(res =>{
        console.log('deleted from cloud');
        deleteFromScreen(id,event);
    })
    .catch(err =>{
        console.log(err);
    })
}

function deleteFromScreen(id,event){
    let li = event.target.parentElement;
    li.parentElement.removeChild(li);
}

function domLoaded(){
    axiosInstance.get('/products')
     .then(res =>{
        for(let i=0; i<res.data.length; i++){
            let price = res.data[i].price;
            let name = res.data[i].name;
            let category = res.data[i].category;
            addToScreen(price,name,category,res.data[i]._id);
        }
     })
}