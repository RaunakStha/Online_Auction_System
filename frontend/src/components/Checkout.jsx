import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/Authcontext";
import axios from "axios";

const Checkout = () => {
  const { authTokens } = useContext(AuthContext);
  const [userProducts, setUserProducts] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [addressFormData, setAddressFormData] = useState({
    province: "",
    district: "",
    postalCode: "",
    mobile: "",
    firstName: "",
    lastName: "",
  });
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token not found");
        }

        const buyingOrdersResponse = await axios.get(
          "http://127.0.0.1:8000/api/orders/buying/",
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        const buyingOrders = buyingOrdersResponse.data;
        const products = buyingOrders.map((order) => order.product);
        setUserProducts(products);

        const addressResponse = await axios.get(
          "http://127.0.0.1:8000/api/addresses/",
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        const addressData = addressResponse.data;
        if (addressData.length > 0) {
          setUserAddress(addressData[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProducts();
  }, []);

  const handleAddressFormChange = (e) => {
    setAddressFormData({
      ...addressFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authTokens");
      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const addressResponse = await axios.post(
        "http://127.0.0.1:8000/api/addresses/",
        addressFormData,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      const newAddress = addressResponse.data;
      setUserAddress(newAddress);
      setShowAddressForm(false);
    } catch (error) {
      console.error("Error creating user address:", error);
    }
  };

  return (
    <div className="font-[sans-serif] bg-white">
      <div className="max-lg:max-w-xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 max-lg:order-1 p-6 max-w-4xl mx-auto w-full">
            <div className="text-center max-lg:hidden">
              <h2 className="text-3xl font-extrabold text-[#333] inline-block border-b-4 border-[#333] pb-1">
                Checkout
              </h2>
            </div>
            {userAddress && (
                                <div>
                                <h2 className="text-2xl font-extrabold text-[#333]">
                                  Shipping info
                                </h2>
                                <div>
                                  {/* Display user's address */}
                                  <p>Province: {userAddress.province}</p>
                                  <p>District: {userAddress.district}</p>
                                  <p>Postal Code: {userAddress.postalCode}</p>
                                  <p>Mobile: {userAddress.mobile}</p>
                                  <p>Name: {userAddress.name}</p>
                                  <p>First Name: {userAddress.firstName}</p>
                                  <p>Last Name: {userAddress.lastName}</p>
                                </div>
                              </div>
              
            )}
            {(showAddressForm || !userAddress) && (
                            <form className="lg:mt-12">
                            <div>
                              <h2 className="text-2xl font-extrabold text-[#333]">
                                Shipping info
                              </h2>
                              <div className="grid grid-cols-2 gap-6 mt-8">
                                <input
                                  type="text"
                                  name="province"
                                  placeholder="Province"
                                  className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                                  value={addressFormData.province}
                                  onChange={handleAddressFormChange}
                                />
                                <input
                                  type="text"
                                  placeholder="District"
                                  name="district"
                                  className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                                  value={addressFormData.district}
                                  onChange={handleAddressFormChange}
                                />
                                <input
                                  type="text"
                                  name="postalCode"
                                  placeholder="Postal code"
                                  value={addressFormData.postalCode}
                                  onChange={handleAddressFormChange}
                                  className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                                />
                                <input
                                  type="text"
                                  placeholder="Mobile"
                                  name="mobile"
                                  value={addressFormData.mobile}
                                  onChange={handleAddressFormChange}
                                  className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                                />
                                <input
                                  type="text"
                                  placeholder="Address"
                                  name="address"
                                  value={addressFormData.address}
                                  onChange={handleAddressFormChange}
                                  className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                                />
                                <input
                                  type="text"
                                  placeholder="First Name"
                                  name="firstName"
                                  value={addressFormData.firstName}
                                  onChange={handleAddressFormChange}
                                  className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                                />
                                <input
                                  type="text"
                                  placeholder="Last Name"
                                  name="lastName"
                                  value={addressFormData.lastName}
                                  onChange={handleAddressFormChange}
                                  className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                                />
                              </div>
                            </div>
              
                          </form>
            )}
                          <div className="mt-12">
                <h2 className="text-2xl font-extrabold text-[#333]">
                  Payment method
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 mt-8">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      className="w-5 h-5 cursor-pointer"
                      id="card"
                      defaultChecked=""
                    />
                    <label
                      htmlFor="card"
                      className="ml-4 flex gap-2 cursor-pointer"
                    >
                      <img
                        src="images\esewa-fonepay-pvt-ltd-logo-portable-network-graphics-image-brand-cash-on-delivery-logo-8703ede60180bb81585b7e3441fb44c6.png"
                        className="w-20"
                        alt="card1"
                      />

                    </label>
                  </div>

                </div>
                <div className="grid gap-6 mt-8">

                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm">
                      I accept the{" "}
                      <a
                        href="javascript:void(0);"
                        className="text-blue-600 font-semibold hover:underline ml-1"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  type="button"
                  className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  className="min-w-[150px] px-6 py-3.5 text-sm  text-white rounded-md "
                >
                  Confirm payment $240
                </button>
              </div>
          </div>
          <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0">
            <div className="relative h-full">
              <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
                <h2 className="text-2xl font-extrabold text-[#333]">
                  Order Summary
                </h2>
                <div className="space-y-6 mt-10">
                  <div className="grid sm:grid-cols-2 items-start gap-6">
                    <div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
                      <img
                        src="https://readymadeui.com/images/product10.webp"
                        className="w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base text-[#333]">
                        Naruto: Split Sneakers
                      </h3>
                      <ul className="text-xs text-[#333] space-y-2 mt-2">
                        <li className="flex flex-wrap gap-4">
                          Size <span className="ml-auto">37</span>
                        </li>
                        <li className="flex flex-wrap gap-4">
                          Quantity <span className="ml-auto">2</span>
                        </li>
                        <li className="flex flex-wrap gap-4">
                          Total Price <span className="ml-auto">$40</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 items-start gap-6">
                    <div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
                      <img
                        src="https://readymadeui.com/images/product11.webp"
                        className="w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base text-[#333]">VelvetGlide Boots</h3>
                      <ul className="text-xs text-[#333] space-y-2 mt-2">
                        <li>
                          Size <span className="float-right">37</span>
                        </li>
                        <li>
                          Quantity <span className="float-right">2</span>
                        </li>
                        <li>
                          Total Price <span className="float-right">$40</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 items-start gap-6">
                    <div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
                      <img
                        src="https://readymadeui.com/images/product14.webp"
                        className="w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base text-[#333]">Echo Elegance</h3>
                      <ul className="text-xs text-[#333] space-y-2 mt-2">
                        <li>
                          Size <span className="float-right">37</span>
                        </li>
                        <li>
                          Quantity <span className="float-right">2</span>
                        </li>
                        <li>
                          Total Price <span className="float-right">$40</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-0 bottom-0 bg-gray-200 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-base text-[#333] font-bold">
                  Total <span className="ml-auto">$240.00</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;