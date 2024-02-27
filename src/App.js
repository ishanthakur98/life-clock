// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
// import * as moment from 'moment';
import background from './assets/images/Inspiring-time-quotes-9.jpg'
// age-calculator\src\assets\images\Inspiring-time-quotes-9.jpg
function App() {

  var [age, setage] = useState("");
  var [lifeSpan, setLifeSpan] = useState("");

  var [newage, setnewage] = useState("");

  const [timerRunning, setTimerRunning] = useState(false);

  function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  function checkDOB(dateString) {

    let myDate = new Date(dateString);
    let today = new Date();
    if (myDate > today) {

      return false;
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setnewage("");
    if (lifeSpan === "" || Number(lifeSpan) > 100) {
      alert("Lifespan should be less than 100")
      return;
    } else if (age === "") {
      alert("age cannot be empty")
      return;
    } else if (getAge(age) > 100) {
      alert("You have already exceeded your lifespan")
      return;
    } else if (getAge(age) < 0) {
      alert("You are yet to be born")
      return;
    } else if (!checkDOB(age)) {
      alert("Entered date of birth cannot be more than today")
      return;
    }
    setTimerRunning(true)
  }
  useEffect(() => {
    if (timerRunning) {
      const interval = setInterval(() => {
        setnewage(diff);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [timerRunning]);


  function diff() {
    const aYearFromNow = new Date(age);
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + Number(lifeSpan));

    var countDownDate = new Date(aYearFromNow).getTime();


   
    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

   
    return days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";
  }


  // function getDiff() {
  //   let date = new Date(age);
  //   // console.log()
  //   let date1 = new Date();

  //   date1 = moment(date1).format('DD/MM/YYYY HH:mm:ss');


  //   let date2 = moment(age).format('DD/MM/YYYY HH:mm:ss');

  //   date1 = moment(date1, 'DD/MM/YYYY HH:mm:ss')
  //   date2 = moment(date2, 'DD/MM/YYYY HH:mm:ss')

  //   let mov = (date1).diff(date2);
  //   var duration = moment.duration(date1.diff(date2));
  //   console.log(duration)
  //   let year = Math.round(duration.years());
  //   let months = Math.round(duration.months);
  //   let days = Math.round(duration.days);

  //   let hours = Math.round(duration.hours);

  //   let minutes = Math.round(duration.minutes);
  //   let second = Math.round(duration.seconds);

  //   setInterval(() => {
  //     setnewage(year + " year " + months + " months " + days + " days " + hours + " hours " + minutes + " minutes " + second + " second ")
  //   }, 1000)
  // }



  return (
    <div className="App container" style={{ background: "rgb(2,0,36)", background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(210,185,162,1) 96%, rgba(0,212,255,1) 100%)" }} /* style={{ backgroundImage: `url(${background})`, backgroundRepeat:"no-repeat",backgroundPosition: "center", backgroundSize: "cover "}} */>
      <div className='row justify-content-center'>
        <div class="col-6">
          <div className='fs-3 fst-italic text-nowrap' style={{color:"white"}}>Life Clock</div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center" style={{ height: "450px" }}>
        <form onSubmit={handleSubmit}>
          <div class="row g-3 align-items-center">
            <div class="col-6 mb-4">
              <label for="inputPassword6" class="col-form-label">Enter your age</label>

              <input type="date" id="age" class="form-control" value={age} onChange={(e) => setage(e.target.value)} />
            </div>
            <div class="col-6 mb-4">
              <label for="inputPassword6" class="col-form-label">How long you want to live</label>

              <input type="number" id="lifeSpan" class="form-control" value={lifeSpan} onChange={(e) => setLifeSpan(e.target.value)} />
            </div>
            <div className='row justify-content-center'>
              <div class="col-6">
                <input type="submit" class="form-control btn btn-primary" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='row justify-content-center'>
        <div class="col-6">
          {newage && <div className='fs-3 fst-italic text-nowrap' >You have <span style={{ color: "white" }}>{newage}</span> days left to enjoy life</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
