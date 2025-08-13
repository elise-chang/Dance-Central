import React from "react";
import Button from "./button";


const Bookmark =  (data) => {
    const [time, setTime] = React.useState(data.time);
    // this idk what it does but it update the time
    const [bookmarkList, setBookmarkList] = React.useState([{id:0, time: 0, blocking: null}])
    const [bmid, setbmid] = React.useState(0);
    const [formationNum, setFormationNum] = React.useState(null);



    React.useEffect(() => {
        //confirm("curr list: " + JSON.stringify(bookmarkList));
        setTime(data.time);
        setbmid(bmid + 1);
        setFormationNum(null);
        if (bookmarkList.some(item => item.time === time)) {
           /* alert("This time stamp already has a bookmark");*/
            return;
        };
        const newBookmark = {id: bmid, time: time, blocking: formationNum};
        //confirm(JSON.stringify("new bm! " + newBookmark));
        setBookmarkList([...bookmarkList, newBookmark]);
        
    }, [data]);

    const handleClick = () => {
        
        //confirm("click " + time + " type: " + JSON.stringify(data));
    }

    const lockCurr = () => {
        alert("Locked :D");
    }

    const deleteCurr = () => {
<<<<<<< HEAD
        loopDel = confirm("Are you sure you want to delete?");
        while (loopDel) {
            loopDel = confirm("Are REALLY you sure you want to delete?");
        }
=======
        
>>>>>>> 8a90dee500066cdb78007e3316d09cb8be34ed01
    }
      

    return (
        <ul id="bookmark-box">
            {bookmarkList.map((b) => (
                <li className="bookmark-bg" id={b.id}>
                    <div className="bookmark-top">
                        <Button text={b.time}  onClick={handleClick} />
                    </div>
                    <div className="bookmark-bottom">
                        <Button text="delete" icon="🗑️" onClick={deleteCurr} />
                        <Button text="lock" icon="🔒" onClick={lockCurr} />
                    </div> 
                </li>
            ))}
        </ul>
    );
};

export default Bookmark;