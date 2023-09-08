import { Container, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div className="footerContainer">
      <Container>
        <Typography variant=" body1: 'p'" fontWeight="bold" fontFamily={"Rubik"}>
          Copyright © 2023. All rights reserved.
        </Typography>
      </Container>
    </div>
  );
};

export default Footer;
