"use client";

// Polls.jsx

import { useRouter } from "next/navigation"
import { useEffect } from "react";
import PollVote from "./pollVote";

type Poll = {
    id: Number,
    description: String,
    title: String,
    item1: String | null,
    item2: String | null,
    item3: String | null,
    item4: String | null,
    item5: String | null,
    item6: String | null,
    item7: String | null,
    item8: String | null,
    item9: String | null,
    item10: String | null
};

function Polls() {
    const router = useRouter();

    // Retrieve data from localStorage
    const userName = localStorage.getItem('userName');
    const polls: (Poll)[] = JSON.parse(localStorage.getItem('polls') || "") || [];

    // Redirect to login if data is missing
    useEffect(() => {
        if (!userName || polls.length === 0) {
            router.push('/')
        }
    }, [userName, polls, router]);

    // Handle button click for each poll
    const handlePollClick = (pollId: any) => {
        console.log(`Poll ID: ${pollId}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('polls');
        router.push('/')
    };
    let poll_options: Map<String, (String)[]> = new Map()
    for (let i = 0; i < polls.length; i++) {
        let options: (String)[] = []
        if (polls[i].item1 != null) {
            options.push(polls[i].item1 || "")
        }
        if (polls[i].item2 != null) {
            options.push(polls[i].item2 || "")
        }
        if (polls[i].item3 != null) {
            options.push(polls[i].item3 || "")
        }
        if (polls[i].item4 != null) {
            options.push(polls[i].item4 || "")
        }
        if (polls[i].item5 != null) {
            options.push(polls[i].item5 || "")
        }
        if (polls[i].item6 != null) {
            options.push(polls[i].item6 || "")
        }
        if (polls[i].item7 != null) {
            options.push(polls[i].item7 || "")
        }
        if (polls[i].item8 != null) {
            options.push(polls[i].item8 || "")
        }
        if (polls[i].item9 != null) {
            options.push(polls[i].item9 || "")
        }
        if (polls[i].item10 != null) {
            options.push(polls[i].item10 || "")
        }
        poll_options.set(polls[i].id.toString(), options);
    }
    return (
        <div>
            {userName && (
                <>
                    <br></br><h1>Welcome, {userName}!</h1><br></br>
                    <h2>Your Polls</h2>
                    {polls.length > 0 ?
                        <>
                            {polls.map((poll: Poll) => (

                                <><button
                                    key={poll.id.toString()}
                                    // onClick={() => handlePollClick(poll.id)}
                                    style={{ display: 'block', margin: '10px 0' }}
                                >
                                    {poll.title}
                                </button>
                                    <br></br>
                                    <PollVote options={poll_options.get(poll.id.toString()) || []} question={poll.description} pollId={poll.id} />
                                    <br></br>
                                </>
                            ))}
                            <br></br>
                        </>
                        :
                        <p>No polls available</p>
                    }

                    <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>        </>
            )
            }
        </div >
    );
}

// Polls.jsx (add this function and button for logout)



export default Polls;