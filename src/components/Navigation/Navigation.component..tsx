import { Box, Group, Stack } from "@mantine/core";

import { useState } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { TbDog } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { Footer } from "../Footer/Footer.component";
import classes from "./Navigation.module.css";

const data = [
  { link: "/search", label: " Search for Dogs", icon: <FaSearch /> },
  { link: "/favorites", label: " Favorites", icon: <FaHeart /> },
  { link: "/match", label: " Find My Match", icon: <TbDog /> },
];

export function Navigation() {
  const [active, setActive] = useState(" Search for Dogs");

  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      to={item.link}
      style={({ isActive }) => ({
        color: isActive ? "var(--mantine-color-yellow-6)" : "#fffff",
        background: isActive
          ? "var(--mantine-color-green-8)"
          : "var(--mantine-color-green-9)",
      })}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <Group justify="space-between">
        {item.icon} {item.label}
      </Group>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <Box className={classes.navbarMain}>
        <Stack>{links}</Stack>
      </Box>

      <Box className={classes.footer}>
        <Footer />
      </Box>
    </nav>
  );
}
