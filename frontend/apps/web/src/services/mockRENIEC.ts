export function signDocument(): Promise<{ signatureId: string; timestamp: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const signatureId = `RENIEC-SIG-${Date.now().toString(36).toUpperCase()}`
      const timestamp = new Date().toISOString()
      resolve({ signatureId, timestamp })
    }, 1200)
  })
}
