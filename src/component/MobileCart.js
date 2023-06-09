import React from "react";
import ThemeContext from "./ThemeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { Suspense } from "react";
export const MobileCart = ({ cart }) => {
  const { removeItem } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [requestWaitTime, setRequestWaitTime] = useState(false);
  const handleRemoveItem = (item) => {
    removeItem(item);
  };
  const handleSubmits = () => {
    setRequestWaitTime(true);
    const data = { cart: cart };
    Axios.post(
      "https://testingrender-i8uu.onrender.com/create-checkout-session",
      {
        data,
      }
    ).then((res) => {
      try {
        window.location.href = res.data.url;
      } catch (error) {
        console.log(error);
      } finally {
        setRequestWaitTime(false);
      }
    });
  };
  return (
    <div>
      <h1 className="text-center">
        You have <span>{cart.length} </span>in the bucket
      </h1>
      <hr></hr>
      <div className="min-h-[100vh]">
        <div className="min-h-[50vh] overflow-y-auto w-[80%] mx-auto">
          {cart.map((item) => {
            return (
              <div className="flex flex-row justify-between">
                <div className="flex w-[60%]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[30px] my-1"
                  />
                  <p>{item.name}</p>
                </div>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
                <span
                  onClick={() => handleRemoveItem(item.cartId)}
                  className="cursor-pointer"
                >
                  X
                </span>
              </div>
            );
          })}
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div className=" flex items-end justify-between">
            <button
              className="bg-slate-500 sm:p-3 px-4 rounded-2xl hover:bg-slate-400 duration-500 ease-in sm:text-xl"
              onClick={handleSubmits}
            >
              Check Out
            </button>
            <button
              className="bg-slate-500 sm:p-3 px-4 rounded-2xl hover:bg-slate-400 duration-500 ease-in sm:text-xl"
              onClick={() => navigate("/shop")}
            >
              Back to shop
            </button>
          </div>
          {requestWaitTime ? (
            <div className="text-center">Processing...</div>
          ) : null}
        </Suspense>
      </div>
    </div>
  );
};
