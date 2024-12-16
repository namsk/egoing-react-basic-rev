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

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
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
//  Update 컴포넌트 추가
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          //   const title = event.target.title.value;
          //   const body = event.target.body.value;
          props.onUpdate(title, body); //  onUpdate 함수 호출
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {/* value와 onChange를 사용하여 title 상태를 관리 */}
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          ></textarea>
          {/* value와 onChange를 사용하여 body 상태를 관리 */}
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>
    </article>
  );
}
Update.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  onUpdate: PropTypes.func,
};
//  End: Upadate 컴포넌트 추가

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]);
  let content = null;
  let contextControl = null; //  Update 버튼을 표시하기 위한 변수
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
    //  READ 모드일 때만 Update 버튼을 표시
    contextControl = (
      <li>
        <a
          href={"/update/" + id}
          onClick={(event) => {
            event.preventDefault(); // 이벤트 기본 동작을 막음
            setMode("UPDATE"); // mode를 UPDATE로 변경
          }}
        >
          Update
        </a>
      </li>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    //  begin: READ 모드로부터 복사
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    //  end: READ 모드로부터 복사
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          console.log(title, body);
          const newTopics = [...topics];
          const updatedTopic = { id: id, title: title, body: body };
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === id) {
              newTopics[i] = updatedTopic;
              break;
            }
          }
          setTopics(newTopics);
          setMode("READ");
        }}
      ></Update>
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
      <li>
        <a
          href="/create"
          onClick={(event) => {
            event.preventDefault();
            setMode("CREATE");
          }}
        >
          Create
        </a>
      </li>
      {contextControl}
    </div>
  );
}

export default App;
