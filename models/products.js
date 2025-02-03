import Fuse from "fuse.js";

import { getProductAvailableSizes, getProductStock } from "./stock.js";
import { getBrands } from "./brands.js";
import { sortProducts } from "./sortings.js";

import { pool } from "../database/database.js";

const createProductsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS public."Products"
        (
            id uuid NOT NULL,
            name character varying(100) COLLATE pg_catalog."default" NOT NULL,
            "brandId" uuid NOT NULL,
            "typeId" uuid NOT NULL,
            price numeric NOT NULL,
            "promotionPrice" numeric,
            "imgName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
            "releaseDate" timestamp with time zone NOT NULL,
            "isFeatured" boolean NOT NULL,
            CONSTRAINT "Products_pkey" PRIMARY KEY (id)
        )
    `;
    await pool.query(query);
};

createProductsTable();

export const getNewArrival = async (body) => {
    const {
        search = "",
        brands = [],
        sizes = [],
        types = [],
        sortBy = "",
        page = 1,
        limit = 0,
    } = body;

    const products = await pool.query('SELECT * FROM "Products"');

    const allBrands = await getBrands();
    const rawProcuctsData = products.rows;

    const allProducts = rawProcuctsData.map((data) => {
        return {
            ...data,
            brand: allBrands.find((brand) => brand.id === data.brandId).name,
            releaseDateTime: new Date(data.releaseDate),
        };
    });

    // get date range [latest release date, previous 30 days] to filter data and use only data that match this range
    const latestDate = new Date(
        Math.max(...allProducts.map((product) => new Date(product.releaseDateTime)))
    );
    const previous30DaysDate = new Date(latestDate);
    previous30DaysDate.setDate(previous30DaysDate.getDate() - 30);

    // filter data to get new arrival items
    const newArrivalProducts = allProducts.filter((product) => {
        return (
            previous30DaysDate < product.releaseDateTime && product.releaseDateTime <= latestDate
        );
    });

    // filter by 'search'
    const fuseProducts = new Fuse(newArrivalProducts, {
        keys: ["name", "brand"],
        threshold: 0.3, // Adjust for sensitivity (lower is stricter, higher is looser)
    });
    const productsFilteredBySearch = search
        ? fuseProducts.search(search).map((result) => result.item)
        : newArrivalProducts;

    // filter by 'brands'
    const productsFilteredByBrands =
        brands.length > 0
            ? productsFilteredBySearch.filter((product) => brands.includes(product.brandId))
            : productsFilteredBySearch;

    // filter by 'sizes'
    const productsFilteredBySizes =
        sizes.length > 0
            ? await Promise.all(
                  productsFilteredByBrands.map(async (product) => {
                      const availableSizes = await getProductAvailableSizes(product.id);
                      const hasSize = availableSizes.some((size) => sizes.includes(size));
                      return hasSize ? product : null;
                  })
              ).then((results) => results.filter((product) => product !== null))
            : productsFilteredByBrands;

    // filter by 'types'
    const productsFilteredByTypes =
        types.length > 0
            ? productsFilteredBySizes.filter((product) => types.includes(product.typeId))
            : productsFilteredBySizes;

    // sort by 'sortBy'
    const sortedProducts = sortProducts(productsFilteredByTypes, sortBy);

    if (limit > 0) {
        return {
            currenPage: 1,
            pageCount: 1,
            products: sortedProducts.slice(0, limit),
        };
    }
    // pagination - 20 products/page
    const pageCount = Math.ceil(sortedProducts.length / 20);
    let currentPage = parseInt(page);
    if (!currentPage) currentPage = 1;
    if (currentPage > pageCount) currentPage = pageCount;
    // slice to get items from item with index n x page to item with index n x page + 20
    const productsInPage = sortedProducts.slice(page * 20 - 20, page * 20);

    return {
        currentPage,
        pageCount,
        products: productsInPage,
    };
};

export const getProducts = async (body) => {
    const {
        search = "",
        brands = [],
        sizes = [],
        types = [],
        sortBy = "",
        page = 1,
        limit = 0,
    } = body;

    const products = await pool.query('SELECT * FROM "Products"');

    const allBrands = await getBrands();
    const rawProcuctsData = products.rows;

    const allProducts = rawProcuctsData.map((data) => {
        return {
            ...data,
            brand: allBrands.find((brand) => brand.id === data.brandId).name,
        };
    });

    // filter by 'search'
    const fuseProducts = new Fuse(allProducts, {
        keys: ["name", "brand"],
        threshold: 0.3, // Adjust for sensitivity (lower is stricter, higher is looser)
    });
    const productsFilteredBySearch = search
        ? fuseProducts.search(search).map((result) => result.item)
        : allProducts;

    // filter by 'brands'
    const productsFilteredByBrands =
        brands.length > 0
            ? productsFilteredBySearch.filter((product) => brands.includes(product.brandId))
            : productsFilteredBySearch;

    // filter by 'sizes'
    const productsFilteredBySizes =
        sizes.length > 0
            ? await Promise.all(
                  productsFilteredByBrands.map(async (product) => {
                      const availableSizes = await getProductAvailableSizes(product.id);
                      const hasSize = availableSizes.some((size) => sizes.includes(size));
                      return hasSize ? product : null;
                  })
              ).then((results) => results.filter((product) => product !== null))
            : productsFilteredByBrands;

    // filter by 'types'
    const productsFilteredByTypes =
        types.length > 0
            ? productsFilteredBySizes.filter((product) => types.includes(product.typeId))
            : productsFilteredBySizes;

    // sort by 'sortBy'
    const sortedProducts = sortProducts(productsFilteredByTypes, sortBy);

    if (limit > 0) {
        return {
            currenPage: 1,
            pageCount: 1,
            products: sortedProducts.slice(0, limit),
        };
    }
    // pagination - 20 products/page
    const pageCount = Math.ceil(sortedProducts.length / 20);
    let currentPage = parseInt(page);
    if (!currentPage) currentPage = 1;
    if (currentPage > pageCount) currentPage = pageCount;
    // slice to get items from item with index n x page to item with index n x page + 20
    const productsInPage = sortedProducts.slice(page * 20 - 20, page * 20);

    return {
        currentPage,
        pageCount,
        products: productsInPage,
    };
};

export const getPromotion = async (body) => {
    const {
        search = "",
        brands = [],
        sizes = [],
        types = [],
        sortBy = "",
        page = 1,
        limit = 0,
    } = body;

    const products = await pool.query(
        'SELECT * FROM "Products" WHERE "promotionPrice" IS NOT NULL;'
    );

    const allBrands = await getBrands();
    const rawProcuctsData = products.rows;

    const allProducts = rawProcuctsData.map((data) => {
        return {
            ...data,
            brand: allBrands.find((brand) => brand.id === data.brandId).name,
        };
    });

    // filter by 'search'
    const fuseProducts = new Fuse(allProducts, {
        keys: ["name", "brand"],
        threshold: 0.3, // Adjust for sensitivity (lower is stricter, higher is looser)
    });
    const productsFilteredBySearch = search
        ? fuseProducts.search(search).map((result) => result.item)
        : allProducts;

    // filter by 'brands'
    const productsFilteredByBrands =
        brands.length > 0
            ? productsFilteredBySearch.filter((product) => brands.includes(product.brandId))
            : productsFilteredBySearch;

    // filter by 'sizes'
    const productsFilteredBySizes =
        sizes.length > 0
            ? await Promise.all(
                  productsFilteredByBrands.map(async (product) => {
                      const availableSizes = await getProductAvailableSizes(product.id);
                      const hasSize = availableSizes.some((size) => sizes.includes(size));
                      return hasSize ? product : null;
                  })
              ).then((results) => results.filter((product) => product !== null))
            : productsFilteredByBrands;

    // filter by 'types'
    const productsFilteredByTypes =
        types.length > 0
            ? productsFilteredBySizes.filter((product) => types.includes(product.typeId))
            : productsFilteredBySizes;

    // sort by 'sortBy'
    const sortedProducts = sortProducts(productsFilteredByTypes, sortBy);

    if (limit > 0) {
        return {
            currenPage: 1,
            pageCount: 1,
            products: sortedProducts.slice(0, limit),
        };
    }
    // pagination - 20 products/page
    const pageCount = Math.ceil(sortedProducts.length / 20);
    let currentPage = parseInt(page);
    if (!currentPage) currentPage = 1;
    if (currentPage > pageCount) currentPage = pageCount;
    // slice to get items from item with index n x page to item with index n x page + 20
    const productsInPage = sortedProducts.slice(page * 20 - 20, page * 20);

    return {
        currentPage,
        pageCount,
        products: productsInPage,
    };
};

export const getRecommendProducts = async () => {
    const products = await pool.query('SELECT * FROM "Products"WHERE "isFeatured" = true LIMIT 4;');

    const allBrands = await getBrands();
    const rawProcuctsData = products.rows;

    const allProducts = rawProcuctsData.map((data) => {
        return {
            ...data,
            brand: allBrands.find((brand) => brand.id === data.brandId).name,
        };
    });

    return {
        products: allProducts,
    };
};

export const getProductFromIds = async (ids = []) => {
    if (ids.length === 0) {
        throw new Error("Product id is not provided");
    }

    const uniqueProductIds = Array.from(new Set(ids));

    const productQuery = `SELECT * FROM "Products" WHERE "id" = ANY($1)`;
    const product = await pool.query(productQuery, [uniqueProductIds]);

    const rawProcuctData = product.rows;

    if (rawProcuctData.length === 0) {
        throw new Error("Product is not found");
    }

    const allBrands = await getBrands();

    const enhancedProduct = await Promise.all(
        rawProcuctData.map(async (product) => {
            const stock = await getProductStock(product.id);

            return {
                ...product,
                brand: allBrands.find((brand) => brand.id === product.brandId).name,
                stock,
            };
        })
    );

    return enhancedProduct;
};
