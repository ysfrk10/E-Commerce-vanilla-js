let featuredOffer = document.querySelector(".Featured-offers");
async function GetData() {
  try {
    let response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products",
    );
    let res = await response.json();
    let Data = res.data;
    let categoryImg = Data.map((element) => {
      return element.category.image;
    });
    let categoryName = Data.map((element) => {
      return element.category.name;
    });
    let uniqueCatImg = [...new Set(categoryImg)];
    let uniqueCatName = [...new Set(categoryName)];
    console.log(uniqueCatName[0]);
    featuredOffer.innerHTML = "";
    for (let i = 0; i < uniqueCatName.length; i++) {
      featuredOffer.innerHTML += `
<div class="md:h-[500px]  bg-neutral-primary-soft rounded-xl shadow-md overflow-hidden flex flex-col">
         <img src="${uniqueCatImg[i]} "
             class="w-full rounded-xl h-full object-cover transition-transform duration-300 hover:scale-105" />
       <div class=" p-4 flex flex-col flex-grow">
             <h5 class="text-lg text-heading font-semibold mb-2 line-clamp-2">
               ${uniqueCatName[i]}
                </h5> 
        </div>
      
    </div>
`;
    }
  } catch (error) {
    featuredOffer.innerHTML = `<h1 class="text-[40px] font-bold w-[90vw] mx-[20px] my-auto">
          Error While Loading Products (Check Internet)
        </h1>`;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  GetData();
});
