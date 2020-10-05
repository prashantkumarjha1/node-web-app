const locationForm1 = document.querySelector('form')

locationForm1.addEventListener('submit',(event)=>{
const location1 = document.querySelector('input').value
const url1 = 'http://localhost:3000/api/weather?loc=' + location1
    event.preventDefault()
    fetch(url1).then((response) => {
        response.json().then((data1) => {
            document.querySelector('h2.infoText').textContent = 'Weather of ' + data1.location +' currently is: ' + data1.curr_weather
        })
    })
})
    



