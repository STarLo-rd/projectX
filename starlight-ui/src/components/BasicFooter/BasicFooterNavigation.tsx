import { Link } from "react-router-dom";

function BasicFooterNavigation() {
  return (
    <div className="flex gap-24">
      <div>
        <h6 className="mb-2 text-xl font-semibold">Platform</h6>
        <div className="flex flex-col gap-2">
          {/* <Link className="link-primary" to="/demo">
            Try Demo
          </Link> */}
          <Link className="link-primary" to="/login">
            Log in
          </Link>
          <Link className="link-primary" to="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BasicFooterNavigation;
