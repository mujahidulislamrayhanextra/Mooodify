 "use client"
import { Fugaz_One } from 'next/font/google'
import React from 'react'




const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Calender() {

    const  year = 2024;
    const month = 'September';
    const monthNow = new Date(year,Object.keys(months).indexOf(month),1);

    const firstDayofMonth = monthNow.getDate();

    const daysInMonth = new Date(year,Object.keys(month).indexOf(month) + 1 ,0).getDate();

    const daysToDisplay = firstDayofMonth + daysInMonth ;

    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0 )
  return (
    <div className='flex flex-col overflow-hidden gap-1'>
      {[...Array(numRows).keys()].map((row,rowIndex ) => {

        return (
            <div className=' grid grid-cols-7 gao-1' key={rowIndex}>
             {dayList.map((dayOfweek,dayOfWeekIndex) =>{

               let dayIndex = (rowIndex * 7 ) + dayOfWeekIndex - (firstDayofMonth - 1)

               let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayofMonth ) ? false : true;

               let isToday = dayIndex === now.getDate();
               if(!dayDisplay){
                return (
                    <div key={dayOfWeekIndex} className='bg-white'>
                
                    </div>
                )
               }

                return (
                    <div key={dayOfWeekIndex}>
                     January
                    </div>
                )
             } )}
            </div>
        )

      })}
    </div>
  )
}
