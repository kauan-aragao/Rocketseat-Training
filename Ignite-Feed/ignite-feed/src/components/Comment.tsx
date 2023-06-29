import { ThumbsUp, Trash } from "phosphor-react"
import React from "react"
import { useState } from "react"
import { Avatar } from "./Avatar"
import styles from "./Comment.module.css"

interface CommentProps{
    content:string,
    onDeleteComment:(comment: string) => void
}

export function Comment({content,onDeleteComment} : CommentProps){

    const [likeCount,setLikeCount] = useState(0)

    function handleDeleteComment(){
        onDeleteComment(content)
    }

    function handleLikeComment(){
        setLikeCount((likeCount) =>{
            return likeCount +1
        })
    }

    return(
        <div className={styles.comment}>
             <Avatar hasBorder={false} src="https://github.com/kauan-aragao.png"/>

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Kauan Aragão</strong>
                            <time title="22 de Junho  às 23:22h" dateTime="2023-06-24 23:22:00">Cerca de 2h atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={20}/>
                        </button>
                    </header>
                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp/>
                        Aplaudir <span>{likeCount}</span>    
                    </button> 
                </footer>
            </div>

        </div>
    )
}