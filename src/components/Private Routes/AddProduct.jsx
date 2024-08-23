import { useContext, useLayoutEffect, useState } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import { Bounce, toast, ToastContainer } from "react-toastify";
const AddProduct = () => {
  const { screenmode } = useContext(AuthContex);
  const [selectedBrand, setSelectedBrand] = useState("");

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDB = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const type = form.type.value;
    const price = form.price.value;
    const brand = selectedBrand;
    const rating = form.rating.value;
    const description = form.description.value;
    const url = form.url.value;

    const productInfo = { name, type, price, brand, rating, description, url };

    fetch(
      `https://tech-heaven-server-3asvea5rc-codingmasters-projects-5cf7a7b3.vercel.app/productDB`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productInfo),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const notify = () => {
          toast.success("Product Added Successfully", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        };
        notify();
      });
  };

  const nowebkit = {
    WebkitAppearance: "none",
    MozAppearance: "textfield",
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  return (
    <div className="h-auto md:mt-16 -mt-8 font-menu">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      <div>
        <div className="text-center mb-8 md:mb-16">
          <h2
            className={`${
              screenmode ? " text-dmgreen" : "text-lmblue"
            }  md:text-xl md:mb-3 mb-1`}
          >
            Add product
          </h2>
          <h1 className="md:text-5xl text-2xl font-menu font-medium">
            Let's add some products!
          </h1>
        </div>

        <div
          className={`md:w-1/2 w-72 m-auto ${
            screenmode ? "bg-[#192022]" : "bg-white"
          } mb-20 md:pb-0 md:rounded-tl-3xl rounded-tl-2xl rounded-br-2xl md:rounded-br-3xl`}
        >
          <div className="w-10/12 m-auto md:pt-3">
            <h1 className="md:text-xl pt-8 md:pb-4">
              Give the Product Details Here:
            </h1>
            <form action="" className="text-center" onSubmit={handleDB}>
              <div className={`grid md:grid-cols-2 text-left`}>
                <div className=" md:space-y-2 space-y-1 mt-3 md:mt-6">
                  <label
                    htmlFor=""
                    className="block text-[11px] md:text-[16px]  uppercase "
                  >
                    Product Name{" "}
                    <span
                      className={`${
                        screenmode ? "text-dmgreen" : "text-lmblue"
                      }`}
                    >
                      *
                    </span>
                  </label>
                  <input
                    required
                    name="name"
                    placeholder="Name"
                    type="text"
                    className={`bg-white md:text-[15px] text-[11px] outline font-menu rounded-sm outline-1 py-2 px-2 w-4/5 ${
                      screenmode
                        ? "focus:outline-dmgreen text-black"
                        : "focus:outline-lmblue outline-slate-400"
                    }`}
                  />
                </div>
                <div className=" md:space-y-2 space-y-1 mt-3 md:mt-6">
                  <label
                    htmlFor=""
                    className="block text-[11px] md:text-[16px]  uppercase "
                  >
                    Type{" "}
                    <span
                      className={`${
                        screenmode ? "text-dmgreen" : "text-lmblue"
                      }`}
                    >
                      *
                    </span>
                  </label>
                  <input
                    required
                    name="type"
                    placeholder="Device type"
                    type="text"
                    className={`bg-white md:text-[15px] text-[11px] outline font-menu rounded-sm outline-1 py-2 px-2 w-4/5 ${
                      screenmode
                        ? "focus:outline-dmgreen text-black"
                        : "focus:outline-lmblue outline-slate-400"
                    }`}
                  />
                </div>
                <div className=" md:space-y-2 space-y-1 mt-3 md:mt-6">
                  <label
                    htmlFor=""
                    className="block text-[11px] md:text-[16px]  uppercase "
                  >
                    Price{" "}
                    <span
                      className={`${
                        screenmode ? "text-dmgreen" : "text-lmblue"
                      }`}
                    >
                      *
                    </span>
                  </label>
                  <input
                    required
                    name="price"
                    placeholder="Price"
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]*"
                    style={nowebkit}
                    className={`bg-white md:text-[15px] text-[11px] outline font-menu rounded-sm outline-1 py-2 px-2 w-4/5 ${
                      screenmode
                        ? "focus:outline-dmgreen text-black"
                        : "focus:outline-lmblue outline-slate-400"
                    }`}
                  />
                </div>

                <div className=" md:space-y-2 space-y-1 mt-3 md:mt-6">
                  <label
                    htmlFor=""
                    className="block text-[11px] md:text-[16px]  uppercase "
                  >
                    Brand{" "}
                    <span
                      className={`${
                        screenmode ? "text-dmgreen" : "text-lmblue"
                      }`}
                    >
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      name="brand"
                      className={`${
                        screenmode
                          ? "focus:border-dmgreen"
                          : "focus:border-lmblue border-slate-400 "
                      } bg-white text-black py-2 px-2 border rounded-sm md:text-[15px] text-[11px] `}
                      value={selectedBrand}
                      onChange={handleBrandChange}
                      id=""
                    >
                      <option value="" disabled>
                        Select a brand
                      </option>
                      <option className="" value="Apple">
                        Apple
                      </option>
                      <option className="" value="Samsung">
                        Samsung
                      </option>
                      <option className="" value="Google">
                        Google
                      </option>
                      <option className="" value="Sony">
                        Sony
                      </option>
                      <option className="" value="Microsoft">
                        Microsoft
                      </option>
                      <option className="" value="Intel">
                        Intel
                      </option>
                    </select>
                  </div>
                </div>

                <div className=" md:space-y-2 space-y-1 mt-3 md:mt-6">
                  <label
                    htmlFor=""
                    className="block text-[11px] md:text-[16px]  uppercase "
                  >
                    Rating ?/10{" "}
                    <span
                      className={`${
                        screenmode ? "text-dmgreen" : "text-lmblue"
                      }`}
                    >
                      *
                    </span>
                  </label>
                  <input
                    required
                    name="rating"
                    placeholder="Product rating"
                    type="text"
                    max="10"
                    min="0"
                    pattern="[0-9]*[.,]?[0-9]*"
                    className={`bg-white md:text-[15px] text-[11px] outline font-menu rounded-sm outline-1 py-2 px-2 w-4/5 ${
                      screenmode
                        ? "focus:outline-dmgreen text-black"
                        : "focus:outline-lmblue outline-slate-400"
                    }`}
                  />
                </div>
                <div className=" md:space-y-2 space-y-1 mt-3 md:mt-6">
                  <label
                    htmlFor=""
                    className="block text-[11px] md:text-[16px]  uppercase "
                  >
                    Description{" "}
                    <span
                      className={`${
                        screenmode ? "text-dmgreen" : "text-lmblue"
                      }`}
                    >
                      *
                    </span>
                  </label>
                  <input
                    required
                    name="description"
                    placeholder="Short description"
                    type="text"
                    className={`bg-white md:text-[15px] text-[11px] outline font-menu rounded-sm outline-1 py-2 px-2 w-4/5 ${
                      screenmode
                        ? "focus:outline-dmgreen text-black"
                        : "focus:outline-lmblue outline-slate-400"
                    }`}
                  />
                </div>
                <div className=" md:space-y-2 space-y-1 mt-3 md:mt-6">
                  <label
                    htmlFor=""
                    className="block text-[11px] md:text-[16px]  uppercase "
                  >
                    Image url{" "}
                    <span
                      className={`${
                        screenmode ? "text-dmgreen" : "text-lmblue"
                      }`}
                    >
                      *
                    </span>
                  </label>
                  <input
                    required
                    name="url"
                    placeholder="url"
                    type="text"
                    className={`bg-white md:text-[15px] text-[11px] outline font-menu rounded-sm outline-1 py-2 px-2 w-4/5 ${
                      screenmode
                        ? "focus:outline-dmgreen text-black"
                        : "focus:outline-lmblue outline-slate-400"
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`md:my-12 my-8 md:px-2 md:py-3 py-1 md:text-lg rounded-md md:rounded-lg font-medium w-1/3  m-auto  ${
                  screenmode
                    ? "bg-dmgreen text-black duration-200 hover:bg-emerald-400"
                    : "duration-200 bg-lmblue text-white hover:bg-blue-600"
                }`}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
