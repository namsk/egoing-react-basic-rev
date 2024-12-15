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

//  Create 컴포넌트 추가
function Create({ onCreate }) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          //  폼 전송 이벤트를 정의
          event.preventDefault(); //  기본 동작을 막음
          const title = event.target.title.value;
          const body = event.target.body.value;
          onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}
Create.propTypes = {
  onCreate: PropTypes.func,
};

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);

  //   const topics = [
  //     { id: 1, title: "html", body: "html is ..." },
  //     { id: 2, title: "css", body: "css is ..." },
  //     { id: 3, title: "javascript", body: "javascript is ..." },
  //   ];
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]);
  const [nextId, setNextId] = useState(4);

  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, Web"></Article>;
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          setTopics([...topics, newTopic]);

          //    작성 후 읽기 페이지로 이전
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  }
  return (
    <div className="App">
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("READ");
          setId(_id);
        }}
      ></Nav>
      {content}
      <a
        href="/create"
        onClick={(event) => {
          event.preventDefault(); //  이벤트의 기본 동작을 막음
          setMode("CREATE"); //  mode를 CREATE로 변경
        }}
      >
        Create
      </a>
    </div>
  );
}

export default App;
