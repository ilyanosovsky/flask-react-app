import { Box, useMediaQuery } from "@mui/material";
// import { useSelector } from "react-redux";
import Navbar from "scenes/navBar";

const HomePage = () => {
//   const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Box 
      position="sticky"
      top="0"
      zIndex="1000">
        <Navbar />
      </Box>
      

    </Box>
  );
};

export default HomePage;