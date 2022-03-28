import { useState, useEffect } from 'react'
import MemeBox from './components/MemeBox'

const App = () => {
  const [memes, setMemes] = useState([])
  const [selectedMeme, setSelectedMeme] = useState(null)

  const handleClickMeme = async (_selectedMeme) => {
    setSelectedMeme(_selectedMeme)
    const newMeme = await getMeme(1)
    setMemes((prevMemes) => {
      return prevMemes.map((meme) => {
        if (meme.url !== _selectedMeme.url) {
          return newMeme[0]
        }
        return meme
      })
    })
  }

  const getMeme = async (amountOfMeme = '') => {
    const url = `https://meme-api.herokuapp.com/gimme/${amountOfMeme}`
    const response = await fetch(url)
    const data = await response.json()
    return data.memes
  }

  const updateMeme = async (index) => {
    const newMeme = await getMeme(1)
    setSelectedMeme(memes[index])
    setMemes((prevMemes) => {
      if (index === 0) {
        return [prevMemes[0], newMeme[0]]
      } else if (index === 1) {
        return [newMeme[0], prevMemes[1]]
      }
    })
  }

  useEffect(() => {
    getMeme(2).then((data) => setMemes(data))
  }, [])

  useEffect(() => {
    const keyHandler = async (event) => {
      if (event.key === 'ArrowLeft') {
        updateMeme(0)
      } else if (event.key === 'ArrowRight') {
        updateMeme(1)
      }
    }
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler)
    }
  }, [memes])

  return (
    <div className="text-white flex justify-center px-4 items-center h-screen">
      <div>
        <h1 className="text-4xl text-center font-bold hidden lg:block">
          Left or right
        </h1>
        <h1 className="text-3xl text-center font-bold block lg:hidden">
          Top or bottom
        </h1>
        <div className="mt-4 grid gap-4 grid-cols-1 lg:grid-cols-2">
          {memes.map((meme, index) => (
            <MemeBox
              key={index}
              meme={meme}
              handleClickMeme={handleClickMeme}
              isSelected={meme.url === selectedMeme?.url}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
