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

    if (absentSubjects.length > 0) {
      return absentSubjects;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error comparing attendance:", error);
    throw error;
  }
}

module.exports = { getAbsentSubjects };
