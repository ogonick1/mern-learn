import './index.scss';

export const SignUp = () => {
  return (
    <div id="wrapper">
      <div className="form_div">
        <p className="form_label">SIGNUP FORM</p>
        <form method="post" action="">
          <p><input type="text" placeholder="Enter User Name" /></p>
          <p><input type="text" placeholder="Enter First Name" /></p>
          <p><input type="text" placeholder="Enter Last Name" /></p>
          <p><input type="email" placeholder="Enter Email" /></p>
          <p><input type="password" placeholder="**********" /></p>
          <p><button type="submit">SIGNUP </button></p>
        </form>
      </div>
    </div>
  );
};
