import React from "react";

import "./index.scss";
import "./App.scss";
import FAQ from "./pages/components/FAQ/FAQ";
import Checkout from "./pages/components/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <FAQ />
      <Checkout />
    </div>
  );
}

export default App;
