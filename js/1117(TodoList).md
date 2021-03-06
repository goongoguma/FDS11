# 리액트로 Todo-List 만들어보기

- 구조

  - TodoList 컴포넌트 (전체부모 컴포넌트)
  - Title 컴포넌트 (헤더 컴포넌트)
  - Lists 컴포넌트 (목록 컴포넌트이면서 List의 컴포넌트)
  - List 컴포넌트 (Lists의 개별목록)
  - HandleAddList (할일추가 컴포넌트)

- 순서

  1. Title 컴포넌트에서 타이틀과 서브타이틀을 작성

  ```js
  const HandleTitle = props => {
    return (
      <div>
        <h1>{props.title}</h1>
        <h2>{props.subTitle}</h2>
      </div>
    );
  };
  HandleTitle.defaultProps = {
    title: "Todo-List",
    subTitle: "Put your life in the hands of a computer."
  };
  ```

  2. HandleAddList 컴포넌트에서 form을 작성해준 뒤 대략적인 Todo List화면 그려주기

  3. TodoList 컴포넌트의 state에 임의의 값이 들어있는 배열을 생성해준 뒤에 Lists에게 props으로 보내주기

  ```js
  class TodoList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        todoArr: ["A", "B", "C", "D"]
      };
    }
    render() {
      return (
        <div>
          <HandleTitle />
          <HandleLists todoArr={this.state.todoArr} />
          <HandleAddList />
        </div>
      );
    }
  }
  ```

  4. Lists 컴포넌트에서 부모 컴포넌트로 받은 배열을 map을 이용해 새 배열을 만든 뒤, 자식요소인 List 컴포넌트에 보내준 뒤에 화면에 출력결과 확인

  ```js
  class HandleLists extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <p>HandleLists</p>
          {this.props.todoArr.map(arr => (
            <HandleList key={arr} listText={arr} />
          ))}
        </div>
      );
    }
  }

  class HandleList extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <div>{this.props.listText}</div>; // A B C D
    }
  }
  ```

5. TodoList 컴포넌트에서 FormSubmit함수를 만든 뒤 인수를 넣어 HandleAddList 컴포넌트로 전달해주기

```js
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.state = {
      todoArr: ["A", "B", "C", "D"]
    };
  }

  formSubmit(list) {
    this.setState(prevState => {
      return {
        todoArr: this.state.todoArr.concat(list)
      };
    });
  }

  render() {
    return (
      <div>
        <HandleTitle />
        <HandleLists todoArr={this.state.todoArr} />
        <HandleAddList formSubmit={this.formSubmit} />
      </div>
    );
  }
}
```

6. HandleAddList에서 form의 onSubmit에 입력할 함수 formSubmitChild를 만든다.

```js
class HandleAddList extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmitChild = this.formSubmitChild.bind(this);
  }

  formSubmitChild(e) {
    e.preventDefault();
    const inputVal = e.target.elements.input.value;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmitChild}>
          <input type="text" name="input" />
          <button>추가</button>
        </form>
      </div>
    );
  }
}
```

7. TodoList 컴포넌트에서 props로 받은 formSubmit 함수와 HandleAddList에서 생성한 formSubmitChild 함수를 연결시켜준다.

```js
class HandleAddList extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmitChild = this.formSubmitChild.bind(this);
    this.state = {
      todo: undefined
    };
  }

  formSubmitChild(e) {
    e.preventDefault();

    const inputVal = e.target.elements.input.value;

    this.setState(prevState => {
      return {
        todo: this.props.formSubmit(inputVal)
      };
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmitChild}>
          <input type="text" name="input" />
          <button>추가</button>
        </form>
      </div>
    );
  }
}
```

8. 전체삭제 버튼을 만들기 위해서는 부모 컴포넌트의 값을 수정하는 것이 되므로 부모 컴포넌트에서 함수를 만들어 자식에게 전달해줘야한다.

```js
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.state = {
      todoArr: ["A", "B", "C", "D"]
    };
  }

  formSubmit(list) {
    this.setState(prevState => {
      return {
        todoArr: this.state.todoArr.concat(list)
      };
    });
  }

  deleteAll() {
    this.setState(() => {
      return {
        todoArr: []
      };
    });
  }

  render() {
    return (
      <div>
        <HandleTitle />
        <HandleLists todoArr={this.state.todoArr} deleteAll={this.deleteAll} />
        <HandleAddList formSubmit={this.formSubmit} />
      </div>
    );
  }
}

class HandleLists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.deleteAll}>전체삭제</button>
        {this.props.todoArr.map(arr => (
          <HandleList key={arr} listText={arr} />
        ))}
      </div>
    );
  }
}
```

9. input의 입력가능 유무는 입력되는 함수를 생성한 부모인 TodoList 컴포넌트에서 설정하는게 좋다.

```js
formSubmit(list) {
    // 빈칸
    if (!list) {
      alert("Please Enter valid text");
      // 중복
    } else if (this.state.todoArr.indexOf(list) > -1) {
      alert("This is already in the list");
    } else if (this.state.todoArr.indexOf(list) === -1) {
      this.setState(prevState => {
        return {
          todoArr: this.state.todoArr.concat(list)
        };
      });
    }
  }
```

10. 각 리스트 삭제버튼 생성하기

- 각 리스트의 삭제버튼을 생성하기 위해서는 부모인 TodoList 컴포넌트로 올라가서 함수를 만든 뒤 그 함수를 HandleLists에 전달한 뒤 다시 한번 HandleLists의 자식 컴포넌트인 HandleList 컴포넌트에게 전달하는것이 좋다.

- 원본배열을 유지하기 위해 filter 메소드를 사용하여 내가 삭제할 요소를 제외한 나머지 요소들로 새로운 배열을 반환하는 함수를 만들어야 한다. 여기서 주의해아할 점은 HandleList가 받은 함수의 onClick은 화살표 함수로 작성되어야한다. (일반함수의 this와 화살표 함수 this의 차이점 때문)

```js
// TodoList 컴포넌트 안에 작성한 뒤 HandleLists로 전달
deleteOne(listtoRemove) {
    this.setState(prevState => ({
      todoArr: prevState.todoArr.filter(list => {
        return listtoRemove !== list
      })
    }))
  }

  render() {
    return (
      <div>
        <HandleTitle />
        <HandleLists
          todoArr={this.state.todoArr}
          deleteAll={this.deleteAll}
          deleteOne={this.deleteOne}
        />
        <HandleAddList formSubmit={this.formSubmit} />
      </div>
    );
  }
}

class HandleLists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.deleteAll}>전체삭제</button>
        {this.props.todoArr.map(arr => (
          <HandleList key={arr} listText={arr} deleteOne={this.props.deleteOne}/>
        ))}
      </div>
    );
  }
}

class HandleList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.listText}
        <button onClick={() => this.props.deleteOne(this.props.listText)}>
          삭제
        </button>
      </div>
    );
  }
}
```

11. 빈칸 만들어주기

- todo의 값을 state에 넣어줌으로써 state를 진리의 유일한 원천 (single source of truth)“으로 만든다.

- 그 뒤 this.state.todo를 업데이트 할 함수 handleChange를 만들어주게되면 입력을 할 때마다 handleChange 가 동작하고 React state가 업데이트되므로, 표시되는 값은 사용자의 입력에 따라 업데이트된다.

- 버튼을 클릭하게 되면 input이 비어져야 함으로, 마지막으로 업데이트 되는 todo의 상태를 다시 빈칸으로 설정해줘야한다.

- 참고 : https://reactjs-org-ko.netlify.com/docs/forms.html에서 "제어되는 컴포넌트"

```js
class HandleAddList extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmitChild = this.formSubmitChild.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      todo: ""
    };
  }

  handleChange(e) {
    this.setState({
      todo: e.target.value
    });
  }

  formSubmitChild(e) {
    e.preventDefault();

    const inputVal = e.target.elements.todoinput.value.trim();

    this.setState(() => {
      return {
        todo: this.props.formSubmit(inputVal)
      };
    });
    this.setState({
      todo: ""
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmitChild}>
          <input
            type="text"
            name="todoinput"
            autoFocus={true}
            onChange={this.handleChange}
            value={this.state.todo}
          />
          <button>추가</button>
        </form>
      </div>
    );
  }
}
```
