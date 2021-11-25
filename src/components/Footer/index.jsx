import React from "react";
import { AppBar, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

FooterComponent.propTypes = {};

function FooterComponent(props) {
  return (
    <AppBar position="static" sx={{ mt: 2 }}>
      <Box>
        <Container>
          <Grid container sx={{ pt: 2 }}>
            <Grid item xs={4}>
              <Typography variant="h5">Footer Content</Typography>
              <Typography variant="subtitle1">
                Here you can use rows and columns here to organize your footer
                content.
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">Product</Typography>
              <ul
                style={{
                  listStyleType: "none",
                  paddingLeft: 0,
                  //   textAlign: "left",
                }}
              >
                <li>By Category</li>
                <li>By Price</li>
                <li>By Delivery</li>
                <li>Free Ship</li>
              </ul>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">Contact</Typography>
              <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                <li>Email : abcd@gmail.com</li>
                <li>Phone Number : (+84) 356783219</li>
                <li>123 Nguyễn Trãi, TPHCM</li>
              </ul>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppBar>
  );
}

export default FooterComponent;
