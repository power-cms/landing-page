const React = require("react");
const {
  VerticalTimeline,
  VerticalTimelineElement
} = require("react-vertical-timeline-component");
const {
  AtSign,
  Book,
  Briefcase,
  File,
  Layout,
  Truck,
  Maximize2,
  MessageSquare
} = require("react-feather");

const CompLibrary = require("../../core/CompLibrary.js");

const Container = CompLibrary.Container;

const iconStyle = { background: "#fff", color: "#29c1dd" };

function Roadmap(props) {
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Roadmap</h1>
            <VerticalTimeline layout="1-column" animate={false}>
              <VerticalTimelineElement
                className="refactor"
                date="May 2019"
                iconStyle={iconStyle}
                icon={<Truck />}
              >
                <h3 className="vertical-timeline-element-title">Command bus</h3>
                <h4 className="vertical-timeline-element-subtitle">Refactor</h4>
                <p>
                  Use command bus instead of using using evident command
                  handlers. It should help with creating much more generic
                  actions, and simplify commands injection.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="technical"
                date="May 2019"
                iconStyle={iconStyle}
                icon={<AtSign />}
              >
                <h3 className="vertical-timeline-element-title">
                  DI Decorators
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Technical
                </h4>
                <p>
                  Make DI configuration more friendly then it actuall is (100%
                  manual config). I'm not a big fan of decorators (I mean
                  annotations, not a decorator pattern itself), but as they are
                  a part of Typescript, I decided to use them to simplify the
                  creating application container.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="feature"
                date="May 2019"
                iconStyle={iconStyle}
                icon={<Layout />}
              >
                <h3 className="vertical-timeline-element-title">
                  Site service improvement
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Improvement
                </h4>
                <p>
                  There are some important changes to be applied to the site
                  service. Starting from the homepage type (prevented from
                  deleting), then validation path uniquenes, finishing on other
                  site types like contact page.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="feature"
                date="May 2019"
                iconStyle={iconStyle}
                icon={<File />}
              >
                <h3 className="vertical-timeline-element-title">
                  File service
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  New feature
                </h4>
                <p>
                  Create new microservice handling files management. It can be
                  used for user's avatars and site's logo.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="feature"
                date="May 2019"
                iconStyle={iconStyle}
                icon={<Book />}
              >
                <h3 className="vertical-timeline-element-title">
                  Blog service
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  New feature
                </h4>
                <p>
                  Blog module will be very important part of the PowerCMS - it's
                  must have in the CMS-es world. It should be light, but
                  suffitient enough to freely write any kind of blog texts.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="feature"
                date="May 2019"
                iconStyle={iconStyle}
                icon={<Briefcase />}
              >
                <h3 className="vertical-timeline-element-title">SEO service</h3>
                <h4 className="vertical-timeline-element-subtitle">
                  New feature
                </h4>
                <p>
                  SEO is a important for almost every kind of page. Every page
                  as well as every blog post should contain proper metadata and
                  og tags. Sitemap is also a nice to have feature.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="technical"
                date="May 2019"
                iconStyle={iconStyle}
                icon={<Maximize2 />}
              >
                <h3 className="vertical-timeline-element-title">
                  Scaling services
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Technical
                </h4>
                <p>
                  It would be cool, to have a ready to use solution for scaling.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="technical"
                date="May 2019"
                iconStyle={iconStyle}
                icon={<MessageSquare />}
              >
                <h3 className="vertical-timeline-element-title">
                  Better logs handling
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Improvement
                </h4>
                <p>
                  As for now the logs are just pushed to the stdout. PowerCMS
                  needs proper logs tracking, so ELK stack will be a prefered
                  solution. Also tracing should be handled.
                </p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </header>
        </div>
      </Container>
    </div>
  );
}

module.exports = Roadmap;
