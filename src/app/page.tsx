'use client'

import { useEffect, useState } from "react";
import { product, productData } from "@/type/Product.type";
import ProductCard from "./_Component/productCard/ProductCard";
import MainSlider from "./_Component/MainSlider/MainSlider";
import CategorySlider from "./_Component/categorySlider/page";
import Loading from './_Component/Loading/Loading';

export default function HomeClient() {
  const [productList, setProductList] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`);
        const data: productData = await res.json();
        setProductList(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <MainSlider />
      <div className="p-4">
        <CategorySlider />
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center">
        <span
          style={{ color: "#605707", textShadow: "2px 2px 4px #605707" }}
        >
          H
        </span>
        ome
      </h1>

      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 px-4">
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
