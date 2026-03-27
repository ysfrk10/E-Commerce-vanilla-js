//// Get Data From APi
let products = document.querySelector(".show-products");
let sort = document.querySelector(".select-sort");

async function GetData() {
  try {
    let response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products",
    );
    let res = await response.json();
    let Data = await res.data;

    sort.addEventListener("change", (e) => {
      let SortValue = e.target.value;
      let sortedData = [...Data]; // copy

      if (SortValue == "1") {
        sortedData.sort((a, b) => a.price - b.price);
      } else if (SortValue == "2") {
        sortedData.sort((a, b) => b.price - a.price);
      }
      products.innerHTML = "";
      sortedData.forEach((element) => {
        products.innerHTML += `
      <div 
      data-aos="fade-up"
      data-aos-delay="200"
      class=" relative smart-card bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 flex flex-col">
        <div class="overflow-hidden rounded-t-xl">
          <img src="${element.imageCover}" class="w-full h-full object-cover" />
        </div>

        <div class="p-5 flex flex-col h-full bg-gray-800 rounded-b-xl">
          <h3 class="text-lg font-bold text-white">
            ${element.title}
          </h3>

          <p class="text-gray-400 text-sm">
            ${element.description}
          </p>

          <div class="flex justify-between items-center mt-auto">
            <span class="text-xl font-black text-blue-400">
              ${element.price} $
            </span>

            <a href="#" onclick="event.preventDefault(); addToCart('${element.id}', \`${element.title.replace(/`/g, "")}\`, ${element.price}, '${element.imageCover}')" class="px-3 py-1.5 bg-gray-700 hover:bg-blue-600 rounded text-sm text-white transition-colors flex items-center gap-1 shadow-lg shadow-blue-500/20">
              <i class="fas fa-cart-plus"></i> Add
            </a>
          </div>
        </div>
      </div>
    `;
      });
    });

    Data.forEach((element) => {
      products.innerHTML += `
      <div data-aos="fade-up" data-aos-delay="200"  class="relative smart-card bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 flex flex-col">
        <div class="overflow-hidden rounded-t-xl">
          <img src="${element.imageCover}" class="w-full h-full object-cover" />
        </div>

        <div class="p-5 flex flex-col h-full bg-gray-800 rounded-b-xl">
          <h3 class="text-lg font-bold text-white">
            ${element.title}
          </h3>

          <p class="text-gray-400 text-sm">
            ${element.description}
          </p>

          <div class="flex justify-between items-center mt-auto">
            <span class="text-xl font-black text-blue-400">
              ${element.price} $
            </span>

            <a href="#" onclick="event.preventDefault(); addToCart('${element.id}', \`${element.title.replace(/`/g, "")}\`, ${element.price}, '${element.imageCover}')" class="px-3 py-1.5 bg-gray-700 hover:bg-blue-600 rounded text-sm text-white transition-colors flex items-center gap-1 shadow-lg shadow-blue-500/20">
              <i class="fas fa-cart-plus"></i> Add
            </a>
          </div>
        </div>
      </div>
    `;
    });
    //#endregion
  } catch (error) {
    products.innerHTML = `<h1 class="text-[40px] font-bold w-[90vw] mx-[20px] my-auto">
          Error While Loading Products (Check Internet)
        </h1>`;
  }
}
GetData();

AOS.init({
  duration: 800,
  once: false,
  offset: 100,
});
window.addEventListener("load", () => {
  AOS.refreshHard();
});
