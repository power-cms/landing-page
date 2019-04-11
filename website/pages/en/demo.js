const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const Container = CompLibrary.Container;

function Demo() {
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Demo</h1>
            <p>Everybody love demos! ❤️ Feel free to check this project live using following credentials:</p>
            <div>
              <strong>Content page:</strong>{" "}
              <a href="http://demo.power-cms.com" target="_blank" title="Content page">
                https://demo.power-cms.com
              </a>
            </div>
            <div>
              <strong>Admin panel:</strong>{" "}
              <a href="http://admin.power-cms.com" target="_blank" title="Admin panel">
                https://admin.power-cms.com
              </a>
            </div>
            <div>
              <strong>Login:</strong> Admin
            </div>
            <div>
              <strong>Password:</strong> admin
            </div>
          </header>
        </div>
      </Container>
    </div>
  );
}

module.exports = Demo;
