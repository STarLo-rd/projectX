import { useState } from "react";
import Container from "../Container";
import { Button, Menu, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item key="login">
        <Button type="link" onClick={() => console.log("Login clicked")}>
          Login
        </Button>
      </Menu.Item>
      <Menu.Item key="features">
        <Button type="link" onClick={() => console.log("Features clicked")}>
          Features
        </Button>
      </Menu.Item>
      {/* Add more menu items as needed */}
    </Menu>
  );

  return (
    <header className="border-b border-gray-200 bg-gray-100 p-4">
      <Container className="flex items-center justify-between">
        <img
          src=""
          alt="logo"
          // variant="black"
          className="h-12 w-auto lg:h-16"
        />
        <div className="hidden lg:flex items-center gap-8">
          <Button type="link" onClick={() => console.log("Login clicked")}>
            Login
          </Button>
          <Button type="link" onClick={() => console.log("Features clicked")}>
            Features
          </Button>
          {/* Add more navigation items as needed */}
        </div>
        <div className="lg:hidden">
          <Button type="text" onClick={() => setShowMenu(!showMenu)}>
            <MenuOutlined />
          </Button>
        </div>
      </Container>
      {showMenu && (
        <Container className="lg:hidden">
          <Menu mode="vertical">
            <Menu.Item key="login">
              <Button type="link" onClick={() => console.log("Login clicked")}>
                Login
              </Button>
            </Menu.Item>
            <Menu.Item key="features">
              <Button type="link" onClick={() => console.log("Features clicked")}>
                Features
              </Button>
            </Menu.Item>
            {/* Add more menu items as needed */}
          </Menu>
        </Container>
      )}
    </header>
  );
}

export default Navbar;
