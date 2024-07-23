// Helper function to parse attendance string
function parseAttendance(attendanceStr) {
  const [attended, total] = attendanceStr.match(/\d+/g).map(Number);
  return attended / total;
}

async function getAbsentSubjects(pastDayAttendance, todayAttendance) {
  try {
    const absentSubjects = [];

    // Compare past day and today attendance
    todayAttendance.forEach((todaySub) => {
      const pastSub = pastDayAttendance.find(
        (sub) => sub.subject === todaySub.subject
      );

      if (pastSub) {
        const pastFraction = parseAttendance(pastSub.attendance);
        const todayFraction = parseAttendance(todaySub.attendance);

        if (todayFraction < pastFraction) {
          absentSubjects.push(todaySub.subject);
        }
      }
    });

    return absentSubjects;
  } catch (error) {
    console.error("Error comparing attendance:", error);
    throw error;
  }
}

module.exports = { getAbsentSubjects };
// Example usage
const pastDayAttendance = [
  { attendance: "2/2 (100%)", subject: "CST301" },
  { attendance: "4/4 (100%)", subject: "CST303" },
  { attendance: "2/2 (100%)", subject: "CST305" },
  // Add more past day attendance data
];

const todayAttendance = [
  { attendance: "2/3 (67%)", subject: "CST301" }, // Was absent today
  { attendance: "4/4 (100%)", subject: "CST303" },
  { attendance: "2/2 (100%)", subject: "CST305" },
  // Add more today attendance data
];
