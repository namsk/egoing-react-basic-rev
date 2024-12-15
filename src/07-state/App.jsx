// import logo from "./logo.svg";
// import "./App.css";
import { useState } from "react";
import PropTypes from "prop-types";

function Header(props) {
  console.log("props", props.title);
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  onChangeMode: PropTypes.func,
};

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

Nav.propTypes = {
  topics: PropTypes.array,
  onChangeMode: PropTypes.func,
};

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

Article.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

function App() {
  //   const mode = "WELCOME";
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);

  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ];

  let content = null;
  if (mode === "WELCOME") {
    // Header를 클릭했을 때, 콘텐츠 변경
    content = <Article title="Welcome" body="Hello, Web"></Article>;
  } else if (mode === "READ") {
    // content = <Article title="HTML" body="Hello, READ"></Article>;
    //  title과 body를 topics에서 찾아서 넣어줌
    let title,
      body = null;

    // console.log("topics:", topics);
    // console.log("id:", id, typeof id);

    for (let i = 0; i < topics.length; i++) {
      let topic = topics[i];
      //   console.log("topic.id", topic.id, typeof topic.id);

      if (topic.id === Number(id)) {
        title = topic.title;
        body = topic.body;
        break;
      }
    }
    // console.log("title", title);
    // console.log("body", body);
    content = <Article title={title} body={body}></Article>;
  }
  return (
    <div className="App">
      <Header
        title="WEB"
        onChangeMode={() => {
          //   alert("Header");
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          //   alert(id);
          setMode("READ");
          setId(_id);
        }}
      ></Nav>
      {/* <Article title="Welcome" body="Hello, Web"></Article> */}
      {content}
    </div>
  );
}

export default App;
