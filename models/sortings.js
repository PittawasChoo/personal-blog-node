import lodash from "lodash";

const { orderBy } = lodash;

const SORTING_OPTIONS = [
    { label: "Featured", key: "featured" },
    { label: "Name: A-Z", key: "nameAscending" },
    { label: "Name: Z-A", key: "nameDescending" },
    { label: "Price: Low-High", key: "priceAscending" },
    { label: "Price: High-Low", key: "priceDescending" },
    { label: "Newest", key: "dateAscending" },
    { label: "Oldest", key: "dateDescending" },
];

class Sorting {
    constructor({}) {}

    static getSortings() {
        return SORTING_OPTIONS;
    }

    // TODO: order by featured
    static sortProducts(products, sorting) {
        const productsWithTotalPrice = products.map((product) => {
            return {
                ...product,
                finalPrice: Number(product.promotionPrice || product.price),
            };
        });

        let orderedProducts = [];

        switch (sorting) {
            case "featured":
                // TODO: order by featured
                orderedProducts = orderBy(
                    productsWithTotalPrice,
                    ["isFeatured", "releaseDate"],
                    ["desc", "asc"]
                );
                break;
            case "nameAscending":
                orderedProducts = orderBy(productsWithTotalPrice, "name", "asc");
                break;
            case "nameDescending":
                orderedProducts = orderBy(productsWithTotalPrice, "name", "desc");
                break;
            case "priceAscending":
                orderedProducts = orderBy(productsWithTotalPrice, "finalPrice", "asc");
                break;
            case "priceDescending":
                orderedProducts = orderBy(productsWithTotalPrice, "finalPrice", "desc");
                break;
            case "dateAscending":
                orderedProducts = orderBy(productsWithTotalPrice, "releaseDate", "asc");
                break;
            case "dateDescending":
                orderedProducts = orderBy(productsWithTotalPrice, "releaseDate", "desc");
                break;
            default:
                // TODO: use featured sorting here
                orderedProducts = orderBy(
                    productsWithTotalPrice,
                    ["isFeatured", "releaseDate"],
                    ["desc", "asc"]
                );
                break;
        }

        delete orderedProducts["finalPrice"];

        return orderedProducts;
    }
}

export default Sorting;
