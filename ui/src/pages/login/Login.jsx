import './index.scss';

export const Login = () => {
  return (
    <div id="wrapper">
      <div className="form_div">
        <p className="form_label">LOGIN FORM</p>
        <form method="post" action="">
          <p><input type="email" placeholder="Enter Email" /></p>
          <p><input type="password" placeholder="Enter Password" /></p>
          <p><button type="submit">LOGIN </button></p>
        </form>
      </div>
    </div>
  );
};
