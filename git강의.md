# 수업 내용

## git 기본
* Documents로 이동
* dev2파일 생성 (mkdir dev2)
* react-sample 파일 생성
* react-sample 경로로 이동 뒤 git --version git의 version 확인
* git init
* git status로 initialize 절차 확인
* touch로 파일을 만든 뒤 vi를 사용해서 vim으로 진입
* vim에서 i를 눌러 insert모드, esc를 누르면 노멀모드로 바뀜
* shift + :로 명령모드 활성 (: 숫자 -> '열 바꾸기')
* :wq로 저장 뒤 나가기, q!는 저장하지않고 나가기
* 나간뒤 cat을 사용하면 bash창에 내용 vim내용 확인가능 (ex. cat README.md)
* git status로 상태확인
* gt remote add 별명 주소
* git remote으로 별명 확인 가능 / git remote get-url 별명으로 주소 불러올 수 있음
* git remote remove 별명으로 별명 제거
* git config --global core.editor 'vim'으로 bash의 기본 에디터를 vim으로 설정할 수 있음
* git config --list로 등록해놓은 모든 옵션을 확인 가능
* git commit으로 vim에서 커밋 메세지 작성가능
* 머릿말 문서작업 Doc, 기능추가 및 수정 Feat으로 머릿말 사용, 환경설정 Conf 첫줄은 제목 그 이후로는 문장형으로 내용 작성(내용은 쌍따옴표로 열고 닫는다.)
* 진유림님의 git 커밋 메세지 작성법 읽어보기
* 레포 하나당 파일의 크기는 2기가
* Initialize this repository with a README 라이센스에서 GPL조심하기 (저작권)
* 새로운 레포를 만들고 react-sample에 나가 새로운 파일을 만든뒤에 그 안에서 레포를 클론하기
* 그 폴더에 들어가 vi .gitignore
* 노드 프로젝트로 gitignore를 만들면 항상 node_modules가 있다. (git push에 제외되는 리스트)
* i를 누른 뒤 gitignore의 리스트를 추가 및 삭제할 수 있다. (hidden/은 숨겨진 모든 파일 그리고 *.py는 확장자가 .py는 파일들)
* git에 업로드 할 때에는 하나하나 잘라서 올리는게 좋다.
* git merge를 할 때 하나하나 완벽하게 동작하는 코드를 작성해서 올려야 한다.

## Branch
* add와 commit은 동시에 하는 행동은 지양한다.
* git branch의 모든 명령들은 git branch안에 존재한다. (git branch -a은 branch의 상황을 보여주는 통합 명령어)
* 새로운 branch을 생성하는 명령어 : git branch branch의 이름
* branch의 분기점이 생성되는 상황: 생성된 branch에 위에 분기점이 생긴다.
* 특정 branch로 돌아가기 위한 명령어 checkout : git checkout branch의 이름
* 새로운 branch로 바꾼뒤 파일을 수정한뒤 git add, commit -m,
* git checkout master로 branch를 바꾼뒤에 확인한다.
* 변화를 주기 전 시점이기 때문에 master의 파일은 변함이 없다. 
* branch에서 수정했던 내용을 master에 병합시키기 위해 git merge branch이름을 한다.
* 그런뒤 vi를 다시 켜보면 내용 branch에서의 내용이 master와 합쳐져있다.
* branch를 삭제하는 명령어 : git branch -D branch이름
* merge 한 다음에 다시한번 push를 해줘야한다.
* git repo에 insight Network에서 과거로 돌아갈 수 있다. 돌아가고자 하는 시간대에서 commit 옆에 있는 번호들을 복사한뒤 터미널로 돌아가서 git checkout 복사한값을 넣어주면 된다 
* git checkout -b <new-branch-name>의 뜻은 미래에 이미 일이 일어났기 때문에 그것에 영향을 주지 않기 위해 새로운 branch를 생성하라는 뜻이다.
* 되돌아간 상태에서 git branch
* 그 상태에서 git checkout -b branch이름을 써준뒤 다시 vi로 들어가 편집
* git status로 상태확인뒤 vi로 내용수정
* 그 branch위에서 add commit push
* hotfix는 긴급하게 수정해야할 경우, master에서 바로 변화를 줘야할 경우 사용
* conflict : 마스터와 branch의 내용이 충돌하는 경우 
* conflict 상황이 발생했을 경우 필요한 하나의 내용만 남기고 나머지는 지운다 (conflict 상황이 발생했을 때 생성된 부호들 다 지워야한다.)

## 협업하는법
* 상대방의 레포를 방문해서 포크하기
* 포크한 레포의 주소를 복사하기
* 복사한 주소를 git clone으로 받기
* branch를 새로 만들기
* git checkout 새로만든branch(develop)
* 다시 git branch feature/branch이름(branch의 이름은 내용이 잇어야한다.)
* git checkout에서 feature/branch branch로 branch 이동
* 내용 수정 
* git add, commit, push (push할때는 그 위에있는 branch로)
* feature/branch위에 있는 branch(develop)로 이동
* feature에 잇던 내용을 branch(develop)로 merge 시키기
* master에 있던 내용들을 branch(develop)을 merge 시키기 (절대 원본 maste에 merge 해주는게 아니다)
* 원본의 master에 복사된 master의 복사본을 merge 시키기
* 대상이될 원본 저장소에는 master복사본과 develop을 만들어놓고 각자 가지고있어야한다. 

## 협업 정리
* 상대방의 레포를 포크
* 터미널에서 포크한 파일로 들어가기
* 터미널로 들어가면 branch가 master밖에 없음
* develop이란 새로운 branch 생성
* develop으로 branch를 옮긴뒤 다시 feature branch 생성
* feature에서 내용 수정
* 기존 feature에서 feature로 push (github branch에 push하기위해)
* develop으로 올라가서 develop과 feature를 merge한뒤 push(github)
* master로 올라간 뒤에 develop을 merge한뒤 원래의 master로 push
* 상대방이 push한 내용을 확인하기 위해 Pull Request로 들어간 뒤 new pull request들어가기
* 중요한건 push를 하기전에 branch의 위치를 확인해야 한다.