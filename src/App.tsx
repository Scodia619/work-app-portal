import './App.css'
import NotesList from './Components/NotesList/NotesList'
import ProjectsList from './Components/ProjectsList/ProjectsList'

function App() {
  return (
    <div className='main'>
      <ProjectsList />
      <NotesList />
    </div>
  )
}

export default App
