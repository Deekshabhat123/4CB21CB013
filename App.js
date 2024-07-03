document.addEventListener("DOMContentLoaded", () => {
    const products = [
        // Example product data
        { id: 1, name: "Product 1", company: "Company A", category: "Category 1", price: 100, rating: 4.5, discount: 10, availability: "available", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Product 2", company: "Company B", category: "Category 2", price: 200, rating: 4.0, discount: 15, availability: "unavailable", image: "https://via.placeholder.com/150" },
        // Add more products as needed
    ];

    const productList = document.getElementById("productList");
    const categoryFilter = document.getElementById("categoryFilter");
    const companyFilter = document.getElementById("companyFilter");
    const availabilityFilter = document.getElementById("availabilityFilter");
    const sortPriceButton = document.getElementById("sortPrice");
    const sortRatingButton = document.getElementById("sortRating");
    const sortDiscountButton = document.getElementById("sortDiscount");

    function displayProducts(filteredProducts) {
        productList.innerHTML = "";
        filteredProducts.forEach(product => {
            const productElement = document.createElement("div");
            productElement.className = "product";
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Company: ${product.company}</p>
                <p>Category: ${product.category}</p>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating}</p>
                <p>Discount: ${product.discount}%</p>
                <p>Availability: ${product.availability}</p>
            `;
            productList.appendChild(productElement);
        });
    }

    function filterProducts() {
        const category = categoryFilter.value;
        const company = companyFilter.value;
        const availability = availabilityFilter.value;

        let filteredProducts = products;

        if (category) {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }
        if (company) {
            filteredProducts = filteredProducts.filter(product => product.company === company);
        }
        if (availability) {
            filteredProducts = filteredProducts.filter(product => product.availability === availability);
        }

        displayProducts(filteredProducts);
    }

    function sortProducts(criteria) {
        const sortedProducts = [...products].sort((a, b) => a[criteria] - b[criteria]);
        displayProducts(sortedProducts);
    }

    categoryFilter.addEventListener("change", filterProducts);
    companyFilter.addEventListener("change", filterProducts);
    availabilityFilter.addEventListener("change", filterProducts);
    sortPriceButton.addEventListener("click", () => sortProducts("price"));
    sortRatingButton.addEventListener("click", () => sortProducts("rating"));
    sortDiscountButton.addEventListener("click", () => sortProducts("discount"));

    // Populate filters
    const categories = [...new Set(products.map(product => product.category))];
    const companies = [...new Set(products.map(product => product.company))];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    companies.forEach(company => {
        const option = document.createElement("option");
        option.value = company;
        option.textContent = company;
        companyFilter.appendChild(option);
    });

    displayProducts(products);
});
