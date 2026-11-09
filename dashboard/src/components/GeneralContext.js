import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode) => {},
  closeBuyWindow: () => {},
  orderVersion: 0,
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");
  const [orderVersion, setOrderVersion] = useState(0);

  const handleOpenBuyWindow = (uid, mode = "BUY") => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setOrderMode(mode);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOrderPlaced = () => {
    setOrderVersion((v) => v + 1);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        orderVersion: orderVersion,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          mode={orderMode}
          onOrderPlaced={handleOrderPlaced}
          onClose={handleCloseBuyWindow}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;