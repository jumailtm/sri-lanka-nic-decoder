class SriLankaNIC {
  static MONTHS = [
    { name: "Jan", full: "January", days: 31 },
    { name: "Feb", full: "February", days: 29 },
    { name: "Mar", full: "March", days: 31 },
    { name: "Apr", full: "April", days: 30 },
    { name: "May", full: "May", days: 31 },
    { name: "Jun", full: "June", days: 30 },
    { name: "Jul", full: "July", days: 31 },
    { name: "Aug", full: "August", days: 31 },
    { name: "Sep", full: "September", days: 30 },
    { name: "Oct", full: "October", days: 31 },
    { name: "Nov", full: "November", days: 30 },
    { name: "Dec", full: "December", days: 31 }
  ];

  static isLeapYear(year) {
    return (
      (year % 4 === 0 && year % 100 !== 0) ||
      year % 400 === 0
    );
  }

  static dayCodeToDate(dayCode, year) {
    let remaining = dayCode;

    for (let i = 0; i < this.MONTHS.length; i++) {
      const month = this.MONTHS[i];

      if (remaining <= month.days) {
        if (
          i === 1 &&
          remaining === 29 &&
          !this.isLeapYear(year)
        ) {
          return null;
        }

        return {
          day: remaining,
          month: i + 1,
          monthName: month.name,
          monthFullName: month.full
        };
      }

      remaining -= month.days;
    }

    return null;
  }

  static calculateAge(year, month, day) {
    const today = new Date();

    let age = today.getFullYear() - year;
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    if (
      currentMonth < month ||
      (currentMonth === month && currentDay < day)
    ) {
      age--;
    }

    return age;
  }

  static decode(nicNumber) {
    const nic = String(nicNumber || "")
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "");

    let year;
    let rawDayCode;
    let format;

    if (/^\d{12}$/.test(nic)) {
      year = parseInt(nic.substring(0, 4), 10);
      rawDayCode = parseInt(nic.substring(4, 7), 10);
      format = "new";
    } else if (/^\d{9}[VX]$/.test(nic)) {
      year = 1900 + parseInt(nic.substring(0, 2), 10);
      rawDayCode = parseInt(nic.substring(2, 5), 10);
      format = "old";
    } else {
      return {
        valid: false,
        error: "Invalid Sri Lankan NIC format."
      };
    }

    let gender = "Male";
    let birthDayCode = rawDayCode;

    if (rawDayCode > 500) {
      gender = "Female";
      birthDayCode = rawDayCode - 500;
    }

    if (birthDayCode < 1 || birthDayCode > 366) {
      return {
        valid: false,
        error: "Invalid birth-day code in NIC."
      };
    }

    const datePart = this.dayCodeToDate(
      birthDayCode,
      year
    );

    if (!datePart) {
      return {
        valid: false,
        error: "Invalid date found in NIC."
      };
    }

    const dd = String(datePart.day).padStart(2, "0");
    const mm = String(datePart.month).padStart(2, "0");

    return {
      valid: true,
      dob: `${dd}-${datePart.monthName}-${year}`,
      dobISO: `${year}-${mm}-${dd}`,
      day: datePart.day,
      month: datePart.month,
      monthName: datePart.monthFullName,
      year: year,
      gender: gender,
      age: this.calculateAge(
        year,
        datePart.month,
        datePart.day
      ),
      format: format
    };
  }
}

function decodeSriLankaNIC(nicNumber) {
  return SriLankaNIC.decode(nicNumber);
}

module.exports = {
  SriLankaNIC,
  decodeSriLankaNIC
};
