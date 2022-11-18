const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime,durationMinutes) {
    function convertToMinutes(time){
        const arrayOfTime = time.split(":").map(Number);
        return arrayOfTime[0]*60+arrayOfTime[1];
    }

    const dayStartInMinutes = convertToMinutes(dayStart);
    const dayEndInMinutes = convertToMinutes(dayEnd);
    const meetingStartInMinutes = convertToMinutes(startTime);
    const meetingEndInMinutes = meetingStartInMinutes+durationMinutes;

    console.log(meetingStartInMinutes>=dayStartInMinutes && meetingEndInMinutes<=dayEndInMinutes);
}

scheduleMeeting("7:00",15);     // false
scheduleMeeting("07:15",30);    // false
scheduleMeeting("7:30",30);     // true
scheduleMeeting("11:30",60);    // true
scheduleMeeting("17:00",45);    // true
scheduleMeeting("17:30",30);    // false
scheduleMeeting("18:00",15);    // false