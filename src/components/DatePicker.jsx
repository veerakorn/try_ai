import { useState, useMemo, useRef, useEffect } from 'react'

function DatePicker({ placeholder = "Select date", className = "", onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const calendarRef = useRef(null)

  const formattedDate = useMemo(() => 
    selectedDate ? selectedDate.toLocaleDateString() : ''
  , [selectedDate])

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

  const calendarDays = useMemo(() => {
    const days = []
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()
    
    // Previous month days
    const prevMonthDays = daysInMonth(currentYear, currentMonth - 1)
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(currentYear, currentMonth - 1, prevMonthDays - i),
        otherMonth: true,
      })
    }
    
    // Current month days
    const thisMonthDays = daysInMonth(currentYear, currentMonth)
    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({ 
        date: new Date(currentYear, currentMonth, i), 
        otherMonth: false 
      })
    }
    
    // Next month days (fill to 6 weeks grid)
    const nextDays = 42 - days.length
    for (let i = 1; i <= nextDays; i++) {
      days.push({ 
        date: new Date(currentYear, currentMonth + 1, i), 
        otherMonth: true 
      })
    }
    return days
  }, [currentYear, currentMonth])

  const currentMonthName = useMemo(() =>
    new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })
  , [currentYear, currentMonth])

  const toggleCalendar = () => setShowCalendar(!showCalendar)

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const selectDate = (day) => {
    if (day.otherMonth) return
    setSelectedDate(day.date)
    setShowCalendar(false)
    if (onDateSelect) {
      onDateSelect(day.date)
    }
  }

  const isSelected = (day) =>
    selectedDate && day.date.toDateString() === selectedDate.toDateString()

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false)
      }
    }

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCalendar])

  return (
    <div className="relative inline-block" ref={calendarRef}>
      <input
        type="text"
        readOnly
        value={formattedDate}
        onClick={toggleCalendar}
        placeholder={placeholder}
        className={`w-40 p-2 border border-neutral-300 rounded cursor-pointer 
          focus:outline-none focus:ring-2 focus:ring-web-green-500 
          bg-white hover:border-web-green-400 transition-colors ${className}`}
      />
      
      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-300 
          rounded-lg shadow-xl z-50 p-4 min-w-max backdrop-blur-sm 
          border-web-green-200/50 shadow-web-green-500/10">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={prevMonth} 
              className="p-2 hover:bg-web-green-100 rounded-full transition-colors 
                text-neutral-600 hover:text-web-green-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-semibold text-neutral-800 text-lg">
              {currentMonthName} {currentYear}
            </span>
            <button 
              onClick={nextMonth} 
              className="p-2 hover:bg-web-green-100 rounded-full transition-colors 
                text-neutral-600 hover:text-web-green-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Weekdays */}
          <div className="grid grid-cols-7 text-center mb-2 gap-1">
            {weekdays.map(day => (
              <span key={day} className="font-semibold text-neutral-600 text-sm py-2">
                {day}
              </span>
            ))}
          </div>
          
          {/* Days */}
          <div className="grid grid-cols-7 text-center gap-1">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => selectDate(day)}
                className={`
                  p-2 rounded-full text-sm transition-all duration-200 min-w-[32px] h-8 
                  ${day.otherMonth 
                    ? 'text-neutral-400 cursor-default' 
                    : 'cursor-pointer hover:bg-web-green-100 text-neutral-700'
                  }
                  ${isSelected(day) 
                    ? 'bg-web-green-500 text-white hover:bg-web-green-600 shadow-lg' 
                    : ''
                  }
                  ${!day.otherMonth && !isSelected(day) 
                    ? 'hover:scale-110' 
                    : ''
                  }
                `}
                disabled={day.otherMonth}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
