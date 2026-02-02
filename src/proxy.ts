import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  if(!token) {
    return NextResponse.redirect(new URL("/pages/login", request.url))
  }
  try {
    const secret =  new TextEncoder().encode(process.env.SECRET_KEY!)
    const isMatch = await jwtVerify(token,secret)
    if(!isMatch) {
      return NextResponse.redirect(new URL("/pages/login", request.url))
    }
  } catch (error) {
    
    return NextResponse.redirect(new URL("/pages/login", request.url),{statusText:`Erro:${error}`})
  }
  

}

export const config = {
  matcher: ['/pages/cart'],
}