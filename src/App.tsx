import { useState, useRef, useCallback, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import "./App.css";

// Define product type
interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
}

function App() {
  const [scale, setScale] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mainImage, setMainImage] = useState<string | null>(null);
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [ctrlPressed, setCtrlPressed] = useState(false);

  // Event handlers for Ctrl key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Control") {
      setCtrlPressed(true);
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === "Control") {
      setCtrlPressed(false);
    }
  }, []);

  // Add and remove event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Sample products data with reliable image URLs from Picsum Photos
  const products: Product[] = [
    {
      id: "1",
      name: "Suncream - La Roche Posay",
      category: "Moisturizers",
      image: "https://picsum.photos/id/100/400/400",
    },
    {
      id: "2",
      name: "Clean - Fruity Foaming Face Wash",
      category: "Cleanser",
      image: "https://picsum.photos/id/200/400/400",
    },
    {
      id: "3",
      name: "Multi Retinol Night Emulsion",
      category: "Moisturizers",
      image: "https://picsum.photos/id/250/400/400",
    },
    {
      id: "4",
      name: "Vitamins C+E+Ferulic Serum",
      category: "Oils",
      image: "https://picsum.photos/id/225/400/400",
    },
    {
      id: "5",
      name: "Renew Nourishing Cleanser",
      category: "Cleanser",
      image: "https://picsum.photos/id/240/400/400",
    },
    {
      id: "6",
      name: "Le Cleanser Gel to Milk Cleanser",
      category: "Cleanser",
      image: "https://picsum.photos/id/26/400/400",
    },
    {
      id: "7",
      name: "Brightening Cleanser",
      category: "Cleanser",
      image: "https://picsum.photos/id/99/400/400",
    },
    {
      id: "8",
      name: "Regenerating Cleanser",
      category: "Cleanser",
      image: "https://picsum.photos/id/42/400/400",
    },
    {
      id: "9",
      name: "Clarifying Cleanser",
      category: "Cleanser",
      image: "https://picsum.photos/id/63/400/400",
    },
  ];

  const categories = ["All", "Cleanser", "Moisturizers", "Oils"];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const handleSelectProduct = (id: string) => {
    setSelectedProduct(id);
    const product = products.find((p) => p.id === id);
    if (product) {
      setMainImage(product.image);
    }
  };

  // Zoom control functions
  const handleZoomIn = useCallback(() => {
    if (transformRef.current) {
      transformRef.current.zoomIn(0.15);
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (transformRef.current) {
      transformRef.current.zoomOut(0.15);
    }
  }, []);

  const handleResetZoom = useCallback(() => {
    if (transformRef.current) {
      transformRef.current.resetTransform();
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header like Shopify */}
      <header className="bg-slate-800 text-white py-3 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg
            className="h-8 w-8 mr-4"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.8 15.4c-.7-.2-1.3-.3-1.3-.8s.4-.7.9-.7c.6 0 1.2.2 1.8.7l1-3c-.6-.4-1.7-.8-2.8-.8-2.3 0-3.9 1.3-3.9 3.2 0 1.1.7 1.9 1.7 2.4 1 .5 1.2.6 1.2 1.1 0 .4-.4.8-1 .8-.8 0-1.6-.4-2.2-.8l-1 2.9c.7.5 1.9.9 3.1.9 2.2 0 4-1.1 4-3.3-.1-1.2-.8-2.1-2.5-2.6z"
              fill="white"
            />
            <path
              d="M16.4 10L15.5 7c-.3-1-1-1-1.3-1-.1 0-2.3-.2-2.3-.2s-1.5-1.4-1.7-1.6c0 0-.1-.1-.2-.1l-.9 20.2c2 0 6.6.7 6.6.7s4.1-14.1 4.2-14.4c-.1-.2-3.5-1.5-3.5-1.5z"
              fill="white"
            />
          </svg>
          <span className="font-bold text-xl">Product Designer</span>
        </div>
        <div className="flex items-center">
          <div className="bg-purple-600 h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold">
            LP
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-auto">
          <div className="p-4">
            <h2 className="font-medium text-gray-800 mb-4">Products</h2>

            {/* Category Tabs */}
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1.5 text-sm whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-gray-100 text-gray-800 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  } rounded-md`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Products List */}
            <div className="space-y-2 mt-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    selectedProduct === product.id
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleSelectProduct(product.id)}
                >
                  <div className="h-14 w-14 bg-gray-100 rounded border border-gray-200 flex-shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-gray-800">{product.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Designer Area */}
        <div className="flex-1 bg-gray-100 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-gray-800 font-medium mr-4">
                Product Designer
              </h1>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                  Layout
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                  Elements
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                  Text
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-slate-800 text-white px-4 py-1.5 text-sm rounded-md hover:bg-slate-700">
                Save Design
              </button>
            </div>
          </div>

          {/* Design Area */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="bg-[#f0f0f0] flex-1 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-300 shadow-inner">
              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-md flex">
                <button
                  className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 border-r border-gray-300"
                  onClick={handleZoomOut}
                  title="Zoom Out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 border-r border-gray-300"
                  onClick={handleResetZoom}
                  title="Reset Zoom"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                  onClick={handleZoomIn}
                  title="Zoom In"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>

              {/* Ctrl key indicator */}
              {ctrlPressed && (
                <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-md px-3 py-1.5 text-xs text-blue-600 font-medium">
                  Ctrl pressed - Zoom enabled
                </div>
              )}

              {/* Scale Display */}
              <div className="absolute bottom-4 right-4 z-10 bg-white rounded-lg shadow-md px-2 py-1 text-xs text-gray-600">
                {Math.round(scale * 100)}%
              </div>

              {/* Transform Container */}
              <TransformWrapper
                ref={transformRef}
                initialScale={1}
                minScale={0.2}
                maxScale={5}
                onTransformed={(ref: ReactZoomPanPinchRef) => {
                  setScale(ref.state.scale);
                }}
                centerOnInit={true}
                wheel={{
                  step: 0.1,
                  disabled: !ctrlPressed,
                }}
                pinch={{ step: 1 }}
              >
                <TransformComponent
                  wrapperStyle={{
                    width: "100%",
                    height: "100%",
                    cursor: "move", // Cursor for dragging outside content
                  }}
                  contentStyle={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "-webkit-grab", // Default cursor inside content area
                  }}
                >
                  {/* Product Design Canvas */}
                  <div
                    className="relative bg-white rounded shadow-lg overflow-hidden !cursor-default"
                    style={{ width: "600px", height: "400px" }}
                  >
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

                    {/* Canvas Content */}
                    <div className="w-full h-full flex items-center justify-center relative">
                      {mainImage ? (
                        <>
                          {/* Product Image */}
                          <div className="absolute z-10 w-40 left-8 top-10">
                            <img
                              src={mainImage}
                              alt="Selected product"
                              className="w-full h-auto object-contain rounded shadow-md border border-gray-200"
                            />
                          </div>

                          {/* Product Info Card */}
                          <div className="absolute right-8 top-10 w-64 bg-white p-4 rounded-lg shadow-md border border-gray-200">
                            <h3 className="font-bold text-lg mb-1">
                              {products.find((p) => p.id === selectedProduct)
                                ?.name || "Product Name"}
                            </h3>
                            <p className="text-gray-500 text-sm mb-2">
                              {products.find((p) => p.id === selectedProduct)
                                ?.category || "Category"}
                            </p>
                            <div className="flex items-center mt-2">
                              <div className="flex-1">
                                <span className="text-sm text-gray-600">
                                  Price
                                </span>
                                <p className="font-bold text-lg">$24.99</p>
                              </div>
                              <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
                                Add to Cart
                              </button>
                            </div>
                          </div>

                          {/* Product Description */}
                          <div className="absolute bottom-10 left-8 right-8 bg-white p-4 rounded-lg shadow-md border border-gray-200">
                            <h4 className="font-medium mb-2">Description</h4>
                            <p className="text-sm text-gray-600">
                              This amazing product offers superior quality and
                              performance. Perfect for everyday use, it will
                              quickly become a staple in your routine.
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mb-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm">
                            Select a product from the list
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TransformComponent>
              </TransformWrapper>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="h-8 bg-white border-t border-gray-200 flex items-center justify-between px-4">
            <span className="text-xs text-gray-500">
              {selectedProduct
                ? `Editing: ${
                    products.find((p) => p.id === selectedProduct)?.name
                  }`
                : "No product selected"}
            </span>
            <div className="flex items-center text-xs text-gray-500">
              <span>
                <strong>Press Ctrl + Scroll</strong> to zoom in/out
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
