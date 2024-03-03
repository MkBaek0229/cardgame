import { CustomElemName } from "./constant.js"


export class StageRound extends HTMLElement {

    async connectedCallback() {
    //button 3개정도필요할듯
    this.classList.add("stageRound");
    
    const plusBtn = []
    plusBtn.push(this.#createButtons(1, "Easy Mode"));
    plusBtn.push(this.#createButtons(2, "Medium Mode"));
    plusBtn.push(this.#createButtons(3, "Hard Mode"));

    this.append(...plusBtn)

     // 버튼 클릭 이벤트에 대한 핸들러 등록
    // 버튼을 클릭할 때마다 해당 버튼의 stage 값을 전달하여 setLevel 메서드 호출
    plusBtn.map(btn => {
        btn.addEventListener("click", () => {
            this.#modsSelect(btn.dataset.stage);
        });
    });

     // 기본적으로 첫 번째 버튼(이지 모드)를 선택한 상태로 설정
    this.#modsSelect(1);

   
    }
  
    // 버튼만들기 함수
     #createButtons(stage, text) {
        // 동적으로 HTMl 생성
        const StageBtn = document.createElement("button")
        StageBtn.classList.add(`stageBtn${stage}`)
        StageBtn.textContent = text;
        StageBtn.dataset.stage = stage; // 각 버튼에 스테이지 정보를 추가

        return StageBtn; 
        }


    // eazy Mode event
    #modsSelect(stage) {
        const gameBoard = document.querySelector(CustomElemName.gameBoard);
        if (!gameBoard) {
            console.error("GameBoard not found");
            return;
        }
        switch(stage) {
            case "1":
                console.log("Easy Mode");
                // 이지 모드 설정 적용
                gameBoard.setLevel({ easy: 2 });
                break;
            case "2":
                console.log("Medium Mode");
                // 미디엄 모드 설정 적용
                gameBoard.setLevel({ medium: 4 });
                break;
            case "3":
                console.log("Hard Mode");
                // 하드 모드 설정 적용
                gameBoard.setLevel({ hard: 6 });
                break;
            default:
                console.error("Invalid stage");
        }

    }}

customElements.define(CustomElemName.stageRound, StageRound)