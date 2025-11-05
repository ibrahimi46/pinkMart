type DeliveryDate = {
  date: Date;
  dayName: string;
  dateStr: string;
  fullDate: string;
};

export function generateDeliveryDates(processingDays: number = 2, numOfDates: number = 7) : DeliveryDate[] {
    const dates: DeliveryDate[] = [];
    const todayDate = new Date();
    const currentDate = new Date(todayDate);

    currentDate.setDate(currentDate.getDate() + processingDays);

    while (dates.length < numOfDates) {

        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            dates.push({
                date: new Date(currentDate),
                dayName: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
                dateStr: currentDate.toLocaleDateString('en-GB', { 
                month: '2-digit', 
                day: '2-digit',
                year: "numeric"
                }),
                fullDate: currentDate.toISOString().split('T')[0],
            })
        }

        currentDate.setDate(currentDate.getDate() + 1);
        if (dates.length === 30) break;
    }

    return dates;
}