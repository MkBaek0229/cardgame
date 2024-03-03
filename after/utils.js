export function shuffleArr(arr){
    arr.forEach((_, index) => {
         // arr의 길이갯수만큼 숫자를 랜덤으로 추출 랜덤인덱스 변수에부여
        const randomIdx = (Math.floor(Math.random() * arr.length));
        // 원래의 인덱스와 <-> 랜덤인덱스를 바꿔버림 ex randomIdx = 1 0 3 2 
        // arr[1], arr[0] = arr[0] , arr[1]
        [arr[randomIdx], arr[index]] = [arr[index], arr[randomIdx]];
    })
    }
    