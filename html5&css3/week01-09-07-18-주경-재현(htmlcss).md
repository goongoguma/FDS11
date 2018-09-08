# 플렉스 박스

* 플렉스를 사용하기 위해서는 무조건 부모요소에 플렉스 컨테이너를 선언 (display: flex) 
* 직계 자식요소는 플렉스 아이템으로 선언됨
* flex에는 주축과 교차축이 있는데 주축은 중심이 되는 축(박스가 주축을 따라 배치가 된다) 
* 주축이 가로일 경우 교차축은 세로
* 주축이 세로일 경우 교차축은 가로

## 플렉스 아이템 배치방향 설정
* 플렉스 컨테이너에 flex-direction 선언
  * row : 박스를 왼쪽에서 오른쪽 (기본값)
  * row-reverse : 박스를 역뱡향으로 가로배치
  * column : 박스를 위에서 아래로 배치 (주축이 세로가 된다)
  * column-reverse : 박스를 역방향으로 세로배치

## 플렉스 아이템 여러 줄로 배치
* 플렉스 컨테이너에 flex-wrap 선언
  * nowrap : 박스를 한 줄로 배치 (기본값)
  * wrap : 박스를 여러 줄로 배치
  * wrap-reverse : 박스를 여러줄로 역박향 배치

## 주축 뱡향으로 배치
* 플렉스 컨테이너에 justify-content 선언
  * flex-start : 자식 박스를 부모 박스 주축의 시작점으로 배치 (기본값)
  * flex-end : 자식 박스를 부모 박스 주축의 끝점으로 배치
  * space-between : 빈공간이 있을 때 사용. 첫번째 박스와 마지막 박스는 양끝에 붙이고 나머지 박스는 동일하게 정렬
  * space-around : 빈공간이 있을 때 사용. 양 끝에 있는 박스에도 공간을 둔 채 자동 정렬.

## 교차축 방향으로 배치
* 플렉스 컨테이너에 align-items 선언
  * stretch : 박스를 확장, 배치 (기본값)
  * flex-start : 박스를 교차축 시작점에 배치
  * flex-end : 박스를 교차축 끝점에 배치
  * center : 박스를 교차축 중앙에 배치

## 교차축 방향 아이템 개별 배치
* 플렉스 아이템에 align-self 선언
  * auto : 플렉스 컨테이너의 align-items 속성값 상속받음. 상속값이 없을 경우 stretch 속성값이 적용
  * stretch
  * flex-start
  * flex-end
  * center

## 플렉스 아이템 배치 순서 바꾸기
* 플렉스 아이템에 order 선언
  * 0(기본값)
  * 정숫값 (숫자 순서대로 박스배치가 달라짐)

## 플렉스 아이템 사이즈 조절
* 플렉스 아이템에 flex 선언, 음수는 사용 불가
  * flex-grow : 플렉스 아이템 크기 증가
  * flex-shrink : 플렉스 아이템 크기 감소
  * flex-basis : 플렉스 아이템 기본 크기 설정
----
# 블록 레벨 태그 & 인라인 레벨 태그
  * 블록 레벨 태그 : p, h1 ~ h6, ul, ol, div, blockquote, form, hr, table, fieldset, address
  * 인라인 레벨 태그 : img, object, br, sub, sup, span, input, textarea, label, button
----

# box-sizing 속성
  * content-box : width 속성 값을 콘텐츠 영역 너비 값으로 사용
    * width: 300px, height: 150px인 content 박스의 콘텐츠의 width와 height는 300 x 150
  * border-box : width 속성 값을 콘텐츠 영역에 테두리까지 포함한 박스 모델 전체 너비 값으로 사용 
    * width: 300px, height: 150px인 border 박스의 콘텐츠의 width와 height는 236 x 86. (padding: 30px, border:2)

- [What is the difference between border-box and content-box?](https://stackoverflow.com/questions/44453391/what-is-the-difference-between-border-box-and-content-box-in-css)
----
# float를 clear하는 방법
* [float를 clear하는 4가지 방법](http://naradesign.net/wp/2008/05/27/144/)
----
# 마크업 순서 및 방법

* 콘텐츠 중심(논리적인 마크업) -> 시멘틱 마크업 -> 네이밍

* 테이블은 논리적인 순서를 지키기 어려움 

* 헤딩영역 : 로고, 텍스트 링크 모음, 메인 메뉴 (분석한 뒤 세세하게 분리) 

* 헤딩 마크업 (논리적인 순서) : 로고(h1) -> 텍스트 링크(a),ul,li) -> 메뉴 (nav,ul,li)
  * nav 요소는 주요 메뉴 하나에 써주는게 좋다
----
# VScode 단축키
* h1.logo>a[href='#']>img : h1안에 a와 img 생성
* ul.info>li*>a[href='#'] : ul안의 a가 있는 4개의 li 생성



<!-- 만약 button테그가 아닌 div테그로 버튼을 만든다면 키보드로 버튼을 사용이 불가능 

배치관련 모델 -> Box Model, flex, float, position, grid

internal style sheet, external style sheet

content-box / border-box : width에 padding값이 포함

margin은 투명하기 때문에 마진병합현상이 일어남 때문에 컨텐츠 사이에 동일한 간격을 만들기 위해 margin을 쓰는게 좋을때가 있음 

플렉스를 사용하기 위해서는 무조건 부모요소에 플렉스 컨테이너를 선언 -> 직계 자식요소는 플렉스 아이템으로 선언됨

flex의 direction에 따라 메인축과 교차축이 달라짐 (flex-direction 중요), 부모가 아이템보다 클 때 그 안에서 정렬된다

justify-content (메인축 정렬)

align-items (교차축 정렬)

flex-order / flex-grow / flex-shrink

선택자들의 우선순위를 알아야함 (cascading 규칙)

!important의 사용은 자제해야한다.

align-items vs align-self

align-content (줄바꿈)

clear는 강제 마진추가기능이 들어있음 또한 반드시 block 속성에만 사용가능

태그에 따라 block요소가 달라진다 (span -> inline-block일때 사용)

inline과 그냥 block의 성격 알기

:before, :after -> inline박스

float을 클리어하는 네가지 방법 http://naradesign.net/wp/2008/05/27/144/






absolute는 상위요소의 position값을 기준으로 설정된다 

element selector -> 1점
class selector -> 100점
id selector -> 1000점
Inner selector -> 10000점 (구체성 점수)
 -->
