import { handlers } from "@/auth" // Referring to the auth.ts we just created

console.log('handlers', handlers)

export const { GET, POST } = handlers