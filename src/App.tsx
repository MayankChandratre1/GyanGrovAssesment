
import './App.css'
import Inventory from './components/Inventory'

function App() {

  return (
    <div className=''>
      <nav className='bg-gray-800'>
        <div className='container mx-auto flex justify-between items-center p-4'>
          <div className='text-white text-4xl font-bold'>Inventory</div>
        </div>
      </nav>

      <Inventory />
    </div>
  )
}

export default App
