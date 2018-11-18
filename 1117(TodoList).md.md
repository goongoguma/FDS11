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

5. HandleAddList에서 form의 onSubmit에 입력할 함수 formSubmitChild를 만든다.

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

6. TodoList 컴포넌트에서 props로 받은 formSubmit 함수와 HandleAddList에서 생성한 formSubmitChild 함수를 연결시켜준다.

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

7. 전체삭제 버튼을 만들기 위해서는 부모 컴포넌트의 값을 수정하는 것이 되므로 부모 컴포넌트에서 함수를 만들어 자식에게 전달해줘야한다.

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

8. input의 입력가능 유무는 입력되는 함수를 생성한 부모인 TodoList 컴포넌트에서 설정하는게 좋다.

```js
formSubmit(list) {
    // 빈칸
    if (this.state.todoArr.indexOf(list) === 0) {
      alert("Please Enter valid text");
      // 중복
    } else if (this.state.todoArr.indexOf(list) > -1) {
      alert("This is already in the list");
      // 빈칸이 없으며 중복도 없음
    } else if (this.state.todoArr.indexOf(list) === -1) {
      this.setState(prevState => {
        return {
          todoArr: this.state.todoArr.concat(list)
        };
      });
    }
  }
```

9. 각 리스트의 삭제버튼을 설정하기 위해서는 부모인 TodoList 컴포넌트로 올라가서 함수를 만든 뒤 그 함수를 HandleLists에 전달, 다시 한번 HandleLists의 자식 컴포넌트인 HandleList 컴포넌트에게 전달하는것이 좋다. 또한 원본배열을 유지하기 위해 filter 메소드를 사용하여 내가 삭제할 요소를 제외한 나머지 요소들로 새로운 배열을 반환하는 함수를 만들어야 한다. 여기서 주의해아할 점은 HandleList가 받은 함수의 onClick은 화살표 함수로 작성되어야한다.

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

10. 빈칸 만들어주기

  * form을 submit한 후에 다시 input창을 비워주기 위해서 HandleAddList 컴포넌트의 state에 value를 추가하고 value의 값을 빈칸으로 만들어 준 뒤, 새 함수인      handleChange 함수를 만들어준다. 

  * handleChange 함수는 초기 state의 값을 바꿔주기 위해 setState 함수를 이용해 상태를 input의 입력 값(e.target.value)으로 설정한 뒤, input 태그에 onChange로 연결시켜준다. 이렇게 하면 사용자의 입력을 onChange가 감지하기 때문에 입력창에 글자가 업데이트 될 때마다 콘솔창에서도 글자가 동시에 업데이트가 된다. 

  * 그 후 form이 submit이 되면 value의 값이 다시 빈칸이 되야하기 때문에 form과 연결된 formSubmitChild 함수에 this.setState를 이용해 value의 값을 ''으로 다시 설정해준뒤 그 값을 받기 위해 input태그의 value를 this.state.value를 넣어준다.

```js
class HandleAddList extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmitChild = this.formSubmitChild.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      todo: "",
      value: ""
    };
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
    console.log(e.target.value);
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
      value: ""
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
            value={this.state.value}
          />
          <button>추가</button>
        </form>
      </div>
    );
  }
}
```
