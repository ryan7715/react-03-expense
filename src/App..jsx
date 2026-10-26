import {useState} from "react";

function App() {
    const [type, setType] = useState("expense")
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleChangeAmount = (event) => {
        setAmount(event.target.value);
    }
    const handleChangeType = (event) => {
        setType(event.target.value); }



    // 입력된 3개의 state를 통해 list에 저장할 객체를 만들어야 함
    // 객체의 프로퍼티는 key : value 의 꼴이고
    // key 자리에 쓴건 string으로 자바스크립트 가 판단하고
    // value 자리에 쓴건 변수로 판단

    // list에 저장을 하기 전에,
    // '저장을 하지 말아야 될 조건' 탐색을 미리 진행해줘야 됨

    // 저장을 하지 말아야 할 조건 1
    // 숫자가 정삭적이어야 함. => 입력된 숫자가 + 값이어야 함


    const parseAmount = (number) => {
        event.preventDefault();
        if (parseAmount <= 0) {
            return;
        }

        // 저장을 하지 말아야 할 조건 2
        // 'title에 글자가 있어야 함'을 체크하기 위해
        // string 타입의 변수에 trim() 메서드를 쓸 수 있음
        if (!title.trim()) {
            return;
        }
        const newRecord = {
            type: type,
            tittle: title,
            // amount(금액)은 input에서 들어올 때 string 으로 들어옴
            // 이걸 우리는 number 타입으로 변환해서 저장해야 함
            amount: parseAmount,
        };

        setList( [... List, newRecord]);
        setTitle("");
        setAmount("");
        setType("expense");
    }


    return (
        <>
            <h2>간단 가계부</h2>
            <fieldset>
                <lagend>내역 추가</lagend>
                <form>
                    <select
                        // select는 사용자가 option을 선택함으로서
                        // 선택된 option의 value로 select의 value가 '변함'
                        onChange={handleChangeTitle}
                        value={type}>
                        <option value={"expense"}>지출</option>
                        <option value={"income"}>수입</option>
                    </select>
                    <input placeholder={"내용 (예: 점심, 월급"}
                           onChange={handleChangeTitle}
                           value={title}
                    />
                    <input
                        placeholder={"금액"}
                        type={"number"}
                        min={0}
                        onChange={handleChangeAmount}
                    />
                    <button type={"submit"}>추가</button>
                </form>
            </fieldset>
            <table
                border={1}
                cellPadding={10}
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "16px",
                }}>
                <thead style={{backgroundColor: "#f2f2f2"}}>
                <tr>
                    <th>구분</th>
                    <th>내용</th>
                    <th>금액</th>
                    <th>관리</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>지출</td>
                    <td>커피</td>
                    <td>-2000원</td>
                    <td><button>삭제</button></td>
                </tr>
                </tbody>
            </table>

            <h3>수입 : 0원 / 지출 : 0원</h3>
            <h3>잔액 : 0원</h3>
        </>
    );
}

export default App;
