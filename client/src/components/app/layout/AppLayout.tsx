import React, { useEffect } from "react";
import NavBar from "../navigation/NavBar";
import { Box } from "@chakra-ui/react";
import Navigation from "../navigation/Navigation";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";
import DottedBackground from "./DottedBackground";
import { useErrorNotification } from "../../../hooks/userErrorNotifcation";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { me } from "../../../redux/authSlice";

type MainLayoutProps = {};

const AppLayout: React.FC<MainLayoutProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  useErrorNotification();
  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <DottedBackground />
      <Box textAlign="center" fontSize="xl" w={["90%", "85%", "80%"]} maxW={800} mx="auto">
        <Box pt={10} pb={10}>
          <Navigation />
        </Box>
      </Box>
      <Footer />
    </BrowserRouter>
  );
};

export default AppLayout;
