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