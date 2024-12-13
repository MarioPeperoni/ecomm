export default function getAproxDelivery() {
  const today = new Date();
  const deliveryDays = [1, 2]; // Delivery time in days
  const dates = [];

  for (const day of deliveryDays) {
    let deliveryDate = new Date(today);
    let daysToAdd = day;

    // Skip weekends
    while (daysToAdd > 0) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      const dayOfWeek = deliveryDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Skip Sundays (0) and Saturdays (6)
        daysToAdd--;
      }
    }

    dates.push(deliveryDate);
  }

  return dates;
}
