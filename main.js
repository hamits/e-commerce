
const categoryList = document.querySelector('.categories');
const productList = document.querySelector('.products');
const openBtn = document.getElementById("open-btn")
const closeBtn = document.getElementById("close-btn")
const deleteBtn = document.getElementById("delete-btn")
const modalWrapper = document.getElementById("modal-wrapper")
const modal = document.getElementById("modal-list")
const toplam = document.getElementById("toplam")



document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    fetchProducts();
});

function fetchCategories() {
    fetch("https://api.escuelajs.co/api/v1/categories")
        .then((res) => res.json())
        .then((data) => data.slice(0, 4).forEach(category => {
            const categoryDiv = document.createElement('div')
            categoryDiv.classList.add('category');
            categoryDiv.innerHTML = `<img src="${category.image}" alt="">
        <span>${category.name}</span>`
            categoryList.appendChild(categoryDiv);
        })
        )
        .catch((err) => console.log(err))
}

function fetchProducts() {
    fetch("https://api.escuelajs.co/api/v1/products")
        .then((res2) => res2.json())
        .then((data2) => data2.slice(0, 25).forEach((products) => {
            const productDiv = document.createElement('div')
            productDiv.classList.add("product")
            productDiv.innerHTML = `<img src="${products.images}" alt="">
        <p>${products.title}</p>
        <div>
            <span>${products.price}$</span>
            <button onclick="sepeteEkle({id:'${products.id}',name:'${products.title}',price:'${products.price}$',image:'${products.images}$',amount:1})">Sepete Ekle</button>
        </div>`
            productList.appendChild(productDiv)
        }))
}



openBtn.addEventListener("click", toggleFunc)
openBtn.addEventListener("click", sepet)
closeBtn.addEventListener("click", toggleFunc)

modalWrapper.addEventListener("click", (e) => {

    if (e.target.classList != "close") {
        modalWrapper.classList.remove('active')
    }
})

function toggleFunc() {
    modalWrapper.classList.toggle("active")
    modal.innerHTML = ``
}


const basket = [];

function sepeteEkle(product) {
    const findItem = basket.find((i) => i.id === product.id);
    if (findItem) {
        findItem.amount += 1;
    }
    else {
        basket.push(product)
    }
}


const toplama = document.createElement("p")

function sepet() {

    
    var totalPrice = 0

    basket.forEach((product) => {
        const price = document.createElement("div")
        price.classList.add('price', 'close', `${product.id}`)
        price.innerHTML += `<img class="close" src="${product.image}">
        <span class="close">${product.name}</span>
        <p class="close">${product.price}</p>
        <p class="close">Adet:${product.amount}</p>
        <button onclick="sepetSil(${product.id})" class="close">Sil</button>`
        modal.appendChild(price)
        const cost = product.price.replace("$", "")
        var total = cost * product.amount
        totalPrice += total

    })
    toplama.innerHTML = ``
    toplama.innerHTML = totalPrice
    toplam.appendChild(toplama)
}

function sepetSil(btn) {
    const findItem = basket.find((i) => i.id == btn);
    if (findItem) {
        const index = basket.indexOf(findItem)
        basket.splice(index, 1)
        toggleFunc()
        sepet()
        modalWrapper.classList.toggle("active")
    }
    else {
        console.log(okumadı)
    }
}




