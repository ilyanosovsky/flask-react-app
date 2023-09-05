import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navBar";
import AllOrgs from "scenes/widgets/AllOrgs";
import CreateOrg from "scenes/widgets/CreateOrg";
import GetOrg from "scenes/widgets/GetOrg";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Box 
      position="sticky"
      top="0"
      zIndex="1000">
        <Navbar />
      </Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >

        <Box flexBasis={isNonMobileScreens ? "30%" : undefined}>
          <CreateOrg />
        </Box>
        
        <Box
          flexBasis={isNonMobileScreens ? "40%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          mb="2rem"
        >
          <GetOrg />
        </Box>

        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <AllOrgs />
        </Box>

      </Box>


    </Box>
  );
};

export default HomePage;