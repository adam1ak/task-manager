function SingleCard({task, onComplete ,onDelete}) {
    return (
        <div className="
            flex flex-col flex-grow justify-between
            min-w-64 max-w-80 h-64 
            py-6 px-4
            nunito-sans
            bg-[#323232]
            border-2 border-[#3F3F3F]
            rounded-3xl
        ">
            <div className="">
                <p>{task.title}</p>
                <p>{task.description}</p>
            </div>
            <div className="">
                <p>{task.date}</p>
                <div className="flex justify-between">
                    <button onClick={() => onComplete(task.id)} className={task.completed ? "cursor-default" : "cursor-pointer"}>{task.completed ? "Complete" : "Incomplete"}</button>
                    <div className="flex gap-2">
                        <button>edit</button>
                        <button onClick={() => onDelete(task.id)}>delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SingleCard;