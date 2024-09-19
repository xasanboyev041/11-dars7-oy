import { TbBrandGravatar } from "react-icons/tb";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearchProductMutation } from "../../redux/api/productsApi";
import { AutoComplete } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("")
  const { token } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const [searchProduct, {data}] = useSearchProductMutation();

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchValue){
      navigate(`/search?q=${searchValue}`)
    }
  }
 
  if (pathname.includes("auth")) return;
  return (
    <div className=" bg-blue-500 shadow-2xl">
      <nav className="w-[1200px] m-auto flex items-center justify-between p-2 gap-6">
        <Link to={"/"}>
          <div className="flex px-2 shadow-2xl bg-gray-300 w-fit rounded-full">
            <span className="font-bold text-[36px]  text-lime-700">S</span>
            <div className="flex flex-col text-lg">
              <span className="font-bold mt-2 text-sm text-yellow-500">B</span>
              <span>
                <TbBrandGravatar className="text-yellow-600  absolute" />
              </span>
            </div>
            <span className="font-bold  text-[22px]  left-[44px] mt-2 text-green-700">
              M
            </span>
          </div>
        </Link>

       <form onSubmit={handleSearch}>
       <AutoComplete
          options={data?.payload?.map(product => ({ label: <Link key={product._id} to={`/products/${product._id}`}>{product.product_name}</Link>}))}
          style={{
            width: 200,
          }}
          onKeyDown={
            (e) => {
              if(e.code === "Enter"){
                navigate(`/search?q=${searchValue}`)
              }
            }
          }
          onChange={(value) => setSearchValue(value)}
          onSearch={(text) => searchProduct(text)}
          placeholder="input here"
      />
       </form>

        <ul className="flex gap-6">
          <li className="text-white">
            <Link to={"/"}>Home</Link>
          </li>

          {token ? (
            <li className="text-white">
              <Link to={"/profile"}>Profile</Link>
            </li>
          ) : (
            <>
              <li className="text-white">
                <Link to={"auth/signUp"}>Register </Link>
              </li>

              <li className="text-white">
                <Link to={"auth/login"}>Login </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
