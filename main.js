console.log("first");
//// Get Data From APi
let products = document.querySelector(".show-products");
console.log(products);
async function GetData() {
  try {
    let response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products",
    );
    let res = await response.json();
    let Data = await res.data;
    products.innerHTML = "";
    if (Data && Data.length > 0) {
      Data.forEach((element) => {
        products.innerHTML += `
      <div class="relative smart-card bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 flex flex-col">
        <a href="product-detail.html" class="absolute inset-0 z-10">
          <span class="sr-only">View product Details</span>
        </a>

        <div class="overflow-hidden rounded-t-xl">
          <img src="${element.imageCover}" class="w-full h-full object-cover" />
        </div>

        <div class="p-5 flex flex-col h-full bg-gray-800 rounded-b-xl z-0">
          <h3 class="text-lg font-bold mb-1 text-white">
            ${element.title}
          </h3>

          <p class="text-gray-400 text-sm mb-4">
            ${element.description}
          </p>

          <div class="flex justify-between items-center mt-auto">
            <span class="text-xl font-black text-blue-400">
              ${element.price} $
            </span>

            <a href="#" class="px-3 py-1.5 bg-gray-700 hover:bg-blue-600 rounded text-sm text-white font-semibold">
              Add
            </a>
          </div>
        </div>
      </div>
    `;
      });
    }
  } catch (error) {
    products.innerHTML = `<h1 class="text-[40px] font-bold w-[90vw] mx-[20px] my-auto">
          Error While Loading Products (Check Internet)
        </h1>`;
  }
}
GetData();
