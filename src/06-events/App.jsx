// import logo from './logo.svg';
// import './App.css';

import PropTypes from "prop-types";

// function Header(props) {
function Header({ title, onChangeMode }) {
  //   console.log("props", props.title);
  console.log("title:", title);
  //    타이틀을 클릭하면 페이지가 새로고침되지 않도록 이벤트를 추가

  const handleChangeMode = (event) => {
    event.preventDefault();
    onChangeMode();
  };

  return (
    <header>
      <h1>
        {/* <a
          href="/"
          onClick={(event) => {
            event.preventDefault(); //  기본 동작을 막음
            props.onChangeMode();
          }}
        > */}
        <a href="/" onClick={handleChangeMode}>
          {title}
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
            props.onChangeMode(event.target.id);
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

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ];

  return (
    <div className="App">
      {/* Header의 제목을 누르면 alert 창이 뜨도록 함 */}
      <Header
        title="WEB"
        onChangeMode={function () {
          alert("Header");
        }}
      ></Header>
      {/* Nav의 각각의 타이틀을 누르면 alert 창이 뜨도록 함 */}
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          alert(id);
        }}
      ></Nav>
      <Article title="Welcome" body="Hello, Web"></Article>
    </div>
  );
}

export default App;
