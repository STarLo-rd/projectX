import { Grid, theme } from "antd";
const { useToken } = theme;
const { useBreakpoint } = Grid;
export const useStyles = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const shouldDisplayOnMobile = screens.lg || screens.xs;
  return {
    avatarText: {
      color: screens.sm ? token.colorTextLightSolid : token.colorText,
      display: shouldDisplayOnMobile ? "block" : "none",
    },
    container: {
      margin: "0 auto",
      maxWidth: token.screenXL,
      padding: screens.md
        ? `0px ${token.paddingLG}px`
        : `0px ${token.padding}px`,
    },
    divider: {
      margin: 0,
    },
    header: {
      backgroundColor: token.colorBgContainer,
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      padding: `${token.paddingLG}px 0px`,
    },
    headerTitleWrapper: {
      alignContent: "end",
      alignItems: "flex-end",
      justifyContent: "space-between",
      width: "100%",
    },
    hideTabletDisplayMobile: {
      display: shouldDisplayOnMobile ? "block" : "none",
    },
    layout: {
      height: "720px",
    },
    logoWrapper: {
      padding: `${token.paddingLG}px 28px ${token.padding}px 28px`,
    },
    navbarContainer: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      margin: "0 auto",
      padding: `${token.paddingXS}px ${token.padding}px`,
    },
    navbarMobile: {
      backgroundColor: "#141414",
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      display: screens.sm ? "none" : "block",
    },
    navMenu: {
      backgroundColor: "transparent",
      border: 0,
      flexGrow: 1,
    },
    placeholder: {
      backgroundColor: token.colorBgLayout,
      border: `${token.lineWidth}px dashed ${token.colorBorder}`,
      borderRadius: token.borderRadiusLG,
      height: "100%",
      padding: token.paddingLG,
      textAlign: "center",
    },
    profileAvatar: {
      marginLeft: shouldDisplayOnMobile ? "0px" : "4px",
      right: shouldDisplayOnMobile ? "0px" : "8px",
    },
    profileMenu: {
      border: 0,
    },
    section: {
      backgroundColor: token.colorBgContainer,
      height: "100%",
      padding: `${token.sizeLG}px 0px`,
    },
    sider: {
      backgroundColor: "#141414",
      borderRight: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      display: screens.sm ? "block" : "none",
      flexDirection: "column",
    },
    siderContent: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    title: {
      fontSize: screens.lg ? token.fontSizeHeading2 : token.fontSizeHeading3,
      marginBottom: 0,
    },
  };
};
