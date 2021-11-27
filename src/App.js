import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Product from "./features/Products";
import Header from "./components/Header";
import CartMain from "./features/Cart";
import FooterComponent from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Redirect from="/shopcart" to="/products" /> */}
      {/* <Route path="/products" component={SlickCarousel} /> */}
      <Switch>
        {/* <Redirect from="/" to="/products" component={Product} /> */}
        {/* <Route path="/products" component={Product} /> */}
        {/* <Route path="/shopcart" component={Product} /> */}
        {/* <Route path="/cart" component={CartMain} />  */}
      </Switch>
      <FooterComponent />
    </div>
  );
}

export default App;
