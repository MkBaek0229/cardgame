const cards = document.querySelectorAll(".card");

let firstCard, secondCard;

// 카드 뒤집힘 여부 판단
let hasFlippedCard = false;

let lockBoard = false;

// 카드섞어주기 shuffle

const orderList = [0, 1, 2, 3]

function shuffleArr(arr){
arr.forEach((_, index) => {
     // arr의 길이갯수만큼 숫자를 랜덤으로 추출 랜덤인덱스 변수에부여
    const randomIdx = (Math.floor(Math.random() * arr.length));
    // 원래의 인덱스와 <-> 랜덤인덱스를 바꿔버림 ex randomIdx = 1 0 3 2 
    // arr[1], arr[0] = arr[0] , arr[1]
    [arr[randomIdx], arr[index]] = [arr[index], arr[randomIdx]];
})
}

function shuffle() {
    shuffleArr(orderList)   
    cards.forEach((card, idx) => {
        card.style.order = orderList[idx];
    }) 
};

shuffle();

function disableCards() {
    // 두개의 카드 뒤집엇을때 동일하면 실행되는 함수임
    firstCard.removeEventListener("click" , flipCard);
    secondCard.removeEventListener("click" , flipCard);   
    
    resetBoard();
}   

function unflipCards() {
    // 두개의 카드뒤집혓을때 일치하지않으면 실행되는 함수임
    // 두개의 카드가 선택되서 뒤집혓을때 1.2초동안 다른카드선택불가능 그후에는 가능
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard = false;
    }, 1200);
}
   


function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null
    secondCard = null;
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name

    // 첫번째카드 == 두번째카드 일치하면 disableCards를 그렇지않으면 unflipCards를
   isMatch ? disableCards() : unflipCards();
}   
function flipCard() {
// 카드를 여러개 빨리클릭하거나 뒤집히면안되는상황을 방지하기 위한 LockBoard
 if (lockBoard) return;

// 같은 카드를 두번클릭하는걸 방지. 
 if (this === firstCard) return;

 // 위의 조건들에 걸리지않고 카드를 뒤집을수있는조건일때 다음과같이 실행
    // 클릭된 카드 == this에 classlist를 추가한다.
 this.classList.add("flip");
 // 뒤집힌 카드가 없다면 
 if(!hasFlippedCard) {
    // true로 지정해줌 그다음에는 이 if문을 거치지않음
    hasFlippedCard = true;
    // firstCard 변수에 클릭된 카드 this 할당
    firstCard = this;
    // return이 있어야 아래에있는 내용 실행 x
    return;
}   
//  두번째카드는 그대로놓여지거나 (일치해서) 다시 뒤집어지거나 둘중하나
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();

}
// foreach 함수를 이용해서 모든 .card 클래스요소에대해 이벤트함수 실행하기
cards.forEach(card => {
    card.addEventListener("click", flipCard)
})


