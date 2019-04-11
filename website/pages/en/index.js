/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");
var ReactDOMServer = require("react-dom/server");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const { CameraOff, Lock, Terminal } = require("react-feather");
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const { readFileSync } = require("fs");
const { resolve } = require("path");
const ufo = readFileSync(resolve(process.cwd(), "static/img/ufo.svg"));
const rocket = readFileSync(resolve(process.cwd(), "static/img/rocket.svg"));

class HomeSplash extends React.Component {
  render() {
    const { siteConfig } = this.props;
    const { baseUrl } = siteConfig;

    const SplashContainer = props => <div className="homeContainer">{props.children}</div>;

    const Button = props => (
      <a className="button try-it-out" href={props.href} target={props.target}>
        {props.children}
      </a>
    );

    const Svg = props => <img src={`${baseUrl}img/${props.image}.svg`} alt="" className={props.className} />;

    const Galaxy = () => (
      <div className="galaxy">
        <div className="stars">
          {Array.from("x".repeat(40)).map((value, key) => (
            <div key={key} className="splash-star" />
          ))}
        </div>
        <Svg image="cloud" className="splash-cloud-4" />
        <Svg image="cloud" className="splash-cloud-1" />
        <Svg image="cloud" className="splash-cloud-2" />
        <Svg image="cloud" className="splash-cloud-3" />
        <Svg image="cloud" className="splash-cloud-5" />
        <Svg image="cloud" className="splash-cloud-6" />
        <Svg image="moon" className="splash-moon" />
        <div className="splash-ufo" dangerouslySetInnerHTML={{ __html: ufo }} />
        <div className="splash-rocket" dangerouslySetInnerHTML={{ __html: rocket }} />
        <Svg image="planet-1" className="splash-planet-1" />
        <Svg image="planet-2" className="splash-planet-2" />
      </div>
    );

    return (
      <SplashContainer>
        <Galaxy />
        <Button href="docs/getting-started">Try it out</Button>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const Svg = props => <img src={`${baseUrl}img/${props.image}.svg`} alt="" className={props.className} />;

    const Parts = () => (
      <Container padding={["bottom", "top"]} className="container-parts">
        <h2>Three building blocks</h2>
        <div className="boxes">
          <div key="api" className="box">
            <div className="box-title">
              <CameraOff /> Headless API
            </div>
            <div className="box-body">
              <p>The core of PowerCMS - standalone, headless API. Scalable, extendable and easy to use.</p>
              <a href={docUrl("getting-started.html")}>Read more</a>
            </div>
          </div>
          <div key="admin" className="box">
            <div className="box-title">
              <Lock /> Admin Panel
            </div>
            <div className="box-body">
              <p>
                Optional part of PowerCMS - ready to use admin panel, containing all current features. also extendable.
              </p>
              <a href={docUrl("admin-panel.html")}>Read more</a>
            </div>
          </div>
          <div key="api" className="box">
            <div className="box-title">
              <Terminal /> React kit
            </div>
            <div className="box-body">
              <p>Frontend package, containing all necessary components and containers, to build you frontend app.</p>
              <a href={docUrl("react-kit.html")}>Read more</a>
            </div>
          </div>
        </div>
      </Container>
    );

    const BuiltForDev = () => (
      <Container padding={["bottom", "top"]}>
        <Svg image="computer" className="bg-image-right" />
        <GridBlock
          layout="twoColumn"
          contents={[
            {
              title: "Built for Developers",
              content: ReactDOMServer.renderToString(
                <div className="text-block">
                  As every headless CMS - it's dedicated for developers, but works also out of the box. Code quality,
                  maintainability and latest technologies are always on the first place.
                </div>
              )
            },
            {}
          ]}
        />
      </Container>
    );

    const Microservices = () => (
      <Container padding={["bottom", "top"]} background="light">
        <Svg image="microservices" className="bg-image-left" />
        <GridBlock
          layout="twoColumn"
          contents={[
            {},
            {
              title: "Microservices architecture",
              content: ReactDOMServer.renderToString(
                <div className="text-block">
                  Microservices are very popular for their possibilities to scale, independency and flexibility. They
                  fit very well for the advanced, powerfull system, which is the PowerCMS.
                </div>
              )
            }
          ]}
        />
      </Container>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : "") + page;

      return (
        <Container padding={["bottom", "top"]} background="light">
          <GridBlock
            layout="oneColumn"
            contents={[
              {
                content: ReactDOMServer.renderToString(
                  <div className="productShowcaseSection paddingBottom">
                    <h2>Contributors</h2>
                    <p>You are very welcome to join our team:</p>
                    <div className="logos">{showcase}</div>
                    <div className="more-users">
                      <a className="button" href="https://gitter.im/power-cms-dev/community" target="_blank">
                        Contact us
                      </a>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </Container>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer homeMainContainer">
          <Parts />
          <Microservices />
          <BuiltForDev />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
