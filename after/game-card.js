import { CustomElemName  } from "./constant.js";

export class GameCard extends HTMLElement{
   // #의 의미는 Private하다는 의미로 다른 클래스에서의 사용을막기위해 구분짓기위해붙임
   // 카드의 비활성화가 false로 카드는 뒤집힐수있음
    #isDisabled = false;

    // useEfeect()함수같은거 dom 연결시 곧바로 호출되는 connectedCallback 내장함수
    connectedCallback() {
        // 각각 div마다 card라는 클래스네임가지고있음
        this.classList.add("card")
        // cardData안의 name을가져옴
        this.dataset.name = this.getAttribute("name")

        // dom으로 HTML 동적생성
        const frontImg = document.createElement("img")
        frontImg.classList.add("front")
        frontImg.src = this.getAttribute("imagePath")
        
        const backImg = document.createElement("img")
        backImg.classList.add("back")
        backImg.src = "../img/question.svg";

        // 동적으로 생성한 HTML img태그들을 GameCard 자식요소로추가
        this.append(frontImg, backImg);
    }
    // 외부에서 isdisabled에 접근하고자할때 사용함 isDisabled의 상태값 (true or false)를 확인하고 보여줄떄사용
    get isDisabled() {
        return this.#isDisabled;
    }

    // class 이름을 add remove 따로해줄필요없이 toggle 하나로해결 있으면 빼고 없으면 넣어주고
    // before에서는 명확히 역할부여가되지않아 유지보수가 어려워 명확하게 add remove를 해줬지만 이젠 그럴필요가없음
    flip() {
        this.classList.toggle("flip");
    }

   // GameCard내부의 isDisabled를 비활성화시켜주기 위한 disable 함수
    disable() {
        this.#isDisabled = true;
    }
}

// 바닐라 js에서 웹 컴포넌트 사용법
// CustomElementName.gameCard == game-card
customElements.define(CustomElemName.gameCard, GameCard)