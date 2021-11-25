import {
  Container,
  createTheme,
  Grid,
  LinearProgress,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router";
import { addToCart } from "../../Cart/cartSlice";
import AddToCartDetail from "../components/ProductDetail/AddToCartDetail";
import ProductAddition from "../components/ProductDetail/NavMenu/ProductAddition";
import ProductDescription from "../components/ProductDetail/NavMenu/ProductDescription";
import ProductReview from "../components/ProductDetail/NavMenu/ProductReview";
import ProductImgDetail from "../components/ProductDetail/ProductImgDetail";
import ProductInfoDetail from "../components/ProductDetail/ProductInfoDetail";
import ProductNavMenu from "../components/ProductDetail/ProductNavMenu";
import useProductDetail from "../hooks/UseProductDetail";

const theme = createTheme({
  spacing: 8,
});

const useStyles = makeStyles(() => ({
  root: {},

  left: {
    // width: "400px",
    textAlign: "left",
    padding: theme.spacing(1.5),
    borderRight: "1px solid #e0e0e0",
  },

  right: {
    flex: "1 1 0",
    padding: theme.spacing(1.5),
    textAlign: "left",
  },

  loading: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
  },
}));

function ProductDetailPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    //DESTRUCTURING 2 lớp để lấy productId bên trong params
    params: { productId },
    url,
  } = useRouteMatch();

  // Tạo 1 Custom Hook để fetch API Product về
  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCartSubmit = (values) => {
    const action = addToCart({
      id: product.id,
      product: product,
      quantity: values.quantity,
    });
    // console.log(action);
    dispatch(action);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left} sm={6} md={4} lg={4}>
              <ProductImgDetail product={product} />
            </Grid>
            <Grid item className={classes.right} sm={6} md={8} lg={8}>
              <ProductInfoDetail product={product} />
              <AddToCartDetail onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductNavMenu />

        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>

          <Route path={`${url}/additional`} component={ProductAddition} />
          <Route path={`${url}/reviews`} component={ProductReview} />
        </Switch>
      </Container>
    </Box>
  );
}

export default ProductDetailPage;
