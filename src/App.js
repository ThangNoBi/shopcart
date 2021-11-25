import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Product from "./features/Products";
import Header from "./components/Header";
import CartMain from "./features/Cart";
import FooterComponent from "./components/Footer";
import SlickCarousel from "./components/SlickCarousel";

function App() {
  return (
    <div className="App">
      <Header />
      <Redirect from="/" to="/products" />
      {/* <Route path="/products" component={SlickCarousel} /> */}
      <Switch>
        <Route path="/products" component={Product} />
        <Route path="/cart" component={CartMain} />
      </Switch>
      <FooterComponent />
    </div>
  );
}

export default App;
