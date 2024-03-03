import { CustomElemName  } from "./constant.js";
import { shuffleArr } from "./utils.js";

// HTML 태그를 상속해서 사용가능
export class GameBoard extends HTMLElement{
    #cards = [];
    


    #level = {
        easy: 2,
        medium: 4, 
        hard: 6,    
    }


    setLevel(level) {
      
    }
    
    

    #lock = false;
    #firstCard = null;
    #secondCard = null;

   async connectedCallback() {
        // shuffle card data
        // event
        console.log("game board is connected")
        /** 레벨에 따른 카드맞춰야하는갯수 설정해놓으면  나중에 버튼으로 상,중,하 난이도 버튼같은것도만들수있을것임*/ 
        const cardInfoList= await this.#fetchCardInfoList(this.#level.hard)
        this.classList.add("board");
        this.#cards = this.#createCards(cardInfoList);
        shuffleArr(this.#cards);
        this.append(...this.#cards);
        this.#bindEvents();
    }
    

    #bindEvents() {
        this.addEventListener("click", (event) => {
            // closest 함수는 가까운 애를 선택함
            const gameCard = (event.target.closest(CustomElemName.gameCard));

            if(!gameCard) return;
            this.#onClickCard(gameCard);

        })
    }

    #onClickCard(gameCard){
        if(this.#lock) return;

        if(this.$firstCard === gameCard) return;

        if(gameCard.isDisabled) return;

        this.#lock = true;
        gameCard.flip()

        if(!this.#firstCard) {
            this.#firstCard = gameCard;
            this.#lock = false;
            return;
        }
        this.#secondCard = gameCard;
        this.#checkForMatch();

    }

    #checkForMatch() {
        const isMatch = this.#firstCard.dataset.name === this.#secondCard.dataset.name

        if(isMatch) {
            this.#firstCard.disable();
            this.#secondCard.disable();

            this.#resetSelections();
            return;
        }

        setTimeout(() => {
            this.#firstCard.flip();
            this.#secondCard.flip();
            this.#resetSelections();
        }, 1200)
    }

 
    #resetSelections(){
        this.#firstCard = null;
        this.#secondCard = null;
        this.#lock = false;
    }

    #createCards(cardInfoList) {
        // 배열구조분해를 통해 카드갯수 뻥튀기 x2
        const cardList = [...cardInfoList, ...cardInfoList].map((cardInfo) => {
            const card = document.createElement(CustomElemName.gameCard)
            card.setAttribute("name", cardInfo.name);
            card.setAttribute("imagePath", cardInfo.imagePath);

            return card
        })
        return cardList
    }
    
    // 데이터를 불러올때 비동기적으로 처리해야함 
    // 순차적으로 코드가실행한다 = 동기적 그럼 그반대가 비동기적
    // async를 통해 비동기함수 fetch를 기다렸다가 response에 담을거임. 그동안 다른작업들은 병행적으로 알아서작업
    async #fetchCardInfoList(count) {
        const response = await fetch("./cardData.json")
        const cards = await response.json();
        // 0~ count갯수까지만
        return cards.slice(0, count);
    }


}


// 바닐라 js에서 웹 컴포넌트 사용법 (정의할 컴포넌트 이름, 생성한클래스)
// CustomElemName.gameBoard == game-board
customElements.define(CustomElemName.gameBoard, GameBoard)