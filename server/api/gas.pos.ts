import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // هذا السطر هو الأهم في عملية التشخيص
    console.log('Body received by proxy:', body)

    const scriptUrl = "https://script.google.com/macros/s/AKfycbxUVgxJ_IKGCSz_E85Uew7XkNIT8jCHaQ8sREMbpbgxNt0qUP9Gh3J767RZbbPho3xs/exec"

    const payload = {
      secret: "xyz123", // استخدم المفتاح السري الحقيقي
      ...body
    }

    const response = await $fetch(scriptUrl, {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json"
      }
    })

    return response
  } catch (error) {
    console.error("Proxy error:", error)
    return { ok: false, message: error.message || "Proxy Error" }
  }
})