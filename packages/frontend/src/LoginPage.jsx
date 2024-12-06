const LoginPage = () => {
  return (
    <div className="user-page">
      <div className="user-wrapper">
        {/* Login Form */}
        <div className="user-left">
          <h1>Login</h1>
          <p>For Existing Members</p>
          <form id="login-form" action="/pomodoro">
            <label htmlFor="login-name">Username</label>
            <input type="text" id="login-name" name="name" required />

            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" name="password" required />

            <input type="submit" value="Submit" />
          </form>
        </div>

        {/* Signup Form */}
        <div className="user-right">
          <h1>Sign Up</h1>
          <p>For New Members</p>
          <form id="signup-form" action="/signup-handler" method="POST">
            <label htmlFor="signup-name">Username</label>
            <input type="text" id="signup-name" name="name" required />

            <label htmlFor="signup-password">Password</label>
            <input type="password" id="signup-password" name="password" required />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
