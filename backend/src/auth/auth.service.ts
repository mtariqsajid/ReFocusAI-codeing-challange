import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
 login() {
    return {status: 'success', message: 'Login successful'}
 }
 signup() {
    return {status: 'success', message: 'User created successfully.'}
 }
}


