import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import Slider from "react-slick";
import { Typography } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "@mui/styles";

import img1 from "./image/img1.jpg";

SlickCarousel.propTypes = {};

const useStyles = makeStyles({
  root: {},

  image: {
    background: `url${img1} no-repeat`,
    height: "100%",
  },
});

function SlickCarousel(props) {
  const classes = useStyles();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ height: "300px" }}>
      <Slider {...settings}>
        <Box sx={{ height: "300px" }}>
          <img src={img1} alt="" className={classes.image} />
        </Box>
        <Box>
          <Typography variant="h6">2</Typography>
        </Box>
        <Box>
          <Typography variant="h6">3</Typography>
        </Box>
        <Box>
          <Typography variant="h6">4</Typography>
        </Box>
        <Box>
          <Typography variant="h6">5</Typography>
        </Box>
        <Box>
          <Typography variant="h6">6</Typography>
        </Box>
      </Slider>
    </Box>
  );
}

export default SlickCarousel;
