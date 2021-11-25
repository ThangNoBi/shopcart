import PropTypes from "prop-types";
import { Box, createTheme } from "@mui/system";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const theme = createTheme({
  spacing: 8,
});

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(2),
    borderTop: "1px solid gray",
  },

  list: {
    margin: 0,
    padding: 0,
    listStyleType: "none",

    "& > li": {},
  },
}));

FiltersByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FiltersByService({ filters = {}, onChange }) {
  const classes = useStyles();

  const handleChange = (e) => {
    //Nếu không có thay đổi thì trả về luôn
    if (!onChange) return;
    let { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">CHỌN DỊCH VỤ</Typography>

      <ul className={classes.list}>
        {[
          { value: "isPromotion", label: "Có khuyễn mãi" },
          { value: "isFreeShip", label: "Vận chuyển miễn phí" },
        ].map((item) => (
          <li key={item.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[item.value])}
                  onChange={handleChange}
                  name={item.value}
                  color="secondary"
                />
              }
              label={item.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FiltersByService;
