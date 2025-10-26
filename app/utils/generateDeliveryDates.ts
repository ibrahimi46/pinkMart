export function generateDeliveryDates(processingDays: number = 2, numOfDates: number = 7) {
    const dates = [];
    const todayDate = new Date();
    const currentDate = new Date(todayDate);

    currentDate.setDate(currentDate.getDate() + processingDays);

    while (dates.length < numOfDates) {

        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            dates.push({
                date: new Date(currentDate),
                dayName: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
                dateStr: currentDate.toLocaleDateString('en-US', { 
                month: '2-digit', 
                day: '2-digit' 
                }),
                fullDate: currentDate.toISOString().split('T')[0],
            })
        }

        currentDate.setDate(currentDate.getDate() + 1);
        if (dates.length === 30) break;
    }

    return dates;
}