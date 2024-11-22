"use client;"

import axios from "axios"
import { useRouter } from "next/navigation";

type Data = { options: (String)[], question: String, pollId: Number }

export default function PollVote(data: Data) {
    const options = data.options;
    const question = data.question;
    const pollId = data.pollId

    function vote(id: Number, pollId: Number) {
        const formData = new FormData();

        formData.append("userId", localStorage.getItem("userID") || "")
        formData.append("pollId", pollId.toString());
        formData.append("date", (new Date()).toString())
        formData.append('answer', id.toString())
        axios.postForm(
            "https://pkotowski.pythonanywhere.com/answers",
            formData
        ).then(
            response => {
                console.log(response.data.message)
            }
        )
    }

    const router = useRouter();

    // return <>test</>

    return <>

        {question}

        {options.map((opt: String, ind: Number) => (
            <div>
                {console.log(opt)}
                <button
                    onClick={() => vote(ind, pollId)}
                // style={{ display: 'block', margin: '10px 0' }}
                >
                    {opt}
                </button >
                <br></br>
            </div>
        )
        )
        }


    </>



}

