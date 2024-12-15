// import logo from "./logo.svg";
// import "./App.css";

// function Header(props) {
// console.log("props:", props);
import PropTypes from "prop-types";

function Header({ title }) {
  return (
    <header>
      <h1>
        <a href="/">{title}</a>
      </h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

function Nav({ topics }) {
  console.log(topics);
  return (
    <nav>
      <ol>
        {/* <li>
                    <a href="/read/1">html</a>
                </li>
                <li>
                    <a href="/read/2">css</a>
                </li>
                <li>
                    <a href="/read/3">js</a>
                </li> */}
        {topics.map((topic) => (
          <li key={topic.id}>
            <a href={"/read/" + topic.id}>{topic.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
Nav.propTypes = {
  topics: PropTypes.array,
};

function Article({ title, body }) {
  return (
    <article>
      <h2>{title}</h2>
      {body}
    </article>
  );
}
Article.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];

  return (
    <div className="App">
      {/* title 프로퍼티에 따라 Header 컴포넌트의 제목이 변경 */}
      <Header title="REACT"></Header>
      {/* topics 배열을 Nav 컴포넌트에 전달 */}
      <Nav topics={topics}></Nav>
      {/* Article 컴포넌트에 title, body 프로퍼티 전달 */}
      <Article title="Welcome" body="Hello, Web"></Article>
    </div>
  );
}

export default App;

/* PropTypes
npm install prop-types
*/
