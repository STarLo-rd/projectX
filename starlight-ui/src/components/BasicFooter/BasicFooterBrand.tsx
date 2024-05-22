import classNames from "classnames";
import { Link } from "react-router-dom";
// import StockedUpLogo from '../StockedUpLogo';

function BasicFooterBrand() {
  return (
    <Link
      to="/"
      className={classNames(
        "flex flex-col items-center pb-8",
        "text-xs text-muted"
      )}
    >
      <img className="h-28 object-contain" src="/src/assets/logo.png" alt="logo"   />
      Knowledge platform
    </Link>
  );
}

export default BasicFooterBrand;
