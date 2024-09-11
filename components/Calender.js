
"use client"
import { baseRating,demoData,gradients } from '@/utils';
import { Fugaz_One } from 'next/font/google';
import React,{ useState } from 'react';




const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
// const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });



export default function Calender(props) {

  const now = new Date()
  const currMonth = now.getMonth()
  const [selectedMonth,setSelectedMonth ] = useState(Object.keys(months)[currMonth]);




  console.log(selectedMonth);

  const  [ selectedYear ,setSelectedYear ] = useState(now.getFullYear())


  function handleIncrementMonth(val){

  }

  

  const { demo,data,handleSetMood } = props;


    const monthNow = new Date(selectedYear,Object.keys(months).indexOf(selectedMonth),1);

    const firstDayofMonth = monthNow.getDate();

    const daysInMonth = new Date(selectedYear,Object.keys(selectedMonth).indexOf(selectedMonth) + 1 ,0).getDate();

    const daysToDisplay = firstDayofMonth + daysInMonth ;
 
    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0 )
  return (
    <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
      {[...Array(numRows).keys()].map((row,rowIndex ) => {

        return (
            <div className=' grid grid-cols-7 gap-1 ' key={rowIndex}>
             {dayList.map((dayOfweek,dayOfWeekIndex) =>{

               let dayIndex = (rowIndex * 7 ) + dayOfWeekIndex - (firstDayofMonth - 1)

               let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayofMonth ) ? false : true;

               let isToday = dayIndex === now.getDate();
               if(!dayDisplay){
                return (
                    <div key={dayOfWeekIndex} className='bg-white'/>
                
                
                )
               }
                let color = demo ? gradients.indigo[baseRating[dayIndex]] : dayIndex in demoData ? gradients.indigo[demoData[dayIndex]] : "white"
                return (
                    <div style={{background:color}} className={'text-xs sm:text-sm border border-solid p-1 flex items-center gap-2 justify-between rounded-lg ' + (isToday ? 'border-indigo-400 ' : 'border-indigo-100 ') + (color = "white" ? "text-indigo-400 " : "text-white ")} key={dayOfWeekIndex}>
                     <p>{dayIndex}</p>
                    </div>
                )
             } )}
            </div>
        )

      })}
    </div>
  )
}
