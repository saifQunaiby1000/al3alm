import { useState, useEffect, useRef } from 'react'
import './App.css'
// أضف الشعار هنا - ضع ملف الصورة في مجلد assets
import logo from './assets/logo.png'

// بيانات تجريبية للطلاب
const initialStudents = [
  {
    id: 1,
    name: 'بكر عادل',
    quranPage: 39,
    mutoonPage: 83,
    requiredQuran: 39,
    requiredMutoon: 90,
  },
  {
    id: 2,
    name: 'عثمان شهوان',
    quranPage: 38,
    mutoonPage: 83,
    requiredQuran: 39,
    requiredMutoon: 90
  },
  {
    id: 3,
    name: 'يامن الداود',
    quranPage: 39,
    mutoonPage: 40,
    requiredQuran: 39,
    requiredMutoon: 90
  },
  {
    id: 4,
    name: 'محمد البساطي',
    quranPage: 39,
    mutoonPage: 90,
    requiredQuran: 39,
    requiredMutoon: 90
  },
  {
    id: 5,
    name: 'محمد عدس',
    quranPage: 37,
    mutoonPage: 79,
    requiredQuran: 39,
    requiredMutoon: 90
  },
  {
    id: 6,
    name: 'عبد الله عصام',
    quranPage: 34,
    mutoonPage: 0,
    requiredQuran: 39,
    requiredMutoon: 0
  },
  {
    id: 7,
    name: 'أسامة أحمد',
    quranPage: 32,
    mutoonPage: 61,
    requiredQuran: 39,
    requiredMutoon: 90
  },
  {
    id: 8,
    name: 'عمر الكتتوت',
    quranPage: 32,
    mutoonPage: 24,
    requiredQuran: 39,
    requiredMutoon: 90
  },
  {
    id: 9,
    name: 'جود صرصور',
    quranPage: 28,
    mutoonPage: 0,
    requiredQuran: 39,
    requiredMutoon: 0
  }
]

// Component للكارد مع flip
function CardFlip({ student, cardColor, isFlipped, catchUpPlan, onToggle }) {
  const frontRef = useRef(null)
  const backRef = useRef(null)

  useEffect(() => {
    const updateHeight = () => {
      if (frontRef.current && backRef.current) {
        // إزالة الارتفاع المحدد مؤقتاً للحصول على الارتفاع الطبيعي
        frontRef.current.style.height = 'auto'
        backRef.current.style.height = 'auto'
        
        // الحصول على الارتفاع بعد render
        setTimeout(() => {
          if (frontRef.current && backRef.current) {
            const frontHeight = frontRef.current.offsetHeight
            const backHeight = backRef.current.offsetHeight
            const maxHeight = Math.max(frontHeight, backHeight)
            frontRef.current.style.height = `${maxHeight}px`
            backRef.current.style.height = `${maxHeight}px`
          }
        }, 10)
      }
    }
    
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [isFlipped, catchUpPlan])

  return (
    <div 
      className={`student-card ${cardColor} ${isFlipped ? 'flipped' : ''}`}
    >
      <div className="color-bar"></div>
      <div className="card-flip-container">
        {/* وجه الكارد - المعلومات الأساسية */}
        <div className="card-front" ref={frontRef}>
          <div className="card-inner">
            <div className="card-header">
              <h2 className="student-name">{student.name}</h2>
              <div className={`status-badge ${cardColor}`}>
                {cardColor === 'green' ? 'ممتاز' : cardColor === 'yellow' ? 'جيد جدًا' : 'جيد'}
              </div>
            </div>
            
            <button 
              className="flip-button"
              onClick={(e) => {
                e.stopPropagation()
                onToggle()
              }}
              aria-label="عرض خطة الاستدراك"
            >
              <span className="flip-icon">↻</span>
              <span className="flip-text">خطة الاستدراك</span>
            </button>
            
            <div className="card-content">
              <div className="info-item">
                <span className="info-label">الإنجاز في القرآن:</span>
                <span className="info-value">{student.quranPage} صفحة</span>
              </div>
              
              <div className="info-item">
                <span className="info-label" >الإنجاز في المتون:</span>
                <span className="info-value">{student.mutoonPage} بيت</span>
              </div>
              
              <div className="info-item required">
                <span className="info-label">المطلوب إستدراكه من القرآن:</span>
                <span className="info-value">{student.requiredQuran - student.quranPage} صفحة</span>
              </div>
              <div className="info-item required">
                <span className="info-label">المطلوب إستدراكه من المتون:</span>
                <span className="info-value">{student.requiredMutoon - student.mutoonPage} بيت</span>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-item">
                <span>القرآن</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill quran"
                    style={{ width: `${(student.quranPage / student.requiredQuran) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="progress-item">
                <span>المتون</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill mutoon"
                    style={{ width: `${(student.mutoonPage / student.requiredMutoon) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ظهر الكارد - خطة الاستدراك */}
        <div className="card-back" ref={backRef}>
          <div className="card-inner">
            <div className="card-header">
              <h2 className="student-name">خطة الاستدراك</h2>
              <div className={`status-badge ${cardColor}`}>
                {student.name}
              </div>
            </div>
            
            <button 
              className="flip-button"
              onClick={(e) => {
                e.stopPropagation()
                onToggle()
              }}
              aria-label="العودة للخلف"
            >
              <span className="flip-icon">↻</span>
              <span className="flip-text">العودة</span>
            </button>
            
            {catchUpPlan.length === 0 ? (
              <div className="catch-up-empty">
                <p className="empty-message">🎉 مبروك! لا يوجد مطلوب استدراك</p>
              </div>
            ) : (
              <div className="catch-up-plan">
                <div className="plan-header">
                  <p className="plan-subtitle">التوزيع على {catchUpPlan.length} أسبوع</p>
                </div>
                <div className="weeks-list">
                  {catchUpPlan.map((weekPlan) => (
                    <div key={weekPlan.week} className="week-item">
                      <div className="week-number">الأسبوع {weekPlan.week}</div>
                      <div className="week-details">
                        {weekPlan.quran > 0 && (
                          <div className="week-detail-item">
                            <span className="week-label">القرآن:</span>
                            <span className="week-value">{weekPlan.quran} صفحة</span>
                          </div>
                        )}
                        {weekPlan.mutoon > 0 && (
                          <div className="week-detail-item">
                            <span className="week-label">المتون:</span>
                            <span className="week-value">{weekPlan.mutoon} بيت</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [students] = useState(initialStudents)
  const [flippedCards, setFlippedCards] = useState(new Set())

  // تحديد اللون حسب أعلى إنجاز
  const getCardColor = (quranPage, mutoonPage) => {
    const maxPage = Math.max(quranPage, mutoonPage)
    
    if (maxPage >= 35) {
      return 'green'
    } else if (maxPage >= 30) {
      return 'yellow'
    } else {
      return 'red'
    }
  }

  // دالة لقلب الكارد
  const toggleCard = (studentId) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(studentId)) {
        newSet.delete(studentId)
      } else {
        newSet.add(studentId)
      }
      return newSet
    })
  }

  // دالة لحساب خطة الاستدراك
  const calculateCatchUpPlan = (student) => {
    const quranNeeded = Math.max(0, student.requiredQuran - student.quranPage)
    const mutoonNeeded = Math.max(0, student.requiredMutoon - student.mutoonPage)

    // إذا لا حاجة لاستدراك
    if (quranNeeded === 0 && mutoonNeeded === 0) {
      return []
    }

    // حساب عدد الأسابيع المطلوبة
    // للمتون: كل أسبوع على الأقل 6 أبيات
    // للقرآن: كل أسبوع على الأقل صفحة واحدة
    let totalWeeks = 6 // الحد الأقصى 6 أسابيع
    
    // حساب عدد الأسابيع بناءً على المطلوب
    if (quranNeeded > 0 && mutoonNeeded > 0) {
      // إذا كان هناك قرآن ومتون
      // نحسب عدد الأسابيع للمتون (6 أبيات لكل أسبوع)
      const weeksForMutoon = Math.ceil(mutoonNeeded / 6)
      // نحسب عدد الأسابيع للقرآن
      const weeksForQuran = Math.min(quranNeeded, 6)
      // نأخذ الأكبر بينهما
      totalWeeks = Math.min(Math.max(weeksForMutoon, weeksForQuran), 6)
    } else if (quranNeeded > 0) {
      // إذا كان فقط قرآن
      totalWeeks = Math.min(quranNeeded, 6)
    } else if (mutoonNeeded > 0) {
      // إذا كان فقط متون - نحسب بناءً على 6 أبيات لكل أسبوع
      totalWeeks = Math.min(Math.ceil(mutoonNeeded / 6), 6)
    }

    // تقسيم المطلوب على الأسابيع
    const plan = []
    let remainingQuran = quranNeeded
    let remainingMutoon = mutoonNeeded

    // حساب عدد الأسابيع الفعلية بناءً على المتون
    // إذا كان هناك متون، نحسب عدد الأسابيع بناءً على 6 أبيات لكل أسبوع
    let actualWeeks = totalWeeks
    if (mutoonNeeded > 0) {
      // إذا بقي أقل من 6 أبيات، نضعهم في آخر أسبوع
      const fullWeeks = Math.floor(mutoonNeeded / 6)
      const remainingAfterFull = mutoonNeeded % 6
      if (remainingAfterFull > 0) {
        // إذا بقي أقل من 6، نضيف أسبوع إضافي لهم فقط
        actualWeeks = Math.min(fullWeeks + 1, 6)
      } else {
        actualWeeks = Math.min(fullWeeks, 6)
      }
      // نأخذ الأكبر بين actualWeeks و totalWeeks (لضمان أن القرآن يُوزع أيضاً)
      actualWeeks = Math.max(actualWeeks, totalWeeks)
    }

    for (let week = 1; week <= actualWeeks; week++) {
      // إذا انتهى المطلوب، نتوقف
      if (remainingQuran === 0 && remainingMutoon === 0) {
        break
      }

      const isLastWeek = week === actualWeeks
      const weeksLeft = actualWeeks - week + 1
      
      // حساب ما يجب استدراكه هذا الأسبوع
      let quranForWeek = 0
      let mutoonForWeek = 0
      
      // القرآن: صفحة واحدة على الأقل لكل أسبوع
      if (remainingQuran > 0) {
        if (isLastWeek) {
          // الأسبوع الأخير يأخذ الباقي
          quranForWeek = remainingQuran
        } else {
          // توزيع متساوي مع ضمان صفحة واحدة على الأقل
          const avgQuran = remainingQuran / weeksLeft
          quranForWeek = Math.max(1, Math.ceil(avgQuran))
          quranForWeek = Math.min(quranForWeek, remainingQuran)
        }
      }
      
      // المتون: 6 أبيات على الأقل لكل أسبوع (ما عدا الأخير)
      if (remainingMutoon > 0) {
        if (isLastWeek) {
          // الأسبوع الأخير يأخذ الباقي (حتى لو أقل من 6)
          mutoonForWeek = remainingMutoon
        } else {
          // ضمان 6 أبيات على الأقل لكل أسبوع
          // إذا بقي أقل من 6، لا نضع شيء هذا الأسبوع
          if (remainingMutoon < 6) {
            mutoonForWeek = 0
          } else {
            // توزيع متساوي مع ضمان 6 أبيات على الأقل
            mutoonForWeek = Math.max(6, Math.ceil(remainingMutoon / weeksLeft))
            mutoonForWeek = Math.min(mutoonForWeek, remainingMutoon)
          }
        }
      }

      // إذا كان هذا الأسبوع لا يحتوي على شيء، نتخطاه
      if (quranForWeek === 0 && mutoonForWeek === 0) {
        continue
      }

      plan.push({
        week,
        quran: quranForWeek,
        mutoon: mutoonForWeek
      })

      remainingQuran -= quranForWeek
      remainingMutoon -= mutoonForWeek
      
      // إذا انتهى المطلوب، نتوقف
      if (remainingQuran === 0 && remainingMutoon === 0) {
        break
      }
    }

    return plan
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="شعار المشروع" className="logo-image" />
        </div>
        <h1>تقرير منتصف الفصل</h1>
        <p className="subtitle">مراقبة تقدم الطلاب في القرآن والمتون</p>
      </header>

      <div className="students-grid">
        {students.map((student) => {
          const cardColor = getCardColor(student.quranPage, student.mutoonPage)
          const isFlipped = flippedCards.has(student.id)
          const catchUpPlan = calculateCatchUpPlan(student)
          
          return (
            <CardFlip
              key={student.id}
              student={student}
              cardColor={cardColor}
              isFlipped={isFlipped}
              catchUpPlan={catchUpPlan}
              onToggle={() => toggleCard(student.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
