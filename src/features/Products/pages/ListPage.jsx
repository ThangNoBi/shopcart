import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import { Grid, Pagination, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import proDuctAPI from "../../../API/productApi";
import ProductSkeleton from "../components/ProductSkeleton";
import ProductList from "../components/ProductList";
import ProductSort from "../components/ProductSort";
import ProductFilters from "../components/ProductFilters";
import FilterViewer from "../components/Filters/FilterViewer";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    // width: "250px",
    textAlign: "left",
  },

  right: {
    flex: "1 1 0",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
    paddingBottom: "15px",
  },
}));

function ListPage(props) {
  const classes = useStyles();

  // Đồng bộ lọc sản phẩm lên URL
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params.limit) || 8,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);

  const [proDuctList, setproDuctList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams.limit) || 8,
  //   _sort: queryParams._sort || "salePrice:ASC",
  // }));

  const [pagination, setPagination] = useState({
    total: 10,
    limit: 8,
    page: 1,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await proDuctAPI.getAll(queryParams);
        setproDuctList(data);
        setPagination(pagination);
        // console.log({ data, pagination });
      } catch (error) {
        console.log("Failed to fetch ProductList", error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  // Hiển thị lên URL
  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [history, filters]);

  const handlePageChange = (bc, page) => {
    // console.log(page);
    // setFilters((prevFilter) => ({
    //   ...prevFilter,
    //   _page: page,
    // }));

    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newValues) => {
    // setFilters((prevFilter) => ({
    //   ...prevFilter,
    //   _sort: newValues,
    // }));

    const filters = {
      ...queryParams,
      _sort: newValues,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFilterChange = (newFilters) => {
    // setFilters((prevFilter) => ({
    //   ...prevFilter,
    //   ...newFilters,
    // }));

    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilter = (newFilters) => {
    // setFilters(newFilters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left} xs={5} sm={5} md={4} lg={3}>
            <Paper>
              <ProductFilters
                filters={queryParams}
                onChange={handleFilterChange}
              />
            </Paper>
          </Grid>

          <Grid item className={classes.right} xs={7} sm={7} md={8} lg={9}>
            <Paper>
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleSortChange}
              />
              <FilterViewer filters={queryParams} onChange={setNewFilter} />
              {loading ? (
                <ProductSkeleton length={8} />
              ) : (
                <ProductList data={proDuctList} />
              )}

              <Box className={classes.pagination}>
                <Pagination
                  variant="outlined"
                  color="secondary"
                  page={pagination.page}
                  count={Math.ceil(pagination.total / pagination.limit)}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
