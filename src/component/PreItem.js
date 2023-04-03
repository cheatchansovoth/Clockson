import React, { useContext, useEffect, useState } from "react";
import cloth from "./clothes.json";
import { useParams, useNavigate } from "react-router";
import ThemeContext from "./ThemeContext";
import { Alert } from "./Alert";
export const PreItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const { addToCart } = useContext(ThemeContext);

  const onClickAddToCart = (item) => {
    addToCart(item);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };
  return (
    <div>
      {alert && <Alert show={true} />}
      {cloth
        .filter((item) => item.productID === Number(id))
        .map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row w-[80%] justify-center mx-auto xl:h-[80vh] mt-[5%] space-x-[5%]"
            >
              <div className="h-[50vh] sm:h-[50vh]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain sm:object-cover"
                />
              </div>
              <div className="w-1.5/5 space-y-[5%] sm:h-[50vh]">
                <p className="font-semibold text-4xl">{item.name}</p>
                <p className="font-semibold text-2xl">${item.price}</p>
                <div className="flex space-x-3 items-center justify-center">
                  <p>
                    Or 6 interest-free payments of{" "}
                    <span className="font-semibold text-xl">
                      ${item.price / 4}{" "}
                    </span>{" "}
                    with{" "}
                  </p>
                  <img
                    src="https://www.forevernew.co.nz/static/version1679452572/frontend/ForeverNew/Base/en_NZ/Laybuy_Laybuy/images/laybuy_logo_grape.svg"
                    className="w-[80px]"
                    alt="laybuy"
                  ></img>
                </div>
                <hr></hr>
                <div className="flex space-x-5">
                  <div className="">
                    <h1 className="font-bold text-2xl">Colour Available</h1>
                    <div className="flex space-x-3">
                      {item.color.split("/").map((color, index) => {
                        return (
                          <div key={index} className="">
                            <p
                              className={`inline-block w-6 h-6 rounded-full ${
                                color === "black"
                                  ? "bg-black"
                                  : color === "white"
                                  ? "bg-white"
                                  : `bg-${color}-500`
                              }`}
                            ></p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h1 className="font-bold text-2xl">Size Available</h1>
                    {item.sizes
                      .map((size, index) => {
                        return (
                          <span
                            key={index}
                            className="text-xs font-semibold bg-gray-300 rounded-full px-2 py-1 mx-2"
                          >
                            {size}
                          </span>
                        );
                      })
                      .reduce((prev, curr) => [prev, " ", curr])}
                  </div>
                </div>
                <p className="text-center">
                  You are $75 away from free shipping
                </p>
                <div className="flex w-full justify-between">
                  <button
                    className="bg-slate-500 sm:p-3 px-4 rounded-2xl hover:bg-slate-400 duration-500 ease-in sm:text-xl"
                    onClick={() => {
                      onClickAddToCart(item);
                    }}
                  >
                    ADD To CART
                  </button>
                  <button
                    className="bg-slate-500 sm:p-3 px-4 rounded-2xl hover:bg-slate-400 duration-500 ease-in sm:text-xl "
                    onClick={() => {
                      navigate("/shop");
                    }}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
