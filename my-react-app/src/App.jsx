import { useState } from 'react'
import './App.css'
// أضف الشعار هنا - ضع ملف الصورة في مجلد assets
import logo from './assets/logo.png'

// بيانات تجريبية للطلاب
const initialStudents = [
  {
    id: 1,
    name: 'أحمد محمد',
    quranPage: 42,
    mutoonPage: 38,
    requiredQuran: 42,
    requiredMutoon: 42,
  },
  {
    id: 2,
    name: 'فاطمة علي',
    quranPage: 28,
    mutoonPage: 25,
    requiredQuran: 28,
    requiredMutoon: 25
  },
  {
    id: 3,
    name: 'خالد حسن',
    quranPage: 35,
    mutoonPage: 32,
    requiredQuran: 35,
    requiredMutoon: 32
  },
  {
    id: 4,
    name: 'سارة إبراهيم',
    quranPage: 22,
    mutoonPage: 20,
    requiredQuran: 22,
    requiredMutoon: 20
  },
  {
    id: 5,
    name: 'محمد خالد',
    quranPage: 40,
    mutoonPage: 42,
    requiredQuran: 40,
    requiredMutoon: 42
  },
  {
    id: 6,
    name: 'ليلى عبدالله',
    quranPage: 33,
    mutoonPage: 31,
    requiredQuran: 33,
    requiredMutoon: 31
  },
  {
    id: 7,
    name: 'يوسف أحمد',
    quranPage: 15,
    mutoonPage: 18,
    requiredQuran: 15,
    requiredMutoon: 18
  },
  {
    id: 8,
    name: 'نورا سعيد',
    quranPage: 38,
    mutoonPage: 40,
    requiredQuran: 38,
    requiredMutoon: 40
  }
]

function App() {
  const [students] = useState(initialStudents)

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

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="شعار المشروع" className="logo-image" />
        </div>
        <h1>تتبع إنجاز الطلاب</h1>
        <p className="subtitle">مراقبة تقدم الطلاب في القرآن والمتون</p>
      </header>

      <div className="students-grid">
        {students.map((student) => {
          const cardColor = getCardColor(student.quranPage, student.mutoonPage)
          
          return (
            <div key={student.id} className={`student-card ${cardColor}`}>
              <div className="color-bar"></div>
              <div className="card-inner">
              <div className="card-header">
                <h2 className="student-name">{student.name}</h2>
                <div className={`status-badge ${cardColor}`}>
                  {cardColor === 'green' ? 'ممتاز' : cardColor === 'yellow' ? 'متوسط' : 'قليل'}
                </div>
              </div>
              
              <div className="card-content">
                <div className="info-item">
                  <span className="info-label">الصفحة في القرآن:</span>
                  <span className="info-value">{student.quranPage} صفحة</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">الصفحة في المتون:</span>
                  <span className="info-value">{student.mutoonPage} صفحة</span>
                </div>
                
                <div className="info-item required">
                  <span className="info-label">المطلوب إستذكاره:</span>
                  <span className="info-value">{student.requiredQuran} صفحة</span>
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
          )
        })}
      </div>
    </div>
  )
}

export default App
