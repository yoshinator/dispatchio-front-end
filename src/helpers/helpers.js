export default class YOANHelpers {
  // Returns an array of weeks. 
  getWeek = (start) => {
    if (start>0){
      start *=7
    }
    else if (start < 0 ){
      start *=7
    } else start = 0
    const week = []
    for (let i = start; i < start+7; i++) {
      const day = new Date()
      const a = new Date(day.setDate(day.getDate() + i))
      week.push(a.toLocaleString(
        "en-US",
        {
          month: "numeric",
          day: "numeric",
          year: "numeric"
        }
      ))
    }
    return week
  }

  getDay = () => {
    const day = new Date()
    return day.toLocaleString(
      "en-US",
      {
        month: "numeric",
        day: "numeric",
        year: "numeric"
      }
    )
  }

  //takes a date in the format 1/9/2020 m/d/yyyy and return it in 2020-01-09 yyyy-mm-dd
  dateTransform = date => {
    const dateArray = date.split("/")
    if (dateArray[0].length === 1  ) dateArray[0] = `0${dateArray[0]}`
    if (dateArray[1].length === 1) dateArray[1] = `0${dateArray[1]}`
    return dateArray[2] + "-" + dateArray[0] + "-" + dateArray[1]
  }

  //dateTransform in reverse
  formatDateSlash = date => {
    const dateArray = date.split("-")
    if (dateArray[2][0]==="0") dateArray[2] = dateArray[2][1]
    if (dateArray[1][0]==="0") dateArray[1] = dateArray[1][1]
    return dateArray[1]+"//"+dateArray[2]+"//"+dateArray[0]

  }

  //takes an input in the form of 14:20 and returns 2:20 pm
  formatTime = time => {
    const timeArray = time.split(":")
    return timeArray[0] - 12 > 0 ? `${timeArray[0] - 12}:${timeArray[1]} pm` : `${timeArray[0]}:${timeArray[1]} am`

  }


}