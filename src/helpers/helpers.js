export default class YOANHelpers {
  // Returns an array of weeks. 
  //TODO SEND UP A WEEK START DATE AND RENDER THAT WEEK INSTEAD OF GETTING CURRENT DAY AND WEEK
  getWeek = () => {
    const week = []
    for (let i = 0; i < 7; i++) {
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
  dateTransform = (date) => {
    const dateArray = date.split("/")
    if (dateArray[0].length === 1  ) dateArray[0] = `0${dateArray[0]}`
    if (dateArray[1].length === 1) dateArray[1] = `0${dateArray[1]}`
    return dateArray[2] + "-" + dateArray[0] + "-" + dateArray[1]
  }

  
  getFormattedDay = () => {
    const day = new Date();
    const year = day.toLocaleString("en-US", {
      year: "numeric"
    });
    const month = day.toLocaleString("en-US", {
      month: "2-digit"
    });
    const today = day.toLocaleString("en-US", {
      day: "2-digit"
    });
    return `${year}/${month}/${today}`
  }


}