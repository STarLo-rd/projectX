/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  // Breadcrumb,
  Button,
  ConfigProvider,
  Divider,
  Drawer,
  Grid,
  Layout,
  Menu,
  // Space,
  theme,
  Image,
  notification,
  Progress,
} from "antd";
import {
  LogoutOutlined,
  MenuOutlined,
  // ScanOutlined,
  UserOutlined,
  HomeOutlined,
  DeploymentUnitOutlined,
  ForkOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import {  Outlet, useNavigate } from "react-router-dom";
import { useStyles } from "./styles";
// import { authRoutes } from "../../routes";
import { useAuth } from "../../hooks/auth-context";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Sider, Content } = Layout;
// const { Text, Title } = Typography;

export default function AppShell() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, credit } = useAuth();
  const [collapsed, setCollapsed] = useState(true); // State to manage the collapse
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setCollapsed(true);
  }, []);

  /**
   * Antblocks CSS
   */
  const styles: any = useStyles();

  /**
   * Overrinding Antblocks CSS
   */
  styles.layout.height = "auto";
  styles.layout.minHeight = "100vh";
  styles.container.margin = "0px 0px 5px 45px";
  styles.container.padding = "0px";
  styles.container.maxWidth = "100vw";

  const items = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => navigate("/"),
    },
    {
      key: "userprofile",
      icon: <UserOutlined />,
      label: "User Profile",
      onClick: () => navigate("/userprofile"),
    },
    {
      key: "roadmap",
      icon: <ForkOutlined />,
      label: "Roadmap",
      onClick: () => navigate("/roadmap"),
    },
    {
      key: "news",
      icon: <GlobalOutlined />,
      label: "News",
      onClick: () => navigate("/news"),
    },
    {
      key: "explain-topic",
      icon: <DeploymentUnitOutlined />,
      label: "Explain Topic",
      onClick: () => navigate("/explain-topic"),
    },
  ];

  const profileMenuItems = [
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.clear();
        window.location.replace("/");
        notification.info({
          message: "You have been logged out successfully!",
        });
      },
    },
  ];

  /**
   * Dynamic Breadcrumb Functionality
   */
  // const pathSnippets = location.pathname.split("/").filter((i) => i);
  // const breadcrumbItems = pathSnippets.map((snippet, index) => {
  //   const path = `/${pathSnippets.slice(0, index + 1).join("/")}`;
  //   const pathConfig = authRoutes.find((route) => route.path === path);
  //   return {
  //     title: pathConfig ? (
  //       <Link to={path}>{pathConfig.breadcrumbName}</Link>
  //     ) : (
  //       <Link to={path}>{snippet}</Link>
  //     ),
  //   };
  // });
  const mobileMenuItems = items.concat(profileMenuItems);

  const menus = (
    <>
      <Menu
        theme={screens.sm ? "dark" : "light"}
        mode="inline"
        style={styles.navMenu}
        // defaultOpenKeys={["Popcodes"]}
        items={items}
      />
      <Divider style={styles.divider} />
    </>
  );
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            darkSubMenuItemBg: "rgba(255, 255, 255, 0.02)",
            darkItemBg: "transparent",
          },
        },
      }}
    >
      <Layout style={{ ...styles.layout, background: "black" }}>
        <Sider
          className="sku-panel-sidebar bg-gray-900 text-white flex flex-col"
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            height: "100vh",
            position: "sticky",
            top: 0,
            left: 0,
            background: "black",
          }}
          width={screens.md ? 250 : 80} // Set the width based on screen size
          theme="dark"
          breakpoint="lg"
          collapsible
          collapsedWidth={screens.md ? 80 : 0} // Set the collapsed width based on screen size
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="p-4">
                <Image
                  preview={false}
                  src="/src/assets/logo.png"
                  style={{ height: 100, width: 150, objectFit: "contain" }}
                  alt="innovateEdu Logo"
                />
              </div>
              {menus}
            </div>
            <div className="p-4">
              <div>
                <div className="flex flex-col items-center">
                  {user && (
                    <div className="text-center w-full">
                      {!collapsed && (
                        <h3 className="text-lg font-bold mb-2">SiriusWay</h3>
                      )}
                      <div className="p-1.5">
                        <div className="flex flex-wrap justify-around">
                          <p className="text-gray-500 mb-1">credit remaining</p>
                          <p>{credit}</p>
                        </div>
                        <Progress
                          percent={(credit / 100) * 100}
                          strokeColor={{ from: "#108ee9", to: "#87d068" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Menu
                theme="dark"
                mode="inline"
                items={profileMenuItems}
                className="bg-gray-800 rounded-md"
              />
            </div>
          </div>
        </Sider>
        <Layout>
          <div style={styles.navbarMobile}>
            <div style={styles.navbarContainer}>
              <Button
                type="text"
                icon={
                  <MenuOutlined style={{ color: token.colorTextLightSolid }} />
                }
                onClick={showDrawer}
              />
              <Drawer
                title="Menu"
                placement="right"
                onClose={onClose}
                open={open}
              >
                <Menu
                  theme={screens.sm ? "dark" : "light"}
                  mode="inline"
                  style={styles.navMenu}
                  items={mobileMenuItems}
                  onClick={onClose}
                />
                <div>
                  <div className="flex flex-col items-center">
                    {user && (
                      <div className="text-center w-full">
                        <h3 className="text-lg font-bold mb-2">SiriusWay</h3>

                        <div className="p-1.5">
                          <div className="flex flex-wrap justify-around">
                            <p className="text-gray-500 mb-1">
                              credit remaining
                            </p>
                            <p>{credit}</p>
                          </div>
                          <Progress
                            percent={(credit / 100) * 100}
                            strokeColor={{ from: "#108ee9", to: "#87d068" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
          {/* <div style={styles.header}>
            <div style={styles.container} className="sku-panel_breadcrumb">
              <Breadcrumb separator="/" items={breadcrumbItems} />
              <Space
                size="middle"
                direction="horizontal"
                style={styles.headerTitleWrapper}
              >
                <Space direction="vertical">
                  {location.pathname === "/" ? (
                    <Title style={styles.title}>Home</Title>
                  ) : location.pathname === "/userprofile" ? (
                    <Title style={styles.title}>User Profile</Title>
                  ) : location.pathname === "/roadmap" ? (
                    <Title style={styles.title}>Roadmap</Title>
                  ) : location.pathname === "/news" ? (
                    <Title style={styles.title}>News</Title>
                  ) : location.pathname === "/explain-topic" ? (
                    <Title style={styles.title}>Explain Topic</Title>
                  ) : (
                    <Title style={styles.title}>Home</Title>
                  )}
                </Space>
              </Space>
            </div>
          </div> */}
          <Content>
            <div>
              <div>
                <Outlet />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
