import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAction } from "../hooks/useAction";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import languages from "../localization/languages.json";

const pages = [
    { id: 1, name: "navbar_main_page", url: "/" },
    { id: 2, name: "navbar_news_page", url: "/news" },
    { id: 3, name: "navbar_weather_page", url: "/weather" },
];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    // localiation
    const { t, i18n } = useTranslation();

    const changeLanguageHandler = (lang) => {
        changeLanguage(lang.key);
        localStorage.setItem("lang", lang.key);
    };

    // отримання даних зі store
    const { isAuth, user } = useSelector((store) => store.authReducer);
    const { logout, switchTheme } = useAction();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const logoutHandler = () => {
        logout();
    };

    const switchThemeHandler = () => {
        switchTheme();
    };

    useEffect(() => {
        const langLocal = localStorage.getItem("lang");
        if (langLocal != null) {
            changeLanguage(langLocal);
        }
    }, []);

    return (
        // mui: sx == style
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <Link to={page.url} key={page.id}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            {t(page.name)}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Link to={page.url} key={page.id}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {t(page.name)}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={i18n.language}
                    >
                        {languages.map((lang) => (
                            <MenuItem
                                key={lang.key}
                                value={lang.key}
                                onClick={() => changeLanguageHandler(lang)}
                            >
                                {lang.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <DarkModeIcon
                        onClick={switchThemeHandler}
                        sx={{ cursor: "pointer" }}
                    />
                    {isAuth == false ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Link to="/login">
                                <Button sx={{ color: "white", mr: 2 }}>
                                    {t("navbar_signin")}
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button sx={{ color: "white", mr: 2 }}>
                                    {t("navbar_signup")}
                                </Button>
                            </Link>
                        </Box>
                    ) : (
                        <Box sx={{ flexGrow: 0 }}>
                            <Link to="/profile">
                                <Button sx={{ color: "white", mr: 2 }}>
                                    {user.email}
                                </Button>
                            </Link>
                            <Button
                                onClick={logoutHandler}
                                sx={{ color: "white", mr: 2 }}
                            >
                                {t("navbar_logout")}
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
