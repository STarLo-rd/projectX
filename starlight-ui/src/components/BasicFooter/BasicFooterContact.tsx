import { Link } from "react-router-dom";

function BasicFooterContact() {
  return (
    <div className="flex flex-col items-center text-center sm:items-end sm:text-end">
      <h6 className="mb-2 text-xl font-semibold">Contact us</h6>
      <p className="mb-4 text-sm text-muted">
        For any inquires, support or question.
        <br /> Don&apos;t hastate to contact us!
      </p>
      <Link
        to="starlord.learn@gmail.com"
        className="link-primary font-semibold"
      >
        starlord.learn@gmail.com
      </Link>
    </div>
  );
}

export default BasicFooterContact;
