import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, getCartItems, addOrder } from "../../actions";
import Layout from "../../Components/Layout";
import { MaterialButton, MaterialInput } from "../../Components/MaterialUI";
import Card from "../../Components/UI/Card";
import { Anchor } from "../../Components/MaterialUI";
import AddressForm from "./AddressForm";
import { CartPage } from "../CartPage";
import "./style.css";

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

export const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAdress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const dispatch = useDispatch();

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);

  const selectAddress = (addr) => {
    // console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setPaymentOption(true);
    setOrderSummary(false);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      }
    );

    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addresssId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };

    console.log(payload);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  if (confirmOrder) {
    return (
      <>
        <Layout>
          <Card>
            <div>thank you</div>
          </Card>
        </Layout>
      </>
    );
  }

  return (
    <Layout>
      {/* <div>{JSON.stringify(address)}</div> */}
      <div className="cartContainer" style={{ alignItems: "flex-start " }}>
        <div className="checkoutContainer">
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label="email" />
                </div>
              )
            }
          />

          <CheckoutStep
            stepNumber={"2"}
            title={"DELIEVERY ADDRESS"}
            active={!confirmAdress && !auth.authenticate}
            body={
              <>
                {confirmAdress ? (
                  <div>{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr) => (
                    <div className="flexRow addressContainer">
                      <div>
                        <input
                          type="radio"
                          name="Address"
                          onClick={() => {
                            selectAddress(adr);
                          }}
                        />
                      </div>
                      <div className="flexRow sb addressinfo">
                        {!adr.edit ? (
                          <div style={{ width: "100%" }}>
                            <div className="addressDetail">
                              <div>
                                <span className="addressName">{adr.name}</span>
                                <span className="addressType">
                                  {adr.addressType}
                                </span>
                                <span className="addressMobileNumber">
                                  {adr.mobileNumber}
                                </span>
                              </div>
                              {adr.selected && (
                                <Anchor
                                  name="EDIT"
                                  onClick={() => enableAddressEditForm(adr)}
                                  style={{
                                    fontWeight: "500",
                                    color: "#2874f0",
                                  }}
                                />
                              )}
                            </div>
                            <div className="fullAddress">
                              {adr.address} <br />{" "}
                              {`${adr.state} - ${adr.pinCode}`}
                            </div>
                            {adr.selected && (
                              <MaterialButton
                                title="DELIVERY HERE"
                                onClick={() => confirmDeliveryAddress(adr)}
                                style={{
                                  width: "200px",
                                  margin: "10px 0",
                                }}
                              />
                            )}
                          </div>
                        ) : (
                          <AddressForm
                            withoutLayout={true}
                            onSubmitForm={onAddressSubmit}
                            initialData={adr}
                            onCancel={() => {}}
                          />
                        )}
                      </div>

                      {adr.selected && <div>edit </div>}
                    </div>
                  ))
                )}
              </>
            }
          />
          {/* address form */}

          {confirmAdress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(!newAddress)}
            />
          )}

          <CheckoutStep
            stepNumber={"3"}
            active={orderSummary}
            title={"ORDER SUMMARY"}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div>{Object.keys(cart.cartItems).length}items</div>
              ) : null
            }
          />
          {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 60px",
                }}
                className="flexRow sb"
              >
                <p style={{}}>
                  Order confirmation email will be sent to
                  <strong> {auth.user.email}</strong>
                </p>
                <MaterialButton
                  style={{ width: "200px" }}
                  onClick={userOrderConfirmation}
                  title="CONTINUE"
                />
              </div>
            </Card>
          )}

          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <input type="radio" name="paymentOption" value="cod" />
                  <div>Cash on delievery</div>
                  <MaterialButton
                    title={"CONFIRM ORDER"}
                    onClick={onConfirmOrder}
                  />
                </div>
              )
            }
          />
        </div>
      </div>
    </Layout>
  );
};
