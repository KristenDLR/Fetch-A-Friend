import { Box, Stack } from "@mantine/core";

import { useState } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { TbDog } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const data = [
  { link: "/search", label: " Search for Dogs", icon: <FaSearch /> },
  { link: "/favorites", label: " Favorites", icon: <FaHeart /> },
  { link: "/match", label: " Find My Match", icon: <TbDog /> },
];

export function Navigation() {
  const [active, setActive] = useState(" Search for Dogs");

  //TODO: active state of nav not working
  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      to={item.link}
      style={{ textDecoration: "none" }}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      {item.icon} {item.label}
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <Box className={classes.navbarMain}>
        <Stack>{links}</Stack>
      </Box>

        {/* Todo: Logout */}
      {/* <Box className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IoMdLogOut className={classes.linkIcon} />
          <span>Logout</span>
        </a>
      </Box> */}
    </nav>
  );
}
