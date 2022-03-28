import { AiOutlineLink } from 'react-icons/ai'

const MemeBox = ({ meme, handleClickMeme, isSelected }) => {
  return (
    <div>
      <div
        onClick={() => handleClickMeme(meme)}
        className={`${
          isSelected ? 'border-pink-500 !border-4' : 'border-white'
        } w-[400px] border-2 transition-[border,color] duration-300 lg:w-full lg:max-w-[500px] aspect-square rounded cursor-pointer`}
      >
        <img className="w-full h-full object-fill" src={meme.url} alt="" />
      </div>
      <div className="flex mt-2 items-center justify-between">
        <a
          href={`https://www.reddit.com/user/${meme.author}`}
          className="text-base bg-slate-700 hover:bg-slate-600 transition-colors rounded duration-300 p-2 lg:text-sm text-gray-300"
        >
          Author: {meme.author}
        </a>
        <a
          href={meme.postLink}
          className="text-2xl p-2 cursor-pointer bg-slate-700 hover:bg-slate-600 transition-colors rounded duration-300"
        >
          <AiOutlineLink />
        </a>
      </div>
    </div>
  )
}

export default MemeBox
