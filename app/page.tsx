"use client";

import ProductList from "@/components/ProductList";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductList />
      </main>
    </div>
  );
}

