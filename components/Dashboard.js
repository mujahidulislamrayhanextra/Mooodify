 "use client"
import { Fugaz_One } from 'next/font/google';
import React,{useEffect,useState} from 'react'
import Calander from './Calender';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import Login from './Login';
import Loading from './Loading';

const fugaz = Fugaz_One({ subsets: ["latin"],weight:['400'] });
export default function Dashboard() {

  const { currentUser,userDataObj,setUserDataObj,loading } =useAuth()

  const [ data,setData ] = useState({})


  function countValues (){
    

  }

  async function handleSetMood(mood){
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    day

    try {
      
    
    const newData = {...userDataObj};

    if(!newData?.[year]){
      newData[year] = {}

    }
    if(!newData?.[month]){
      newData[month] = {}

    }
    // if(!newData?.[day]){
    //   newData[day] = {}

    // }
    newData[year][month][day] = mood
    setUserDataObj(newData)
    setData(newData)
    const docRef = doc(db,'users',currentUser.uid)
    const res = await setDoc(docRef, {
      [year]:{
        [month]:{
          [day]:mood
        }
      }
    },{merge:true})
    // update the current state //
    // update the global state //
    // update firebase  //
  } catch (error) {
    console.log("faild set data",error.message)
    
  }
  }
  const statuses = {
    num_days: 14,
  time_remaining: '13:14:26',
  date:(new Date()).toDateString()
}

const moods ={
  'Angry': '😡',
  'Sad': '😭',
  'Existing':'🙂',
   'Good':'😊',
   'Elated': '😍'
}


useEffect(()=> {
  if(!currentUser || !userDataObj){
    return 
  }
  setData(userDataObj)

},[currentUser, userDataObj]);




  if(loading){
    return
   <Loading/>
  }

if(!currentUser) {
    return <Login/>
}
  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-10 md:gap-16 '>
      <div className='grid grid-cols-3 bg-indigo-50 text-indigo-500 p-4 gap-4 rounded-lg'>

        {
          Object.keys(statuses).map((status,statusIndex) => {
            return(
              <div className=' flex flex-col gap-1 sm:gap-2 ' key={statusIndex}>
                <p className='font-medium uppercase text-xs sm:text-sm truncate '>{status.replaceAll('_',' ')}</p>
                <p className={'text-base sm:text-lg truncate ' 
                  + fugaz.className 
                }>
                  {statuses[status]}
                </p>
              </div>
            )
          })
        }
      </div>
      <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className}>
        How do  you <span className='textGradient'>feel</span> today ?
      </h4>
      <div className='flex items-stretch flex-wrap gap-4'>


          {Object.keys(moods).map((mood,moodIndex) => {
            return(
              <button onClick={() => {
                const currentMoodValue = moodIndex + 1 ;
                handleSetMood(currentMoodValue)
              }} className={' p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-150 text-center flex flex-col items-center gap-2 flex-1 ' + (moodIndex === 4 ? ' col-span-2 sm:col-span-1 ' : ' ')} key={moodIndex}>
                <p className='text-4xl sm:text-5xl md:text-6xl mb-1 '>{moods[mood]}</p> 
                <p className={ 'text-indigo-500 text-xs sm:text-sm md:text-base ' +
                   fugaz.className
                }>{mood}</p>

              </button>
            )
          })}
      </div>
      <Calander demo data={data} handleSetMood={handleSetMood} />
    </div>
  )
}

