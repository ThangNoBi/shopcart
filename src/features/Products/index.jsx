import { Box } from "@mui/system";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import ListPage from "./pages/ListPage";
import ProductDetailPage from "./pages/ProductDetailPage";

Product.propTypes = {};

function Product(props) {
  const match = useRouteMatch();

  return (
    <div>
      <Box pt={4}>
        <Switch>
          <Route path={match.url} exact component={ListPage} />
          <Route
            path={`${match.url}/:productId`}
            component={ProductDetailPage}
          />
        </Switch>
      </Box>
    </div>
  );
}

export default Product;
