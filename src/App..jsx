import {useState} from "react";

function App() {
    const [type, setType] = useState("expense")
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [list, setList] = useState([]);

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleChangeAmount = (event) => {
        setAmount(event.target.value);
    }
    const handleChangeType = (event) => {
        setType(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();


        // 입력된 3개의 state를 통해 list에 저장할 객체를 만들어야 함
        // 객체의 프로퍼티는 key : value 의 꼴이고
        // key 자리에 쓴건 string으로 자바스크립트 가 판단하고
        // value 자리에 쓴건 변수로 판단

        // list에 저장을 하기 전에,
        // '저장을 하지 말아야 될 조건' 탐색을 미리 진행해줘야 됨

        // 저장을 하지 말아야 할 조건 1
        // 숫자가 정삭적이어야 함. => 입력된 숫자가 + 값이어야 함


        const parseAmount = Number(amount);
        const parseTitle = title.trim();

        if (parseAmount <= 0 || parseTitle === "") {
            return;
        }

        // 저장을 하지 말아야 할 조건 2
        // 'title에 글자가 있어야 함'을 체크하기 위해
        // string 타입의 변수에 trim() 메서드를 쓸 수 있음


        const newRecord = {
            type: type,
            tittle: title,
            // amount(금액)은 input에서 들어올 때 string 으로 들어옴
            // 이걸 우리는 number 타입으로 변환해서 저장해야 함
            amount: parseAmount,
        };

        setList([...list, newRecord]);
        setTitle("");
        setAmount("");
        setType("expense");
    }


    const handleDelete = (index) => {
        // react는 state의 값을 감시해서 화면을 갱신하는데, 그 감시 대상은 stack 영역임
        // 그러니까 새로운 array를 만들어서 list를 갱신해줘야 함
        const newList = list.filter((item, i) => i !== index);
        setList(newList);
    }


    const totalIncome = list.reduce((sum, item) => {
        // type이 income인 것들의 합계
        // 함수 몸통에 써주는 내용을 하나의 요소가 빠져나온 상태의 식
        return item.type === "income" ? sum + item.amount : sum;

    }, 0);

    const totalExpense =list.reduce((sum, item) => {
        // type이 expense의 것들의 합계
        return item.type === "expense" ? sum + item.amount : sum;
    }, 0);

    const balance = totalIncome - totalExpense;

    return (
        <>
            <h2>가계부</h2>
            <fieldset>
                <lagend>내역 추가</lagend>
                <form onSubmit={handleSubmit}>
                    <select
                        // select는 사용자가 option을 선택함으로서
                        // 선택된 option의 value로 select의 value가 '변함'
                        onChange={handleChangeType}
                        value={type}
                    >
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
                {/* 조건부 랜더링 : list 요소가 없으면 안내 문구를 보여주도록 */}
                {list.length === 0 && (
                    <tr>
                        <td colSpan={4} style={{textAlign: "center"}}>
                            등록된 내역이 없습니다.
                        </td>
                    </tr>
                )}
                {list.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.type === "income" ? "수당" : "지출"}</td>
                            <td>{item.title}</td>
                            <td style={{
                                color: item.type === "income" ? "blue" : "red"
                            }}>
                                {item.type === "income" ? "+" : "-"}
                                {item.amount.toLocaleString()}
                            </td>
                            <td>
                                <button onClick={() => {
                                    // 해야 되는 일
                                    // list에서 index번호의 요소를 삭제
                                    handleDelete(index);
                                }}>삭제
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>

            {/*
            list라고 하는 array (state)를 가지고 하나의 값을 구하는 행위
            => list.redouce() => 얘의 코드가 길어지겠다.
            */}
            <h3>수입 : {totalIncome.toLocaleString()} 0원 / 지출 : {totalExpense.toLocaleString()}0원</h3>
            <h3>잔액 : {balance.toLocaleString()} 0원</h3>
        </>
    );
}

export default App;
