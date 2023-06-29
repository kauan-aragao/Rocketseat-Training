import { Header } from "./components/Header"
import { Post, PostProps} from "./components/Post"
import { Sidebar } from "./components/Sidebar"

import sytles from "./App.module.css"
import "./global.css"
import React from "react"

const posts:PostProps[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/kauan-aragao.png",
      name:"Kauan Aragão",
      role: "Web Developer"
    },
    content :[
      {type: 'paragraph',content:'Fala galeraa 👋'},
      {type: 'paragraph',content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link',content:'jane.design/doctorcare'},
    ],
    publishedAt: new Date('2023-06-25 14:57:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/kauan-aragao.png",
      name:"Caio Barros ",
      role: "Data Scientist"
    },
    content :[
      {type: 'paragraph',content:'Fala galeraa 👋'},
      {type: 'paragraph',content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link',content:'jane.design/doctorcare'},
    ],
    publishedAt: new Date('2023-10-10 20:00:00')
  }
]

export function App() {
  return (
    <>
    <Header/>
    <div className={sytles.wrapper}>
      <Sidebar/>
      <main>
        {posts.map(post =>{
          return (
          <Post
          key={post.id}
          author={post.author}
          content={post.content}
          publishedAt={post.publishedAt}
          />
          )
        }
        )}
      </main>
    </div>
    
    
    </>
  )
}


