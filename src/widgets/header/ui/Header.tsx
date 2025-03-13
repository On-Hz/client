import React from "react";
import { Link } from "react-router-dom";
import logo from "/public/logo_tmp_text.svg";
import { useAuthModalStore } from "@/shared/stores";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { PopperChildrenProps } from "@mui/material/Popper/BasePopper.types";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import MenuIcon from "@mui/icons-material/Menu";
import "./style.css";

export const Header: React.FC = () => {
  const { openAuthModal } = useAuthModalStore();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <header className="border-b border-gray3 hz-header">
      <div className="flex items-center justify-between px-[20px] py-5">
        <Link to="/">
          <img src={logo} alt="On-Hz" className="w-[80px]" />
        </Link>
        <div className="hz-menu">
          <MenuIcon style={{ display: "none" }} className="hz-nav-icon" />
          <nav className="flex items-center hz-nav">
            <div className="hz-search mr-[24px] px-[12px] bg-gray2 rounded-[5px] w-[360px] h-[40px] text-[14px] flex items-center">
              <input
                className="w-full h-full bg-transparent"
                type="text"
                placeholder="검색어를 입력해주세요."
              />
              <button>{/* <SearchIcon /> */}</button>
            </div>
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              sx={{
                width: "40px",
                height: "40px",
                minWidth: "auto",
                border: "1px solid #d9d9d9",
                borderRadius: "50%",
                marginRight: "4px",
              }}
            >
              <PersonIcon
                style={{ width: "100%", height: "100%" }}
                className="text-gray3"
              />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {(props: PopperChildrenProps) => (
                <Grow
                  {...props.TransitionProps}
                  style={{
                    transformOrigin:
                      props.placement === "bottom-start"
                        ? "left top"
                        : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        sx={{
                          color: "#a1a1a1",
                        }}
                      >
                        <MenuItem
                          sx={{ fontSize: "12px" }}
                          onClick={handleClose}
                        >
                          마이 페이지
                        </MenuItem>
                        <MenuItem
                          sx={{ fontSize: "12px" }}
                          onClick={handleClose}
                        >
                          로그아웃
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <button
              className="hz-login text-black py-[10px] px-[12px] mr-[5px] text-[14px] transform hover:text-point transition-colors"
              onClick={() => openAuthModal("login")}
            >
              로그인
            </button>
            <button
              className="bg-black text-white border rounded-[5px] text-[14px] py-[10px] px-[12px] transform hover:bg-point transition-colors"
              onClick={() => openAuthModal("signup")}
            >
              회원가입
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
