export function generateReceipt(): Promise<{ receiptId: string; accountNumber: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const receiptId = `REC-${Date.now().toString(36).toUpperCase()}`
      const accountNumber = `CTA-${String(Math.floor(Math.random() * 900000) + 100000)}`
      resolve({ receiptId, accountNumber })
    }, 800)
  })
}
