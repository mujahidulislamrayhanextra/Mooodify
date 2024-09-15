
"use client"
import { baseRating,gradients } from '@/utils';
import { Fugaz_One } from 'next/font/google';
import React,{ useState } from 'react';




const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });



export default function Calender(props) {
  const { demo,completeData,handleSetMood } = props;
  const now = new Date()
  const currMonth = now.getMonth()
  const [selectedMonth,setSelectedMonth ] = useState(Object.keys(months)[currMonth]);




  console.log(selectedMonth);

  const numaricMonth = monthsArr.indexOf(selectedMonth);

  const  [ selectedYear ,setSelectedYear ] = useState(now.getFullYear())

  const data = completeData?.[selectedYear]?.[numaricMonth] || {};

  console.log(completeData?.[selectedYear]?.[selectedMonth])

  function handleIncrementMonth(val){
    if(numaricMonth + val < 0 ){
      setSelectedYear(curr => curr - 1 )
      setSelectedMonth(monthsArr[monthsArr.length - 1])

    }
    else if (numaricMonth + val > 11){
      setSelectedYear(curr => curr + 1 )
      setSelectedMonth(monthsArr[0])

    }
    else{
      setSelectedMonth(monthsArr[numaricMonth + val])
    }

  }

  



 


    const monthNow = new Date(selectedYear,Object.keys(months).indexOf(selectedMonth),1);

    const firstDayofMonth = monthNow.getDate();

    const daysInMonth = new Date(selectedYear,Object.keys(selectedMonth).indexOf(selectedMonth) + 1 ,0).getDate();

    const daysToDisplay = firstDayofMonth + daysInMonth ;
 
    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0 )
  return (
    <div className='flex flex-col gap-2'>
     <div className='gird gird-cols-5 gap- 4'>
      <button onClick={() => {
        handleIncrementMonth(-1)
      }} className='mr-auto  text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60 '><i className="fa-solid fa-circle-chevron-left"></i> </button>
      <p className={'text-center col-span-3 capitalize whitespace-nowrap textGradient ' + fugaz.className}>{selectedMonth},{selectedYear}</p>
      <button  onClick={() => {
        handleIncrementMonth(+1)
      }} className=' ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60 '><i className="fa-solid fa-circle-chevron-right"></i> </button>
     </div>
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
                let color = demo ? gradients.indigo[baseRating[dayIndex]] : dayIndex in data ? gradients.indigo[data[dayIndex]] : "white"
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
    </div>
  )
}
