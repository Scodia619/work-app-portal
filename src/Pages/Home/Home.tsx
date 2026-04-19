import NotesList from "../../Components/NotesList/NotesList"
import ProjectsList from "../../Components/ProjectsList/ProjectsList"

function Home() {
    return (
    <div className='main'>
      <ProjectsList />
      <NotesList />
    </div>
  )
}

export default Home