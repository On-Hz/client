import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/public/logo_text.svg";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthModalStore, useAuthStore } from "@/shared/stores";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { PopperChildrenProps } from "@mui/material/Popper/BasePopper.types";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { SearchBar } from "../searchBar/ui/SearchBar";
import { authChannel, performLogout } from "@/shared/helpers";
import "./style.css";

export const Header: React.FC = () => {
  const { openAuthModal } = useAuthModalStore();
  const [open, setOpen] = React.useState(false);
  const { user } = useAuthStore();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //사용자 메뉴
  const toggleUserMenu = () => setOpen((prev) => !prev);

  //사용자 메뉴 닫기
  const closeUserMenu = (event?: MouseEvent | TouchEvent) => {
    if (
      event &&
      anchorRef.current &&
      anchorRef.current.contains(event.target as Node)
    ) {
      return;
    }
    setOpen(false);
  };

  //로그아웃
  const handleLogout = () => {
    performLogout(queryClient, "logout");
    authChannel.postMessage({ type: "LOGOUT" });
    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      if (anchorRef.current) {
        //`null` 체크 후 `focus()` 실행
        anchorRef.current.focus();
      }
    }
    prevOpen.current = open;
  }, [open]);

  const profileImageUrl = user?.profilePath
    ? `${import.meta.env.VITE_IMAGE_URL}${user.profilePath}`
    : null;

  return (
    <header className="border-b border-gray3 hz-header">
      <div className="flex items-center justify-between px-[20px] py-5 hz-header-inner">
        <Link to="/">
          <img src={logo} alt="On-Hz" className="w-[80px] hz-logo" />
        </Link>
        <div className="hz-menu">
          <nav className="flex items-center hz-nav">
            <SearchBar />
            {user ? ( //로그인
              <div className="flex items-center ml-4">
                <p className="text-[20px] pr-4 hz-user-name flex items-center">
                  <b className="block font-normal">{user.userName}</b>
                  <span className="text-[15px]">님</span>
                </p>
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={toggleUserMenu}
                  sx={{
                    width: "40px",
                    height: "40px",
                    minWidth: "auto",
                    border: "1px solid #d9d9d9",
                    borderRadius: "50%",
                    marginRight: "4px",
                    padding: "0",
                    overflow: "hidden",
                  }}
                >
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt={user.userName}
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
                    <PersonIcon
                      style={{ width: "100%", height: "100%" }}
                      className="text-gray3"
                    />
                  )}
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                  sx={{
                    zIndex: 1000,
                  }}
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
                        <ClickAwayListener onClickAway={closeUserMenu}>
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
                              onClick={() => {
                                closeUserMenu();
                                navigate(`/mypage/${user?.id}`);
                              }}
                            >
                              마이 페이지
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: "12px" }}
                              onClick={handleLogout} // ✅ 로그아웃 버튼 적용
                            >
                              로그아웃
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            ) : (
              //로그아웃
              <>
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
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
