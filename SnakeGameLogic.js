import {ROWS, COLS} from './config';

// NOTE: ROWS, COLS에는 행의 개수, 열의 개수가 저장되어 있습니다.
// 이 변수를 활용해서 코드를 작성하세요!


function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [{x: 4, y: 0}, {x: 3, y: 0}, {x: 2, y: 0}];
   // 먹이의 좌표
  this.fruit = {x: 3, y: 5};
  // '오른쪽' 버튼을 눌렀을 경우 SnakeGameLogic.prototype.right에 잇는 속성을 
  // 쓸 프로토타입이 필요
  this.makeHead
} 

SnakeGameLogic.prototype.up = function() {
  // 위쪽 화살표 키를 누르면 실행되는 함수
  // 위쪽화살표를 눌렀을때는 머리 기준으로 위에 새로 붙여준다
}

SnakeGameLogic.prototype.down = function() {
  // 아래쪽 화살표 키를 누르면 실행되는 함수
  this.makeHead = this.joints.pop()
  this.joints.unshift(this.makeHead);
  return this.joints.unshift(this.makeHead);s
  
  
}

SnakeGameLogic.prototype.left = function() {
  // 왼쪽 화살표 키를 누르면 실행되는 함수
  
}

SnakeGameLogic.prototype.right = function() {
  // 오른쪽 화살표 키를 누르면 실행되는 함수
  // 오른쪽 화살표 키를 누르면 머리를 기준으로 머리 오른쪽에 붙여주면된다
}

SnakeGameLogic.prototype.nextState = function() {
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  console.log(`nextState`);
  return true;
}

export default SnakeGameLogic;
