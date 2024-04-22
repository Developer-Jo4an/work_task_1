class EmpireTimeController {
  countTime(seconds) {
    const startDate = Date.now()
    const endDate = startDate + seconds
    return {
      start: startDate,
      end: endDate
    }
  }
}

export const empireTimeController = new EmpireTimeController()
