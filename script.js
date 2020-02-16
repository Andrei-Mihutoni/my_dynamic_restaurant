//1. create:
//<a href="main">Sterters</a>

//2. assign link to correct nav



//4. assign products to correct section


//1. fetch cats
fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)


function createCategories(data) {


    data.forEach(function (oneCat) {

        //create links
        const link = document.createElement("a");
        link.setAttribute("href", `#${oneCat}`);
        link.textContent = oneCat
        document.querySelector("#wrapper>header>nav").appendChild(link)

        //create sections
        const section = document.createElement("section");

        //3. assign id
        section.id = oneCat;
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;
        section.appendChild(h2);

        document.querySelector("main").appendChild(section);


    })
    getProducts();
}


function getProducts() {
    //fetching json
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showData(data)
        })

}



function showData(jsonData) {
    console.log(jsonData);
    jsonData.forEach(addCourses);
};


// 1 make a template


function addCourses(course) {
    //    console.log(course)


    //    1 grab the template
    const template = document.querySelector("#courseTemplate").content;

    //    2 make a copy
    const courseClone = template.cloneNode(true);

    //    3 change some content
    courseClone.querySelector("h3").textContent = course.name;


    //    change the soldout logo
    if (course.soldout == true) {
        courseClone.querySelector(".soldout").style.display = "block"
        //        console.log('soldout')
    }


    //    change vegatarian logo
    if (course.vegetarian == true) {
        courseClone.querySelector(".vegetarian").style.display = "block"
    }

    //    change alcohol logo
    if (course.alcohol != 0) {
        courseClone.querySelector(".alcohol").style.display = "block"

    }

    //    change the info content
    courseClone.querySelector(".info .short_description").textContent = course.shortdescription;



    //    change the price & discount
    if (course.discount) { //on sale
        courseClone.querySelector(".price-discount span").textContent = course.price;
        const newPrice = Math.round(course.price - course.price * course.discount / 100);

        courseClone.querySelector(".price-full span").textContent = newPrice;
        //calculate new price
        // 49-49*10/100
        //course.price - course.price*price.discount/100

    } else { // not on discount
        courseClone.querySelector(".price-discount").remove()
        courseClone.querySelector(".price-full span").textContent = course.price
    }



    //     images syntaxes from API
    const imageName = course.image;
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";

    courseClone.querySelector("img").src = smallImg;

    //    Modal
    courseClone.querySelector("button").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${course.id}`)
            .then(res => res.json())
            .then(showDetails);

    });



    //    4 append the clone
    document.querySelector(`#${course.category}`).appendChild(courseClone)



}


// ######  Modal   #####

//close the modal when clicked
const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});

//our cloning function

//...



//once we have our data, ....
function showDetails(data) {
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.querySelector(".modal-price span").textContent = data.price;

    if (modal.vegetarian == true) {
        modal.querySelector(".modal-vegetarian").style.display = "block"
    }


//adding images to the modal
    const imageName = data.image;
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const mediumImg = base + "medium/" + imageName + "-md.jpg";

    modal.querySelector(".modal-image").src = mediumImg;



    //...
    modal.classList.remove("hide");
    console.log(data)
}
