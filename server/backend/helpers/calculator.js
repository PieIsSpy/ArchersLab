const calculateStatus = (res) => {
    const now = new Date();
    

    const [start, end] = res.time.split('-');
    
    const createTime = (timeStr) => {
        const d = new Date(res.date);
        const [h, m] = timeStr.split(':').map(Number);
        d.setHours(h, m, 0, 0);
        return d;
    };

    const startDate = createTime(start);
    const endDate = createTime(end);

    if (res.seats.length === 0) {
        if (res.resStatus === 'Pending') {
            const twoweeks = 14 * 24 * 60 * 60 * 1000;
            const interval = startDate - now;

            if (interval < twoweeks)
                return 'Cancelled'
        }
    }

    if (res.resStatus !== 'Approved') 
        return res.resStatus;
    if (now >= startDate && now <= endDate)
        return 'Ongoing';
    if (now > endDate)
        return 'Completed'
    return 'Upcoming'
}

module.exports = {calculateStatus}